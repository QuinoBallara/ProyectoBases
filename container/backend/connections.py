import mysql.connector
from mysql.connector import Error
import time
import re


def create_connection():
    """Create a connection to the MySQL database in the Docker container."""
    i = 5
    while i > 0:
        try:
            connection = mysql.connector.connect(
                host="db",
                user="root",
                password="root",
                database="mydb",
                port=3306,
            )
            if connection.is_connected():
                print("Connected to the MySQL database in Docker.")
            return connection
        except Error as e:
            time.sleep(8)
            i -= 1
            print(f"Error: {e}")
    return None


def is_safe_sql(sql):
    """Check if the SQL statement is safe from SQL injection."""
    # Simple regex to detect common SQL injection patterns
    sql_injection_patterns = [
        r"(--|#|\/\*)\s*.*",  # Comments
        r"(\b(OR|AND)\b\s*1\s*=\s*1)",  # Boolean-based SQL injection
    ]
    for pattern in sql_injection_patterns:
        if re.search(pattern, sql, re.IGNORECASE):
            return False
    return True


def run_sql_script(script, params=None):
    """Run an SQL script on the connected Docker MySQL database and return results or alerts for errors."""
    connection = create_connection()
    results = []
    alerts = []  # Collect alerts for any non-query errors

    if connection:
        cursor = connection.cursor()
        try:
            # Split the script into individual statements
            for statement in script.strip().split(";"):
                if statement.strip():
                    if not is_safe_sql(statement):
                        alerts.append(
                            f"Potential SQL injection detected in statement: {statement}"
                        )
                        continue

                    if params:
                        cursor.execute(statement, params)
                    else:
                        cursor.execute(statement)

                    # If the statement is a SELECT query, fetch and store results
                    if statement.strip().upper().startswith("SELECT"):
                        results.append(cursor.fetchall())
                    else:
                        # Check if it's an INSERT, DELETE, or UPDATE, and add an alert for success
                        if (
                            statement.strip()
                            .upper()
                            .startswith(("INSERT", "DELETE", "UPDATE"))
                        ):
                            alerts.append(
                                f"'{statement.strip()}' executed successfully."
                            )

            connection.commit()
            print("Script executed successfully.")
            return {"results": results, "alerts": alerts}

        except Error as e:
            alert_message = f"Error executing statement: {e}"
            print(alert_message)
            return {"results": None, "alerts": [alert_message]}

        finally:
            cursor.close()
            connection.close()


def populate_db():
    print("Adding shifts...")
    run_sql_script(
        """
        INSERT INTO shift (name, start_time, end_time) VALUES
        ('Mañana', '08:00:00', '12:00:00'),
        ('Tarde', '14:00:00', '17:00:00'),
        ('Noche', '17:00:00', '22:00:00')
        """
    )
    print("Adding instructors...")
    run_sql_script(
        """
        INSERT INTO instructor (id, first_name, last_name) VALUES
        ('12345678', 'John', 'Doe'),
        ('87654321', 'Jane', 'Smith'),
        ('11223344', 'Alice', 'Johnson'),
        ('22334455', 'Bob', 'Brown'),
        ('33445566', 'Charlie', 'Davis')
        """
    )
    print("Adding activities...")
    run_sql_script(
        """
        INSERT INTO activity (description, cost, min_age, max_age) VALUES
        ('Yoga', 100, 18, 60),
        ('Pilates', 150, 18, 60),
        ('Crossfit', 200, 18, 60),
        ('Swimming', 120, 5, 50),
        ('Cycling', 80, 10, 70)
        """
    )
    print("Adding equipments...")
    run_sql_script(
        """

        INSERT INTO equipment (activity_id, description, cost) VALUES
        (1, 'Yoga Mat', 20),
        (2, 'Pilates Ball', 30),
        (3, 'Crossfit Rope', 40),
        (4, 'Swimming Goggles', 15),
        (5, 'Cycling Helmet', 25)
        """
    )
    print("Adding students...")
    run_sql_script(
        """
        INSERT INTO student (id, mail, first_name, last_name, birth_day, phone) VALUES
        ('11111111', 'student1@mail.com', 'Student', 'One', '2000-01-01', '1234567890'),
        ('22222222', 'student2@mail.com', 'Student', 'Two', '1999-02-02', '2345678901'),
        ('33333333', 'student3@mail.com', 'Student', 'Three', '1998-03-03', '3456789012'),
        ('44444444', 'student4@mail.com', 'Student', 'Four', '1997-04-04', '4567890123'),
        ('55555555', 'student5@mail.com', 'Student', 'Five', '1996-05-05', '5678901234')

        """
    )
    print("Adding classes...")
    run_sql_script(
        """
        INSERT INTO class (dictated, instructor_id, shift_id, activity_id, student_quotas) VALUES
        (1, '12345678', 1, 1, 10),
        (1, '87654321', 2, 2, 15),
        (1, '11223344', 3, 3, 20),
        (1, '22334455', 1, 4, 25),
        (1, '33445566', 2, 5, 30)
        """
    )
    print("Adding class_students...")
    run_sql_script(
        """
        INSERT INTO class_student (class_id, student_id, equipment_id) VALUES
        (1, '11111111', 1),
        (2, '22222222', 2),
        (3, '33333333', 3),
        (4, '44444444', 4),
        (5, '55555555', 5)
        """
    )
    print("Database populated with sample data.")


def reset_db():
    run_sql_script(
        """
    delete from class_student;
    delete from class;
    delete from equipment;
    delete from activity;
    delete from shift;
    delete from instructor;
    delete from student;
    """
    )
    print("Database reset.")


reset_db()

populate_db()

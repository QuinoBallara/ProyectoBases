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


# reset_db()

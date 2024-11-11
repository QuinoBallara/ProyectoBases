import mysql.connector 
from mysql.connector import Error

def create_connection():
    """Create a connection to the MySQL database in the Docker container."""
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="user",
            password="userpass",
            database="mydb",
            port=4096
        )
        if connection.is_connected():
            print("Connected to the MySQL database in Docker.")
        return connection
    except Error as e:
        print(f"Error: {e}")
        return None

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
                    if params:
                        cursor.execute(statement, params)
                    else:
                        cursor.execute(statement)
                    
                    # If the statement is a SELECT query, fetch and store results
                    if statement.strip().upper().startswith("SELECT"):
                        results.append(cursor.fetchall())
                    else:
                        # Check if it's an INSERT, DELETE, or UPDATE, and add an alert for success
                        if statement.strip().upper().startswith(("INSERT", "DELETE", "UPDATE")):
                            alerts.append(f"'{statement.strip()}' executed successfully.")
            
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
    run_sql_script("""
    delete from class_student;
    delete from class;
    delete from equipment;
    delete from activity;
    delete from shift;
    delete from instructor;
    delete from student;
    """)
    print("Database reset.")

reset_db()
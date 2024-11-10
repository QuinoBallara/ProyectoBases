import mysql.connector
from mysql.connector import Error

def create_connection():
    """Create a database connection and return the connection object."""
    try:
        connection = mysql.connector.connect(
            host="localhost",           # Change to your Docker MySQL service name if needed, e.g., "mysql-db"
            user="user",                # Your MySQL username
            password="userpass",        # Your MySQL password
            database="mydb"             # The database you want to connect to
        )
        if connection.is_connected():
            print("Connection to MySQL database was successful.")
        return connection
    except Error as e:
        print(f"Error: {e}")
        return None

def run_sql_script(script):
    """Run a given SQL script on the connected database."""
    connection = create_connection()
    if connection:
        cursor = connection.cursor()
        try:
            # Execute each statement in the script
            for statement in script.strip().split(";"):
                if statement.strip():
                    cursor.execute(statement)
            connection.commit()
            print("Script executed successfully.")
        except Error as e:
            print(f"Error executing script: {e}")
        finally:
            cursor.close()
            connection.close()

# Example of how to run SQL statements
sql_script = """
CREATE TABLE IF NOT EXISTS example_table (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);
INSERT INTO example_table (name) VALUES ('Sample Data');
"""

run_sql_script(sql_script)

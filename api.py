from flask import Flask, jsonify, request
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

# MySQL connection configuration
config = {
    'user': 'user',
    'password': 'userpass',
    'host': '127.0.0.1',
    'port': '1096',
    'database': 'mydb'
}

# Helper function to execute queries
def execute_query(query, args=()):
    try:
        connection = mysql.connector.connect(**config)
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query, args)
        connection.commit()
        return cursor.fetchall() if cursor.description else None
    except Error as e:
        print(f"Error: {e}")
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

# Endpoint to get all rows in a table
@app.route('/data', methods=['GET'])
def get_data():
    query = "SELECT * FROM my_table;"
    result = execute_query(query)
    return jsonify(result), 200

# Endpoint to insert data
@app.route('/data', methods=['POST'])
def insert_data():
    data = request.get_json()
    name = data['name']
    age = data['age']
    query = "INSERT INTO my_table (name, age) VALUES (%s, %s);"
    execute_query(query, (name, age))
    return jsonify({'message': 'Data inserted successfully'}), 201

if __name__ == '__main__':
    app.run(debug=True)

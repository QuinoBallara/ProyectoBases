from flask import Flask, jsonify, request
from connections import run_sql_script
from instructor import Instructor, add_instructor, get_instructors, get_instructor_by_id, modify_instructor, delete_instructor

app = Flask(__name__)

# Endpoint to add a new instructor
@app.route('/instructors', methods=['POST'])
def add_instructor_endpoint():
    data = request.get_json()
    instructor = Instructor(
        id=data['id'],
        first_name=data['first_name'],
        last_name=data['last_name']
    )
    result = add_instructor(instructor)
    return jsonify({"message": result}), 201

# Endpoint to get all instructors
@app.route('/instructors', methods=['GET'])
def get_instructors_endpoint():
    instructors = get_instructors()
    return jsonify(instructors), 200

# Endpoint to get instructor by ID
@app.route('/instructors/<int:instructor_id>', methods=['GET'])
def get_instructor_by_id_endpoint(instructor_id):
    instructor = get_instructor_by_id(instructor_id)
    if instructor:
        return jsonify(instructor), 200
    else:
        return jsonify({"message": "Instructor not found"}), 404

# Endpoint to modify instructor details
@app.route('/instructors/<int:instructor_id>', methods=['PUT'])
def modify_instructor_endpoint(instructor_id):
    data = request.get_json()
    instructor = Instructor(
        first_name=data['first_name'],
        last_name=data['last_name']
    )
    result = modify_instructor(instructor_id, instructor)
    return jsonify({"message": result}), 200

# Endpoint to delete an instructor
@app.route('/instructors/<int:instructor_id>', methods=['DELETE'])
def delete_instructor_endpoint(instructor_id):
    result = delete_instructor(instructor_id)
    return jsonify({"message": result}), 200

if __name__ == '__main__':
    app.run(debug=True)

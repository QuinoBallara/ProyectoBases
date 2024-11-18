from flask import Blueprint, jsonify, request
from student import Student, add_student, get_students, get_student_by_id, modify_student, delete_student

student_bp = Blueprint('student', __name__)

@student_bp.route('/students', methods=['POST'])
def add_student_endpoint():
    data = request.get_json()
    student = Student(
        id=data['id'],
        first_name=data['first_name'],
        last_name=data['last_name'],
        date_of_birth=data['date_of_birth'],
        gender=data['gender']
    )
    result = add_student(student)
    return jsonify({"message": result}), 201

@student_bp.route('/students', methods=['GET'])
def get_students_endpoint():
    students = get_students()
    return jsonify(students), 200

@student_bp.route('/students/<int:student_id>', methods=['GET'])
def get_student_by_id_endpoint(student_id):
    student = get_student_by_id(student_id)
    if student:
        return jsonify(student), 200
    else:
        return jsonify({"message": "Student not found"}), 404

@student_bp.route('/students/<int:student_id>', methods=['PUT'])
def modify_student_endpoint(student_id):
    data = request.get_json()
    student = Student(
        first_name=data['first_name'],
        last_name=data['last_name'],
        date_of_birth=data['date_of_birth'],
        gender=data['gender']
    )
    result = modify_student(student_id, student)
    return jsonify({"message": result}), 200

@student_bp.route('/students/<int:student_id>', methods=['DELETE'])
def delete_student_endpoint(student_id):
    result = delete_student(student_id)
    return jsonify({"message": result}), 200

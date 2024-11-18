from flask import Blueprint, jsonify, request
from classStudent import ClassStudent, add_class_student, get_class_students

class_student_bp = Blueprint('class_student', __name__)

@class_student_bp.route('/class-students', methods=['POST'])
def add_class_student_endpoint():
    data = request.get_json()
    class_student = ClassStudent(
        class_id=data['class_id'],
        student_id=data['student_id'],
        equipment_id=data.get('equipment_id')  # Optional field
    )
    result = add_class_student(class_student)
    return jsonify({"message": result}), 201

@class_student_bp.route('/class-students', methods=['GET'])
def get_class_students_endpoint():
    class_students = get_class_students()
    return jsonify(class_students), 200

from flask import Blueprint, jsonify, request
from student import (
    Student,
    add_student,
    get_students,
    get_student_by_id,
    modify_student,
    delete_student,
)

student_bp = Blueprint("student", __name__)


# working
@student_bp.route("/students", methods=["POST"])
def add_student_endpoint():
    data = request.get_json()
    student = Student(
        id=data["id"],
        mail=data["mail"],
        first_name=data["first_name"],
        last_name=data["last_name"],
        birth_day=data["birth_day"],
        phone=data["phone"],
    )
    result = add_student(student)
    return jsonify({"message": result}), 201


# jsonificado
# working
@student_bp.route("/students", methods=["GET"])
def get_students_endpoint():
    students = get_students()
    try:
        formatted_students = [
            {
                "id": student[0],
                "mail": student[1],
                "first_name": student[2],
                "last_name": student[3],
                "birth_day": student[4],
                "phone": student[5],
            }
            for student in students[0]
        ]
        return jsonify(formatted_students), 200
    except Exception as e:
        return jsonify({"message": f"{e.__str__}"}), 404


# jsonificado
# working
@student_bp.route("/students/<string:student_id>", methods=["GET"])
def get_student_by_id_endpoint(student_id):
    student = get_student_by_id(student_id)
    try:
        formatted_students = {
            "id": student[0][0][0],
            "mail": student[0][0][1],
            "first_name": student[0][0][2],
            "last_name": student[0][0][3],
            "birth_day": student[0][0][4],
            "phone": student[0][0][5],
        }
        return jsonify(formatted_students), 200
    except Exception as e:
        return jsonify({"message": f"{e.__str__}"}), 404


# working
@student_bp.route("/students/<string:student_id>", methods=["PUT"])
def modify_student_endpoint(student_id):
    data = request.get_json()
    student = Student(
        id=data["id"],
        mail=data["mail"],
        first_name=data["first_name"],
        last_name=data["last_name"],
        birth_day=data["birth_day"],
        phone=data["phone"],
    )
    result = modify_student(student_id, student)
    return jsonify({"message": result}), 200


# working
@student_bp.route("/students/<string:student_id>", methods=["DELETE"])
def delete_student_endpoint(student_id):
    result = delete_student(student_id)
    return jsonify({"message": result}), 200
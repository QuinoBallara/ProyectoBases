from flask import Blueprint, jsonify, request
from classStudent import ClassStudent, add_class_student, get_class_students

class_student_bp = Blueprint("class_student", __name__)


# working
@class_student_bp.route("/class-students", methods=["POST"])
def add_class_student_endpoint():
    data = request.get_json()
    class_student = ClassStudent(
        class_id=data["class_id"],
        student_id=data["student_id"],
        equipment_id=data.get("equipment_id"),  # Optional field
    )
    result = add_class_student(class_student)
    return jsonify({"message": result}), 201


# working
# jsonificado
@class_student_bp.route("/class-students", methods=["GET"])
def get_class_students_endpoint():
    class_students = get_class_students()
    try:
        class_students = [
            {
                "class_id": class_student[0],
                "student_id": class_student[1],
                "equipment_id": class_student[2],
            }
            for class_student in class_students[0]
        ]
        return jsonify(class_students), 200
    except:
        return jsonify({"message": "No class students found"}), 404

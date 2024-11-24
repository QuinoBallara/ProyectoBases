from flask import Blueprint, jsonify, request
from classStudent import (
    ClassStudent,
    add_class_student,
    get_class_students,
    get_classes_on_shift_of_student,
    delete_class_student_by_student_id_by_class_id,
)
from classes import get_class_by_id


class_student_bp = Blueprint("class_student", __name__)


def validate_data(data):
    if not data["class_id"]:
        return "class_id is required"
    if not isinstance(data["class_id"], int):
        return "class_id must be an integer"
    if not data["student_id"]:
        return "student_id is required"
    if not isinstance(data["student_id"], str):
        return "student_id must be a string"
    elif not len(data["student_id"]) == 8:
        return "student_id must be 8 characters long"
    if data["equipment_id"]:
        if not isinstance(data["equipment_id"], int):
            return "equipment_id must be a int"
    return True


def check_for_other_class_on_the_same_shift(student_id):
    results = get_classes_on_shift_of_student(student_id)
    formattted_results = [
        {
            "class_id": result[0],
            "dictated": result[1],
            "instructor_id": result[2],
            "shift_id": result[3],
            "activity_id": result[4],
            "student_quotas": result[5],
            "shift_id": result[6],
            "shift_name": result[7],
            "start_time": f"{result[8]}",
            "end_time": f"{result[9]}",
            "equipment_id": result[10],
            "student_id": result[11],
        }
        for result in results[0]
    ]
    return formattted_results


# working
@class_student_bp.route("/class-students", methods=["POST"])
def add_class_student_endpoint():
    data = request.get_json()

    joinedResult = check_for_other_class_on_the_same_shift(data["student_id"])
    classes = get_class_by_id(data["class_id"])
    for classJoined in joinedResult:
        if classJoined["shift_id"] == classes[0][0][3]:
            return (
                jsonify({"message": "Student already has a class on this shift"}),
                403,
            )

    if isinstance(validate_data(data), str):
        return jsonify({"message": validate_data(data)}), 403

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


@class_student_bp.route("/class-students/<string:student_id>", methods=["DELETE"])
def delete_class_student_by_student_id_by_class_id_endpoint():
    data = request.get_json()

    results = delete_class_student_by_student_id_by_class_id(
        data["class_id"], data["student_id"]
    )
    return jsonify({"message": results}), 200

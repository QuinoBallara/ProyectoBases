from flask import Blueprint, jsonify, request
from classes import (
    Class,
    add_class,
    get_classes,
    get_class_by_id,
    modify_class,
    delete_class,
)
from shift import get_shift_by_id
from datetime import datetime
import pytz


class_bp = Blueprint("class", __name__)


def validate_data(data):
    if "dictated" not in data:
        return "dictated is required"
    if not isinstance(data["dictated"], bool):
        return "dictated must be a boolean"
    if not data["instructor_id"]:
        return "instructor_id is required"
    if not isinstance(data["instructor_id"], str):
        return "instructor_id must be an string"
    elif not len(data["instructor_id"]) == 8:
        return "instructor_id must be 8 characters long"
    if not data["shift_id"]:
        return "shift_id is required"
    if not isinstance(data["shift_id"], int):
        return "shift_id must be an integer"
    if not data["activity_id"]:
        return "activity_id is required"
    if not isinstance(data["activity_id"], int):
        return "activity_id must be an integer"
    if not data["student_quotas"]:
        return "student_quotas is required"
    if not isinstance(data["student_quotas"], int):
        return "student_quotas must be an integer"
    return True


# working
@class_bp.route("/classes", methods=["POST"])
def add_class_endpoint():
    data = request.get_json()
    if isinstance(validate_data(data), str):
        return jsonify({"message": validate_data(data)}), 403
    class_obj = Class(
        dictated=data["dictated"],
        instructor_id=data["instructor_id"],
        shift_id=data["shift_id"],
        activity_id=data["activity_id"],
        student_quotas=data["student_quotas"],
    )
    result = add_class(class_obj)
    return jsonify({"message": result}), 201


# working
# jsonificado
@class_bp.route("/classes", methods=["GET"])
def get_classes_endpoint():
    classes = get_classes()
    try:
        classes = [
            {
                "id": Class[0],
                "dictated": Class[1],
                "instructor_id": Class[2],
                "shift_id": Class[3],
                "activity_id": Class[4],
                "student_quotas": Class[5],
            }
            for Class in classes[0]
        ]
        return jsonify(classes), 200
    except:
        return jsonify({"message": "No classes found"}), 404


# working
# jsonificado
@class_bp.route("/classes/<int:class_id>", methods=["GET"])
def get_class_by_id_endpoint(class_id):
    class_obj = get_class_by_id(class_id)
    try:
        class_obj = {
            "id": class_obj[0][0][0],
            "dictated": class_obj[0][0][1],
            "instructor_id": class_obj[0][0][2],
            "shift_id": class_obj[0][0][3],
            "activity_id": class_obj[0][0][4],
            "student_quotas": class_obj[0][0][5],
        }
        return jsonify(class_obj), 200
    except:
        return jsonify({"message": "Class not found"}), 404


# working
@class_bp.route("/classes/<int:class_id>", methods=["PUT"])
def modify_class_endpoint(class_id):
    class_obj = get_class_by_id(class_id)
    if is_class_in_session(class_obj[0][0][3]):
        return jsonify({"message": "Class is in session"}), 403
    data = request.get_json()
    if isinstance(validate_data(data), str):
        return jsonify({"message": validate_data(data)}), 403

    class_obj = Class(
        dictated=data["dictated"],
        instructor_id=data["instructor_id"],
        shift_id=data["shift_id"],
        activity_id=data["activity_id"],
        student_quotas=data["student_quotas"],
    )
    result = modify_class(class_id, class_obj)
    return jsonify({"message": result}), 200


def is_class_in_session(shift_id):
    shift_obj = get_shift_by_id(shift_id)
    print(shift_obj)
    start_time_delta = shift_obj[0][0][2]
    end_time_delta = shift_obj[0][0][3]

    # Convert timedelta to time strings
    start_time_str = (datetime.min + start_time_delta).time().strftime("%H:%M")
    end_time_str = (datetime.min + end_time_delta).time().strftime("%H:%M")

    # Parse the start and end times
    start_time = datetime.strptime(start_time_str, "%H:%M").time()
    end_time = datetime.strptime(end_time_str, "%H:%M").time()

    # Get the current local time
    local_tz = pytz.timezone("America/Montevideo")  # Replace with your local time zone
    current_time = datetime.now(local_tz).time()

    if current_time >= start_time and current_time <= end_time:
        return True
    return False


# working
@class_bp.route("/classes/<int:class_id>", methods=["DELETE"])
def delete_class_endpoint(class_id):
    result = delete_class(class_id)
    return jsonify({"message": result}), 200

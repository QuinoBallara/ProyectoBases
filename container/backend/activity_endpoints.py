from flask import Blueprint, jsonify, request
from activity import (
    Activity,
    add_activity,
    get_activities,
    get_activity_by_id,
    modify_activity,
    delete_activity,
)

activity_bp = Blueprint("activity", __name__)


def validate_data(data):
    if data["description"]:
        if not isinstance(data["description"], str):
            return "description must be a string"
    if not data["cost"]:
        return "cost is required"
    if not isinstance(data["cost"], int):
        return "cost must be an integer"
    if data["min_age"]:
        if not isinstance(data["min_age"], int):
            return "min_age must be an integer"
    if data["max_age"]:
        if not isinstance(data["max_age"], int):
            return "max_age must be an integer"
    return True


# working
@activity_bp.route("/activities", methods=["POST"])
def add_activity_endpoint():
    data = request.get_json()
    if isinstance(validate_data(data), str):
        return jsonify({"message": validate_data(data)}), 403
    activity = Activity(
        description=data["description"],
        cost=data["cost"],
        min_age=data.get("min_age", 0),
        max_age=data.get("max_age", 100),
    )
    result = add_activity(activity)
    return jsonify({"message": result}), 201


# jsonificado
# working
@activity_bp.route("/activities", methods=["GET"])
def get_activities_endpoint():
    activities = get_activities()
    try:
        formatted_activities = [
            {
                "id": activity[0],
                "description": activity[1],
                "cost": activity[2],
                "min_age": activity[3],
                "max_age": activity[4],
            }
            for activity in activities[0]
        ]
        return jsonify(formatted_activities), 200
    except Exception as e:
        return jsonify({"message": f"{e.__str__}"}), 404


# jsonificado
# working
@activity_bp.route("/activities/<int:id>", methods=["GET"])
def get_activity_by_id_endpoint(id):
    activity = get_activity_by_id(id)
    try:
        activity = {
            "id": activity[0][0][0],
            "description": activity[0][0][1],
            "cost": activity[0][0][2],
            "min_age": activity[0][0][3],
            "max_age": activity[0][0][4],
        }
        return jsonify(activity), 200
    except Exception as e:
        return jsonify({"message": f"{e.__str__}"}), 404


# working
@activity_bp.route("/activities/<int:id>", methods=["PUT"])
def modify_activity_endpoint(id):
    data = request.get_json()
    if isinstance(validate_data(data), str):
        return jsonify({"message": validate_data(data)}), 403
    activity = Activity(
        description=data["description"],
        cost=data["cost"],
        min_age=data.get("min_age", 0),
        max_age=data.get("max_age", 100),
    )
    result = modify_activity(id, activity)
    return jsonify({"message": result}), 200


# working
@activity_bp.route("/activities/<int:id>", methods=["DELETE"])
def delete_activity_endpoint(id):
    result = delete_activity(id)
    return jsonify({"message": result}), 200

from flask import Blueprint, jsonify, request
from activity import Activity, add_activity, get_activities, get_activity_by_id, modify_activity, delete_activity

activity_bp = Blueprint('activity', __name__)

@activity_bp.route('/activities', methods=['POST'])
def add_activity_endpoint():
    data = request.get_json()
    activity = Activity(
        description=data['description'],
        cost=data['cost'],
        min_age=data.get('min_age', 0),
        max_age=data.get('max_age', 100)
    )
    result = add_activity(activity)
    return jsonify({"message": result}), 201

@activity_bp.route('/activities', methods=['GET'])
def get_activities_endpoint():
    activities = get_activities()
    return jsonify(activities), 200

@activity_bp.route('/activities/<int:id>', methods=['GET'])
def get_activity_by_id_endpoint(id):
    activity = get_activity_by_id(id)
    if activity:
        return jsonify(activity), 200
    else:
        return jsonify({"message": "Activity not found"}), 404

@activity_bp.route('/activities/<int:id>', methods=['PUT'])
def modify_activity_endpoint(id):
    data = request.get_json()
    activity = Activity(
        description=data['description'],
        cost=data['cost'],
        min_age=data.get('min_age', 0),
        max_age=data.get('max_age', 100)
    )
    result = modify_activity(id, activity)
    return jsonify({"message": result}), 200

@activity_bp.route('/activities/<int:id>', methods=['DELETE'])
def delete_activity_endpoint(id):
    result = delete_activity(id)
    return jsonify({"message": result}), 200

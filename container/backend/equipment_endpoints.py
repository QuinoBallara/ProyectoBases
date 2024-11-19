from flask import Blueprint, jsonify, request
from equipment import (
    Equipment,
    add_equipment,
    get_all_equipment,
    get_equipment_by_activity,
    get_equipment_by_id,
    modify_equipment,
    delete_equipment,
)

equipment_bp = Blueprint("equipment", __name__)


# working
@equipment_bp.route("/equipment", methods=["POST"])
def add_equipment_endpoint():
    data = request.get_json()
    equipment = Equipment(
        activity_id=data["activity_id"],
        description=data["description"],
        cost=data["cost"],
    )
    result = add_equipment(equipment)
    return jsonify({"message": result}), 201


# working
# jsonificado
@equipment_bp.route("/equipment", methods=["GET"])
def get_all_equipment_endpoint():
    equipment = get_all_equipment()
    try:
        equipment = [
            {
                "id": equipment[0],
                "activity_id": equipment[1],
                "description": equipment[2],
                "cost": equipment[3],
            }
            for equipment in equipment[0]
        ]
        return jsonify(equipment), 200

    except:
        return jsonify({"message": "No equipment found"}), 404


# working
# jsonificado
@equipment_bp.route("/equipment/activity/<int:id>", methods=["GET"])
def get_equipment_by_activity_endpoint(id):
    equipment = get_equipment_by_activity(id)
    try:
        equipment = [
            {
                "id": equipment[0],
                "activity_id": equipment[1],
                "description": equipment[2],
                "cost": equipment[3],
            }
            for equipment in equipment[0]
        ]
        return jsonify(equipment), 200
    except:
        return (
            jsonify({"message": "No equipment found for the specified activity"}),
            404,
        )


# working
# jsonificado
@equipment_bp.route("/equipment/<int:id>", methods=["GET"])
def get_equipment_by_id_endpoint(id):
    equipment = get_equipment_by_id(id)
    try:
        equipment = {
            "id": equipment[0][0][0],
            "activity_id": equipment[0][0][1],
            "description": equipment[0][0][2],
            "cost": equipment[0][0][3],
        }
        return jsonify(equipment), 200
    except:
        return jsonify({"message": "Equipment not found"}), 404


# working
@equipment_bp.route("/equipment/<int:id>", methods=["PUT"])
def modify_equipment_endpoint(id):
    data = request.get_json()
    equipment = Equipment(
        activity_id=data["activity_id"],
        description=data["description"],
        cost=data["cost"],
    )
    result = modify_equipment(id, equipment)
    return jsonify({"message": result}), 200


# working
@equipment_bp.route("/equipment/<int:id>", methods=["DELETE"])
def delete_equipment_endpoint(id):
    result = delete_equipment(id)
    return jsonify({"message": result}), 200

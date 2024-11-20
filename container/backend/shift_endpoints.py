from flask import Blueprint, jsonify, request
from shift import (
    Shift,
    add_shift,
    get_shifts,
    get_shift_by_id,
    modify_shift,
    delete_shift,
)

shift_bp = Blueprint("shift", __name__)


def validate_data(data):
    if not data["name"]:
        return "name is required"
    if not isinstance(data["name"], str):
        return "name must be a string"
    if not data["start_time"]:
        return "start_time is required"
    if not isinstance(data["start_time"], str):
        return "start_time must be a string"
    if not data["end_time"]:
        return "end_time is required"
    if not isinstance(data["end_time"], str):
        return "end_time must be a string"
    return True


# working
@shift_bp.route("/shifts", methods=["POST"])
def add_shift_endpoint():
    data = request.get_json()
    if isinstance(validate_data(data), str):
        return jsonify({"message": validate_data(data)}), 403
    shift = Shift(
        name=data["name"],
        start_time=data["start_time"],
        end_time=data["end_time"],
    )
    result = add_shift(shift)
    return jsonify({"message": result}), 201


# jsonificado
# working
@shift_bp.route("/shifts", methods=["GET"])
def get_shifts_endpoint():
    shifts = get_shifts()
    try:
        formatted_shifts = [
            {
                "id": shift[0],
                "name": f"{shift[1]}",
                "start_time": f"{shift[2]}",
                "end_time": f"{shift[3]}",
            }
            for shift in shifts[0]
        ]
        return jsonify(formatted_shifts), 200
    except:
        return jsonify({"message": "No shifts found"}), 404


# jsonificado
# working
@shift_bp.route("/shifts/<int:shift_id>", methods=["GET"])
def get_shift_by_id_endpoint(shift_id):
    shift = get_shift_by_id(shift_id)
    try:
        shift = {
            "id": shift[0][0][0],
            "name": f"{shift[0][0][1]}",
            "start_time": f"{shift[0][0][2]}",
            "end_time": f"{shift[0][0][3]}",
        }
        return jsonify(shift), 200
    except:
        return jsonify({"message": "Shift not found"}), 404


# working
@shift_bp.route("/shifts/<int:shift_id>", methods=["PUT"])
def modify_shift_endpoint(shift_id):
    data = request.get_json()
    if isinstance(validate_data(data), str):
        return jsonify({"message": validate_data(data)}), 403
    shift = Shift(
        name=data["name"],
        start_time=data["start_time"],
        end_time=data["end_time"],
    )
    result = modify_shift(shift_id, shift)
    return jsonify({"message": result}), 200


# working
@shift_bp.route("/shifts/<int:shift_id>", methods=["DELETE"])
def delete_shift_endpoint(shift_id):
    result = delete_shift(shift_id)
    return jsonify({"message": result}), 200

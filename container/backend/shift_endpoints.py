from flask import Blueprint, jsonify, request
from shift import Shift, add_shift, get_shifts, get_shift_by_id, modify_shift, delete_shift

shift_bp = Blueprint('shift', __name__)

@shift_bp.route('/shifts', methods=['POST'])
def add_shift_endpoint():
    data = request.get_json()
    shift = Shift(
        description=data['description'],
        start_time=data['start_time'],
        end_time=data['end_time']
    )
    result = add_shift(shift)
    return jsonify({"message": result}), 201

@shift_bp.route('/shifts', methods=['GET'])
def get_shifts_endpoint():
    shifts = get_shifts()
    return jsonify(shifts), 200

@shift_bp.route('/shifts/<int:shift_id>', methods=['GET'])
def get_shift_by_id_endpoint(shift_id):
    shift = get_shift_by_id(shift_id)
    if shift:
        return jsonify(shift), 200
    else:
        return jsonify({"message": "Shift not found"}), 404

@shift_bp.route('/shifts/<int:shift_id>', methods=['PUT'])
def modify_shift_endpoint(shift_id):
    data = request.get_json()
    shift = Shift(
        description=data['description'],
        start_time=data['start_time'],
        end_time=data['end_time']
    )
    result = modify_shift(shift_id, shift)
    return jsonify({"message": result}), 200

@shift_bp.route('/shifts/<int:shift_id>', methods=['DELETE'])
def delete_shift_endpoint(shift_id):
    result = delete_shift(shift_id)
    return jsonify({"message": result}), 200

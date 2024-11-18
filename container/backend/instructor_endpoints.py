from flask import Blueprint, jsonify, request
from instructor import Instructor, add_instructor, get_instructors, get_instructor_by_id, modify_instructor, delete_instructor

instructor_bp = Blueprint('instructor', __name__)

@instructor_bp.route('/instructors', methods=['POST'])
def add_instructor_endpoint():
    data = request.get_json()
    instructor = Instructor(
        id=data['id'],
        first_name=data['first_name'],
        last_name=data['last_name']
    )
    result = add_instructor(instructor)
    return jsonify({"message": result}), 201

@instructor_bp.route('/instructors', methods=['GET'])
def get_instructors_endpoint():
    instructors = get_instructors()
    return jsonify(instructors), 200

@instructor_bp.route('/instructors/<int:instructor_id>', methods=['GET'])
def get_instructor_by_id_endpoint(instructor_id):
    instructor = get_instructor_by_id(instructor_id)
    if instructor:
        return jsonify(instructor), 200
    else:
        return jsonify({"message": "Instructor not found"}), 404

@instructor_bp.route('/instructors/<int:instructor_id>', methods=['PUT'])
def modify_instructor_endpoint(instructor_id):
    data = request.get_json()
    instructor = Instructor(
        first_name=data['first_name'],
        last_name=data['last_name']
    )
    result = modify_instructor(instructor_id, instructor)
    return jsonify({"message": result}), 200

@instructor_bp.route('/instructors/<int:instructor_id>', methods=['DELETE'])
def delete_instructor_endpoint(instructor_id):
    result = delete_instructor(instructor_id)
    return jsonify({"message": result}), 200

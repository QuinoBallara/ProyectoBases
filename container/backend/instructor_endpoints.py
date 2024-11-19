from flask import Blueprint, jsonify, request
from instructor import (
    Instructor,
    add_instructor,
    get_instructors,
    get_instructor_by_id,
    modify_instructor,
    delete_instructor,
)

instructor_bp = Blueprint("instructor", __name__)


# working
@instructor_bp.route("/instructors", methods=["POST"])
def add_instructor_endpoint():
    data = request.get_json()
    instructor = Instructor(
        id=data["id"], first_name=data["first_name"], last_name=data["last_name"]
    )
    result = add_instructor(instructor)
    return jsonify({"message": result}), 201


# working
# jsonificado
@instructor_bp.route("/instructors", methods=["GET"])
def get_instructors_endpoint():
    instructors = get_instructors()
    try:
        formatted_instructors = [
            {
                "id": instructor[0],
                "first_name": instructor[1],
                "last_name": instructor[2],
            }
            for instructor in instructors[0]
        ]
        return jsonify(formatted_instructors), 200
    except:
        return jsonify({"message": "No instructors found"}), 404


# working
# jsonificado
@instructor_bp.route("/instructors/<string:instructor_id>", methods=["GET"])
def get_instructor_by_id_endpoint(instructor_id):
    instructor = get_instructor_by_id(instructor_id)
    try:
        instructor = {
            "id": instructor[0][0][0],
            "first_name": f"{instructor[0][0][1]}",
            "last_name": f"{instructor[0][0][2]}",
        }
        return jsonify(instructor), 200
    except:
        return jsonify({"message": "Instructor not found"}), 404


# working
@instructor_bp.route("/instructors/<string:instructor_id>", methods=["PUT"])
def modify_instructor_endpoint(instructor_id):
    data = request.get_json()
    instructor = Instructor(
        id=data["id"], first_name=data["first_name"], last_name=data["last_name"]
    )
    result = modify_instructor(instructor_id, instructor)
    return jsonify({"message": result}), 200


# working
@instructor_bp.route("/instructors/<string:instructor_id>", methods=["DELETE"])
def delete_instructor_endpoint(instructor_id):
    result = delete_instructor(instructor_id)
    return jsonify({"message": result}), 200

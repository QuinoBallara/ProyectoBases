from flask import Blueprint, jsonify, request
from connections import run_sql_script


views_bp = Blueprint("views", __name__)


@views_bp.route("/activity_revenue", methods=["GET"])
def showView_activity_revenue():
    sql_script = """
    SELECT * FROM activity_revenue
    """
    results = run_sql_script(sql_script)["results"]
    try:
        formatted_results = [
            {
                "activity_id": result[0],
                "description": result[1],
                "revenue": result[2],
            }
            for result in results[0]
        ]
        return jsonify(formatted_results), 200
    except Exception as e:
        return run_sql_script(sql_script)["results"]


@views_bp.route("/student_activity", methods=["GET"])
def showView_student_activity():
    sql_script = """
    SELECT * FROM student_activity
    """
    results = run_sql_script(sql_script)["results"]
    try:
        formatted_results = [
            {
                "activity_id": result[0],
                "description": result[1],
                "total_students": result[2],
            }
            for result in results[0]
        ]
        return jsonify(formatted_results), 200
    except Exception as e:
        return jsonify({"message": f"{e.__str__}"}), 404


@views_bp.route("/shift_class", methods=["GET"])
def showView_shift_class():
    sql_script = """
    SELECT * FROM shift_class
    """
    results = run_sql_script(sql_script)["results"]
    try:
        formatted_results = [
            {
                "shift_id": result[0],
                "shift_name": result[1],
                "total_classes": result[2],
            }
            for result in results[0]
        ]
        return jsonify(formatted_results), 200
    except Exception as e:
        return jsonify({"message": f"{e.__str__}"}), 404


@views_bp.route("/class_props", methods=["GET"])
def showView_class_props():
    sql_script = """
    SELECT * FROM class_props
    """
    results = run_sql_script(sql_script)["results"]
    try:
        formatted_results = [
            {
                "dictated": result[0],
                "student_quotas": result[1],
                "instructor_first_name": result[2],
                "instructor_id": result[3],
                "shift_id": result[4],
                "shift_name": result[5],
                "activity_id": result[6],
                "activity_description": result[7],
                "class_id": result[8],
            }
            for result in results[0]
        ]
        return jsonify(formatted_results), 200
    except Exception as e:
        return jsonify({"message": f"{e.__str__}"}), 404

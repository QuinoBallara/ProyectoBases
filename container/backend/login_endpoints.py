from flask import Blueprint, jsonify, request
from login import Login, add_login, get_logins, get_login_by_mail, delete_login

login_bp = Blueprint("login", __name__)


# working
@login_bp.route("/logins", methods=["POST"])
def add_login_endpoint():
    data = request.get_json()
    login = Login(mail=data["mail"], password=data["password"])
    result = add_login(login)
    return jsonify({"message": result}), 201


# working
# jsonificado
@login_bp.route("/logins", methods=["GET"])
def get_logins_endpoint():
    logins = get_logins()
    try:
        formatted_logins = [
            {
                "mail": login[0],
                "password": login[1],
            }
            for login in logins[0]
        ]
        return jsonify(formatted_logins), 200
    except:
        return jsonify({"message": "No logins found"}), 404


# working
@login_bp.route("/logins/<string:mail>", methods=["GET"])
def get_login_by_mail_endpoint(mail):
    login = get_login_by_mail(mail)
    try:
        formatted_login = {
            "mail": login[0][0][0],
            "password": login[0][0][1],
        }
        return jsonify(formatted_login), 200
    except:
        return jsonify({"message": "Login not found"}), 404


# working
@login_bp.route("/logins/<string:mail>", methods=["DELETE"])
def delete_login_endpoint(mail):
    result = delete_login(mail)
    return jsonify({"message": result}), 200

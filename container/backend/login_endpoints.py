from flask import Blueprint, jsonify, request
from login import Login, add_login, get_logins, get_login_by_mail, delete_login

login_bp = Blueprint('login', __name__)

@login_bp.route('/logins', methods=['POST'])
def add_login_endpoint():
    data = request.get_json()
    login = Login(
        mail=data['mail'],
        password=data['password']
    )
    result = add_login(login)
    return jsonify({"message": result}), 201

@login_bp.route('/logins', methods=['GET'])
def get_logins_endpoint():
    logins = get_logins()
    return jsonify(logins), 200

@login_bp.route('/logins/<string:mail>', methods=['GET'])
def get_login_by_mail_endpoint(mail):
    login = get_login_by_mail(mail)
    if login:
        return jsonify(login), 200
    else:
        return jsonify({"message": "Login not found"}), 404

@login_bp.route('/logins/<string:mail>', methods=['DELETE'])
def delete_login_endpoint(mail):
    result = delete_login(mail)
    return jsonify({"message": result}), 200

from flask import Flask, jsonify, request
from connections import run_sql_script
from login import Login, add_login, get_logins, get_login_by_mail, delete_login

app = Flask(__name__)

# Endpoint to add a new login
@app.route('/logins', methods=['POST'])
def add_login_endpoint():
    data = request.get_json()
    login_obj = Login(
        mail=data['mail'],
        password=data['password']
    )
    result = add_login(login_obj)
    return jsonify({"message": result}), 201

# Endpoint to get all logins
@app.route('/logins', methods=['GET'])
def get_logins_endpoint():
    logins = get_logins()
    return jsonify(logins), 200

# Endpoint to get a login by mail
@app.route('/logins/<string:mail>', methods=['GET'])
def get_login_by_mail_endpoint(mail):
    login = get_login_by_mail(mail)
    if login:
        return jsonify(login), 200
    else:
        return jsonify({"message": "Login not found"}), 404

# Endpoint to delete a login by mail
@app.route('/logins/<string:mail>', methods=['DELETE'])
def delete_login_endpoint(mail):
    result = delete_login(mail)
    return jsonify({"message": result}), 200

if __name__ == '__main__':
    app.run(debug=True)

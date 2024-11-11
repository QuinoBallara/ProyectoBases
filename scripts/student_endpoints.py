from flask import Flask, jsonify, request
from connections import run_sql_script
from student import Student, add_student, get_students, get_student_by_id, get_student_by_mail, modify_student, delete_student

app = Flask(__name__)

# Endpoint to add a new student
@app.route('/students', methods=['POST'])
def add_student_endpoint():
    data = request.get_json()
    student = Student(
        id=data['id'],
        first_name=data['first_name'],
        last_name=data['last_name'],
        birth_day=data['birth_day'],
        phone=data['phone'],
        mail=data['mail']
    )
    result = add_student(student)
    return jsonify({"message": result}), 201

# Endpoint to get all students
@app.route('/students', methods=['GET'])
def get_students_endpoint():
    students = get_students()
    return jsonify(students), 200

# Endpoint to get a student by ID
@app.route('/students/<int:id>', methods=['GET'])
def get_student_by_id_endpoint(id):
    student = get_student_by_id(id)
    if student:
        return jsonify(student), 200
    else:
        return jsonify({"message": "Student not found"}), 404

# Endpoint to get a student by email
@app.route('/students/email/<string:mail>', methods=['GET'])
def get_student_by_mail_endpoint(mail):
    student = get_student_by_mail(mail)
    if student:
        return jsonify(student), 200
    else:
        return jsonify({"message": "Student not found"}), 404

# Endpoint to modify a student's details
@app.route('/students/<int:id>', methods=['PUT'])
def modify_student_endpoint(id):
    data = request.get_json()
    student = Student(
        id=id,
        first_name=data['first_name'],
        last_name=data['last_name'],
        birth_day=data['birth_day'],
        phone=data['phone'],
        mail=data['mail']
    )
    result = modify_student(id, student)
    return jsonify({"message": result}), 200

# Endpoint to delete a student
@app.route('/students/<int:id>', methods=['DELETE'])
def delete_student_endpoint(id):
    result = delete_student(id)
    return jsonify({"message": result}), 200

if __name__ == '__main__':
    app.run(debug=True)

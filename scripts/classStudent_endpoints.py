from flask import Flask, jsonify, request
from connections import run_sql_script
from classStudent import ClassStudent, add_class_student, get_class_students

app = Flask(__name__)

# Endpoint to add a new class-student relation
@app.route('/class-students', methods=['POST'])
def add_class_student_endpoint():
    data = request.get_json()
    class_student = ClassStudent(
        class_id=data['class_id'],
        student_id=data['student_id'],
        equipment_id=data.get('equipment_id')  # Optional field
    )
    result = add_class_student(class_student)
    return jsonify({"message": result}), 201

# Endpoint to get all class-student relations
@app.route('/class-students', methods=['GET'])
def get_class_students_endpoint():
    class_students = get_class_students()
    return jsonify(class_students), 200

if __name__ == '__main__':
    app.run(debug=True)

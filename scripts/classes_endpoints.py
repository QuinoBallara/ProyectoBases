from flask import Flask, jsonify, request
from connections import run_sql_script
from classes import Class, add_class, get_classes, get_class_by_id, modify_class, delete_class

app = Flask(__name__)

# Endpoint to add a new class
@app.route('/classes', methods=['POST'])
def add_class_endpoint():
    data = request.get_json()
    class_obj = Class(
        dictated=data['dictated'],
        instructor_id=data['instructor_id'],
        shift_id=data['shift_id'],
        activity_id=data['activity_id'],
        student_quotas=data['student_quotas']
    )
    result = add_class(class_obj)
    return jsonify({"message": result}), 201

# Endpoint to get all classes
@app.route('/classes', methods=['GET'])
def get_classes_endpoint():
    classes = get_classes()
    return jsonify(classes), 200

# Endpoint to get a class by ID
@app.route('/classes/<int:class_id>', methods=['GET'])
def get_class_by_id_endpoint(class_id):
    class_obj = get_class_by_id(class_id)
    if class_obj:
        return jsonify(class_obj), 200
    else:
        return jsonify({"message": "Class not found"}), 404

# Endpoint to modify a class
@app.route('/classes/<int:class_id>', methods=['PUT'])
def modify_class_endpoint(class_id):
    data = request.get_json()
    class_obj = Class(
        dictated=data['dictated'],
        instructor_id=data['instructor_id'],
        shift_id=data['shift_id'],
        activity_id=data['activity_id'],
        student_quotas=data['student_quotas']
    )
    result = modify_class(class_id, class_obj)
    return jsonify({"message": result}), 200

# Endpoint to delete a class
@app.route('/classes/<int:class_id>', methods=['DELETE'])
def delete_class_endpoint(class_id):
    result = delete_class(class_id)
    return jsonify({"message": result}), 200

if __name__ == '__main__':
    app.run(debug=True)

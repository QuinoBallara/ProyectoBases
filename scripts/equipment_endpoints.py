from flask import Flask, jsonify, request
from connections import run_sql_script
from equipment import Equipment, add_equipment, get_all_equipment, get_equipment_by_activity, get_equipment_by_id, modify_equipment, delete_equipment

app = Flask(__name__)

# Endpoint to add new equipment
@app.route('/equipment', methods=['POST'])
def add_equipment_endpoint():
    data = request.get_json()
    equipment = Equipment(
        activity_id=data['activity_id'],
        description=data['description'],
        cost=data['cost']
    )
    result = add_equipment(equipment)
    return jsonify({"message": result}), 201

# Endpoint to get all equipment
@app.route('/equipment', methods=['GET'])
def get_all_equipment_endpoint():
    equipment = get_all_equipment()
    return jsonify(equipment), 200

# Endpoint to get equipment by activity ID
@app.route('/equipment/activity/<int:id>', methods=['GET'])
def get_equipment_by_activity_endpoint(id):
    equipment = get_equipment_by_activity(id)
    if equipment:
        return jsonify(equipment), 200
    else:
        return jsonify({"message": "No equipment found for the specified activity"}), 404

# Endpoint to get equipment by equipment ID
@app.route('/equipment/<int:id>', methods=['GET'])
def get_equipment_by_id_endpoint(id):
    equipment = get_equipment_by_id(id)
    if equipment:
        return jsonify(equipment), 200
    else:
        return jsonify({"message": "Equipment not found"}), 404

# Endpoint to modify equipment
@app.route('/equipment/<int:id>', methods=['PUT'])
def modify_equipment_endpoint(id):
    data = request.get_json()
    equipment = Equipment(
        activity_id=data['activity_id'],
        description=data['description'],
        cost=data['cost']
    )
    result = modify_equipment(id, equipment)
    return jsonify({"message": result}), 200

# Endpoint to delete equipment
@app.route('/equipment/<int:id>', methods=['DELETE'])
def delete_equipment_endpoint(id):
    result = delete_equipment(id)
    return jsonify({"message": result}), 200

if __name__ == '__main__':
    app.run(debug=True)

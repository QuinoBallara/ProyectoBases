from flask import Flask, jsonify, request
from connections import run_sql_script
from shift import Shift, add_shift, get_shifts, get_shift_by_id, modify_shift, delete_shift

app = Flask(__name__)

# Endpoint to add a new shift
@app.route('/shifts', methods=['POST'])
def add_shift_endpoint():
    data = request.get_json()
    shift = Shift(
        name=data['name'],
        start_time=data['start_time'],
        end_time=data['end_time']
    )
    result = add_shift(shift)
    return jsonify({"message": result}), 201

# Endpoint to get all shifts
@app.route('/shifts', methods=['GET'])
def get_shifts_endpoint():
    shifts = get_shifts()
    return jsonify(shifts), 200

# Endpoint to get a shift by ID
@app.route('/shifts/<int:id>', methods=['GET'])
def get_shift_by_id_endpoint(id):
    shift = get_shift_by_id(id)
    if shift:
        return jsonify(shift), 200
    else:
        return jsonify({"message": "Shift not found"}), 404

# Endpoint to modify a shift
@app.route('/shifts/<int:id>', methods=['PUT'])
def modify_shift_endpoint(id):
    data = request.get_json()
    shift = Shift(
        name=data['name'],
        start_time=data['start_time'],
        end_time=data['end_time']
    )
    result = modify_shift(id, shift)
    return jsonify({"message": result}), 200

# Endpoint to delete a shift
@app.route('/shifts/<int:id>', methods=['DELETE'])
def delete_shift_endpoint(id):
    result = delete_shift(id)
    return jsonify({"message": result}), 200

if __name__ == '__main__':
    app.run(debug=True)

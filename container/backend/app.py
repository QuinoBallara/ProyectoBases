from flask import Flask
from activity_endpoints import activity_bp
from classes_endpoints import class_bp
from classStudent_endpoints import class_student_bp
from equipment_endpoints import equipment_bp
from instructor_endpoints import instructor_bp
from login_endpoints import login_bp
from shift_endpoints import shift_bp
from student_endpoints import student_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(activity_bp)
app.register_blueprint(class_bp)
app.register_blueprint(class_student_bp)
app.register_blueprint(equipment_bp)
app.register_blueprint(instructor_bp)
app.register_blueprint(login_bp)
app.register_blueprint(shift_bp)
app.register_blueprint(student_bp)


@app.route("/")
def hello_world():
    return "Hello, World!"


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)

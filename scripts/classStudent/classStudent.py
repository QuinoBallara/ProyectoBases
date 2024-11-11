from connections import run_sql_script

class ClassStudent:
    def __init__(self, class_id, student_id, equipment_id=None):
        self.class_id = class_id
        self.student_id = student_id
        self.equipment_id = equipment_id

    def __repr__(self):
        return f"ClassStudent({self.class_id}, {self.student_id}, {self.equipment_id})"

def add_class_student(class_student):
    sql_script = """
    INSERT INTO class_student (class_id, student_id, equipment_id)
    VALUES (%s, %s, %s);
    """
    result = run_sql_script(sql_script, (class_student.class_id, class_student.student_id, class_student.equipment_id))
    return result["alerts"]

def get_class_students():
    sql_script = """
    SELECT * FROM class_student;
    """
    return run_sql_script(sql_script)["results"]

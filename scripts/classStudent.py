from connections import run_sql_script

class ClassStudent:
    def __init__(self, class_id, student_id, equipment_id=None):
        self.class_id = class_id
        self.student_id = student_id
        self.equipment_id = equipment_id

    def __repr__(self):
        return f"ClassStudent({self.class_id}, {self.student_id}, {self.equipment_id})"

def add_class_student(class_student):
    if class_student.equipment_id is None:
        sql_script = """
        INSERT INTO class_student (class_id, student_id)
        VALUES (%s, %s);
        """
        result = run_sql_script(sql_script, (class_student.class_id, class_student.student_id))
        return result["alerts"]
    else:
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

def get_class_student_by_student_id(student_id):
    sql_script = """
    SELECT * FROM class_student WHERE student_id = %s;
    """
    return run_sql_script(sql_script, (student_id,))["results"]

def get_class_student_by_class_id(class_id):
    sql_script = """
    SELECT * FROM class_student WHERE class_id = %s;
    """
    return run_sql_script(sql_script, (class_id,))["results"]

def modify_class_student_by_student_id(class_student_id, class_student):
    if class_student.equipment_id is None:
        sql_script = """
        UPDATE class_student
        SET class_id = %s, student_id = %s, equipment_id = NULL
        WHERE student_id = %s;
        """
        result = run_sql_script(sql_script, (class_student.class_id, class_student.student_id, class_student_id))
        return result["alerts"]
    else:
        sql_script = """
        UPDATE class_student
        SET class_id = %s, student_id = %s, equipment_id = %s
        WHERE student_id = %s;
        """
        result = run_sql_script(sql_script, (class_student.class_id, class_student.student_id, class_student.equipment_id, class_student_id))
        return result["alerts"]

def modify_class_student_by_class_id(class_id, class_student):
    if class_student.equipment_id is None:
        sql_script = """
        UPDATE class_student
        SET class_id = %s, student_id = %s, equipment_id = NULL
        WHERE class_id = %s;
        """
        result = run_sql_script(sql_script, (class_student.class_id, class_student.student_id, class_id))
        return result["alerts"]
    else:
        sql_script = """
        UPDATE class_student
        SET class_id = %s, student_id = %s, equipment_id = %s
        WHERE class_id = %s;
        """
        result = run_sql_script(sql_script, (class_student.class_id, class_student.student_id, class_student.equipment_id, class_id))
        return result["alerts"]

def delete_class_student_by_class_id(class_student_id):
    sql_script = """
    DELETE FROM class_student WHERE class_id = %s;
    """
    result = run_sql_script(sql_script, (class_student_id,))
    return result["alerts"]

def delete_class_student_by_student_id(student_id):
    sql_script = """
    DELETE FROM class_student WHERE student_id = %s;
    """
    result = run_sql_script(sql_script, (student_id,))
    return result["alerts"]

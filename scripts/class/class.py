from connections import run_sql_script

class Class:
    def __init__(self, dictated, instructor_id, shift_id, activity_id, student_quotas):
        self.dictated = dictated
        self.instructor_id = instructor_id
        self.shift_id = shift_id
        self.activity_id = activity_id
        self.student_quotas = student_quotas

    def __repr__(self):
        return f"Class({self.dictated}, {self.instructor_id}, {self.shift_id}, {self.activity_id}, {self.student_quotas})"

def add_class(class_obj):
    sql_script = """
    INSERT INTO class (dictated, instructor_id, shift_id, activity_id, student_quotas)
    VALUES (%s, %s, %s, %s, %s);
    """
    result = run_sql_script(sql_script, (class_obj.dictated, class_obj.instructor_id, class_obj.shift_id, class_obj.activity_id, class_obj.student_quotas))
    return result["alerts"]

def get_classes():
    sql_script = """
    SELECT * FROM class;
    """
    return run_sql_script(sql_script)["results"]

from connections import run_sql_script

class Instructor:
    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name

    def __repr__(self):
        return f"Instructor({self.first_name}, {self.last_name})"

def add_instructor(instructor):
    sql_script = """
    INSERT INTO instructors (first_name, last_name)
    VALUES (%s, %s);
    """
    result = run_sql_script(sql_script, (instructor.first_name, instructor.last_name))
    return result["alerts"]

def get_instructors():
    sql_script = """
    SELECT * FROM instructors;
    """
    return run_sql_script(sql_script)["results"]

def get_instructor_by_id(instructor_id):
    sql_script = """
    SELECT * FROM instructors WHERE id = %s;
    """
    return run_sql_script(sql_script, (instructor_id,))["results"]

def modify_instructor(instructor_id, instructor):
    sql_script = """
    UPDATE instructors
    SET first_name = %s, last_name = %s
    WHERE id = %s;
    """
    result = run_sql_script(sql_script, (instructor.first_name, instructor.last_name, instructor_id))
    return result["alerts"]

def delete_instructor(instructor_id):
    sql_script = """
    DELETE FROM instructors WHERE id = %s;
    """
    result = run_sql_script(sql_script, (instructor_id,))
    return result["alerts"]

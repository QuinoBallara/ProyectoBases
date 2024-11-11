from connections import run_sql_script

class Shift:
    def __init__(self, start_time, end_time):
        self.start_time = start_time
        self.end_time = end_time

    def __repr__(self):
        return f"Shift({self.start_time}, {self.end_time})"

def add_shift(shift):
    sql_script = """
    INSERT INTO shifts (start_time, end_time)
    VALUES (%s, %s);
    """
    result = run_sql_script(sql_script, (shift.start_time, shift.end_time))
    return result["alerts"]

def get_shifts():
    sql_script = """
    SELECT * FROM shifts;
    """
    return run_sql_script(sql_script)["results"]

def get_shift_by_id(id):
    sql_script = """
    SELECT * FROM shifts WHERE id = %s;
    """
    return run_sql_script(sql_script, (id,))["results"]

def modify_shift(id, shift):
    sql_script = """
    UPDATE shifts
    SET start_time = %s, end_time = %s
    WHERE id = %s;
    """
    result = run_sql_script(sql_script, (shift.start_time, shift.end_time, id))
    return result["alerts"]

def delete_shift(id):
    sql_script = """
    DELETE FROM shifts WHERE id = %s;
    """
    result = run_sql_script(sql_script, (id,))
    return result["alerts"]
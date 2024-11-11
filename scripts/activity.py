from connections import run_sql_script

class Activity:
    def __init__(self, description, cost, min_age=0, max_age=100):
        self.description = description
        self.cost = cost
        self.min_age = min_age
        self.max_age = max_age

    def __repr__(self):
        return f"Activity({self.description}, {self.cost}, {self.min_age}, {self.max_age})"

def add_activity(activity):
    sql_script = """
    INSERT INTO activity (description, cost, min_age, max_age)
    VALUES (%s, %s, %s, %s);
    """
    result = run_sql_script(sql_script, (activity.description, activity.cost, activity.min_age, activity.max_age))
    return result["alerts"]

def get_activities():
    sql_script = """
    SELECT * FROM activity;
    """
    return run_sql_script(sql_script)["results"]

def get_activity_by_id(id):
    sql_script = """
    SELECT * FROM activity
    WHERE id = %s;
    """
    return run_sql_script(sql_script, (id,))["results"]

def modify_activity(id, activity):
    sql_script = """
    UPDATE activity
    SET description = %s, cost = %s, min_age = %s, max_age = %s
    WHERE id = %s;
    """
    result = run_sql_script(sql_script, (activity.description, activity.cost, activity.min_age, activity.max_age, id))
    return result["alerts"]

def delete_activity(id):
    sql_script = """
    DELETE FROM activity WHERE id = %s;
    """
    result = run_sql_script(sql_script, (id,))
    return result["alerts"]
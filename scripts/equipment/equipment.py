from connections import run_sql_script

class Equipment:
    def __init__(self, activity_id, description, cost):
        self.activity_id = activity_id
        self.description = description
        self.cost = cost

    def __repr__(self):
        return f"Equipment({self.activity_id}, {self.description}, {self.cost})"

def add_equipment(equipment):
    sql_script = """
    INSERT INTO equipment (activity_id, description, cost)
    VALUES (%s, %s, %s);
    """
    result = run_sql_script(sql_script, (equipment.activity_id, equipment.description, equipment.cost))
    return result["alerts"]

def get_equipment():
    sql_script = """
    SELECT * FROM equipment;
    """
    return run_sql_script(sql_script)["results"]

from connections import run_sql_script

class Login:
    def __init__(self, mail, password):
        self.mail = mail
        self.password = password

    def __repr__(self):
        return f"Login({self.mail}, {self.password})"

def add_login(login_obj):
    sql_script = """
    INSERT INTO login (mail, password)
    VALUES (%s, %s);
    """
    result = run_sql_script(sql_script, (login_obj.mail, login_obj.password))
    return result["alerts"]

def get_logins():
    sql_script = """
    SELECT * FROM login;
    """
    return run_sql_script(sql_script)["results"]

def get_login_by_mail(mail):
    sql_script = """
    SELECT * FROM login WHERE mail = %s;
    """
    return run_sql_script(sql_script, (mail,))["results"]

def delete_login(mail):
    sql_script = """
    DELETE FROM login WHERE mail = %s;
    """
    result = run_sql_script(sql_script, (mail,))
    return result["alerts"]

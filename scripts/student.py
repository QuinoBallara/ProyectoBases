from connections import run_sql_script

class Student:
    def __init__(self, first_name, last_name, birth_day, phone, mail):
        self.first_name = first_name
        self.last_name = last_name
        self.birth_day = birth_day
        self.phone = phone
        self.mail = mail

    def __repr__(self):
        return f"Student({self.first_name}, {self.last_name}, {self.birth_day}, {self.phone}, {self.mail})"

def add_student(student):
    sql_script = """
    INSERT INTO students (first_name, last_name, birth_day, phone, mail)
    VALUES (%s, %s, %s, %s, %s);
    """
    result = run_sql_script(sql_script, (student.first_name, student.last_name, student.birth_day, student.phone, student.mail))
    return result["alerts"]

def get_students():
    sql_script = """
    SELECT * FROM students;
    """
    return run_sql_script(sql_script)["results"]

def get_student_by_id(id):
    sql_script = """
    SELECT * FROM students WHERE id = %s;
    """
    result = run_sql_script(sql_script, (id,))
    return result["results"]

def modify_student(id, student):
    sql_script = """
    UPDATE students
    SET first_name = %s, last_name = %s, birth_day = %s, phone = %s, mail = %s
    WHERE id = %s;
    """
    result = run_sql_script(sql_script, (student.first_name, student.last_name, student.birth_day, student.phone, student.mail, id))
    return result["alerts"]

def delete_student(id):
    sql_script = """
    DELETE FROM students WHERE id = %s;
    """
    result = run_sql_script(sql_script, (id,))
    return result["alerts"]

student1 = Student("John", "Doe", "2000-01-01", "1234567890", "john.doe@example.com")
student2 = Student("Jane", "Smith", "1999-05-15", "0987654321", "jane.smith@example.com")

print("Adding students...")
add_student(student1)
add_student(student2)

print("Getting all students...")
students = get_students()
print(students)

print("Getting student by ID (assuming ID 1)...")
student = get_student_by_id(1)
print(student)

print("Modifying student with ID 1...")
student1_modified = Student("John", "Doe", "2000-01-01", "1122334455", "john.doe@newmail.com")
modify_student(1, student1_modified)

print("Getting student by ID after modification (assuming ID 1)...")
student = get_student_by_id(1)
print(student)

print("Deleting student with ID 2...")
delete_student(2)

print("Getting all students after deletion...")
students = get_students()
print(students)

print("Getting deleted student by ID (assuming ID 2)...")
deleted_student = get_student_by_id(2)
print(deleted_student)

input("a")

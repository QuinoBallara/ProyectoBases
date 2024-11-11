
from student import Student, add_student, get_students, get_student_by_id, modify_student, delete_student, get_student_by_mail
from connections import reset_db

try:
    student1 = Student("87654321", "John", "Doe", "2000-01-01", "1234567890", "john.doe@example.com")
    student2 = Student("12345678", "Jane", "Smith", "1999-05-15", "0987654321", "jane.smith@example.com")

    print("Adding students...")
    add_student(student1)
    add_student(student2)

    print("Getting all students...")
    students = get_students()
    print(students)

    print("Getting student by ID (assuming ID)...")
    student = get_student_by_id("12345678")
    print(student)

    print("Modifying student with ID 1...")
    student1 = Student("87654321", "John", "Doe", "2000-01-01", "1122334455", "john.doe@newmail.com")
    modify_student("87654321", student1)

    print("Getting student by ID after modification (assuming ID)...")
    student = get_student_by_id("87654321")
    print(student)

    print("Getting student by mail (assuming mail)")
    student = get_student_by_mail(student1.mail)
    print(student)

    print("Deleting student with ID...")
    delete_student("12345678")

    print("Getting all students after deletion...")
    students = get_students()
    print(students)

    print("Getting deleted student by ID (assuming ID)...")
    deleted_student = get_student_by_id("12345678")
    print(deleted_student)

    input("a")
except Exception as e:
    print(e)
finally:
    reset_db()
    print("DB reset")
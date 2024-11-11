
from student import Student, add_student, get_students, get_student_by_id, modify_student, delete_student

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
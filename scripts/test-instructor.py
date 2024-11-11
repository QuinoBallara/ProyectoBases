from instructor import Instructor, add_instructor, get_instructors, get_instructor_by_id, modify_instructor, delete_instructor
from connections import reset_db

try:
    instructor1 = Instructor("12345678", "John", "Doe")
    instructor2= Instructor("87654321", "Jane", "Doe")

    print("Adding instructors...")
    add_instructor(instructor1)
    add_instructor(instructor2)

    print("Getting all instructors...")
    instructors = get_instructors()
    print(instructors)

    print("Getting instructor by id...")
    instructor = get_instructor_by_id("12345678")
    print(instructor)

    print("Modifying instructor...")
    modify_instructor("12345678", Instructor("12345678", "John", "Smith"))
    instructors = get_instructors()
    print(instructors)

    print("Deleting instructor...")
    delete_instructor("12345678")
    instructors = get_instructors()
    print(instructors)

    input("a")
except Exception as e:
    print(e)
finally:
    reset_db()
    print("DB reset")
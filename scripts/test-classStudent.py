from classStudent import ClassStudent, add_class_student, get_class_students, get_class_student_by_class_id, get_class_student_by_student_id, modify_class_student_by_class_id, modify_class_student_by_student_id, delete_class_student_by_class_id, delete_class_student_by_student_id
from student import Student, add_student, get_students
from classes import Class, add_class, get_classes
from activity import Activity, add_activity, get_activities
from shift import Shift, add_shift, get_shifts
from instructor import Instructor, add_instructor, get_instructors
from equipment import Equipment, add_equipment, get_all_equipment
from connections import reset_db

try:
    student1 = Student("12345678", "John", "Doe", "2000-01-01", "1234567890", "john@gmail.com")
    student2 = Student("87654321", "Jane", "Smith", "1999-05-15", "0987654321", "jane@gmail.com")

    print("Adding students...")
    add_student(student1)
    add_student(student2)

    activity1 = Activity("Cycling",100,1, 100)
    shift1 = Shift("Morning", "08:00","10:00")
    instructor1 = Instructor("12345678", "John", "Doe")
    instructor2 = Instructor("87654321", "Jane", "Doe")

    print("Adding activity...")
    add_activity(activity1)
    activity_id = get_activities()[0][0][0]
    

    print("Adding shift...")
    add_shift(shift1)
    shift_id = get_shifts()[0][0][0]

    print("Adding instructor...")
    add_instructor(instructor1)
    add_instructor(instructor2)
    instructor1_id = get_instructors()[0][0][0]
    instructor2_id = get_instructors()[0][1][0]

    class1 = Class(1, instructor1_id, shift_id, activity_id, 10)
    class2 = Class(1, instructor2_id, shift_id, activity_id, 10)

    print("Adding classes...")
    add_class(class1)
    add_class(class2)

    print("Getting all classes...")
    classes_id = get_classes()[0]
    print(classes_id)

    equipment = Equipment(activity_id,"Bike", 1)
    print("Adding equipment...")
    add_equipment(equipment)
    equipment_id = get_all_equipment()[0][0][0]

    class_student1 = ClassStudent(classes_id[0][0], student1.id)
    class_student2 = ClassStudent(classes_id[1][0], student2.id, equipment_id)

    print("Adding first class student...")
    add_class_student(class_student1)
    print("Adding second class student...")
    add_class_student(class_student2)

    print("Getting all class students...")
    class_students = get_class_students()
    print(class_students)

    class_student2_student_id = class_students[0][1][1]

    print("Getting class student by student id...")
    class_students = get_class_student_by_student_id(class_student2_student_id)
    print(class_students)

    print("Getting class student by class id...")
    class_students = get_class_student_by_class_id(classes_id[1][0])
    print(class_students)

    print("Modifying class first student...")
    modify_class_student_by_class_id(classes_id[1][0], ClassStudent(classes_id[1][0], student1.id))
    print("modifying class second student...")
    modify_class_student_by_student_id(class_student2_student_id, ClassStudent(classes_id[0][0], student2.id))
    print("Getting all class students after modification...")
    class_students = get_class_students()
    print(class_students)

    class_student1_student_id = class_students[0][1][1]

    print("Deleting class student by class_id...")
    delete_class_student_by_class_id(classes_id[0][0])

    print("Getting all class students after class_id deletion...")
    class_students = get_class_students()
    print(class_students)

    print("Deleting class student by student_id...")
    delete_class_student_by_student_id(class_student1_student_id)
 
    print("Getting all class students after student_id deletion...")
    class_students = get_class_students()
    print(class_students)

except Exception as e:
    print(e)
finally:
    reset_db()
    print("DB reset")
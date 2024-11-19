from classes import Class, add_class, get_classes, get_class_by_id, modify_class, delete_class
from activity import Activity, add_activity, get_activities
from shift import Shift, add_shift, get_shifts
from instructor import Instructor, add_instructor, get_instructors
from connections import reset_db
try:
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
    classes = get_classes()
    print(classes)
    class1_id = classes[0][0][0]

    print("Getting class by id...")
    classes = get_class_by_id(class1_id)
    print(classes)

    print("Modifying class...")
    modify_class(class1_id, Class(0, instructor1_id, shift_id, activity_id, 10))


    print("Getting all classes after modification...")
    classes = get_classes()
    print(classes)

    print("Deleting class...")
    delete_class(class1_id)

    print("Getting all classes after deletion...")
    classes = get_classes()
    print(classes)

except Exception as e:
    print(e)
finally:
    reset_db()
    print("DB reset")
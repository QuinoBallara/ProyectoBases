from classes import Class, add_class, get_classes, get_class_by_id, modify_class, delete_class
from activity import Activity, add_activity, delete_activity
from shift import Shift, add_shift, delete_shift
from instructor import Instructor, add_instructor, delete_instructor
from connections import reset_db
try:
    activity1 = Activity("Cycling",100,1, 100)
    shift1 = Shift("Morning", "08:00","10:00")
    instructor1 = Instructor("12345678", "John", "Doe")

    print("Adding activity...")
    add_activity(activity1)

    print("Adding shift...")
    add_shift(shift1)

    print("Adding instructor...")
    add_instructor(instructor1)

    class1 = Class(1, instructor1.id, shift1.id, 1, 10)
    class2 = Class(1, 1, 1, 1, 10)

    print("Adding classes...")
    add_class(class1)
    add_class(class2)

    print("Getting all classes...")
    classes = get_classes()
    print(classes)

    print("Getting class by id...")
    classes = get_class_by_id(1)
    print(classes)

    print("Modifying class...")
    modify_class(1, Class(0, 1, 1, 1, 10))


    print("Getting all classes after modification...")
    classes = get_classes()
    print(classes)

    print("Deleting class...")
    delete_class(1)

    print("Getting all classes after deletion...")
    classes = get_classes()
    print(classes)

except Exception as e:
    print(e)
finally:
    reset_db()
    print("DB reset")
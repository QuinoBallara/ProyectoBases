from equipment import Equipment, add_equipment, get_all_equipment, get_equipment_by_activity, get_equipment_by_id, modify_equipment, delete_equipment
from activity import Activity, add_activity, delete_activity, get_activities
from connections import reset_db

try:
    activity1 = Activity("Cycling",100,1, 100)
    add_activity(activity1)
    activities = get_activities()

    print("Adding equipment...")
    equipment1 = Equipment(activities[0][0][0], "Bike", 100)
    equipment2 = Equipment(activities[0][0][0], "Helmet", 50)

    add_equipment(equipment1)
    add_equipment(equipment2)

    print("Getting all equipment...")
    equipment = get_all_equipment()
    print(equipment)

    print("Getting equipment by activity...")
    equipment = get_equipment_by_activity(equipment[0][0][0])
    print(equipment)

    print("Getting equipment by id...")
    equipment = get_equipment_by_id(equipment[0][0][0])
    print(equipment)

    print("Modifying equipment...")
    modify_equipment(equipment[0][0][0], Equipment(activities[0][0][0], "Bike", 200))

    print("Getting all equipment after modification...")
    equipment = get_all_equipment()
    print(equipment)

    print("Deleting equipment...")
    delete_equipment(equipment[0][0][0])

    print("Getting all equipment after deletion...")
    equipment = get_all_equipment()
    print(equipment)
except Exception as e:
    print(e)
finally:
    reset_db()
    print("DB reset")
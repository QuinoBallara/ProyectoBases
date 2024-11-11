from activity import Activity, add_activity, get_activities, get_activity_by_id, modify_activity, delete_activity
from connections import reset_db

try:
    activity1 = Activity("Swimming", 10.00, 5, 100)
    activity2 = Activity("Gym", 5.00, 18, 100)

    print("Adding activities...")
    add_activity(activity1)
    add_activity(activity2)

    print("Getting activities...")
    activities = get_activities()
    print(activities)

    print("Getting activity by ID...")
    activity = get_activity_by_id(activities[0][0][0])
    print(activity)

    print("Modifying activity...")
    activity1.description = "Swimming Pool"
    modify_activity(activities[0][0][0], activity1)

    print("Getting activities...")
    activities = get_activities()
    print(activities)

    print("Deleting activity...")
    delete_activity(activities[0][0][0])

    print("Getting activities...")
    activities = get_activities()
    print(activities)
except Exception as e:
    print(e)
finally:
    reset_db()
    print("DB reset")

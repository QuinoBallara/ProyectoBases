from shift import Shift, add_shift, get_shifts, get_shift_by_id, modify_shift, delete_shift
from connections import reset_db
try:
    shift1 = Shift("Morning", "08:00", "12:00")
    shift2 = Shift("Afternoon", "13:00", "17:00")

    print("Adding shifts...")
    add_shift(shift1)
    add_shift(shift2)

    print("Getting all shifts...")
    shifts = get_shifts()
    print(shifts)

    print("Getting shift by ID (assuming ID 1)...")
    shift = get_shift_by_id(1)
    print(shift)

    print("Modifying shift with ID 1...")
    shift1 = Shift("Morningu", "09:00", "13:00")
    modify_shift(1, shift1)

    print("Getting shift by ID after modification (assuming ID 1)...")
    shift = get_shift_by_id(1)
    print(shift)

    print("Deleting shift with ID 2...")
    delete_shift(2)

    print("Getting all shifts after deletion...")
    shifts = get_shifts()
    print(shifts)

    print("Getting deleted shift by ID (assuming ID 2)...")
    deleted_shift = get_shift_by_id(2)
    print(deleted_shift)


    input("a")
except Exception as e:
    print(e)
finally:
    reset_db()
    print("DB reset")
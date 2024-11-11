from classStudent import Student
from connections import reset_db

try:
    print("Hello world")
except Exception as e:
    print(e)
finally:
    reset_db()
    print("DB reset")
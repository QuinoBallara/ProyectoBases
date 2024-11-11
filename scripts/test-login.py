from login import Login, add_login, get_logins, delete_login
from connections import reset_db
try:
    login1 = Login("pepito@gmail.com", "1234")
    login2 = Login("gonzalito@outlook.com", "5678")

    print("Adding logins...")
    add_login(login1)
    add_login(login2)

    print("Getting all logins...")
    logins = get_logins()
    print(logins)

    print("Deleting logins...")
    logins = delete_login(login1.mail)
    print(logins)

    print("Getting all logins after deletion...")
    logins = get_logins()
    print(logins)

    input("a")
except Exception as e:
    print(e)
finally:
    reset_db()
    print("DB reset")
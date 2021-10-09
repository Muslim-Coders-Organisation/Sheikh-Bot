import os;
import random;
os.system("ls /")

b=random.randrange(1000000, 9999999)
a = str(b)
def zip():
    os.system("zip -r " + a + " /var/lib/pufferpanel/servers/ea3cd218/")
    os.system("mv " + a + ".zip /var/www/html/getZip/")
    print("Your file is available at https://baqat.danky.dev/getZip/" + a + ".zip")

zip()
print("Bye");
exit()

-- you should change these credentials if your database is accessible outside your local machine
CREATE USER devUser IDENTIFIED BY "password12!";
CREATE DATABASE sheikhChilli;
GRANT ALL PRIVILEGES ON sheikhChilli.* TO "devUser" WITH GRANT OPTION;
FLUSH PRIVILEGES;
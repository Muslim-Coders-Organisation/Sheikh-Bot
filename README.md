# Sheikh-Chilli Bot

Sheikh Chilli is an open-source discord bot, that's able to perform moderation and other commands as well. It is mainly made for the [Muslim Coders Discord Server](https://discord.gg/Vtnv3tBJem).

The Discord server is open to everyone, other than muslims as well.

---

# How to run


- clone this repository
- run `npm i`
- create a .env file in your project directory with a bot token under the "token" env variable
- Create a ormconfig.json with the template below
- run `npm start`


# ormconfig Template
```
{
    // change these according to your developer environment
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "myUsername",   
    "password": "mySecurePassword12!",
    "database": "SheikhChilli",
    "synchronize": true,
    "logging": false,
     "entities": [
        "Database/entities/**/*.ts"
    ]
}
```
# Contributions

Each and every contribution matters, whether it's a function or fixing a typo in the documentation.

#### To Contribute follow these steps:

    1. Fork this repo and clone it to your local computer
    2. create branch
    3. add/fix features/bug to the repo
    4. push the changes to the github
    5. create a pull request
    6. Wait and pray

# Questions / Help

For Any Kind of Question, Join our [Discord Server](https://discord.gg/Vtnv3tBJem)
And for fast response tag @Ameen or @validity-check
:)

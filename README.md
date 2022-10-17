# Storefront Backend API

## Introduction

This is a REST API simulating an e-commerce backend based on three models: Products, Orders and Users. A detailed list of the endpoints and actions available can be found in the [REQUIREMENTS.md](https://github.com/AbeerAlmakhdhub/StorefrontBackendApi/blob/main/REQUIREMENTS.md) file.

---

## Set-up the application

### Database config

The API connects to a **postgres** database.
Please create **two** separate databases, one for the development environment and the testing environment.

To make sure the API can connect to the db it is necessary to create a `database.json` file with the following format

```json
{
  "dev": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "Database_Name",
    "user": "Username",
    "password": "YOUR_PASSWORD_HERE"
  },
  "test": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "Database_Name_test",
    "user": "Username",
    "password": "YOUR_PASSWORD_HERE"
  }
}
```

### Environment variables

The API relies on several environment variables to function.
**dotenv** is included in the **package.json** file.
Please create a **.env** file with the declaring the following variables:

| Name              |      Value       |                                                                       Notes                                                                       |
| ----------------- | :--------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------: |
| POSTGRES_HOST     |    127.0.0.1     |                                                      Same value as in the database.json file                                                      |
| POSTGRES_DB       |    storefront    |                                                      Same value as in the database.json file                                                      |
| POSTGRES_TEST_DB  | storefront_test  |                                                      Same value as in the database.json file                                                      |
| POSTGRES_USER     | storefront_user  |                                                      Same value as in the database.json file                                                      |
| POSTGRES_PASSWORD |  YOUR_PASSWORD   |                                                      Same value as in the database.json file                                                      |
| ENV               |       dev        |                           Used to set the DB environment. The test script automatically sets it to 'test' when running.                           |
| PORT              |    YOUR_PORT     |         The API will run on http://localhost.3000 by default, but there is the option to select a custom port as an environment variable          |
| SALT_ROUNDS       |        10        |                              Number of salt rounds the password hashing function of the bcrypt package will be using                              |
| PEPPER            | YOUR_STRING_HERE |                   A string of your choice that bcrypt will be adding prior to hashing passwords for an extra layer of security                    |
| TOKEN_SECRET      | YOUR_STRING_HERE | A string that will be used by jwt to generate authentication tokens. The more complex the better, it should be made of random characters ideally. |

---

### Prepare application

- `docker-compose up` to start the docker container
- `npm install` to install all dependencies
- `db-migrate up` to set up the database and get access via http://127.0.0.1:5432
- `npm run build` to build the app

### Start the app

- `npm run start` to start the app and get access via http://127.0.0.1:3000 | http://localhost/:3000

> ### Scripts
>
> **npm run chosen_Script**
>
> | Script         |                                                                                                 Description                                                                                                  |
> | -------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
> | format         |                                                                                              Prettify the code                                                                                               |
> | lint           |                                                                                                Parse the code                                                                                                |
> | jasmine        |                                                                                         Run unit tests using Jasmine                                                                                         |
> | jasmineSilent  |                                                                    Run unit tests using Jasmine while ignoring anything but test results                                                                     |
> | build          |                                                                                                Build the app                                                                                                 |
> | start          |                                                                                                Start the app                                                                                                 |
> | test           |                                      Execute DB migrations in testing environment, run tests using Jasmine, and finally drop all alterations in testing environment DB.                                      |
> | test-env-up    |                                                                                 execute DB migrations in testing environment                                                                                 |
> | reset-test-env |                                                                                Drop all alterations in testing environment DB                                                                                |
> | testSilent     | Execute DB migrations in testing enviroment,run unit tests using Jasmine while ignoring anything but test results, run unit tests using Jasmine, and finally drop all alterations in testing environment DB. |

## How to use

The API provides both CRUD and custom actions for accessing and manipulating data in the database. You can find information regarding the requirements for sending requests to endpoints, data shapes, and database schema in the [REQUIREMENTS.md](https://github.com/AbeerAlmakhdhub/StorefrontBackendApi/blob/main/REQUIREMENTS.md) file.

#### Note that `testMaterial.json` is provided post request bodies if you'd like to use it.

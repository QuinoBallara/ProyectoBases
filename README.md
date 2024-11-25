# Databases I Final Project

## Set Up

### Requirements

- [Docker](https://www.docker.com/)
- [NPM (Node Package Manager)](https://nodejs.org/en/download/package-manager)

### Backend

1. Make sure you have Docker Running.
2. Open a terminal on the root folder of the project and run the following commands:

    ```bash
    cd container
    docker-compose up
    ```
3. That's it! The backend is running on `localhost:5001`

To test if it's working, you can either make an API call on Postman at `http://localhost:5001/` or run the following commands on your terminal:
1. `docker exec -it mysql_db mysql -u root -p`
2. Enter the password `root`
3. `use mydb;`
3. `SHOW TABLES;` should return the tables in the database. 


### Frontend

1. Open a terminal on the root folder of the project and run the following commands:

    ```bash
    cd frontend
    npm install
    npm run dev
    ```
2. The terminal will return a localhost address where the frontend is running. Open it on your browser.

# Databases I Final Project: Snow Sports School Management Application

This project was developed as part of the **Databases I** course at **Universidad Católica del Uruguay**. The goal was to design and implement a relational database and an integrated application to manage the operations of a hypothetical snow sports school. This included the administration of students, instructors, classes, schedules, activities, and equipment.

## Core Features
- Perform CRUD operations for students, instructors, classes, and schedules.
- Maintain key constraints, such as preventing double bookings for instructors or students in overlapping time slots.
- Implement reporting features to analyze income by activity, identify the most popular activities, and monitor the busiest time slots.
- Ensure security by preventing SQL injection and encrypting user credentials.

## Technical Implementation
The solution consists of three layers:

1. **Database**: 
   - A MySQL relational database hosted in a Docker container.
   - Features include optimized indexing, constraints to ensure data integrity, and the use of SQL Views for generating reports.

2. **Backend**: 
   - A Flask-based API built in Python, supporting predefined queries and secure data interactions.
   - Unit tests were included to ensure reliability.

3. **Frontend**: 
   - A React-based web application for user interaction.
   - Features include authentication, dynamic data manipulation via modals, and integrated views for activity and reporting.


## Set Up

### Requirements

- [Docker](https://www.docker.com/)
- [NPM (Node Package Manager)](https://nodejs.org/en/download/package-manager)

### Backend

1. Make sure you have Docker Running.
2. Open a terminal on the root folder of the project and run the following commands:

    ```bash
    cd container
    docker-compose up --build
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

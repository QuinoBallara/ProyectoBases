# Set Up

## Dependencies

- Flask: `pip install flask`

## Docker

1. `cd docker`
2. `docker-compose up`
3. `docker exec -it mysql-db mysql -u user -puserpass mydb`
4. To test if it's working: `SHOW TABLES;` 
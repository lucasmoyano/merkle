# Merkle Robot Rover Test

## First Step:
Modify your database connection in application.properties:
spring.datasource.dbname=rover
spring.datasource.username=root
spring.datasource.password=admin

## Second Step:
Execute the queries located in:
resources/sql/inserts.sql

## Usage:
### Get all Dishes:
url: http://localhost/dish/
method: GET

### Create new Order:
url: http://localhost/order/
method: POST
Body:
{
"email": "lucasmoy@edteam.com",
"dishes": [ {"id": 2}, {"id": 3} ]
}

### Cancel Order:
url: http://localhost/order/{id}
method: DELETE


### Get all Orders:
url: http://localhost/order/
method: GET

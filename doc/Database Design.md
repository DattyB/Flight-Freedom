# Database Design

## Creating tables

Show tables command to show GCP connection
![](https://i.imgur.com/WUNcwOh.png)


``` sql

CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE favorites (
    id INT NOT NULL AUTO_INCREMENT,
    airport_name VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE flights (
    YEAR INT,
    MONTH INT,
    DAY INT,
    DAY_OF_WEEK INT,
    AIRLINE VARCHAR(10),
    FLIGHT_NUMBER INT,
    TAIL_NUMBER VARCHAR(10),
    ORIGIN_AIRPORT VARCHAR(10),
    DESTINATION_AIRPORT VARCHAR(10),
    SCHEDULED_DEPARTURE INT,
    DEPARTURE_TIME INT,
    DEPARTURE_DELAY INT,
    TAXI_OUT INT,
    WHEELS_OFF INT,
    SCHEDULED_TIME INT,
    ELAPSED_TIME INT,
    AIR_TIME INT,
    DISTANCE INT,
    WHEELS_ON INT,
    TAXI_IN INT,
    SCHEDULED_ARRIVAL INT,
    ARRIVAL_TIME INT,
    ARRIVAL_DELAY INT,
    DIVERTED INT,
    CANCELLED INT,
    CANCELLATION_REASON VARCHAR(10),
    AIR_SYSTEN_DELAY INT,
    SECURITY_DELAY INT,
    AIRLINE_DELAY INT,
    LATE_AIRCRAFT_DELAY INT,
    WEATHER_DELAY INT,
    PRIMARY KEY (FLIGHT_NUMBER)
);

CREATE TABLE airports (
    IATA_CODE VARCHAR(3) NOT NULL,
    AIRPORT VARCHAR(100),
    CITY VARCHAR(100),
    STATE VARCHAR(2),
    COUNTRY VARCHAR(3),
    LATITUDE decimal(10,10),
    LONGITUDE decimal(10,10),
    PRIMARY KEY (IATA_CODE)
);

CREATE TABLE airline_delay_sum (
    AIRLINE VARCHAR(2) NOT NULL,
    AIRLINE_DELAY_SUM VARCHAR(100),
    PRIMARY KEY (AIRLINE)
);

CREATE TABLE airlines (
    IATA_CODE VARCHAR(2) NOT NULL,
    AIRLINE_DELAY INT,
    DEPARTURE_DELAY INT,
    PRIMARY KEY (IATA_CODE)
);

CREATE TABLE aircrafts AS
    SELECT TAIL_NUMBER AS AIRCRAFT, AIRLINE
    FROM flights
;


CREATE TABLE holiday_aircraft_count AS
    Select TAIL_NUMBER as aircraft , Count(TAIL_NUMBER) as 'count'
    FROM flights
    where MONTH = 1
    Group by TAIL_NUMBER

    UNION

    Select TAIL_NUMBER as aircraft, Count(TAIL_NUMBER) as 'count'
    FROM flights
    where MONTH = 12
    Group by TAIL_NUMBER;


```

## Queries to make tables

``` sql

select FLIGHT_NUMBER , ADD(AIRLINE_DELAY)
from flights
group by AIRLINE
limit 10;

```

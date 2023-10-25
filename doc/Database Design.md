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



## Proof of 1000 records in 3 tables 

### 1st Table
![](https://i.imgur.com/gjzgdTL.png)

### 2nd Table

![](https://i.imgur.com/URa5VHV.png)
### 3rd Table
![](https://i.imgur.com/CCczWKu.png)

![](https://i.imgur.com/T1fuANg.png)

## Queries

First Query
``` sql
SELECT DESTINATION_AIRPORT, AVG(AIR_TIME)
FROM flights f1
WHERE DISTANCE >= ANY(SELECT AVG(DISTANCE) 
                  FROM flights f2
                      WHERE f1.FLIGHT_NUMBER = f2.FLIGHT_NUMBER
                  GROUP BY(AIRLINE))
GROUP BY DESTINATION_AIRPORT
ORDER BY DESTINATION_AIRPORT DESC;


```
![](https://i.imgur.com/dePmm17.png)

Second Query
``` sql
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
![](https://i.imgur.com/A8jEl0z.png)


## Query Analysis 

::: info
- The query we have we will analyze.
``` sql 
EXPLAIN ANALYZE SELECT DESTINATION_AIRPORT, AVG(AIR_TIME)
FROM flights f1
WHERE DISTANCE >= ANY(SELECT AVG(DISTANCE) 
                  FROM flights f2
                      WHERE f1.FLIGHT_NUMBER = f2.FLIGHT_NUMBER
                  GROUP BY(AIRLINE))
GROUP BY DESTINATION_AIRPORT
ORDER BY DESTINATION_AIRPORT DESC;
```

:::


### Without INDEX on flights table on FLIGHTNUMBER

```
| -> Sort: f1.DESTINATION_AIRPORT DESC  (actual time=60.572..60.592 rows=289 loops=1)
    -> Table scan on <temporary>  (actual time=0.002..0.052 rows=289 loops=1)
        -> Aggregate using temporary table  (actual time=60.393..60.463 rows=289 loops=1)
            -> Filter: <nop>(<in_optimizer>(f1.DISTANCE,<exists>(select #2)))  (cost=730.35 rows=6901) (actual time=0.140..53.532 rows=6953 loops=1)
                -> Table scan on f1  (cost=730.35 rows=6901) (actual time=0.101..4.397 rows=6953 loops=1)
                -> Select #2 (subquery in condition; dependent)
                    -> Limit: 1 row(s)  (cost=0.45 rows=1) (actual time=0.006..0.006 rows=1 loops=6953)
                        -> Filter: <if>(outer_field_is_not_null, (<cache>(f1.DISTANCE) >= <ref_null_helper>(avg(f2.DISTANCE))), true)  (cost=0.45 rows=1) (actual time=0.006..0.006 rows=1 loops=6953)
                            -> Group aggregate: avg(f2.DISTANCE)  (cost=0.45 rows=1) (actual time=0.006..0.006 rows=1 loops=6953)
                                -> Single-row index lookup on f2 using PRIMARY (FLIGHT_NUMBER=f1.FLIGHT_NUMBER)  (cost=0.35 rows=1) (actual time=0.005..0.005 rows=1 loops=6953)
 |

```

![](https://i.imgur.com/zeRhc4Z.png)

### With Index on flights table on FLIGHT_NUMBER

``` SQL
CREATE INDEX idx_lastname ON flights (FLIGHT_NUMBER);
```

``` 

| -> Sort: f1.DESTINATION_AIRPORT DESC  (actual time=34.737..34.756 rows=289 loops=1)
    -> Table scan on <temporary>  (actual time=0.002..0.047 rows=289 loops=1)
        -> Aggregate using temporary table  (actual time=34.546..34.608 rows=289 loops=1)
            -> Filter: <nop>(<in_optimizer>(f1.DISTANCE,<exists>(select #2)))  (cost=730.35 rows=6901) (actual time=0.119..28.493 rows=6953 loops=1)
                -> Table scan on f1  (cost=730.35 rows=6901) (actual time=0.071..3.796 rows=6953 loops=1)
                -> Select #2 (subquery in condition; dependent)
                    -> Limit: 1 row(s)  (cost=0.45 rows=1) (actual time=0.003..0.003 rows=1 loops=6953)
                        -> Filter: <if>(outer_field_is_not_null, (<cache>(f1.DISTANCE) >= <ref_null_helper>(avg(f2.DISTANCE))), true)  (cost=0.45 rows=1) (actual time=0.003..0.003 rows=1 loops=6953)
                            -> Group aggregate: avg(f2.DISTANCE)  (cost=0.45 rows=1) (actual time=0.003..0.003 rows=1 loops=6953)
                                -> Single-row index lookup on f2 using PRIMARY (FLIGHT_NUMBER=f1.FLIGHT_NUMBER)  (cost=0.35 rows=1) (actual time=0.002..0.002 rows=1 loops=6953)
 |


```

![](https://i.imgur.com/nySkfzN.png)

:::success

We Can see that the query is almost 2 times faster 
:::
- removed index
![](https://i.imgur.com/kXbofKV.png)


### With Index on flights table on AIRLINE

``` SQL
CREATE INDEX AIRLINE_INDEX ON flights (AIRLINE);
```

``` 
| -> Sort: f1.DESTINATION_AIRPORT DESC  (actual time=36.111..36.130 rows=289 loops=1)
    -> Table scan on <temporary>  (actual time=0.002..0.047 rows=289 loops=1)
        -> Aggregate using temporary table  (actual time=35.936..35.998 rows=289 loops=1)
            -> Filter: <nop>(<in_optimizer>(f1.DISTANCE,<exists>(select #2)))  (cost=730.35 rows=6901) (actual time=0.141..30.000 rows=6953 loops=1)
                -> Table scan on f1  (cost=730.35 rows=6901) (actual time=0.095..3.830 rows=6953 loops=1)
                -> Select #2 (subquery in condition; dependent)
                    -> Limit: 1 row(s)  (cost=0.45 rows=1) (actual time=0.003..0.003 rows=1 loops=6953)
                        -> Filter: <if>(outer_field_is_not_null, (<cache>(f1.DISTANCE) >= <ref_null_helper>(avg(f2.DISTANCE))), true)  (cost=0.45 rows=1) (actual time=0.003..0.003 rows=1 loops=6953)
                            -> Group aggregate: avg(f2.DISTANCE)  (cost=0.45 rows=1) (actual time=0.003..0.003 rows=1 loops=6953)
                                -> Single-row index lookup on f2 using PRIMARY (FLIGHT_NUMBER=f1.FLIGHT_NUMBER)  (cost=0.35 rows=1) (actual time=0.002..0.002 rows=1 loops=6953)
 |

```

![](https://i.imgur.com/nySkfzN.png)

:::success

We Can see that the query is faster than without the index but a little slower then index on the flight number index but not significant

:::



### With Index on flights table on TAIL_NUMBER

``` SQL
CREATE INDEX TAIL_NUMBER_INDEX ON flights (TAIL_NUMBER);
```

``` 
| -> Sort: f1.DESTINATION_AIRPORT DESC  (actual time=40.091..40.110 rows=289 loops=1)
    -> Table scan on <temporary>  (actual time=0.002..0.054 rows=289 loops=1)
        -> Aggregate using temporary table  (actual time=39.900..39.970 rows=289 loops=1)
            -> Filter: <nop>(<in_optimizer>(f1.DISTANCE,<exists>(select #2)))  (cost=730.35 rows=6901) (actual time=0.110..32.382 rows=6953 loops=1)
                -> Table scan on f1  (cost=730.35 rows=6901) (actual time=0.069..4.286 rows=6953 loops=1)
                -> Select #2 (subquery in condition; dependent)
                    -> Limit: 1 row(s)  (cost=0.45 rows=1) (actual time=0.003..0.003 rows=1 loops=6953)
                        -> Filter: <if>(outer_field_is_not_null, (<cache>(f1.DISTANCE) >= <ref_null_helper>(avg(f2.DISTANCE))), true)  (cost=0.45 rows=1) (actual time=0.003..0.003 rows=1 loops=6953)
                            -> Group aggregate: avg(f2.DISTANCE)  (cost=0.45 rows=1) (actual time=0.003..0.003 rows=1 loops=6953)
                                -> Single-row index lookup on f2 using PRIMARY (FLIGHT_NUMBER=f1.FLIGHT_NUMBER)  (cost=0.35 rows=1) (actual time=0.002..0.002 rows=1 loops=6953)
 |

```
![](https://i.imgur.com/pZzWxd0.png)


:::success

This query is faster than the query without an. index butb is worse than the last two queries.

:::
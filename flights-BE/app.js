const express = require("express");
const app = express();
const port = 5001;

var mysql = require("mysql");

var db = mysql.createConnection({
  host: "34.28.137.47",
  user: "root",
  password: "team7instance",
  database: "flights",
});

db.connect((err) => {
  if (err) {
    console.log("There was an error:", err);
  } else {
    console.log("Connected to database");
  }
});

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Thank you for joining team7 api");
});

app.get("/api/search", (req, res) => {
  const IATA_CODE = req.query.IATA_CODE;
  if (!IATA_CODE) {
    res.send({
      error: "You must provide a search term",
    });
  }
  const sqlSearch = `SELECT * FROM user1_favorites WHERE IATA_CODE LIKE '${IATA_CODE}' limit 10;`;
  db.query(sqlSearch, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ error: "There was an error" });
    }
    res.send({
      result,
    });
  });
});

app.get("/api/insert", (request, response) => {
  const IATA_CODE = request.query.IATA_CODE;
  const airport_name = request.query.airport_name;
  const visited = request.query.visited;

  const sqlInsert = ` INSERT INTO user1_favorites VALUES ('${IATA_CODE}', '${airport_name}', '${visited}');`;
  db.query(sqlInsert, (error, result) => {
    console.log("result==>", result);
    response.send(result);
  });
});

app.get("/api/delete", (request, response) => {
  const IATA_CODE = request.query.IATA_CODE;

  const sqlDelete = `DELETE FROM user1_favorites WHERE IATA_CODE = '${IATA_CODE}';`;
  db.query(sqlDelete, (error, result) => {
    console.log("result==>", result);
    response.send(result);
  });
});
app.get("/api/update", (request, response) => {
  const IATA_CODE = request.query.IATA_CODE;
  const visited = request.query.visited;
  let vis = visited;

  const sqlUpdate = `UPDATE user1_favorites SET visited = '${vis}' WHERE IATA_CODE = '${IATA_CODE}';`;
  db.query(sqlUpdate, (error, result) => {
    console.log("result==>", result);
    response.send(result);
  });
});

app.get("/api/advanced1", (request, response) => {
  const sqlQuery = `SELECT DESTINATION_AIRPORT, AVG(AIR_TIME)
FROM flights f1
WHERE DISTANCE >= ANY(SELECT AVG(DISTANCE) 
                  FROM flights f2
                      WHERE f1.FLIGHT_NUMBER = f2.FLIGHT_NUMBER
                  GROUP BY(AIRLINE))
GROUP BY DESTINATION_AIRPORT
ORDER BY DESTINATION_AIRPORT DESC;`;
  db.query(sqlQuery, (error, result) => {
    console.log(error);

    response.send(result);
  });
});
app.get("/api/advanced2", (request, response) => {
  const sqlQuery = ` Select TAIL_NUMBER as aircraft , Count(TAIL_NUMBER) as 'count'
    FROM flights
    where MONTH = 1
    Group by TAIL_NUMBER

    UNION

    Select TAIL_NUMBER as aircraft, Count(TAIL_NUMBER) as 'count'
    FROM flights
    where MONTH = 12
    Group by TAIL_NUMBER;`;
  db.query(sqlQuery, (error, result) => {
    response.send(result);
  });
});
app.get("/api/insertUsers", (request, response) => {
  const username = request.query.username;
  const sqlQuery = `INSERT INTO users VALUES ('${username}');`;
  db.query(sqlQuery, (error, result) => {
    response.send(result);
  });
});

// POST route
app.post("/", (req, res) => {
  const { name } = req.body;
  res.send(`Hello ${name}!`);
});

app.get("/api/sign_in", (req, res) => {
  const { username } = req.query;

  const sqlInsertQuery = `INSERT INTO users (username) VALUES ('${username}');`;
  db.query(sqlInsertQuery, (error, result) => {
    if (error) {
      console.log("error ==>", error);
      res.send({ error: "There was an error" });
    }
    res.send(result);
  });
});

app.get("/api/all_users", (req, res) => {
  const sqlInsertQuery = `SELECT * FROM user_log;`;
  db.query(sqlInsertQuery, (error, result) => {
    if (error) {
      console.log("error ==>", error);
      res.send({ error: "There was an error" });
    }
    console.log("result==>", result);
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

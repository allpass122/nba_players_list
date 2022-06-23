const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const config = require("./mysqlLoginConfig");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// app.use("/api/", guessRoute);
app.use(bodyParser.text({ type: "*/*" }));
const port = 9999;

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});

const connection = mysql.createConnection(config);

connection.connect();

// connection.end()

app.get("/nba_players", (req, res) => {
  console.log(`GET!!`);
  console.log(req.query);

  if (req.query.team === "ALL") {
    var sql = `SELECT * FROM players`;
    if (req.query.name !== undefined && req.query.name.trim() !== "") {
      sql += ` WHERE name LIKE '%${req.query.name}%'`;
    }
  }
  // search team
  else {
    var sql = `SELECT * FROM players WHERE team_acronym = '${req.query.team}'`;
    // search name
    if (req.query.name !== undefined && req.query.name.trim() !== "") {
      sql += ` AND name LIKE '%${req.query.name}%'`;
    }
  }
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

app.get("/nba_players/team_member", (req, res) => {
  console.log(`GET2!!`);
  var sql = `SELECT team_acronym, COUNT(*) as cnt FROM players GROUP BY team_acronym HAVING COUNT(*) <= 15`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});
// app.post("/nba_players", (req, res) => {
//   console.log(`POST!!`);
//   console.log(req.query);
//   console.log(req.body);
//   // var req_body = JSON.parse(req.body);
//   // console.log(req_body);
//   res.status(200).send(`get post`);
// });

// app.put("/nba_players", (req, res) => {
//   var user = JSON.parse(req.body);
//   user.age += 1;
//   res.send("return user info is " + JSON.stringify(user));
// });

// app.delete("/nba_players", (req, res) => {
//   var user = JSON.parse(req.body);
//   res.send("user is deleted : " + user.name);
// });

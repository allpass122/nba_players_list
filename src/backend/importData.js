const mysql = require("mysql");
const data = require("./players.json");
const mysqldump = require("mysqldump");
const config = require("./mysqlLoginConfig");
// console.log(config);
const connection = mysql.createConnection(config);

connection.connect();

// truncate
var sql = "TRUNCATE `players`";
connection.query(sql, function (err, result) {
  if (err) throw err;
  console.log("Table truncated");
});

// insert data
for (var i = 0; i < data.length; i++) {
  const sql = `INSERT INTO players VALUES ("${data[i].name}",
        "${data[i].team_acronym}",
        "${data[i].team_name}",
        "${data[i].games_played}",
        "${data[i].minutes_per_game}",
        "${data[i].field_goals_attempted_per_game}",
        "${data[i].field_goals_made_per_game}",
        "${data[i].field_goal_percentage}",
        "${data[i].free_throw_percentage}",
        "${data[i].three_point_attempted_per_game}",
        "${data[i].three_point_made_per_game}",
        "${data[i].three_point_percentage}",
        "${data[i].points_per_game}",
        "${data[i].offensive_rebounds_per_game}",
        "${data[i].defensive_rebounds_per_game}",
        "${data[i].rebounds_per_game}",
        "${data[i].assists_per_game}",
        "${data[i].steals_per_game}",
        "${data[i].blocks_per_game}",
        "${data[i].turnovers_per_game}",
        "${data[i].player_efficiency_rating}"
         )`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
  });
}
console.log(`Data inserted`);
connection.end();

mysqldump({
  connection: {
    host: "localhost",
    user: "root",
    password: "mysqlpwd",
    database: "nba",
  },
  dumpToFile: "./nba.sql",
});

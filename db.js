const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "TsLvCxz2",
  database: "Company"
});

db.connect((err) => {
  if(err){
    console.log(err);
  }
  else{
    console.log("Connected");
  }
});

module.exports = db;
const mysql = require("mysql");
const dbconfiq = require("../config/db-config");

const connection = mysql.createConnection({
    host: dbconfiq.HOST,
    user: dbconfiq.USER,
    password: dbconfiq.PASSWORD,
    database: dbconfiq.DB
});


connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database: " + dbconfiq.DB);
});

module.exports = connection;
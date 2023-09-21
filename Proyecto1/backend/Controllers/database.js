const mysql = require ('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database : "SO1Proyecto1"
});


connection.connect(function (err) {
    if (err) {
      console.log(`DB not connected, ' + ${err.stack}`);
      return;
    }
      console.log('correct, DB connected.');
  });

module.exports = connection;
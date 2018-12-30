let mysql = require('mysql');
var migration = require('mysql-migrations');


let connection = mysql.createPool({
    connectionLimit : 15,
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'salon_project'
});

migration.init(connection, __dirname + '/migrations');
const mysql = require('mysql');

// set up for MySql connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'employedb'
});


// connecting to mysql db
connection.connect((err)=>{
    if(err) {
        console.log("error connecting to database: "+ err.stack);
        return;
    }
    console.log('connected to database with ID '+connection.threadId);

})

// connection.query(`
//   CREATE TABLE employees (
//     id INT(11) NOT NULL AUTO_INCREMENT,
//     firstName VARCHAR(255) NOT NULL,
//     email VARCHAR(255) NOT NULL,
//     phone VARCHAR(255) NOT NULL,
//     address VARCHAR(255) NOT NULL,
//     PRIMARY KEY (id)
//   )
// `, function (error, results, fields) {
//   if (error) throw error;
//   console.log('Table created');
// });

module.exports = connection
const mysql = require('mysql2');

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

module.exports=connection
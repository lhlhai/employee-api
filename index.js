const express = require('express')
const bodyParser = require('body-parser');
const connection = require('./connection')


const app = express();
app.use(express.static('public'));

const port = process.env.PORT || 3000;


//configure body-parser middleware to handle json data
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });
  


// api endpoints for crud operations

// create employee
app.post('/employees', (req,res) => {
    const { firstName ,email, phone,address} = req.body;


    const query = 'INSERT INTO employees (firstName, email, phone, address) VALUES (?,?,?,?)';
    connection.query(query, [firstName,email,phone,address],(err,result) =>{
        if(err){
            console.error('error creating employee: '+err.stack);
            res.status(500).json({message:'Error creating employee'});
            return;
        }
        res.status(201).json({message: 'employee created successfully',id: result.insertId});
    });
});


//list all employees with pagination and per page 20 employee
app.get('/employees', (req, res) => {
    const perPage = 20; // number of items per page
    const page = req.query.page || 1; // current page number
    const offset = (page - 1) * perPage; // offset for SQL query
  
    // SQL query to retrieve employees for the current page
    const query = 'SELECT * FROM employees LIMIT ?, ?';
  
    // Execute the query with the offset and limit values
    connection.query(query, [offset, perPage], (err, results) => {
      if (err) {
        console.error('Error listing employees: ' + err.stack);
        res.status(500).json({ message: 'Error listing employees' });
        return;
      }
  
      // Count the total number of employees in the database
      const countQuery = 'SELECT COUNT(*) as count FROM employees';
      connection.query(countQuery, (err, countResult) => {
        if (err) {
          console.error('Error counting employees: ' + err.stack);
          res.status(500).json({ message: 'Error listing employees' });
          return;
        }
  
        const count = countResult[0].count;
        const totalPages = Math.ceil(count / perPage); // Calculate the total number of pages
  
        // Send the response as a JSON object with the current page, total pages, and employee data
        res.status(200).json({
          currentPage: page,
          totalPages: totalPages,
          employees: results,
        });
      });
    });
  });
  

//get a employee
app.get('/employees/:id',(req,res)=>{
    const id = req.params.id;
    const query = "SELECT * FROM employees WHERE id = ?";

    connection.query(query, [id], (err,result) => {
        if(err){
            console.error("error getting employee:" + err.stack);
            res.status(500).json({message:"error getting employee"});
            return;
        }
        if(result.length ===0 ){
            res.status(404).json({message: 'employee not found'});
            return;
        }
        res.status(200).json({employee: result[0]});
    })
})



//update a employee
app.put('/employees/:id', (req,res) =>{
    const { firstName ,email, phone,address} = req.body;
    const id = req.params.id;
    const query = 'UPDATE employees SET firstName = ?, email=?, phone=?, address=? WHERE id = ?';

    connection.query(query,[firstName,email,phone,address,id], (err,result) =>{
        if(err){
            console.error("error updating employee: "+ err.stack);
            res.status(500).json({message:'error updating employee'});
            return;
        }
        if(result.affectedRows === 0){
            res.status(404).json({message: "employee not found"});
            return;
        }
        res.status(200).json({message: 'employee updated successfully'});
    });
})



//delete a employee
app.delete('/employees/:id', (req,res) => {
    const id = req.params.id;
    const query = 'DELETE FROM employees WHERE id = ?';

    connection.query(query, [id], (err,result) => {
        if(err){
            console.error("error deleting employee: "+err.stack);
            res.status(500).json({message: "error deleting employee"});
            return;
        }
        if(result.affectedRows === 0){
            res.status(404).json({msesage: 'employee not found'});
            return;
        }

        res.status(200).json({message: 'employee deleted successfuly'});
    });
});




//start server
app.listen(port, ()=> {
    console.log(`server is listening on port ${port}`);
});
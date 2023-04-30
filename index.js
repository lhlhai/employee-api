const express = require("express");
const bodyParser = require("body-parser");

const employeeController = require("./controllers/employees.controller");

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

const port = process.env.PORT || 3000;

//configure body-parser middleware to handle json data
app.use(bodyParser.json());

// api endpoints for crud operations

// create employee
app.post("/employees", employeeController.postEmployee);

//list all employees with pagination and per page 20 employee
app.get("/employees", employeeController.getEmployees);

//get a employee
app.get("/employees/:id", employeeController.getEmployee);

//update a employee
app.put("/employees/:id", employeeController.putEmployee);
  

//delete a employee
app.delete("/employees/:id", employeeController.dltEmployee);



//start server
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

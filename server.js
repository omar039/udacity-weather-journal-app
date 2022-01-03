// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Require body-parser to parse data entered by user 
const bodyParser = require('body-parser');

const cors = require("cors");

// Start up an instance of app
const app = express();
app.use(cors());
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server


// GET Route
app.get('/all', (req, res) => {
    res.status(200).send(projectData);
})

//post route
app.post('/add', (req, res)=>{
    projectData = req.body;
    //console.log(projectData);
})




const server = app.listen(5000);
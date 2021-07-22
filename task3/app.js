// import package
const express = require('express');
// execute it
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

// middleware
/*app.use('/contact', () => {
    console.log('This is a middleware');
});*/
app.use(bodyParser.json());

// create routes
app.get('/', (req,res) => {
    res.send('home!!');
});




// import routes
const employeesRoute = require('./routes/employees');
app.use('/employees', employeesRoute);

const projectsRoute = require('./routes/projects');
app.use('/projects', projectsRoute);

// conexiune bd
mongoose.connect(
    process.env.DB_CON,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Conectat!!')
);

// listen to the server
app.listen(3000);
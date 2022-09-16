// Dependencies 
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const db = mongoose.connection
const methodOverride = require("method-override")
const coffeeController = require('./controllers/coffee');
const Coffee= require('./models/coffee')
// connect to database via heroku/locally
const DATABASE_URL = process.env.DATABASE_URL;

// Database Connnection 
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Database Connection Error/Success
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));


// Middleware / gives access to req.body
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))
app.use(express.static('public'))
app.use('/coffee', coffeeController); 

app.get('/', (req, res) => {
        Coffee.find({}, (error, allCoffee) => {
          res.render('index.ejs', {
            coffee: allCoffee,
          });  
        });  
    });
// Listener 
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`serever islistening on port`, process.env.PORT));
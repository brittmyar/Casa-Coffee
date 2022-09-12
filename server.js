// Dependencies 
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

// Database Connnection 
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Database Connection Error/Success
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));


// Middleware / gives access to req.body
app.use(express.urlencoded({ extended: true}));


// Routes

// Create
app.post('/casa-coffee', (req, res) => {
    res.send('received');
});

app.post('/casa-coffee', (req, res) => {
    res.send(req.body);
});




























// Listener 
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`serever islistening on port: ${PORT}`));
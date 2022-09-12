// Dependencies 
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const Coffee = require('./models/coffee.js');
const methodOverride = require("method-override")


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
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))

/////////////
// Routes
////////////

// Index
app.get('/coffee', (req, res) => {
    Coffee.find({}, (error, allCoffee) => {
      res.render('index.ejs', {
        coffee: allCoffee,
      });  
    });  
});

// New
app.get('/coffee/new', (req, res) => {
    Coffee.find({}, (error, allCoffee) => {
        res.render('index.ejs', {
            coffee: allCoffee,
        });
    });
});

// Delete
app.delete("/coffee/:id", (req, res) => {
    Book.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect("/coffee")
    })
  })

// Update
app.put("/coffee/:id", (req, res) => {
    Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
      (error, updatedCoffee) => {
        res.redirect(`/coffee/${req.params.id}`)
      }
    )
  })


// Create
app.post('/coffee', (req, res) => {
    Coffee.create(req.body, (error, createdCoffee) => {
        res.send(createdCoffee);
    });
});

// Edit
app.get("/coffee/:id/edit", (req, res) => {
    Coffee.findById(req.params.id, (error, foundCoffee) => {
      res.render("edit.ejs", {
        coffee: foundCoffee,
      });
    });
  });

// Show
app.get('/coffee/:id', (req, res) => {
	Coffee.findById(req.params.id, (err, foundCoffee) => {
		res.render('show.ejs', {
            coffee: foundCoffee,
        });
	});
});


// Listener 
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`serever islistening on port: ${PORT}`));
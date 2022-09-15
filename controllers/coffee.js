
const express = require('express');
const coffeeRouter = express.Router();
const Coffee = require('../models/coffee');
/////////////
// Routes
////////////

// Index
coffeeRouter.get('/', (req, res) => {
    Coffee.find({}, (error, allCoffee) => {
      res.render('index.ejs', {
        coffee: allCoffee,
      });  
    });  
});

// New
// coffeeRouter.get('/new', (req, res) => {
//     Coffee.find({}, (error, allCoffee) => {
//         res.render('new.ejs', {
//             coffee: allCoffee,
//         });
//     });
// });
coffeeRouter.get("/new", (req, res) => {
    res.render("new.ejs")
})

// Delete
coffeeRouter.delete("/:id", (req, res) => {
    Coffee.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect("/coffee")
    })
  })

// Update
coffeeRouter.put("/:id", (req, res) => {
    Coffee.findByIdAndUpdate(
      req.params.id,
      req.body, {
        new: true,
      },
      (error, updatedCoffee) => {
        res.redirect(`/coffee/${req.params.id}`)
      }); 
  })


// Create
coffeeRouter.post('/', (req, res) => {
    Coffee.create(req.body, (error, createdCoffee) => {
        res.redirect('/coffee');
    });
});

// Edit
coffeeRouter.get("/:id/edit", (req, res) => {
    Coffee.findById(req.params.id, (error, foundCoffee) => {
      res.render("edit.ejs", {
        coffee: foundCoffee,
      });
    });
  });

// Show
coffeeRouter.get('/:id', (req, res) => {
	Coffee.findById(req.params.id, (err, foundCoffee) => {
		res.render('show.ejs', {
            coffee: foundCoffee,
        });
	});
});





module.exports = coffeeRouter;
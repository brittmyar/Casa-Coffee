const mongoose = require('mongoose');

const coffeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: String, required: false },
    instructions: { type: String, required : false},
    img: {type: String, required: false}

});

const Coffee = mongoose.model('Coffee', coffeeSchema);




module.exports = Coffee;
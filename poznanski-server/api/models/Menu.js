const mongoose = require('mongoose');
const { Schema } = mongoose;

const menuSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
    },
    image: String, 
    category: String,
    price: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    deviceDescription: String,
});


const Menu = mongoose.model('menu', menuSchema);

module.exports = Menu;
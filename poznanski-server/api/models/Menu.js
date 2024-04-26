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
    deviceDescription: {
        type: String,
        trim: true,
        required: true,
        minlength: 3,
    }
});


const Menu = mongoose.model('menus', menuSchema);

module.exports = Menu;
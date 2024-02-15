const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    discountPercentage: {
        type: Number,
        require: false,
        default: 0
    },
    rating: {
        type: Number,
        require: true,
        min: 0,
        max: 5,
        default: 0
    },
    stock: {
        type: Number,
        require: true
    },
    brand: {
        type: String,
        require: false
    },
    category: {
        type: String,
        require: true
    },
    thumbnail: {
        type: String,
        require: false
    },
    images: {
        type: Array,
        require: false,
        default: []
    }
})

const productsModel = mongoose.model("products", productsSchema);

module.exports = productsModel;
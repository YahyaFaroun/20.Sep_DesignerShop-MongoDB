const mongoose = require('mongoose');
const Schema = mongoose.Schema

const itemSchema = new Schema({
    Product_Name: {
        type: String,
        required: true
    },
    Company: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Product_Picture_Link: {
        type: String,
        required: true
    },
    Link_Shop: {
        type: String,
        required: true
    }
}, { timestamps: true, collection: 'designerShopItems' })

//Model erstellen
const productItems = mongoose.model('designerShopItems', itemSchema)

//Modell exportieren
module.exports = productItems
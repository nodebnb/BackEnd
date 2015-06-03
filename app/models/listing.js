let mongoose = require('mongoose')

let listingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    //id on airbnb
    bnbId:{
        type: String,
        required: true
    },
    price: Number,
    lat: Number,
    lng: Number,
    url: String,
    image: String
})
module.exports = mongoose.model('Listing', listingSchema)

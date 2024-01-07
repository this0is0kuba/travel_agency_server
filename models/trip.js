const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TripSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },

    targetCountry: {
        type: String,
        required: true
    },

    startDate: {
        type: String,
        required: true
    },

    endDate: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    amountOfFreePlaces: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    imgSrc: {
        type: String,
        required: true
    },

    allMiniImgSrc: {
        type: [String],
        required: false
    },

    allLargeImgSrc: {
        type: [String],
        required: false
    }

});

Trip = mongoose.model("Trip", TripSchema);
module.exports = Trip;
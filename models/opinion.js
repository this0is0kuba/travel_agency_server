const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OpinionSchema = new Schema({

    tripId: {
        type: String,
        require: true
    },

    userName: {
        type: String,
        require: true
    },

    title: {
        type: String,
        require: true
    },

    contents: {
        type: String,
        require: true
    }, 

    stars: {
        type: Number,
        require: true
    }

});

Opinion = mongoose.model("Opinion", OpinionSchema);
module.exports = Opinion;
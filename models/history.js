const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = new Schema({

    tripId: {
        type: String,
        require: true
    },

    userId: {
        type: String,
        require: true
    }, 

    amount: {
        type: Number,
        require: true
    }

});

History = mongoose.model("History", HistorySchema);
module.exports = History;
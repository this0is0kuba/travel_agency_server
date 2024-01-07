const fs = require('fs');
const Trip = require('../models/trip');

const initialDataJSON = fs.readFileSync('./mongoDB/initialData.json');
const initialData = JSON.parse(initialDataJSON);

const tripArray = [];

initialData.trips.forEach(element => {
    tripArray.push(Trip(element));
});

module.exports = tripArray;
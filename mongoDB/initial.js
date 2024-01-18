const fs = require('fs');
const Trip = require('../models/trip');
const User = require('../models/user')

const initialTripsJSON = fs.readFileSync('./mongoDB/initialData/initialTrips.json');
const initialTrips = JSON.parse(initialTripsJSON);

const initialUsersJSON = fs.readFileSync("./mongoDB/initialData/initialUsers.json");
const initialUsers = JSON.parse(initialUsersJSON);

const tripArray = [];
initialTrips.trips.forEach(element => {
    tripArray.push(Trip(element));
});

const userArray = [];
initialUsers.users.forEach(element => {
    userArray.push(User(element))
});

module.exports = {
    tripArray,
    userArray
};
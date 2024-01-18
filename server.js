const express = require("express");

const cors = require("cors");
const morgan = require("morgan");

const mongoose = require("mongoose");
const dbURL = "mongodb+srv://kuba123:MongoDB123@cluster0.incxjf6.mongodb.net/travel-agency";

const tripsArray = require("./mongoDB/initial").tripArray;
const userArray = require("./mongoDB/initial").userArray;

const Opinion = require("./models/opinion");
const Trip = require("./models/trip");
const User = require("./models/user");
const History = require("./models/history");

const tripRoutes = require("./routes/TripRoutes")
const userRoutes = require("./routes/UserRoutes")
const opinionsRoutes = require("./routes/OpinionRoutes")
const historyRoutes = require("./routes/HistoryRoutes");

const app = express();

mongoose.connect(dbURL)
    .then( 
        async (result) =>  {

            console.log("connected to DB");

            await Trip.deleteMany();
            await User.deleteMany();
            await Opinion.deleteMany();
            await History.deleteMany();

            tripsArray.forEach( element => {
                element.save();
            })

            userArray.forEach( element => {
                element.save();
            })

            app.listen(3000);
        }
    )
    .catch( 
        (error) => console.log(error)
    )


app.use(cors({
    origin: "http://localhost:4200"
}));

// middleware

app.use(express.static('public'));

// app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));

// endpoints

app.use(tripRoutes);
app.use(userRoutes);
app.use(opinionsRoutes);
app.use(historyRoutes);

// middleware

app.use((req, res) => {
    res.status(404).json();
});
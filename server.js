const express = require("express");

const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");

const mongoose = require("mongoose");
const dbURL = "mongodb+srv://kuba123:MongoDB123@cluster0.incxjf6.mongodb.net/travel-agency";
const Trip = require("./models/trip");
const tripsArray = require("./mongoDB/initial");

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, callback) {

        if(file.fieldname.includes('mini'))
            callback(null, __dirname + "/public/img/allMiniSrc");

        else if(file.fieldname.includes('large'))
            callback(null, __dirname + "/public/img/allLargeSrc");

        else
            callback(null, __dirname + "/public/img/src");
    },
    filename: function(req, file, callback) {

        const fileName = file.originalname;
        callback(null, fileName);
    }
})
const upload = multer({
    storage: storage,
    limits: {fileSize: 1_000_000}
})

mongoose.connect(dbURL)
    .then( 
        async (result) =>  {

            console.log("connected to DB");

            await Trip.deleteMany();
            tripsArray.forEach( element => {
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

app.get('/trips', (req, res) => {

    Trip.find()
        .then( (result) => 
            res.json(result)
        )
        .catch( (error) =>
            console.log(error)
        )
});

app.get('/trips/:tripId', (req, res) => {

    console.log(req.params.tripId);

    Trip.findById(req.params.tripId)
        .then( (result) => 
            res.json(result)
        )
        .catch( (error) => 
            console.log(error)
        )
});

app.post('/trips', upload.any(), (req, res) => {

    const trip = Trip(req.body);
    const destination = "http://localhost:3000/img/";

    trip.allMiniImgSrc = [];
    trip.allLargeImgSrc = [];

    for(file of req.files) {

        if(file.fieldname.includes("mini"))
            trip.allMiniImgSrc.push(destination + "allMiniSrc/" + file.originalname);

        else if(file.fieldname.includes("large"))
            trip.allLargeImgSrc.push(destination + "allLargeSrc/" + file.originalname);

        else
            trip.imgSrc = destination + "src/" + file.originalname;
    }

    trip.save()
        .then( response => 
            res.json(trip)
        )
        .catch( err => {

            console.log(err)
            res.json(trip);
        })
});

app.delete('/trips/:tripId', (req, res) => {

    const id = req.params.tripId;

    Trip.findByIdAndDelete(id)
        .then( result => {
            res.json(result);
        })
        .catch( error => {
            console.log(error);
            res.status(409).json();
        })
});

// middleware

app.use((req, res) => {
    res.status(404).json();
});
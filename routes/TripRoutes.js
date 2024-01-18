const express = require("express")
const Trip = require("../models/trip");

const multer = require("multer");
const { requireAdminRole } = require("../middleware/authMiddleware");
const { requireAuth } = require("../middleware/authMiddleware");

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const storage = multer.diskStorage({
    destination: function (req, file, callback) {

        if(file.fieldname.includes('mini'))
            callback(null, __dirname + "/../public/img/allMiniSrc");

        else if(file.fieldname.includes('large'))
            callback(null, __dirname + "/../public/img/allLargeSrc");

        else
            callback(null, __dirname + "/../public/img/src");
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

const router = express.Router()

router.get('/trips', (req, res) => {

    Trip.find()
        .then( (result) => 
            res.json(result)
        )
        .catch( (error) =>
            console.log(error)
        )
});

router.get('/trips/:tripId', requireAuth, (req, res) => {

    Trip.findById(req.params.tripId)
        .then( (result) => 
            res.json(result)
        )
        .catch( (error) => 
            console.log(error)
        )
});

router.post('/trips', requireAdminRole, upload.any(), (req, res) => {

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

router.delete('/trips/:tripId', requireAdminRole, (req, res) => {

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

router.put('/trips/:tripId', requireAuth, jsonParser, async (req, res) => {

    const id = req.params.tripId;

    const updatedTrip = await Trip.findOneAndUpdate({_id: id}, {amountOfFreePlaces: req.body.amountOfFreePlaces}, {new: true})

    res.json(updatedTrip);
})

module.exports = router;
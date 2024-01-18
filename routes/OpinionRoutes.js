const express = require("express")
const Opinion = require("../models/opinion");

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.get('/opinions/:tripId', requireAuth, async (req, res) => {

    const allOpinions =  await Opinion.find({tripId: req.params.tripId});

    res.json(allOpinions);
})

router.post('/opinions', requireAuth, jsonParser, async (req, res) => {

    const opinion = Opinion(req.body);

    try {
        await opinion.save()
        res.json(opinion);
    }
    catch(err) {

        console.log(err);
        res.status(400).json();
    }
})

module.exports = router;
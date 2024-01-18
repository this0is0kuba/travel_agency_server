const express = require("express")
const History = require("../models/history");

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();

router.get('/history/:userId', requireAuth, async (req, res) => {

    const wholeHistory =  await History.find({userId: req.params.userId});
    res.json(wholeHistory);
})

router.post('/history', requireAuth, jsonParser, async (req, res) => {

    const history = History(req.body);

    try {
        await history.save()
        res.json(history);
    }
    catch(err) {

        console.log(err);
        res.status(400).json();
    }
})

module.exports = router;
const express = require("express")
const User = require("../models/user");

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const jwt = require('jsonwebtoken');

const createToken = require("../controllers/authController");

const router = express.Router();


// verify token and sent decoded Token, add authorization Req 
router.get('/users/checkToken', (req, res) => {

    const token = req.headers.authorization

    if(token) {
        jwt.verify(token, 'travel_agency_key', async (err, decodedToken) => {

            if(err)
                res.status(401).json();

            else {
                User.findById(decodedToken.id)
                    .then( (user) => {
                        
                        if(user == null)
                            res.status(401).json();
                        else 
                            res.json({token, user});
                    })
                    .catch( (err) => {
                        console.log(err)
                        res.status(401).json();
                    })
            }
        })
    }
    else {
        res.status(401).json();
    }
})

router.post('/users', jsonParser, async (req, res) => {

    try {

        const user = User({...req.body, role: ["user"]});
        await user.save();

        const token = createToken(user._id);

        userAuthentication = {
            token,
            user
        }

        res.json(userAuthentication);
        
    }
    catch(err) {
        console.log(err);
        res.status(400).json("User alread exists");
    }
})

router.post('/users/login', jsonParser, async (req, res) => {

    const {email, password} = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user)

        userAuthentication = {
            token,
            user
        }

        res.json(userAuthentication);

    }
    catch(error) {
        res.status(400).json({message: error.message});
    }
})

module.exports = router;
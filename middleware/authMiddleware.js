const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
    
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, 'travel_agency_key', (err, decodedToken) => {

            if(err)
                res.status(401).json();

            else
                next();
        })
    }
    else {
        res.status(401).json();
    }

}

const requireAdminRole = (req, res, next) => {
    
    const token = req.headers.authorization;
    
    if(token) {
        jwt.verify(token, 'travel_agency_key', (err, decodedToken) => {

            if(err)
                res.status(401).json();

            else {

                if(decodedToken.role.includes("admin"))
                    next()
                else
                    res.status(403).json();
            }
        })
    }
    else {
        res.status(401).json();
    }

}

module.exports = {
    requireAuth,
    requireAdminRole
};
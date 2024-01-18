const jwt = require("jsonwebtoken")

const maxAge = 60 * 60;

const createToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, 'travel_agency_key', {expiresIn: maxAge })
}

module.exports = createToken;
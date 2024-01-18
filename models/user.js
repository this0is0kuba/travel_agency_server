const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require("bcrypt")

const UserSchema = new Schema({

    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    dateOfBirth: {
        type: String,
        required: true
    }, 

    role: {
        type: [String],
        required: true
    }
});

UserSchema.pre('save', function(next) {
    const salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
    next()
})

UserSchema.statics.login = async function(email, password) {

    const user = await this.findOne(({email}));

    if(user) {

        const auth = await bcrypt.compare(password, user.password);

        if(auth)
            return user;

        throw Error('incorrect password');
    }

    throw Error('incorrect email');
}

User = mongoose.model("User", UserSchema);
module.exports = User;
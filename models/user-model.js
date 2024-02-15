const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

userSchema.pre("save", async function() {
    console.log(this)
    const user = this;
    if (!user.isModified("password")) {
        next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, salt);
        user.password = hash_password;
    } catch (err) {
        next(err);
    }
})


// create methods inside schema for jwt auth
userSchema.methods.generateToken = async function() {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: "30d" //optional 
        })
    } catch (err) {
        console.log({ err })
    }
}

const usersModel = mongoose.model("Users", userSchema);

module.exports = usersModel;

// authentication/authorization
// JWT- are often used for authentication and authorization in web apps
// 1:authentication = Verifyng the identity of user or client.
// 2:authorization = Determining what actions a user or client is allowed to perform.

// components of jwt
//Header: Contains metadata about the tokens,suchy as type of th4e token and signing algorithem being used.
// Payload; contains or statements about entity  means user or any additional data commonly
// id,name,expiration time etc.

// storing//jwt are typically not stored in db along with other user details. instead they are issued
// by server during authentication process and then stored onthe client-side.(cookie,storage)
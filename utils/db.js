const mongoose = require("mongoose");

const URI = process.env.URI;

const connectDb = async() => {
    try {
        await mongoose.connect(URI);
        console.log("connected to DB")
    } catch (err) {
        console.log({ err })
    }
}

module.exports = connectDb;
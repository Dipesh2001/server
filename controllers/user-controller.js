const Users = require("../models/user-model")
const bcrypt = require("bcryptjs");

exports.addUser = async(req, res) => {
    try {
        const { email } = req.body;
        const userExists = await Users.findOne({ email });
        if (userExists) {
            return res.status(400).send("Email already exists.")
        }
        // hash password (password,salt)
        // req.body.password = await bcrypt.hash(req.body.password, 10);
        // after pre method
        const users = await Users.create(req.body);
        const token = await users.generateToken()

        return res.status(201).json({ success: true, message: "User created.", data: { userDetails: { users }, token } })
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error." })
    }
}

exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await Users.findOne({ email });
        if (!userExists) {
            return res.status(400).send("No user exists.")
        }

        const user = await bcrypt.compare(password, userExists.password);

        if (user) {

            return res.status(201).json({ success: true, message: "User loggedin.", data: { userDetails: { users }, token } })
        }
        // const token = await 


    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error." })
    }
}
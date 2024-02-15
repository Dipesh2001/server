const express = require('express');
const { addUser } = require('../controllers/user-controller');

const router = express.Router();

router.route('/register').post(addUser)

module.exports = router;
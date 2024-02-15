const express = require('express');
const { getAllProducts } = require('../controllers/auth-controller');

const router = express.Router();

router.route('/getAllProducts').get(getAllProducts)

module.exports = router;
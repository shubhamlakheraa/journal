const express = require('express');

const router = express.Router();

const createuser = require('../controllers/createuser')

router.route('/').post(createuser)

module.exports = router;
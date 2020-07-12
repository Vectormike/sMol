const express = require('express');
const auth = require('../../middlewares/auth');
const geolocationController = require('../../controllers/geolocation.controller');

const router = express.Router();

router.post('/', auth('user'), geolocationController.getUserLocationInformation);

module.exports = router;

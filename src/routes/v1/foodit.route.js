const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const fooditController = require('../../controllers/foodit.controller');

const router = express.Router();

router.get('/', fooditController.getFoods);
router.post('/', auth('vendor'), fooditController.createFood);

module.exports = router;

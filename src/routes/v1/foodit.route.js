const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const fooditController = require('../../controllers/foodit.controller');

const router = express.Router();

router.route('/').get(auth(), fooditController.getFoods);
router.route('/').post(auth('vendor'), fooditController.createFood);
// router.route('/:id').patch(auth('vendor'), fooditController.updateFood);
router.route('/:id').delete(auth('vendor'), fooditController.deleteFood);

module.exports = router;

const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const fooditController = require('../../controllers/foodit.controller');

const router = express.Router();

router.route('/').get(auth(), fooditController.getFoods);
router.route('/').post(auth('vendor'), fooditController.createFood);
router.route('/:fooditId').post(auth('vendor'), fooditController.addFoodItem);
router.route('/:id').patch(auth('vendor'), fooditController.updateFood);
router.route('/:fooditId/:itemId').put(auth('vendor'), fooditController.updateFoodItems);
router.route('/:id').delete(auth('vendor'), fooditController.deleteFood);
router.route('/:fooditId/:itemId').delete(auth('vendor'), fooditController.deleteFoodItem);

module.exports = router;

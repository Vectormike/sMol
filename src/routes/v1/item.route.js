const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const itemController = require('../../controllers/item.controller');

const router = express.Router();

router.route('/:id').get(auth(), itemController.getItemService);
router.route('/').get(auth(), itemController.getAllItemsService);
router.route('/').post(auth('vendor'), itemController.createItem);
router.route('/:id').patch(auth('vendor'), itemController.updateItem);
// router.route('/:id').delete(auth('vendor'), fooditController.deleteFood);

module.exports = router;

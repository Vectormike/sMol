const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const beautyzoneController = require('../../controllers/beautyzone.controller');

const router = express.Router();

router.route('/').get(auth(), beautyzoneController.getBeautyZone);
router.route('/').post(auth('vendor'), beautyzoneController.createBeautyZone);
// router.route('/').patch(auth('vendor'), fooditController.updateFood);
router.route('/').delete(auth('vendor'), beautyzoneController.deleteBeautyZone);

module.exports = router;

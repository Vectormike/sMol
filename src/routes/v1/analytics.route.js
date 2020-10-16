const express = require('express');
const auth = require('../../middlewares/auth');
const { analyticsController } = require('../../controllers/index');

const router = express.Router();

router.route('/').get(auth('vendor'), analyticsController.analytics);
// router.route('/productCount').get(auth('vendor'), analyticsController.getVendorProductsCount);
// router.route('/orderCount').get(auth('vendor'), analyticsController.getVendorOrdersCount);
// router.route('/newOrderCount').get(auth('vendor'), analyticsController.getNewVendorOrdersCount);
// router.route('/acceptedOrderCount').get(auth('vendor'), analyticsController.getAcceptedVendorOrdersCount);
// router.route('/').post(auth('vendor'), beautyzoneController.createBeautyZone);
// router.route('/:id').patch(auth('vendor'), beautyzoneController.updateBeautyZone);
// router.route('/:id').delete(auth('vendor'), beautyzoneController.deleteBeautyZone);

module.exports = router;

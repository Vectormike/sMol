const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const homeserviceController = require('../../controllers/homeservice.controller');

const router = express.Router();

router.route('/').get(auth(), homeserviceController.getHomeService);
router.route('/').post(auth('vendor'), homeserviceController.createHomeService);
router.route('/:id').patch(auth('vendor'), homeserviceController.updateHomeService);
router.route('/:id').delete(auth('vendor'), homeserviceController.deleteHomeService);

module.exports = router;

const express = require('express');
const upload = require('../../middlewares/multer');
const uploadController = require('../../controllers/upload.controller');

const router = express.Router();

router.route('/vendor').post(upload.single('file'), uploadController.vendorImageUpload);
router.route('/item').post(upload.single('file'), uploadController.itemImageUpload);

module.exports = router;

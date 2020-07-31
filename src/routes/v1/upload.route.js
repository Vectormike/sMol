const express = require('express');
const upload = require('../../middlewares/multer');
const uploadController = require('../../controllers/upload.controller');

const router = express.Router();

router.route('/').post(upload.single('file'), uploadController.imageUpload);

module.exports = router;

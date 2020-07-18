const express = require('express');
const authRoute = require('./auth.route');
const uploadRoute = require('./upload.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const geolocationRoute = require('./geolocation.route');
const fooditRoute = require('./foodit.route');
const homeserviceRoute = require('./homeservice.route');
const beautyzoneRoute = require('./beautyzone.route');
const cardRoute = require('./card.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/image', uploadRoute);
router.use('/users', userRoute);
router.use('/docs', docsRoute);
router.use('/location', geolocationRoute);
router.use('/foodservice', fooditRoute);
router.use('/homeservice', homeserviceRoute);
router.use('/beautyzone', beautyzoneRoute);
router.use('/card', cardRoute);

module.exports = router;

const express = require('express');
const auth = require('../../middlewares/auth');
const geolocationController = require('../../controllers/geolocation.controller');

const router = express.Router();

router.post('/', auth('user'), geolocationController.getUserLocationInformation);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Geolocation
 *   description: Find the user's location information
 */

/**
 * @swagger
 * path:
 *  /location:
 *    post:
 *      summary: Input ip address
 *      tags: [Location]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - ip Address
 *              properties:
 *                ip Address:
 *                  type: string
 *              example:
 *                ip Address: Joe
 *      responses:
 *        "200":
 *          description: Accepted
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *
 */

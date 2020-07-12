const express = require('express');
const auth = require('../../middlewares/auth');
const geolocationController = require('../../controllers/geolocation.controller');

const router = express.Router();

router.post('/', auth('user'), geolocationController.getUserLocationInformation);

module.exports = router;
<<<<<<< HEAD

/**
 * @swagger
 * tags:
 *   name: Location
 *   description: Get user's location information
 */

/**
 * @swagger
 * path:
 *  /location:
 *    post:
 *      summary: Get location
 *      description: Use ip adddress to get location.
 *      tags: [Location]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - ip
 *              properties:
 *                ip:
 *                  type: string
 *              example:
 *                ip:  105.112.177.110
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/IpAddress'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */
=======
>>>>>>> e4b681195a7a55745d6649fb2b684d9da92845ab

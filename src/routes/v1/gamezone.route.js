const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const gamezoneController = require('../../controllers/gamezone.controller');

const router = express.Router();

router.route('/').get(auth(), gamezoneController.getGameZone);
router.route('/').post(auth('vendor'), gamezoneController.createGameZone);
router.route('/:id').patch(auth('vendor'), gamezoneController.updateGameZone);
router.route('/:id').delete(auth('vendor'), gamezoneController.deleteGameZone);

module.exports = router;

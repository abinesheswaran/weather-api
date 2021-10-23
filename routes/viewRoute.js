const express = require('express');
const viewController = require('../controllers/viewController');

const router = express.Router();

router.get('/',viewController.getOverview)

router.get('/getAll',viewController.getAll)

module.exports = router;
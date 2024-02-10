const express = require('express');
const router = express.Router();
const activityController  = require('../controllers/activityController')




router.post('/activity',activityController.updateActivity)

module.exports = router;
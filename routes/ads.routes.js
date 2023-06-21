const express = require('express');
const router = express.Router();
const adsController = require('../controllers/ads.controller');

router.get('/ads', adsController.getAll)

module.exports = router
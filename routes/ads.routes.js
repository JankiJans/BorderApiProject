const express = require('express');
const router = express.Router();
const adsController = require('../controllers/ads.controller');

router.get('/ads', adsController.getAll);
router.get('/ads/:id', adsController.getById);
router.post('/ads/', adsController.post);
router.put('/ads/:id', adsController.update);
router.delete('/ads/:id', adsController.delete);
router.search('/ads/search/:searchPhrase', adsController.search);

module.exports = router
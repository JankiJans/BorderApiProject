const express = require('express');
const router = express.Router();
const adsController = require('../controllers/ads.controller');
const authMiddleware = require('../utils/authMiddleware')
const imageUpload = require('../utils/imageUpload')

router.get('/ads', adsController.getAll);
router.get('/ads/:id', adsController.getById);
router.post('/ads',  imageUpload.single('image'), adsController.post);
router.put('/ads/:id', adsController.update);
router.delete('/ads/:id', authMiddleware, imageUpload.single('image'), adsController.delete);
router.search('/ads/search/:searchPhrase', adsController.search);

module.exports = router
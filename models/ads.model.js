const mongoose = require('mongoose');

const adsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true},
    photo: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    sellerInfo: { type: String, required: true },
});

module.exports = mongoose.model('Ads', adsSchema);
const Ads = require('../models/ads.model');

exports.getAll = async (req, res) => {
  try {
    const ads = await Ads.find();
    console.log(ads);
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: err });
  }
};
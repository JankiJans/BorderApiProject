const Ads = require('../models/ads.model');
const fs = require('fs');

exports.getAll = async (req, res) => {
  try {
    const ads = await Ads.find();
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const ad = await Ads.findById(req.params.id);
    if (!ad) res.status(404).json({ message: 'Not found' });
    else res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.post = async (req, res) => {
  try {
    const { title, description, date, photo, location, sellerInfo } = req.body;

    const deleteFileInCaseOfError = req.file ? path.join(__dirname, '../public/uploads/img/', req.file.filename) : '';

    const newAd = new Concert({
      title: title,
      description: description,
      date: date,
      photo: photo,
      location: location,
      sellerInfo: sellerInfo,
    });

    if (title.length < 10 || title.length > 50) {
      fs.unlinkSync(deleteFileInCaseOfError);
      return res.status(400).send({ message: 'Title length should be between 10 and 50 characters' });
    }

    if (description.length < 20 || description.length > 1000) {
      fs.unlinkSync(deleteFileInCaseOfError);
      return res.status(400).send({ message: 'Description length should be between 20 and 1000 characters' });
    }

    await newAd.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.update = async (req, res) => {
  const { title, description, date, photo, location, sellerInfo } = req.body;

  try {
    const ad = await Ads.findById(req.params.id);
    if (ad) {
      await Ads.updateOne({ _id: req.params.id }, { $set: { title, description, date, photo, location, sellerInfo } });
      res.json({ message: 'Document edited', con });
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    fs.unlinkSync(deleteFileInCaseOfError);
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const ad = await Ads.findById(req.params.id);
    if (ad) {
      await Ads.deleteOne({ _id: req.params.id });
      res.json({ message: 'Deleted', ad });
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.search = async (req, res) => {
  try {
    const { searchPhrase } = req.params;
    const ads = await Ads.find({ $text: { $search: searchPhrase } });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const Ads = require('../models/ads.model');
const fs = require('fs');
const getImageFileType = require('../utils/getImageFileType')
const user = require('../models/user.model')

exports.getAll = async (req, res) => {
  try {
    const ads = (await Ads.find().populate('user'));
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getById = async (req, res) => {
  try {
    const ad = await Ads.findById(req.params.id).populate('user');
    if (!ad) res.status(404).json({ message: 'Not found' });
    else res.json(ad);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.post = async (req, res) => {
  try {
    const { title, description, date, location, price } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown'

    // const deleteFileInCaseOfError = req.file ? path.join(__dirname, '../public/uploads/', req.file.filename) : '';
    if (
      title &&
      description &&
      date &&
      price &&
      location &&
      req.file &&
      ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
    ) {

    console.log(req.session)

    const newAd = new Ads({
      title: title,
      description: description,
      date: date,
      price: price,
      image: req.file.filename,
      location: location,
      user: '64a6f24396e66a3e8424df0a'
      // userId: req.session.user._id
    }) 

    // if (!title || title.length < 5 || title.length > 20) {
    //   // fs.unlinkSync(deleteFileInCaseOfError);
    //   return res.status(400).send({ message: 'Title length should be between 10 and 50 characters' });
    // }

    // if (!description || description.length < 15 || description.length > 1000) {
    //   // fs.unlinkSync(deleteFileInCaseOfError);
    //   return res.status(400).send({ message: 'Description length should be between 20 and 1000 characters' });
    // }

    await newAd.save();
    res.json({ message: 'OK' });
  } else {
    res.status(400).send({ message: 'Invalid ad data' });
  }
} catch (err) {
  res.status(500).json({ message: err.message });
}
};



exports.update = async (req, res) => {
  const { title, description, location, price, date } = req.body;

  try {
    const ad = await Ads.findById(req.params.id);
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
    if (ad) {
      ad.title = title;
      ad.description = description;
      ad.price = price;
      ad.location = location;
      ad.date = date;
    } if (
      req.file &&
      ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
    ) {
      ad.image = req.file.filename;
    }

    const updatedAd = await ad.save();
    res.json(updatedAd);
  } catch (err) {
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

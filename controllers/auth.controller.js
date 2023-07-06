const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const path = require('path')
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs')

exports.register = async (req, res) => {
  try {
    const { login, password, phone } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown'

    // const deleteFilesInCaseOfError = req.file ? path.join(__dirname, '../public/uploads/img', req.file.filename) : '';

    if (login && typeof login === 'string' && password && typeof password === 'string' && phone && typeof phone === 'string' && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType) && req.file.size <= 5* 1024 * 1024) { //5mb limit dla pliku

      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        // fs.unlinkSync(deleteFilesInCaseOfError)
        return res.status(409).send({ message: 'User with this login already exists' });
      }

      const user = await User.create({ login, password: await bcrypt.hash(password, 10), phone, avatar: req.file.filename});
      res.status(201).send({ message: 'User created' + user.login });
    } else {
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { login, password, phone } = req.body;
    if (login && typeof login === 'string' && password && typeof password === 'string' && phone && typeof phone === 'string') {
      const user = await User.findOne({ login });
      if (user) {
        if (bcrypt.compareSync(password, user.password) && user.phone === phone) {
          req.session.login = user.login;
          res.status(200).send({ message: 'Login successful' });
        } else {
          res.status(400).send({ message: 'Incorrect login, password, or phone' });
        }
      } else {
        res.status(400).send({ message: 'Incorrect login, password, or phone' });
      }
    } else {
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getUser = async (req, res) => {
  res.send(req.session);
}

exports.logout = async (req, res) => {
  req.session.destroy();
  res.status(200).send({ message: 'You are logged out'});
}
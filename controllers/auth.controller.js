const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs')

exports.register = async (req, res) => {
  try {
    const { login, password } = req.body;
    const fileType = req.file ? await getImageFileType(req.file) : 'unknown'

    const deleteFilesInCaseOfError = path.join(__dirname, '../pulbic/uploads', req.file,filename)

    if (login && typeof login === 'string' && password && typeof password === 'string' && req.file && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType) && req.file.size <= 5* 1024 * 1024) { //5mb limit dla pliku

      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        fs.unlinkSync(deleteFilesInCaseOfError)
        return res.status(409).send({ message: 'User with this login already exists' });
      }

      const user = await User.create({ login, password: await bcrypt.hash(password, 10), avatar: req.file.filename});
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
    const { login, password } = req.body;
    if (login && typeof login === 'string' && password && typeof password === 'string') {
      const user = await User.findOne({ login });
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.login = user.login;
          res.status(200).send({ message: 'Login successful' });
        } else {
          res.status(400).send({ message: 'Incorrect login or password' });
        }
      } else {
        res.status(400).send({ message: 'Incorrect login or password' });
      }
    } else {
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getUser = async (req, res) => {
  res.send('im logged in');
};

exports.logout = async (req, res) => {
  req.session.destroy();
  res.status(200).send({ message: 'You are logged out' });
};

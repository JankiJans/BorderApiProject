const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const socket = require('socket.io');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

mongoose.connect('mongodb://localhost:27017/BorderApi', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', (err) => console.log('Error ' + err));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if(process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    })
  );
}

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '/public')));

app.use(session({ secret: 'abc123', 
store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/BorderApi' }), 
resave: false, saveUninitialized: false,   
cookie: {
  secure: process.env.NODE_ENV == 'production',
} 
}))

const adsRoutes = require('./routes/ads.routes');
const authRoutes = require('./routes/auth.routes');

app.use('/api', adsRoutes);
app.use('/auth', authRoutes)

const io = socket(server);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'not found' });
});

module.exports = server;
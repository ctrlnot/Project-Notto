const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      jwt = require('jsonwebtoken');

const User = require('../models/user'),
      config = require('../config/database');

// Home Page
router.get('/', (req, res, next) => {
  res.send('Home');
});

// Signup Page
router.post('/signup', (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err) {
      res.json({success: false, msg: "Registration failed..."});
    } else {
      res.json({success: true, msg: "User registered!"});
    }
  });
});

// Login page
router.post('/login', (req, res, next) => {
  const username = req.body.username,
        password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user) res.json({success: false, msg: "Invalid login!"});

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;

      if(isMatch) {
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: "JWT " + token,
          user: {
            id: user._id,
            username: user.username
          }
        });
      } else {
        res.json({success: false, msg: "Invalid login!"});
      }
    });
  });
});

// Profile Page
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  // res.send('Profile!');
  res.json({user: req.user});
});

module.exports = router;
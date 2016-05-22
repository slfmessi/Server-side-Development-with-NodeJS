var express = require('express');
var passport = require('passport');
var Users = require('../models/user');
var Verify = require('./verify');

var userRouter = express.Router();

/* GET users listing. */
userRouter.route('/')
  .get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Users.find({}, function(err, users) {
      if (err) throw err;
      res.json(users);
    });
  });

userRouter.post('/register', function(req, res) {
  Users.register(new Users({
      username: req.body.username
    }),
    req.body.password,
    function(err, user) {
      if (err) {
        return res.status(500).json({
          err: err
        });
      }
      if (req.body.admin) {
        Users.findOneAndUpdate({
          username: req.body.username
        }, {
          admin: true
        }, {
          new: true
        }, function(err, user) {
          if (err) throw err;
          console.log(user.username, user.admin);
          user.save();
        });
      }

      passport.authenticate('local')(req, res, function() {
        return res.status(200).json({
          status: 'Registration Successful!'
        });
      });
    });
});

userRouter.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }

      var token = Verify.getToken(user);
      res.status(200).json({
        status: 'Login successful!',
        success: true,
        token: token
      });
    });
  })(req, res, next);
});

userRouter.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

module.exports = userRouter;
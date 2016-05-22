var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Leadership = require('../models/promotions');

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

// Handle '/' path
leaderRouter.route('/')
  .get(function(req, res, next) {
    Leadership.find({}, function (err, leadership) {
      if (err) throw err;
      res.json(leadership);
    });
  })
  .post(function(req, res, next) {
    Leadership.create(req.body, function (err, leadership) {
      if (err) throw err;
      console.log('Promotion created!');
      var id = leadership._id;

      res.writeHead(200, {
        'Content-Type': 'text/plain'
      })
      res.end('Added the leadership with id: ' + id);
    });
  })
  .delete(function(req, res, next) {
    Leadership.remove({}, function (err, resp) {
      if (err) throw err;
      res.json(resp);
    });
  });

// Handle the '/:id' path
leaderRouter.route('/:id')
  .get(function(req, res, next) {
    Leadership.findById(req.params.id, function (err, leadership) {
      if (err) throw err;
      res.json(leadership);
    });
  })
  .put(function(req, res, next) {
    Leadership.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {
      new: true
    }, function (err, leadership) {
      if (err) throw err;
      res.json(leadership);
    });
  })
  .delete(function(req, res, next) {
    Leadership.findByIdAndRemove(req.params.id, function (err, resp) {
      res.json(resp);
    });
  });

module.exports = leaderRouter;

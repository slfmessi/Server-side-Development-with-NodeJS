var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Promotions = require('../models/promotions');
var Verify = require('./verify');

var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
  .get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Promotions.find({}, function(err, promo) {
      if (err) throw err;
      res.json(promo);
    });
  })

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  Promotions.create(req.body, function(err, promo) {
    if (err) throw err;
    console.log('Promotion created!');
    var id = promo._id;

    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end('Added the promo with id: ' + id);
  });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  Promotions.remove({}, function(err, resp) {
    if (err) throw err;
    res.json(resp);
  });
});

promoRouter.route('/:promoId')
  .get(Verify.verifyOrdinaryUser, function(req, res, next) {
    Promotions.findById(req.params.promoId, function(err, promo) {
      if (err) throw err;
      res.json(promo);
    });
  })

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  Promotions.findByIdAndUpdate(req.params.promoId, {
    $set: req.body
  }, {
    new: true
  }, function(err, promo) {
    if (err) throw err;
    res.json(promo);
  });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
  Promotions.findByIdAndRemove(req.params.promoId, function(err, resp) {
    if (err) throw err;
    res.json(resp);
  });
});

module.exports = promoRouter;
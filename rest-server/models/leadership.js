var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var leadershipSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  abbr: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  // Mongoose will name the collection in plural mode
  // Use this option to set collection name explicitly
  collection: 'leadership'
});

var Leadership = mongoose.model('Leadership', leadershipSchema);

module.exports = Leadership;
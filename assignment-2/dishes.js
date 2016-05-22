var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var commentSchema = new Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
}, {
    timestamps: true
});

// TODO: declare the schema
var dishSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  label: {
    type: String,
    // Default value: empty strig
    default: ''
  },
  price: {
    // SchemaType: currency
    type: Currency,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true
  },
  comments: [commentSchema]
}, {
  timestamps: true,
  // Mongoose will name the collection in plural mode
  // Use this option to set collection name explicitly
  collection: 'dishes'
});

var Dishes = mongoose.model('Dish', dishSchema);

module.exports = Dishes;

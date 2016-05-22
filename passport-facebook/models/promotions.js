var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Will add the Currency type to the Mongoose Schema types
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var promotionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
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
  }
}, {
  timestamps: true,
  // Mongoose will name the collection in plural mode
  // Use this option to set collection name explicitly
  collection: 'promotions'
});

var Promotions = mongoose.model('Promotion', promotionSchema);

module.exports = Promotions;
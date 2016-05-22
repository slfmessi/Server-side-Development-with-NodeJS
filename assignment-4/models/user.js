var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new Schema({
    username: String,
    password: String,
    firstname: {
      type: String,
        default: ''
    },
    lastname: {
      type: String,
        default: ''
    },
    admin:   {
        type: Boolean,
        default: false
    }
});

userSchema.methods.getName = function() {
    return (this.firstname + ' ' + this.lastname);
};

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
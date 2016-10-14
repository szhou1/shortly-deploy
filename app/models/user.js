var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var userSchema = db.Schema({
  username: 'string',
  password: 'string',
});

userSchema.methods.comparePassword = function(attemptedPassword, dbPassword, callback) {
  bcrypt.compare(attemptedPassword, dbPassword, function(err, isMatch) {
    callback(isMatch);
  });
};

userSchema.methods.hashPassword = function (password, callback) {
  // console.log('hashPassword...');
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(password, null, null).bind(this)
    .then(function(hash) {
      // console.log('hashPassword cb', hash);
      callback(hash);
    });
};

var User = db.model('user', userSchema);

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function() {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

module.exports = User;

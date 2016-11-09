var db = require('../config');
var crypto = require('crypto');

var urlSchema = db.Schema({
  url: 'string',
  baseUrl: 'string',
  code: 'string',
  title: 'string',
  visits: 'number'
});


urlSchema.methods.shortenUrl = function (uri, callback) {
  var shasum = crypto.createHash('sha1');
  shasum.update(uri);
  callback(shasum.digest('hex').slice(0, 5));
};


urlSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});
var Link = db.model('url', urlSchema);

module.exports = Link;

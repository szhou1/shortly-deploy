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

var Link = db.model('url', urlSchema);
// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
//     this.on('creating', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

module.exports = Link;

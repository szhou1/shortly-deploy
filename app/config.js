var path = require('path');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shortly');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('mongoose connected');
});


// var urlSchema = mongoose.Schema({
//   url: 'string',
//   baseUrl: 'string',
//   code: 'string',
//   title: 'string',
//   visits: 'number'
// });

module.exports = mongoose;

// userSchema.methods.comparePassword = function() {
//   bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//     callback(isMatch);
//   });
// };

// var Url = mongoose.model('url', urlSchema);

// var link = new Url ( {title: 'testing'});

// console.log(link.title);

// link.save(function(err, link) {
//   if (err) {
//     return console.error(err);
//   }
//   console.log('saving link');
// });


// var knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   },
//   useNullAsDefault: true
// });
// var db = require('bookshelf')(knex);

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('baseUrl', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// module.exports = db;

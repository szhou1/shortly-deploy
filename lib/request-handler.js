var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('../app/config');
var User = require('../app/models/user');
var Link = require('../app/models/link');

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {
  Link.find({}, function (err, docs) {
    if (err) {
      throw err;
    } 
    res.status(200).send(docs);
  });
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    return res.sendStatus(404);
  }

  Link.find({url: uri}, function (err, docs) {
    if (err) {
      throw err;
    }
    if (docs && docs.length > 0) {
      res.status(200).send(docs[0]);
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log ('Error reading URL headings', err);
          return res.sendStatus(404);
        }
        var newLink = new Link({
          url: uri,
          title: title,
          baseUrl: req.headers.origin,
          visits: 0
        });
        newLink.save(function(err, success) {
          if (err) {
            throw err;
          } 
          res.status(200).send(newLink);
        });
      });
    }
  });
};

exports.loginUser = function(req, res) {

  var username = req.body.username;
  var password = req.body.password;

  User.find({username: username}, function(err, docs) {
    if (err) {
      console.error(err);
    }
    if (!docs || docs.length < 1) {
      res.redirect('/login');
    } else {
      var user = docs[0];
      user.comparePassword(password, function(isMatch) {
        if (isMatch) {
          util.createSession(req, res, user);
        } else {
          res.redirect('/login');
        }
      });
    }
  });
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.find({username: username}, function(err, docs) {
    if (err) {
      console.error(err);
    }
    if (docs && docs.length > 0) {
      console.log('user already exists, try again');
      res.redirect('/signup');
    } else {
      var newUser = new User({username: username, password: password});
      newUser.save(function(err, success) {
        if (err) { 
          throw err; 
        } else {
          util.createSession(req, res, newUser);
        }
      });
    }
  });

};

exports.navToLink = function(req, res) {
  Link.find({code: req.params[0]}, function (err, docs) {
    if (!docs || docs.length < 1) {
      res.redirect('/');
    } else {
      var link = docs[0];
      if (!link.visits) {
        link.visits = 0;
      }
      link.visits = link.visits + 1;
      link.save();
      res.redirect(link.url);
    }
  });
};
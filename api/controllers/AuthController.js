/**
 * AuthController
 *
 * @description :: Server-side logic for managing authentication
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var Promise = require('bluebird');
var password = require('password-hash-and-salt');

 module.exports = {
  session: function(req, res) {
    console.log("Session::req.session", req.session);
    if(req.session.user) {
      console.log("session is set");
      return res.json(req.session.user);
    } else {
      console.log("redirect: session isn't set");
      res.status(400).send('No session');
    }
  },
  login: function(req, res) {
    var data = req.params.all();
    User.findOne({username: data.username})
    .populate('items')
    .populate('subscriptions')
    .populate('groups')
    .populate('tags')
    .populate('chats')
    .then(function(user) {
      if(!user) {
        res.status(400).send('That user was not found!');
      }

      password(data.password).verifyAgainst(user.password, function(error, verified) {
        if(error)
          throw new Error('Something went wrong!');
        if(!verified) {
          console.log("Don't try! We got you!");
          res.status(400).send('bad password!');
        } else {
          user.password = "";
          delete user.password;
          req.session.user = user;
          console.log("session is set: req.session", req.session);
          res.json(user);
        }
      });
    });
  },
  signup: function(req, res) {
    console.log("signup");
    var data = req.params.all();
    // console.log(data);
    var user = {};

    password(data.password).hash(function(error, hash) {
      if(error) {
        throw new Error('Something went wrong!');
      }

      // Store hash (incl. algorithm, iterations, and salt)
      user.password = hash;
      user.email = data.email;
      user.username = data.username;
      user.shopName = data.shopName;
      User.create(user)
      .exec(function(err, newUser) {
        if(err) {
          res.status(400).send('That user already exists!');
        }
        console.log("signed up user", newUser);
        newUser.password = "";
        delete newUser.password;

        req.session.newUser = newUser;
        console.log("req.session", req.session);
        res.json(newUser);
      });
    });
  },
  logout: function(req, res) {
    delete req.session.user;
    res.ok();
  }
};

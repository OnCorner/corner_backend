/**
 * AuthController
 *
 * @description :: Server-side logic for managing authentication
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Promise = require('bluebird');
var password = require('password-hash-and-salt');
var jwt = require('jsonwebtoken');

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
    .populateAll()
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
          var token = jwt.sign(user, 'corner');
          res.json({
            success: true,
            token: token,
            user: user,
          });
        }
      });
    });
  },
  signup: function(req, res) {
    console.log("signup");
    var data = req.params.all();
    var user = {};

    password(data.password).hash(function(error, hash) {
      if(error) {
        throw new Error('Something went wrong!');
      }

      // Store hash (incl. algorithm, iterations, and salt)
      user.password = hash;
      user.email = data.email;
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.username = data.username;
      User.create(user)
      .exec(function(err, newUser) {
        if(err) {
          res.status(400).send('That user already exists!');
        }
        newUser.password = "";
        delete newUser.password;

        var token = jwt.sign(newUser, 'corner');
        res.json({
          success: true,
          token: token,
          user: newUser,
        });
      });
    });
  },
  logout: function(req, res) {
    delete req.session.user;
    res.ok();
  }
};

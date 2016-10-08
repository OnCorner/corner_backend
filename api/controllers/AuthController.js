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
    var data = req.params.all();
    jwt.verify(data.token, 'corner', function(err, decoded) {
      if(decoded == undefined) {
        return CError.send(res, 'No session', {jwtError: err});
      }
      User.findOne({username: decoded.username})
      .populateAll()
      .then((user) => {
        if(!user) {
          return CError.send(res, 'No session', {user: user});
        }
        delete user.password;
        res.json(user);
      });
    });
  },
  login: function(req, res) {
    var data = req.params.all();
    User.findOne({username: data.username})
    .populateAll()
    .then(function(user) {
      if(!user) {
        return CError.send(res, 'That user was not found!', {user: user});
      }

      password(data.password).verifyAgainst(user.password, function(error, verified) {
        if(error)
          throw new Error('Something went wrong!');
        if(!verified) {
          console.log("Not verified");
          return CError.send(res, 'bad password!', {user: user});
        } else {
          user.password = "";
          delete user.password;
          var token = jwt.sign(user, 'corner');
          res.json({
            token: token,
            user: user,
          });
        }
      });
    });
  },
  signup: function(req, res) {

    var data = req.params.all();
    var user = {};
    password(data.password).hash(function(error, hash) {
      if(error) {
        return CError.send(res, 'Password hashing did not work!');
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
          return CError.send(res, 'That user already exists!');
        }
        newUser.password = "";
        delete newUser.password;

        var token = jwt.sign(newUser, 'corner');
        res.json({
          token: token,
          user: newUser,
        });
      });
    });
  },
  logout: function(req, res) {
    console.log("logout");
    return res.cookie('jwt', '').ok();
  },
  error: function(req, res) {
    var data = req.params.all();
    return CError.send(res, 'Not Authorized', {hello: "my other stuff", max: "payen"});
  }
};

/**
 * AuthController
 *
 * @description :: Server-side logic for managing authentication
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var Promise = require('bluebird');

 module.exports = {
  session: function(req, res) {
    console.log("Session::req.session", req.session);
    if(req.session.user) {
      console.log("session is set");
      return res.json(req.session.user);
    } else {
      console.log("redirect: session isn't set");
      // return res.redirect('/entrance');
      res.status(400).send('No session');
    }
  },
  login: function(req, res) {
    var data = req.params.all();
    User.findOne({username: data.username, password: data.password})
    .then(function(user) {
      if(!user) {
        res.status(400).send('That user was not found!');
      }

      user.password = "";
      delete user.password;
      req.session.user = user;
      console.log("session is set: req.session", req.session);
      res.json(user);
    });
  },
   signup: function(req, res) {
     var data = req.params.all();
     console.log(data);
     User.create({email: data.email, password: data.password, username: data.username, shopName: data.shopName})
     .exec(function(err, user) {
       if(err) {
         res.status(400).send('That user already exists!');
       }
       console.log("signed up user", user);
       user.password = "";
       delete user.password;

       req.session.user = user;
       console.log("req.session", req.session);
       res.json(user);
     });
   },
  logout: function(req, res) {
    delete req.session.user;
    res.ok();
  }
 };

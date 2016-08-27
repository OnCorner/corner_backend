/**
 * ItemController
 *
 * @description :: Server-side logic for managing Items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/*
* ####Example
*
*   where: {
*     name: 'foo',
*     age: {
*       '>': 25
*     },
*     like: {
*       name: '%foo%'
*     },
*     or: [
*       { like: { foo: '%foo%' } },
*       { like: { bar: '%bar%' } }
*     ],
*     name: [ 'foo', 'bar;, 'baz' ],
*     age: {
*       not: 40
*     }
*   }
*/


// USING MONGODB NATIVE
// Model.native(function(err, collection) {
//      collection.find({
//         "attribute" : {
//             $ne : value, //Not Equal
//             //OR
//             $nin : [value1, value2]// Not In
//         }
//      }).toArray(function(err, docs) {
//          if (err) return callback(err, docs);
//
//          res.json(null, docs);
//      });
//  });

var Promise = require('bluebird');

var dummyItems = [
  {
    name: "Leopard Print 5 Panel",
    price: 8000,
    description: `Tyler, The Creator donned the now famous "Feathers Cap" in his notorious music video "Yonkers," but when he wore this leopard brimmed 5 panel at the 2011 MTV VMA's, it signaled a tipping point in Supreme's legacy`,
    viewCount: 15,
    image1: "http://images.complex.com/complex/image/upload/c_limit,fl_progressive,q_80,w_680/v9scdy5uqgimll5y9rwd.jpg",
  },
  {
    name: "Supreme x Padamore",
    price: 15000,
    description: `Before the release of the Padamore and Barnes x Supreme Sahara Boots, every garment the label had released up until that point could arguably be considered traditional skate gear`,
    viewCount: 35,
    image1: "http://images.complex.com/complex/image/upload/c_limit,fl_progressive,q_80,w_680/fzrjyfhxs3fclpn8hxqh.jpg",
  },
  {
    name: "Supreme x Playboy Jacket",
    price: 30000,
    description: `When this jacket dropped in 2011 no one had any reason to pick up a physical Playboy because INTERNETZ, but the brand's own legacy combined with Supreme's lead to one of the cleanest and most unexpected collaborations in recent memory`,
    viewCount: 40,
    image1: "http://images.complex.com/complex/image/upload/c_limit,fl_progressive,q_80,w_680/v0mdp03fhid9j04ntldp.jpg",
  },
  {
    name: "Supreme x Everlast Boxing Gloves",
    price: 20000,
    description: `Supreme's strength when it comes to their collaborative efforts has always been their knack for working with unexpected, often non-clothing brands`,
    viewCount: 10,
    image1: "http://images.complex.com/complex/image/upload/c_limit,fl_progressive,q_80,w_680/mxl73akvrzlx1zjlc660.jpg",
  },
  {
    name: "Supreme x Nike Air Trainer",
    price: 44000,
    description: `Supreme's strength when it comes to their collaborative efforts has always been their knack for working with unexpected, often non-clothing brands`,
    viewCount: 2,
    image1: "http://images.complex.com/complex/image/upload/c_limit,fl_progressive,q_80,w_680/dvalcjh6xfizcvxsj0od.jpg",
  },
  {
    name: "Hebrew Box Logo Tee",
    price: 5000,
    description: `Shalom, Hypebeasts`,
    viewCount: 5,
    image1: "http://images.complex.com/complex/image/upload/c_limit,fl_progressive,q_80,w_680/kainlnceauvzufawtw3t.jpg",
  },
];

module.exports = {
  trending: function(req, res) {
    var data = req.params.all();
    // Item.native('SELECT item FROM item WHERE item.name = "Leopard Print 5 Panel"', function(err, results) {
    //   if (err) return res.serverError(err);
    //   return res.ok(results.rows);
    // });

    var user = data.user;
    // user.categories
    // .find([
    //   // {name: "Hebrew Box Logo Tee"},
    //   // {name: "Supreme x Nike Air Trainer"}
    //   dummyItems[0],
    //   dummyItems[1]
    // ])

    // Article.find().populate('comments').sort('comments.comment_date ASC')

    // Article.find().populate('comments', {sort: 'comment_date ASC'})

    // TODO: or maybe I must put isSold inside the item?

    Item
    .find({status: 'ACTIVE'})
    .where({ or: [user.categorySubscriptions, {user.tagSubscriptions}] })
    // .populate('purchase', {where: {not: {status: 'SOLD'}}})
    // .find({purchase.status != 'SOLD'})
    .sort('viewCount DESC')
    .limit(30)
    .then(function(items) {
      res.json(items);
    });

  },
  newsfeed: function(req, res) {
    var data = req.params.all();
    var user = data.user;
    Item
    .find({status: 'ACTIVE'})
    .where({ or: [user.categorySubscriptions, {user.tagSubscriptions}] })
    // .populate('purchase', {where: {not: {status: 'SOLD'}}})
    // .find({purchase.status != 'SOLD'})
    .sort('createdAt ASC')
    .limit(150)
    .then(function(items) {
      res.json(items);
    });
  },
  createDummyItems: function(req, res) {
    // var Item = Promise.promisifyAll(Models.Message)
    Item.create(dummyItems)
    .then(function(items) {
      res.ok(items);
    });
  }
};

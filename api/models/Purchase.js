/**
 * Purchase.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    // data
    price: {
      type: 'integer',
      required: true,
    },
    status: { // TODO: revisit storing lifecycle of item
      type: 'string',
      enum: ['SOLD', 'RETURNED', 'UNPAID', 'SHIPPED', 'DELIVERED', 'CONFIRMED'],
      defaultsTo: 'SOLD',
    },
    // associations
    item: {
      model: 'item',
      required: true,
    },
    purchasedBy: {
      model: 'user',
      required: true,
    },
    soldBy: {
      model: 'user',
      required: true,
    },
  }
};

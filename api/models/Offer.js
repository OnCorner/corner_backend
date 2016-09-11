/**
 * Offer.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    // data
    amount: {
      type: 'integer',
      required: true,
    },
    accepted: {
      type: 'boolean',
      defaultsTo: false,
    },

    // associations
    message: {
      model: 'message',
      required: true,
    },
  }
};

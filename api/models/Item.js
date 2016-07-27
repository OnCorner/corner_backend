/**
 * Item.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    // data
    name: {
      type: 'string',
      required: true,
    },
    price: {
      type: 'integer',
      required: true,
    },
    viewCount: {
      type: 'integer',
    },
    image1: {
      type: 'string',
      defaultsTo: '',
    },
    image2: {
      type: 'string',
      defaultsTo: '',
    },
    image3: {
      type: 'string',
      defaultsTo: '',
    },
    description: {
      type: 'string',
      required: true,
    },
    status: {
      type: 'string',
      enum: ['SOLD', 'AVAILABLE'],
      defaultsTo: 'AVAILABLE',
    },

    // associations
    user: {
      model: 'user',
    },
    category: {
      model: 'category',
    },
    purchase: {
      model: 'purchase',
    },
    tags: {
      collection: 'tag',
      via: 'items',
    },
  }
};

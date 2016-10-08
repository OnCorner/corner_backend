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
    description: {
      type: 'string',
      required: true,
    },
    viewCount: {
      type: 'integer',
      defaultsTo: 0
    },
    size: {
      type: 'string',
      defaultsTo: 'one size',
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
    image4: {
      type: 'string',
      defaultsTo: '',
    },
    status: {
      type: 'string',
      enum: ['SOLD', 'ACTIVE', 'INACTIVE'],
      defaultsTo: 'ACTIVE',
    },

    // associations
    user: {
      model: 'user',
    },
    category: {
      model: 'category',
    },
    groups: {
      collection: 'group',
      via: 'items',
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

/**
 * Item.js
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
    description: {
      type: 'string',
      required: true,
    },
    brand: {
      type: 'string',
      required: true,
    },
    style: {
      type: 'string',
      required: true,
    },
    viewCount: {
      type: 'integer',
      defaultsTo: 0
    },
    quantity: {
      type: 'integer',
      defaultsTo: 1
    },
    size: {
      type: 'string',
      defaultsTo: 'one size',
    },
    zip: {
      type: 'integer',
      required: true,
    },
    condition: {
      type: 'string',
      enum: ['USED', 'NEW'],
      defaultsTo: 'AVAILABLE',
      required: true,
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
    // image4: {
    //   type: 'string',
    //   defaultsTo: '',
    // },
    status: {
      type: 'string',
      enum: ['SOLD', 'ACTIVE', 'INACTIVE'],
      defaultsTo: 'ACTIVE',
    },
    acceptingOffers: {
      type: 'boolean',
      defaultsTo: false,
    },
    canMeetUp: {
      type: 'boolean',
      defaultsTo: false,
    },
    shipping: {
      type: 'boolean',
      defaultsTo: false,
    },
    freeShipping: {
      type: 'boolean',
      defaultsTo: false,
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

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
      defaultsTo: 'https://m1.behance.net/rendition/modules/89420057/disp/13aed6029ce375799df4ae8343b74da1.jpg',
    },
    image2: {
      type: 'string',
      defaultsTo: 'https://m1.behance.net/rendition/modules/89420057/disp/13aed6029ce375799df4ae8343b74da1.jpg',
    },
    image3: {
      type: 'string',
      defaultsTo: 'https://m1.behance.net/rendition/modules/89420057/disp/13aed6029ce375799df4ae8343b74da1.jpg',
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

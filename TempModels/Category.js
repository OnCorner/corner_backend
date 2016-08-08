/**
 * Category.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'Core.Item',
  attributes: {
    // data
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    displayOrder: {
      type: 'integer'
    },
    status: {
      type: 'string',
      enum: ['ACTIVE', 'INACTIVE'],
      defaultsTo: 'ACTIVE'
    },
    image: {
      type: 'string',
      defaultsTo: 'http://ih1.redbubble.net/image.118908526.2682/flat,800x800,075,f.u6.jpg'
    },
    description: {
      type: 'string'
    },

    // associations
    items: {
      collection: 'item',
      via: 'category'
    },
    categorySubscribers: {
      collection: 'user',
      via: 'category'
    }
  }
};

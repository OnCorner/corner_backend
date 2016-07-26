/**
 * Tag.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    // data
    text: {
      type: 'string',
      required: true,
      unique: true,
    },

    // associations
    creator: {
      model: 'user',
      required: true,
    },
    items: {
      collection: 'item',
      via: 'tags',
    },
    groups: {
      collection: 'group',
      via: 'tags',
    }
  }
};

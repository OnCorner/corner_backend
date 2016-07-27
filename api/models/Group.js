/**
 * Group.js
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
      unique: true,
    },
    status: {
      type: 'string',
      enum: ['ACTIVE', 'INACTIVE'],
      defaultsTo: 'ACTIVE',
    },
    image: {
      type: 'string',
      defaultsTo: '',
    },
    description: {
      type: 'string',
    },

    // associations
    creator: {
      model: 'user',
    },
    moderators: {
      collection: 'user',
    },
    members: {
      collection: 'user',
      via: 'groups',
    },
    tags: {
      collection: 'tag',
      via: 'groups',
    },
  }
}

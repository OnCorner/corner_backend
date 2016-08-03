/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    // data
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    shopName: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true,
    },
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    type: {
      enum: ['USER', 'ADMIN', 'SUPERUSER'],
      defaultsTo: 'USER'
    },
    shopDescription: {
      type: 'string'
    },
    status: {
      type: 'string',
      enum: ['ACTIVE', 'INACTIVE'],
      defaultsTo: 'ACTIVE'
    },
    coverImage: {
      type: 'string',
      defaultsTo: ''
    },
    profileImage: {
      type: 'string',
      defaultsTo: ''
    },

    // associations
    items: {
      collection: 'item',
      via: 'user'
    },
    subscriptions: {
      collection: 'category',
      via: 'subscribers'
    },
    groups: {
      collection: 'group',
      via: 'members'
    },
    tags: {
      collection: 'tag',
      via: 'creator'
    },
    chats: {
      collection: 'chat',
      via: 'users'
    }
  }
};

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
      unique: true
    },
    password: {
      type: 'string',
      required: true,
    },
    firstName: {
      type: 'string',
      required: true,
    },
    lastName: {
      type: 'string',
      required: true,
    },
    phone: {
      type: 'string',
    },
    address: {
      type: 'string',
    },
    city: {
      type: 'string',
    },
    state: {
      type: 'string',
    },
    country: {
      type: 'string',
    },
    zip: {
      type: 'string',
    },
    instagram: {
      type: 'string',
    },
    twitter: {
      type: 'string',
    },
    facebook: {
      type: 'string',
    },
    type: {
      enum: ['USER', 'ADMIN', 'SUPERUSER'],
      defaultsTo: 'USER',
    },
    shopDescription: {
      type: 'string'
    },
    status: {
      type: 'string',
      enum: ['ACTIVE', 'EMAIL_PENDING', 'INACTIVE'],
      defaultsTo: 'EMAIL_PENDING',
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
    categorySubscriptions: {
      collection: 'category',
      via: 'categorySubscribers',
    },
    tagSubscriptions: {
      collection: 'tag',
      via: 'tagSubscribers',
    },
    // following: {
    //   collection: 'user',
    //   via: 'followers'
    // },
    // followers: {
    //   collection: 'user',
    //   via: 'following'
    // },
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
    },
    creditCards: {
      collection: 'creditCard',
      via: 'user',
    },
    comments: {
      collection: 'comment',
      via: 'creator',
    },
    likers: {
      collection: 'group',
      via: 'likes',
    },
  }
};

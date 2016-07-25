/**
 * Chat.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'Core.Item',
  attributes: {
    // associations
    creator: {
      model: 'user'
      required: true,
    },
    users: {
      collection: 'item',
      via: 'tag'
    },
    messages: {
      collection: 'message',
      via: 'chat'
    }
  }
};

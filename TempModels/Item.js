/**
 * Item.js
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
    },
    price: {
      type: 'integer',
      required: true,
    },
    size: {
      type: 'string',
      required: true,
    },
    zip: {
      type: 'integer',
      required: true,
    },
    condition: {
      type: 'string',
      enum: ['used', 'new'],
      defaultsTo: 'AVAILABLE',
      required: true,
    },
    viewCount: {
      type: 'integer',
    },
    quantity: {
      type: 'integer',
      defaultsTo: 1,
    },
    image1: {
      type: 'string',
      defaultsTo: 'https://m1.behance.net/rendition/modules/89420057/disp/13aed6029ce375799df4ae8343b74da1.jpg'
    },
    image2: {
      type: 'string',
      defaultsTo: 'https://m1.behance.net/rendition/modules/89420057/disp/13aed6029ce375799df4ae8343b74da1.jpg'
    },
    image3: {
      type: 'string',
      defaultsTo: 'https://m1.behance.net/rendition/modules/89420057/disp/13aed6029ce375799df4ae8343b74da1.jpg'
    },
    description: {
      type: 'string',
      required: true,
    },
    status: {
      type: 'string',
      enum: ['SOLD', 'AVAILABLE'],
      defaultsTo: 'AVAILABLE'
    },

    // associations
    user: {
      model: 'user'
    },
    category: {
      model: 'user'
    },
    group: {
      model: 'group'
    },
    tags: {
      collection: 'tag',
      via: 'item'
    },
  }
};

Api.server.findOne('group', {group: groupId})
.then((group) => {
  if(group == null) {
    return Api.server.create('group', {name: "Nike"})
  }

  return group;
})
.then((groupRes) => {
  return Api.server.create('item', {name: "Shoe XX2", group: groupRes.id, user: session.user.id, price: 500})
})
.then((newItem) => {
  console.log("newItem", newItem);
})

/**
 * ChatController
 *
 * @description :: Server-side logic for managing Chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  testMessage: function(req, res) {
    console.log("message");
    var data = req.params.all();
    sails.sockets.blast('message', {message: 'Welcome!'});
    return res.ok();
  },
  // users: function(req, res) {
  //   var data = req.params.all();
  //   var creatorId = data.creatorId;
  //   var userIds = data.userIds;
  //   var chatData = {creator: creatorId, users: userIds};
  //   Chat.create(chatData)
  //   .exec(function(err, chat) {
  //     if(err || !chat) {
  //       return CError.send(res, 'Chat could not be created', {chatData: chatData});
  //     }
  //
  //     return res.json(chat);
  //   })
  // },
  message: function(req, res) {
    var data = req.params.all();

    var messageData = {
      text: data.text,
      type: 'USER',
      creator: data.creatorId,
      recipient: data.recipientId,
      chat: data.chatId,
    };
    Message.create(messageData)
    .exec(function(err, message) {
      if(err || !message) {
        return CError.send(res, 'Message could not be sent', {messageData: messageData});
      }

      sails.sockets.blast(data.chatId, message);
      return res.json(message);
    })
  }
};

module.exports = {
  send: function(res, message, errorObject) {
    var error = {
      error: message,
      info: errorObject
    }
    return res.status(400).send(error);
  }
}

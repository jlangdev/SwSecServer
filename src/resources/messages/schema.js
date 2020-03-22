var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messagesSchema = new Schema({
  username: String,
  message: String,
  time: String
});

var Message = mongoose.model('messages', messagesSchema,'messages');
module.exports = Message; 
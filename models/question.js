const mongoose = require('mongoose')
const Schema = mongoose.Schema;
let answerModel = require('./answer')

var questionSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  question: String,
  description: String,
  answer: [answerModel.schema],
  vote: [{
    userVote : {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    status : String
    
  }]
}, {
  usePushEach: true,
  timestamps : {}
})

module.exports = mongoose.model('Question', questionSchema)
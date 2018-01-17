const mongoose = require('mongoose')
const Schema = mongoose.Schema

let answerSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    vote: [{
      userVote : {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      status : String
      
    }]
  },
  { timestamps: {} } // auto generate createdAt and updatedAt field
)

module.exports = mongoose.model('Answer', answerSchema)

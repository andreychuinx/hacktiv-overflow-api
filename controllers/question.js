const express = require('express')
const router = express.Router()
const QuestionModel = require('../models/question')
const HttpStatus = require('http-status-codes')
const ObjectID = require('mongodb').ObjectID

class QuestionController {
  static create(req, res) {
    let objQuestion = {
      createdBy: req.decoded.userId,
      question: req.body.question,
      description: req.body.description
    }
    let dataQuestion = new QuestionModel(objQuestion)
    dataQuestion
      .save()
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: 'Question Created',
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: 'Data Question Error Server',
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

  static addAnswer(req, res) {
    let objAnswer = {
      createdBy: req.decoded.userId,
      answer: req.body.answer
    }
    QuestionModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          answer: objAnswer
        }
      },
      { new: true }
    )
      .then(result => {
        return result
          .populate('createdBy')
          .populate('answer.createdBy')
          .execPopulate()
      })
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: 'Answer Insert',
          data: result
        })
      })
  }

  static deleteAnswer(req, res) {
    QuestionModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          answer: {
            _id: req.params.idanswer
          }
        }
      },
      { new: true }
    )
      .then(result => {
        return result
          .populate('createdBy')
          .populate('answer.createdBy')
          .execPopulate()
      })
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: 'Answer Deleted',
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: 'Answer Error Server',
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

  static voteQuestion(req, res) {
    console.log(req.body.status)
    let objVote = {
      userVote: req.decoded.userId,
      status: req.body.status
    }
    QuestionModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          vote: objVote
        }
      },
      { new: true }
    )
      .then(result => {
        return result
          .populate('createdBy')
          .populate('answer.createdBy')
          .execPopulate()
      })
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: 'Question Voted',
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: 'Answer Error Server',
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }
  static voteAnswer(req, res) {
    let objVote = {
      userVote: req.decoded.userId,
      status: req.body.status
    }
    QuestionModel.findOneAndUpdate(
      {
        answer: {
          $elemMatch: {
            _id: req.params.idanswer
          }
        }
      },
      {
        $push: {
          'answer.$.vote': objVote
        }
      },
      { new: true }
    )
      .then(result => {
        return result
          .populate('createdBy')
          .populate('answer.createdBy')
          .execPopulate()
      })
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: 'Answer Voted',
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: 'Answer Error Server',
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

  static get(req, res) {
    QuestionModel.find()
      .populate('createdBy')
      .populate('answer.createdBy')
      .sort({ createdAt: 'desc' })
      .exec()
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: 'Data Questions',
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: 'Data Questions Error Server',
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

  static getQuestionsUser(req, res) {
    QuestionModel.find({ createdBy: req.decoded.userId })
      .populate('createdBy')
      .populate('answer.createdBy')
      .sort({ createdAt: 'desc' })
      .exec()
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: 'Data Questions User',
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: 'Data Questions Error Server',
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

  static getSingle(req, res) {
    QuestionModel.findById(req.params.id)
      .populate('createdBy')
      .populate('answer.createdBy')
      .exec()
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: 'Data Question',
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: 'Data Question Error Server',
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }

  static update(req, res) {
    QuestionModel.findByIdAndUpdate(req.params.id,{
      question: req.body.question,
      description: req.body.description
    })
    .then(result => {
      return result
          .populate('createdBy')
          .populate('answer.createdBy')
          .execPopulate()
    })
    .then(result => {
      res.status(HttpStatus.OK).json({
        messages: 'Data Question Edited',
        data: result
      })
    })
    .catch(err => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        messages: 'Data Question Error Server',
        data: err,
        error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
      })
    })
  }

  static delete(req, res) {
    QuestionModel.findByIdAndRemove(req.params.id)
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: 'Question Deleted',
          data: result
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: 'Delete Question Error',
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }
}

module.exports = QuestionController

const express = require('express')
const router = express.Router()
const UserModel = require('../models/user')
const HttpStatus = require('http-status-codes')
const ObjectID = require('mongodb').ObjectID

class SignupController {
  static create(req, res) {
    let objUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }
    let dataUser = new UserModel(objUser)
    dataUser
      .save()
      .then(result => {
        res.status(HttpStatus.OK).json({
          messages: 'Users Created',
          data: result,
        })
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: 'Data Users Error Server',
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
        })
      })
  }
}

module.exports = SignupController

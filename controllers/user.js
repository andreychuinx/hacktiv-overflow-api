const express = require('express');
const router = express.Router();
const UserModel = require('../models/user')
const HttpStatus = require('http-status-codes')
const jwt = require('jsonwebtoken')
const ObjectID = require('mongodb').ObjectID;

class UserController {
  static getSingle(req, res) {
    UserModel.findById(req.decoded.userId)
    .then(result => {
      res.status(HttpStatus.OK).json({
        messages: "Data User",
        data: result
      })
    })
    .catch(err => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        messages: "User Data Error Server",
        data: err,
        error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
      })
    })
  }
}
module.exports = UserController
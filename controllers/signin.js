const express = require('express');
const router = express.Router();
const UserModel = require('../models/user')
const HttpStatus = require('http-status-codes')
const jwt = require('jsonwebtoken')
const ObjectID = require('mongodb').ObjectID;

class SignInController {
  static signIn(req, res) {
    UserModel.findOne({ 'email': req.body.email })
      .then(result => {
        if (!result) {
          res.status(HttpStatus.NOT_FOUND).send({
            messages: "Email Not Found",
            error: HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
          })
        } else {
          console.log(result)
          result.comparePassword(req.body.password)
            .then(isMatch => {
              console.log(isMatch)
              if (isMatch) {

                let objPayLoad = {
                  userId: result.id,
                  name: result.name,
                  email: result.email,
                }
                
                jwt.sign(objPayLoad, process.env.SECRET_KEY, (err, token) => {
                  if (err) return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                    messages: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
                    data: err
                  })
                  res.status(HttpStatus.OK).json({
                    messages: "Signin",
                    data: {
                      authorization: token,
                      user: objPayLoad
                    }
                  })
                })
              } else {
                res.status(HttpStatus.FORBIDDEN).send({
                  error: HttpStatus.getStatusText(HttpStatus.FORBIDDEN)
                })
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
      .catch(err => {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          messages: "Data Users Error Server",
          data: err,
          error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
        })
      })
  }
}
module.exports = SignInController
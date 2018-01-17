const jws = require('jsonwebtoken')
const HttpStatus = require('http-status-codes')

module.exports = function (req, res, next) {
  const token = req.headers.authorization
  jws.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    
    if (err) return res.status(HttpStatus.FORBIDDEN)
      .json({
        error: HttpStatus.getStatusText(HttpStatus.FORBIDDEN)
      })
      req.decoded = decoded
      next()
  })

}
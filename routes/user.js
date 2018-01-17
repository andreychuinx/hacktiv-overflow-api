const express = require('express');
const router = express.Router();
const User = require('../controllers/user')
const Authentification = require('../middlewares/authentification')

// router.get('/', user.get)
router.get('/', Authentification, User.getSingle)
// router.post('/', Authentification, Question.create)
// router.put('/:id', Question.update)
// router.delete('/:id', Question.delete)
// router.post('/:id/answer', Authentification, Question.addAnswer)

// router.delete('/:id/answer/:idanswer', Authentification, Question.deleteAnswer)
// router.post('/:id/vote', Authentification, Question.voteQuestion)
// router.post('/vote/:idanswer/answer', Authentification, Question.voteAnswer)

module.exports = router
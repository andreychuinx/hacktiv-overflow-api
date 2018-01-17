const express = require('express');
const router = express.Router();
const Question = require('../controllers/question')
const Authentification = require('../middlewares/authentification')

router.get('/', Question.get)
router.get('/:id', Question.getSingle)
router.get('/user/getquestions', Authentification, Question.getQuestionsUser)
router.post('/', Authentification, Question.create)
router.put('/:id', Question.update)
router.delete('/:id', Question.delete)
router.post('/:id/answer', Authentification, Question.addAnswer)

router.delete('/:id/answer/:idanswer', Authentification, Question.deleteAnswer)
router.post('/:id/vote', Authentification, Question.voteQuestion)
router.post('/vote/:idanswer/answer', Authentification, Question.voteAnswer)

module.exports = router
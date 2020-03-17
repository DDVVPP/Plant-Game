const router = require('express').Router()
const {GameResult} = require('../db/models')

module.exports = router

// GET /api/messages

// POST /api/messages
router.post('/', async (req, res, next) => {
  try {
    const gameResultData = await GameResult.create({
      win: req.body.win,
      lose: req.body.lose,
      userId: req.body.userId
    })
    res.json(gameResultData)
  } catch (error) {
    next(error)
  }
})

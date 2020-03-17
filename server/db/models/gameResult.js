const Sequelize = require('sequelize')
const db = require('../db')

const GameResult = db.define('gameResult', {
  win: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  lose: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
})

module.exports = GameResult

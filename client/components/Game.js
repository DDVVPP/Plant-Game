import React from 'react'
import Phaser from 'phaser'
import {PlayScene, WinEndScene, LoseEndScene} from '../phaser'

class Game extends React.Component {
  componentDidMount() {
    const config = {
      type: Phaser.AUTO,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1400,
        height: 650
      },
      transparent: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {y: 100},
          debug: false
        }
      },
      scene: [PlayScene, WinEndScene, LoseEndScene]
    }
    let game = new Phaser.Game(config)
    // make it so that the scene update function still runs when the window loses focus
    game.events.off('visible', game.onVisible, game)
    game.events.off('hidden', game.onHidden, game)
  }
  shouldComponentUpdate() {
    return false
  }
  render() {
    return <div id="phaser-game" />
  }
}
export default Game

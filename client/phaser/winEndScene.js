import Phaser from 'phaser'

export default class WinEndScene extends Phaser.Scene {
  constructor() {
    // passing 'win' as a parameter that will serve as the identifier for this scene
    super('win')
  }
  init() {
    // used to prepare data
  }
  preload() {
    // used to load assest like images and audio into memory
    this.load.image('mainBackground', '/assets/mainBackground.png')
  }
  create() {
    this.add.image(700, 325, 'mainBackground')

    this.add.text(610, 300, 'GAME OVER, YOU WIN!', {
      fontSize: '22px',
      fill: '#000'
    })

    this.add
      .text(635, 400, 'PLAY AGAIN', {
        fontSize: '35px',
        fill: '#000'
      })
      .setInteractive({useHandCursor: true})
      .on('pointerover', () => this.clickButton.setStyle({fill: '#fff'}))
      .on('pointerdown', () => this.scene.start('play'))
    // you can navigate to the next scene like this
    // this.scene.start('play');
  }

  update() {
    // the game loop which runs constantly
  }
}

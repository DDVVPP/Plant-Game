import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class LoseEndScene extends Phaser.Scene {
  constructor() {
    // passing 'losing' as a parameter that will serve as the identifier for this scene
    super('losing')
  }
  init() {
    // used to prepare data
  }
  preload() {
    // used to load assest like images and audio into memory
    this.load.image('mainBackground', '/assets/mainBackground.png')

    // WebFont.load({
    //   google: {
    //     families: ['Bungee', 'Kodchasan', 'Nova+Round', 'Patrick+Hand+SC', 'Slackey']
    //   },
    // })
  }
  create() {
    this.add.image(700, 325, 'mainBackground')

    this.add.text(610, 300, 'GAME OVER, YOU LOSE!', {
      // font: 'Kodchasan',
      fontSize: '22px',
      fill: '#000'
    })

    this.add
      .text(635, 400, 'PLAY AGAIN', {
        // font: 'Kodchasan',
        fontSize: '35px',
        fill: '#000'
      })
      .setInteractive({useHandCursor: true})
      .on('pointerdown', () => this.scene.start('play'))

    // you can navigate to the next scene like this
    // this.scene.start('play');
  }

  update() {
    // the game loop which runs constantly
  }
}

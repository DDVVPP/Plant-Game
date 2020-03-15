import Phaser from 'phaser'

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
  }
  create() {
    this.add.image(600, 325, 'mainBackground')

    this.add.text(550, 325, 'GAME OVER, YOU LOSE!', {
      fontSize: '22px',
      fill: '#000'
    })

    // you can navigate to the next scene like this
    // this.scene.start('play');
  }

  update() {
    // the game loop which runs constantly
  }
}

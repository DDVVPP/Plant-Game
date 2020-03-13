// import clientStore, {clientActionCreators} from '../store'
import Phaser from 'phaser'
// import socket from '../socket'

export default class PlayScene extends Phaser.Scene {
  constructor() {
    // passing 'play' as a parameter that will serve as the identifier for this scene
    super('play')
    this.raindropScore = 0
    this.raindropScoreText = ''
  }

  init() {
    // used to prepare data
  }

  preload() {
    // loading in data
    this.load.image('background', '/assets/background.png')
    this.load.image('raindrop', '/assets/raindrop.png')
    this.load.image('lightningBolt', '/assets/lightningBolt.png')
    this.load.image('bucket', '/assets/bucket.png')
    this.load.image('plant1', '/assets/PlantGrowth1.png')
    this.load.image('plant2', '/assets/PlantGrowth2.png')
    this.load.image('plant3', '/assets/PlantGrowth3.png')
    this.load.image('plant4', '/assets/PlantGrowth4.png')
    this.load.image('plant5', '/assets/PlantGrowth5.png')
  }

  create() {
    this.add.image(600, 325, 'background')

    this.bucket = this.physics.add.sprite(600, 800, 'bucket')
    this.bucket.setCollideWorldBounds(true)
    this.bucket.body.setAllowGravity(false)

    this.raindropScoreText = this.add.text(1250, 16, 'Score: 0', {
      fontSize: '22px',
      fill: '#000'
    })

    this.time.addEvent({
      delay: 3500,
      callback: () => {
        this.raindrops = this.physics.add.sprite(
          Phaser.Math.Between(50, 1150),
          0,
          'raindrop'
        )
        this.physics.add.overlap(
          this.bucket,
          this.raindrops,
          this.collectRaindrops,
          null,
          this
        )
      },
      callbackScope: this,
      timeScale: 3,
      loop: true
    })

    this.time.addEvent({
      delay: 5000,
      callback: () => {
        this.lightningBolts = this.physics.add.sprite(
          Phaser.Math.Between(50, 1150),
          0,
          'lightningBolt'
        )
        this.physics.add.overlap(
          this.bucket,
          this.lightningBolts,
          this.collectLightningBolts,
          null,
          this
        )
      },
      callbackScope: this,
      timeScale: 3,
      loop: true
    })

    this.cursors = this.input.keyboard.createCursorKeys()
  }

  collectRaindrops(bucket, raindrop) {
    raindrop.disableBody(true, true)
    this.raindropScore++
    this.raindropScoreText.setText(`Score: ${this.raindropScore}`)
    this.plantObj = {
      plant1a: null,
      plant2a: null,
      plant3a: null,
      plant4a: null,
      plant5a: null
    }

    // let plant1a = this.add.image(1280, 555, 'plant1');
    // let plant2a = this.add.image(1290, 540, 'plant2');
    // let plant3a = this.add.image(1300, 525, 'plant3');
    // let plant4a = this.add.image(1300, 510, 'plant4');
    // let plant5a = this.add.image(1300, 500, 'plant5');

    if (this.raindropScore === 5) {
      this.plantObj.plant1a = this.add.image(1280, 555, 'plant1')
    } else if (this.raindropScore === 10) {
      this.plantObj.plant1a = null
      this.plantObj.plant2a = this.add.image(1290, 540, 'plant2')
    } else if (this.raindropScore === 15) {
      this.plantObj.plant2a = null
      this.plantObj.plant3a = this.add.image(1300, 525, 'plant3')
    } else if (this.raindropScore === 20) {
      this.plantObj.plant3a = null
      this.plantObj.plant4a = this.add.image(1300, 510, 'plant4')
    } else if (this.raindropScore === 25) {
      this.plantObj.plant4a = null
      this.plantObj.plant5a = this.add.image(1300, 500, 'plant5')
      this.scene.start('win')
    } else if (this.raindropScore <= -25) {
      this.plantObj.plant4a = null
      this.plantObj.plant5a = this.add.image(1300, 500, 'plant5')
      this.scene.start('losing')
    }
  }

  collectLightningBolts(bucket, lightningBolt) {
    lightningBolt.disableBody(true, true)
    this.raindropScore -= 5
    this.raindropScoreText.setText(`Score: ${this.raindropScore}`)
  }

  update() {
    if (this.cursors.left.isDown) {
      this.bucket.setVelocityX(-150)
    } else if (this.cursors.right.isDown) {
      this.bucket.setVelocityX(150)
    } else {
      this.bucket.setVelocityX(0)
    }
  }
}

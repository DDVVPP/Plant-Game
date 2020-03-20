/* eslint-disable max-statements */
import Phaser from 'phaser'
import store, {postGameResult} from '../store'

export default class PlayScene extends Phaser.Scene {
  constructor() {
    // passing 'play' as a parameter that will serve as the identifier for this scene
    super('play')

    this.raindropScore = 0
    this.raindropScoreText = ''
  }

  preload() {
    // loading in data
    this.load.image('mainBackground', '/assets/mainbackground.png')
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
    this.add.image(700, 325, 'mainBackground')

    this.bucket = this.physics.add.sprite(600, 800, 'bucket')

    // my attempt at setting new collider bounds for the bucket
    // this.bucket.body.setBoundsRectangle(this.add.rectangle(1200, 650))
    // this.bucket.enableBody(true, 600, 600)

    //sets collider bounds of bucket to config width and height
    this.bucket.setCollideWorldBounds(true)

    this.bucket.body.setAllowGravity(false)

    this.raindropScoreText = this.add.text(
      1250,
      16,
      `Score: ${this.raindropScore}`,
      {
        fontSize: '22px',
        fill: '#000'
      }
    )

    //randomized raindrops
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

    //randomized lightning bolts
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
  }

  collectLightningBolts(bucket, lightningBolt) {
    lightningBolt.disableBody(true, true)
    this.raindropScore -= 5
    this.raindropScoreText.setText(`Score: ${this.raindropScore}`)
  }

  // eslint-disable-next-line complexity
  checkScore() {
    // my failed attempt at replacing previous image with new one
    // this.plantObj = {
    //   plant1a: null,
    //   plant2a: null,
    //   plant3a: null,
    //   plant4a: null,
    //   plant5a: null
    // }
    // this.plantObj = this.add.group()
    // let plant1a = this.add.sprite(1280, 555, 'plant1')
    // let plant1a = this.plantObj.add(this.add.sprite(1280, 555, 'plant1'))

    let plant1a = this.add.image(1280, 555, 'plant1')
    plant1a.visible = !plant1a.visible
    let plant2a = this.add.image(1290, 540, 'plant2')
    plant2a.visible = !plant2a.visible
    let plant3a = this.add.image(1300, 525, 'plant3')
    plant3a.visible = !plant3a.visible
    let plant4a = this.add.image(1300, 510, 'plant4')
    plant4a.visible = !plant4a.visible
    let plant5a = this.add.image(1300, 500, 'plant5')
    plant5a.visible = !plant5a.visible

    if (this.raindropScore === 3) {
      plant1a.visible = !plant1a.visible
    } else if (this.raindropScore >= 6 && this.raindropScore < 15) {
      // this.plantObj.killAndHide(plant1a)
      plant1a.visible = !plant1a.visible
      plant2a.visible = !plant2a.visible
    } else if (this.raindropScore >= 15 && this.raindropScore < 20) {
      // this.plantObj.plant2a = null
      // this.plantObj.plant3a = this.add.image(1300, 525, 'plant3')
      plant2a.visible = !plant2a.visible
      plant3a.visible = !plant3a.visible
    } else if (this.raindropScore >= 20 && this.raindropScore < 25) {
      // this.plantObj.plant3a = null
      // this.plantObj.plant4a = this.add.image(1300, 510, 'plant4')
      plant3a.visible = !plant3a.visible
      plant4a.visible = !plant4a.visible
    } else if (this.raindropScore === 25) {
      // this.plantObj.plant4a = null
      // this.plantObj.plant5a = this.add.image(1300, 500, 'plant5')
      plant4a.visible = !plant4a.visible
      plant5a.visible = !plant5a.visible
    } else if (this.raindropScore > 25) {
      const {user} = store.getState()
      if (user.id !== undefined) {
        store.dispatch(postGameResult(true, false, user.id))
      }
      this.scene.start('win')
    } else if (this.raindropScore <= -25) {
      const {user} = store.getState()
      console.log('userId', user.id)
      if (user.id !== undefined) {
        store.dispatch(postGameResult(false, true, user.id))
      }
      this.scene.start('losing')
    }
  }

  update() {
    //left and right arrow keys move bucket at stated velocity
    //bounce added as workaround for collider bounds
    if (this.bucket.x <= 1150) {
      if (this.cursors.left.isDown) {
        this.bucket.setVelocityX(-150)
      } else if (this.cursors.right.isDown) {
        this.bucket.setBounce(1)
        this.bucket.setVelocityX(150)
      } else {
        this.bucket.setVelocityX(0)
      }
    }

    //check score continously
    this.checkScore()
  }
}

class Lander {
  constructor (imageSource, location) {
    this.image = new Drawable(imageSource, location)
    this.constants = new Constants()

    this.data = {
      location: location,
      center: {},
      angle: Math.PI / 2,
      fuel: 0,
      speed: {
        x: 0,
        y: 0
      },
      velocity: {
        x: 0,
        y: 0
      },
      thrust: {
        x: 0,
        y: 0
      },
      fuel: 100,
      intersected: true
    }
  }

  thrust (elapsedTime) {
    if (this.data.fuel > 0) {
      const thrustRate = this.constants.math.lander.thrustRate

      const thrustX = Math.sin(this.data.angle)
      const thrustY = Math.cos(this.data.angle)
      this.data.velocity.x += (thrustX * thrustRate * elapsedTime)
      this.data.velocity.y += (thrustY * thrustRate * elapsedTime)

      this.data.fuel -= this.constants.math.lander.fuelBurn
    }
  }

  modifyLocation (location) {
    this.location = location
  }

  rotRight () {
    this.rotate(this.constants.math.lander.rotSpeed)
  }

  rotLeft () {
    this.rotate(-this.constants.math.lander.rotSpeed)
  }

  rotate (angle) {
    this.data.angle = (
      (this.data.angle + angle) % this.constants.math.lander.circle
    )
  }

  move (elapsedTime) {
    const landerMath = this.constants.math.lander
    const gravity = landerMath.gravity

    this.data.velocity.y -= (gravity * elapsedTime)

    const velocity = this.data.velocity
    this.data.location.x -= (velocity.x * elapsedTime)
    this.data.location.y += (velocity.y * elapsedTime)
  }

  checkStatus () {
    const landerMath = this.constants.math.lander
    const decimalAngle = (this.data.angle * (180 / Math.PI)) % 360
    return (
      (Math.abs(this.data.velocity.y * landerMath.velocityModifier) <= 2) && (Math.abs(decimalAngle) <= 5)
    )
  }
}

function ParticleThrust (graphics, spec) {
  const that = {}
  const constants = new Constants()
  let particles = []

  function create (spec) {
    const that = {}

    spec.fill = 'rgb(255, 255, 255)'
    spec.alive = 0

    that.update = function (elapsedTime) {
      spec.center.x += (spec.speed * spec.direction.x * elapsedTime)
      spec.center.y += (spec.speed * spec.direction.y * elapsedTime)
      spec.alive += elapsedTime

      spec.rotation += spec.speed * 0.5

      return spec.alive < spec.lifetime
    }

    that.draw = function () {
      graphics.drawRectangle(spec)
    }

    return that
  }

  that.update = function (elapsedTime, lander, makeMore) {
    const keepMe = []
    for (let particle = 0; particle < particles.length; particle++) {
      if (particles[particle].update(elapsedTime)) {
        keepMe.push(particles[particle])
      }
    }
    particles = keepMe

    const imager = lander.image.image
    const ratio = constants.math.lander.landerSizeRatio
    const endWidth = imager.width * ratio
    const endHeight = imager.height * ratio

    const location = lander.data.location
    const center = {
      x: (endWidth - location.x) / 2,
      y: (endHeight - location.y) / 2
    }

    const angle = lander.data.angle

    if (makeMore) {
      for (let particle = 0; particle < 5; particle++) {
        const size = Math.abs(Random.nextGaussian(spec.size.mean, spec.size.stdev))
        const randomCenter = {
          x: Random.nextRange(center.x - (endWidth / 2), center.x),
          y: Random.nextRange(center.y + (endHeight / 2), center.y)
        }
        const p = create({
          center: randomCenter,
          size: { x: size, y: size },
          rotation: 0,
          speed: -(0.005 + Random.nextGaussian(spec.speed.mean, spec.speed.stdev)),
          direction: { x: Math.sin(-angle), y: Math.cos(-angle) },
          lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev)
        })
        particles.push(p)
      }
    }
  }

  that.render = function () {
    for (let p = particles.length - 1; p >= 0; p--) {
      particles[p].draw()
    }
  }

  return that
}

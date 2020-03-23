function ParticleBurst (graphics, spec) {
  const that = {}
  let particles = []

  function create (spec) {
    const that = {}

    spec.fill = 'rgb(255, 255, 255)'
    spec.stroke = 'rgb(0, 0, 0)'
    spec.alive = 0

    that.update = function (elapsedTime) {
      spec.center.x += (spec.speed * spec.direction.x * elapsedTime)
      spec.center.y += (spec.speed * spec.direction.y * elapsedTime)
      spec.alive += elapsedTime

      spec.rotation += spec.speed * 0.00005

      return spec.alive < spec.lifetime
    }

    that.draw = function () {
      graphics.drawTexture(spec.image, spec.center, spec.rotation, spec.size)
    }

    return that
  }

  that.update = function (elapsedTime, center, angle) {
    const keepMe = []
    for (let particle = 0; particle < particles.length; particle++) {
      if (particles[particle].update(elapsedTime, angle)) {
        keepMe.push(particles[particle])
      }
    }
    particles = keepMe

    for (let particle = 0; particle < 10; particle++) {
      const size = Math.abs(Random.nextGaussian(spec.size.mean, spec.size.stdev))
      const offset = spec.centerOffset
      const xish = Random.nextGaussian(offset.mean, offset.stddev)
      const yish = Random.nextGaussian(offset.mean, offset.stddev)

      const particleCenter = {
        x: center.x - xish,
        y: center.y - yish
      }

      const p = create({
        image: spec.image,
        center: particleCenter,
        size: { x: size, y: size },
        rotation: 0,
        speed: Random.nextGaussian(spec.speed.mean, spec.speed.stdev),
        direction: Random.nextCircleVector(),
        lifetime: Random.nextGaussian(spec.lifetime.mean, spec.lifetime.stdev)
      })
      particles.push(p)
    }
  }

  that.render = function (elapsedTime) {
    for (let p = particles.length - 1; p >= 0; p--) {
      particles[p].draw()
    }
  }

  return that
}

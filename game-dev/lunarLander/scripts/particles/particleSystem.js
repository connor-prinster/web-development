function ParticleSystem (graphics) {
  const constants = new Constants()

  const particleBurstSmoke = ParticleBurst(graphics, constants.particles.particleBurstSmoke)
  const particleBurstFire = ParticleBurst(graphics, constants.particles.particleBurstFire)
  const particleThrust = ParticleThrust(graphics, constants.particles.particleThrust)

  const burst = {
    timeLeft: 4000,
    update: function (elapsedTime, center, angle) {
      particleBurstSmoke.update(elapsedTime, center, angle)
      particleBurstFire.update(elapsedTime, center, angle)
      this.timeLeft -= 100
    },
    render: function () {
      if (this.timeLeft > 0) {
        particleBurstSmoke.render(this.timeLeft)
        particleBurstFire.render(this.timeLeft)
      }
    }
  }

  const thrust = {
    update: function (elapsedTime, lander, makeMore) {
      particleThrust.update(elapsedTime, lander, makeMore)
    },
    render: function () {
      particleThrust.render()
    }
  }
  return {
    shipCrash: burst,
    shipThrust: thrust
  }
}

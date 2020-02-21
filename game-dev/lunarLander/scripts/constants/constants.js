class Constants {
  constructor () {
    const basePath = './design/'
    const imageBasePath = basePath + 'images/'
    const soundBasePath = basePath + 'audio/'

    this.paths = {
      landerPath: imageBasePath + 'ebon_hawk.png',
      backgroundPath: imageBasePath + 'korriban_tomb.jpg',
      crashPath: soundBasePath + 'crashBoom.ogg',
      firstWinPath: soundBasePath + 'firstSuccess.ogg',
      secondWinPath: soundBasePath + 'secondSuccess.ogg',
      rocketPath: soundBasePath + 'rocket.ogg',
      particles: {
        fire: imageBasePath + 'fire.png',
        smoke: imageBasePath + 'smoke-2.png',
        smoke1: imageBasePath + 'smoke.png'
      }
    }
    this.strings = {
      levels: {
        level1: 'Level1',
        level2: 'Level2'
      },
      gameover: 'Game Over!'
    }
    this.math = {
      sound: {
        timeLeft: 1000
      },
      lander: {
        landerSizeRatio: 0.1,
        rotSpeed: 0.02,
        circle: 360,
        gravity: 0.00003,
        thrustRate: 0.0003,
        timeConst: 1,
        fuelBurn: 0.5,
        circleRadius: 12,
        velocityModifier: 40
      },
      landerText: {
        font: '20px monospace',
        textAlign: 'right',
        widthPadding: 10,
        heightPadding: 30,
        upperPadding: 20
      },
      countdownText: {
        font: '80px monospace'
      },
      canvasData: { height: 800, width: 800 },
      terrainData: { maxTerrainHeight: 300, landingPadOne: 100, landingPadTwo: 75, landingPadMargin: 50, mean: 10, stdDev: 50, smallestLine: 35 }
    }

    const smokeImage = new Image()
    smokeImage.src = this.paths.particles.smoke
    const fireImage = new Image()
    fireImage.src = this.paths.particles.fire
    this.particles = {
      particleBurstSmoke: {
        image: smokeImage,
        center: { x: 300, y: 300 },
        centerOffset: { mean: 10, stddev: 20 },
        size: { mean: 10, stdev: 10 },
        speed: { mean: 0, stdev: 1 },
        lifetime: { mean: 1, stdev: 5 },
      },
      particleBurstFire: {
        image: fireImage,
        center: { x: 300, y: 300 },
        centerOffset: { mean: 10, stddev: 20 },
        size: { mean: 10, stdev: 10 },
        speed: { mean: 0, stdev: 1 },
        lifetime: { mean: 1, stdev: 5 },
      },
      particleThrust: {
        image: smokeImage,
        width: this.math.canvasData.width,
        size: { mean: 2, stdev: 1 },
        speed: { mean: 0, stdev: 0.01 },
        lifetime: { mean: 100, stdev: 500 }
      }
    }

    this.math.terrainData.minTerrainHeight = this.math.canvasData.height - 20

    this.colors = {
      terrain: '#FFA630',
      safeZone: '#09E85E',
      white: '#FFFFFF'
    }
  }
}

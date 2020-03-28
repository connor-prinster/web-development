MidtermGame.constants = function() {
  const basePath = './design/'
  const imageBasePath = basePath + 'images/'
  const soundBasePath = basePath + 'audio/'

  const paths = {
    landerPath: imageBasePath + "",
    crashPath: soundBasePath + "",
    particles: {
      fire: imageBasePath + 'fire.png',
      smoke: imageBasePath + 'smoke-2.png',
      smoke1: imageBasePath + 'smoke.png'
    }
  }
  const strings = {
  }
  const math = {
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
      velocityModifier: 30
    },
    landerText: {

    },
    countdownText: {

    },
    canvasData: { height: 800, width: 800 }
  }

  const smokeImage = new Image()
  smokeImage.src = paths.particles.smoke
  const fireImage = new Image()
  fireImage.src = paths.particles.fire
  const particles = {
    particleBurstSmoke: {
      image: smokeImage,
      center: { x: 300, y: 300 },
      centerOffset: { mean: 10, stddev: 20 },
      size: { mean: 10, stdev: 10 },
      speed: { mean: 0, stdev: 1 },
      lifetime: { mean: 1, stdev: 5 }
    },
    particleBurstFire: {
      image: fireImage,
      center: { x: 300, y: 300 },
      centerOffset: { mean: 10, stddev: 20 },
      size: { mean: 10, stdev: 10 },
      speed: { mean: 0, stdev: 1 },
      lifetime: { mean: 1, stdev: 5 }
    },
    particleThrust: {
      image: smokeImage,
      width: math.canvasData.width,
      size: { mean: 2, stdev: 1 },
      speed: { mean: 0, stdev: 0.01 },
      lifetime: { mean: 100, stdev: 50 }
    }
  }

  math.terrainData.minTerrainHeight = math.canvasData.height - 20

  colors = {
    terrain: '#FFA630',
    safeZone: '#09E85E',
    white: '#FFFFFF'
  }

  return {
    paths: paths,
    strings: strings,
    math: math,
    particles: particles,
    colors: colors
  }
}
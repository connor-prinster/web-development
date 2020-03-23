LanderGame.screens['game-play'] = (function (game, objects, renderer, graphics, input) {
  const constants = new Constants()
  document.getElementById('newInGame').onclick = function () {
    initialize()
  }

  window.addEventListener('keydown', inputs.onKeyDown)

  let canvas = null
  let context = null
  let procedural = null
  let prevTime = null
  let lander = null
  let askedForScore = false
  let countdown = true
  let gameOver = false
  let winner = false
  let elapsedCountdown = 3000
  let playingSound = false
  let level = constants.strings.levels.level1
  const thrust = Sounder(constants.paths.rocketPath)

  const particleSystem = ParticleSystem(LanderGame.particleGraphics)

  function initialize () {
    elapsedCountdown = 3000
    countdown = true
    gameOver = false
    askedForScore = false
    winner = false
    playingSound = false
    initializeHtml()
    initializeLander()
  }

  function initializeHtml () {
    canvas = this.document.getElementById('canvas-container')
    context = canvas.getContext('2d')
    context.lineWidth = 3

    procedural = new Procedural(0, canvas.width, canvas.height - 100, level)
    procedural.doProcedural()
  }

  function initializeLander () {
    const initLocation = { x: 0, y: 0 }
    lander = new Lander(constants.paths.landerPath, initLocation)
  }

  function gameLoop (time) {
    const elapsedTime = time - prevTime
    prevTime = time
    processInput(elapsedTime)
    update(elapsedTime)
    render(elapsedTime)

    requestAnimationFrame(gameLoop)
  }

  function processInput (elapsedTime) {
    if (!countdown && !gameOver && !winner && LanderGame.playing) {
      if (inputs.booleans.rotLeft) {
        lander.rotLeft()
      }
      if (inputs.booleans.rotRight) {
        lander.rotRight()
      }
      if (inputs.booleans.thrust && lander.data.fuel > 0) {
        thrust.play()
        lander.thrust(elapsedTime)
      }
    }
  }

  function update (elapsedTime) {
    if (thrust.timeLeft < 0) {
      thrust.stop()
      thrust.timeLeft = constants.math.sound.timeLeft
    } else {
      thrust.timeLeft -= elapsedTime
    }
    if (countdown) {
      updateCountdown(elapsedTime)
    } else if (gameOver) {
      level = constants.strings.levels.level1
      const loseSound = Sounder(constants.paths.crashPath)
      if (!playingSound) {
        playingSound = true
        loseSound.play()
      }
      particleSystem.shipCrash.update(elapsedTime, findCenter(), lander.data.angle)
    } else if (winner) {
      thrust.stop()
      const score =
        lander.data.fuel - // start with the
        (5 * Math.abs(lander.data.thrust.y)) - // minus for how fast you're going
        (5 * Math.abs(lander.data.angle)) // minus for the angle you're at

      if (!askedForScore) {
        const name = prompt("What's your name?")
        addScore(score, name)
        askedForScore = true
      }
    } else if (LanderGame.playing) {
      updateGame(elapsedTime)
    }
    inputs.resetBooleans()
  }

  function addScore (score, name) {
    const localStorageHelper = new LocalStorageHelper()
    localStorageHelper.addScore({ name: name, score: score })
  }

  function updateCountdown (elapsedTime) {
    elapsedCountdown -= elapsedTime
    if (elapsedCountdown <= 0) {
      countdown = false
      initializeHtml()
      initializeLander()
    }
  }

  function updateGame (elapsedTime) {
    lander.move(elapsedTime)
    if (inputs.booleans.thrust && lander.data.fuel > 0) {
      particleSystem.shipThrust.update(elapsedTime, lander, true)
    } else {
      particleSystem.shipThrust.update(elapsedTime, lander, false)
    }
    if (checkIntersections(procedural.lines)) {
      if (lander.checkStatus() && checkIntersections(procedural.safeZones)) {
        if (procedural.safeZones.length != 1) {
          const firstWin = Sounder(constants.paths.firstWinPath)
          firstWin.play()
          level = constants.strings.levels.level2
          elapsedCountdown = 3000
          countdown = true
        } else if (procedural.safeZones.length == 1) {
          const secondWin = Sounder(constants.paths.secondWinPath)
          secondWin.play()
          winner = true
        }
      } else {
        gameOver = true
      }
    }
  }

  function checkIntersections (lines) {
    if (lander.data.center) {
      const imager = lander.image.image
      const ratio = constants.math.lander.landerSizeRatio
      const endWidth = imager.width * ratio
      const endHeight = imager.height * ratio
      const location = lander.data.location
      const circle = {}
      circle.center = {
        x: (endWidth - location.x) / 2,
        y: (endHeight - location.y) / 2
      }
      circle.radius = constants.math.lander.circleRadius
      lander.circle = circle

      for (const idx in lines) {
        const line = lines[idx]
        if (lineCircleIntersection(line.end, line.start, circle)) {
          return true
        }
      }
    }
    return false
  }

  function lineCircleIntersection (pt1, pt2, circle) {
    const v1 = { x: pt2.x - pt1.x, y: pt2.y - pt1.y }
    const v2 = { x: pt1.x - circle.center.x, y: pt1.y - circle.center.y }
    const b = -2 * (v1.x * v2.x + v1.y * v2.y)
    const c = 2 * (v1.x * v1.x + v1.y * v1.y)
    const d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius))
    if (isNaN(d)) { // no intercept
      return false
    }
    // These represent the unit distance of point one and two on the line
    const u1 = (b - d) / c
    const u2 = (b + d) / c
    if (u1 <= 1 && u1 >= 0) { // If point on the line segment
      return true
    }
    if (u2 <= 1 && u2 >= 0) { // If point on the line segment
      return true
    }
    return false
  }

  function render (elapsedTime) {
    const draw = new Draw(context, canvas)
    if (countdown) {
      renderCountdown(draw)
    } else if (gameOver) {
      draw.drawGameOver(particleSystem, elapsedTime, findCenter(), lander.data.angle, procedural)
    } else if (winner) {
      draw.drawWinner()
    } else {
      renderGame(elapsedTime, draw)
    }
  }

  function renderCountdown (draw) {
    draw.drawBackground()
    draw.drawCountdown(Math.ceil(elapsedCountdown / 1000), level)
  }

  function renderGame (elapsedTime, draw) {
    context.clearRect(0, 0, canvas.width, canvas.height)
    draw.clearCanvas()

    draw.drawBackground()
    draw.drawLanderInformation(lander)
    draw.drawTerrain(procedural)
    particleSystem.shipThrust.render()
    draw.drawLander(lander)
  }

  function findCenter () {
    const imager = lander.image.image
    const ratio = constants.math.lander.landerSizeRatio
    const endWidth = imager.width * ratio
    const endHeight = imager.height * ratio

    const location = lander.data.location
    return {
      x: (endWidth - location.x) / 2,
      y: (endHeight - location.y) / 2
    }
  }

  function run () {
    prevTime = performance.now()
    requestAnimationFrame(gameLoop)
  }

  return {
    initialize: initialize,
    run: run
  }
})()

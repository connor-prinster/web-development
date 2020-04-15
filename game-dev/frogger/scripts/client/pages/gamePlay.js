FroggerGame.screens['game-play'] = (function (game, frog, graphics, keyboard, constants, storage, random, terrain, objects) {
  let elapsedTime = 0
  document.getElementById('newInGame').onclick = function (elapsedTime) {
    frog.resetPageToOriginal(elapsedTime)
  }

  document.getElementById('back-button-help').onclick = function () {
    location.reload()
    game.showScreen('main-menu')
    FroggerGame.isPlaying = false
    backgroundSound.pause()
  }

  const backgroundSound = FroggerGame.assets['background.mp3']
  backgroundSound.addEventListener('ended', (event) => {
    backgroundSound.play()
  });

  window.addEventListener('keydown', keyboard.keyDown)

  let prevTime = 0
  let subTime = 30000
  let bonus = []

  function initialize() {

  }

  function gameLoop(time) {
    if (FroggerGame.isPlaying) {
      if(backgroundSound.paused) {
        backgroundSound.load()
        backgroundSound.play()
      }
      elapsedTime = time - prevTime
      prevTime = time
      processInput(elapsedTime)
      update(elapsedTime)
      render(elapsedTime)
    }

    requestAnimationFrame(gameLoop)
  }

  function processInput(elapsedTime) {
    keyboard.update(elapsedTime)
  }

  function update(elapsedTime) {
    frog.update(elapsedTime, true)
    frog.checkIntersection(objects, elapsedTime, FroggerGame.objects.tiles, bonus)
    for (let idx in objects) {
      for (let i = 0; i < objects[idx].length; i++) {
        objects[idx][i].update(elapsedTime)
      }
    }
    frog.checkIntersection
    subTime = frog.data.subTime
    generateBonusElem(elapsedTime)
  }

  function generateBonusElem(elapsedTime) {
    if (bonus.length > 0) {
      bonus[0].update(elapsedTime)
      if (bonus[0].data.timeLeft < 0) {
        bonus.pop()
      }
    }
    else {
      if (random.nextRange(0, 1000) % 250 === 0 && frog.data.possibleWinnerSpots.length > 0) {
        const possiblePositions = frog.data.possibleWinnerSpots
        const pos = possiblePositions[Math.floor(random.nextRange(0, possiblePositions.length))]
        const type = ((random.nextRange(0, 100) % 10) == 0) ? 'otter' : 'fly'
        bonus.push(
          generateBonus(
            "./design/images/sprites/" + type + ".png",
            pos,
            type
          )
        )
      }
    }
  }

  function render(elapsedTime) {
    graphics.clear()
    graphics.drawBackground(terrain)
    graphics.drawTurtles(objects['Turtles'])
    graphics.drawLogs(objects['Logs'])
    graphics.drawAlligators(objects['Alligators'])
    graphics.drawText(frog.getScore())
    graphics.drawTimeLine(subTime / 1000)
    graphics.drawLives(frog.data.numLives)
    graphics.drawWinners(frog.data.winners)
    graphics.drawBonus(bonus)
    graphics.drawFrog(frog)
    graphics.drawLinearParticles(frog.data.linearParticleSystem)
    graphics.drawBurstParticles(frog.data.circleParticleSystem)
    graphics.drawCars(objects['Cars'])
    graphics.drawTrucks(objects['Trucks'])
    if(frog.data.dead) {
      graphics.drawResetText()
    }
  }

  function run() {
    FroggerGame.isPlaying = true
    backgroundSound.play()
    const controls = storage.retrieveControls()
    for (let idx in controls) {
      const method = controls[idx].method
      const key = controls[idx].key
      keyboard.registerHandler(frog[method], key)
    }

    frog.moveTo(0, { x: constants.math.canvas.cellSize / 2, y: constants.math.canvas.height - (constants.math.canvas.cellSize / 2) })

    prevTime = performance.now()
    frog.resetPageToOriginal()
    requestAnimationFrame(gameLoop)
  }

  return {
    initialize: initialize,
    run: run
  }
})(FroggerGame.game, FroggerGame.frog, FroggerGame.graphics, FroggerGame.input.keyboard, FroggerGame.constants, FroggerGame.utilities.storage, FroggerGame.utilities.random, FroggerGame.terrain, FroggerGame.objects)

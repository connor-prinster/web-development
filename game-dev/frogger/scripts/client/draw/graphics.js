FroggerGame.graphics = function (constants) {
  'use strict'

  const canvas = document.getElementById('canvas-container')
  const context = canvas.getContext('2d')

  function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  function drawBackground(terrain) {
    const tiles = constants.sprites.tiles
    let center = { x: 0, y: 0 }
    const image = FroggerGame.assets['terrain.png']
    const spriteVals = terrain.data.sprite
    const pixelVals = generatePixelVals(image, spriteVals.numSprites)

    center = drawPads(image, center, pixelVals, tiles)
    center = drawWater(image, center, pixelVals, tiles)
    center = drawGrass(image, center, pixelVals, tiles)
    center = drawRoad(image, center, pixelVals, tiles)
    center = drawGrass(image, center, pixelVals, tiles)
  }

  function drawRoad(image, center, pixelVals, tiles) {
    let list = []
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 13; j++) {
        center = drawTile(image, center, pixelVals, tiles.ROAD)
        list.push({ x: center.x, y: center.y, type: 'road' })
        if (FroggerGame.objects.tiles.road.length == 0) {
          FroggerGame.objects.tiles.road = list
        }
      }
      center.x = 0
      center.y += pixelVals.pixelHeight
    }
    return center
  }

  function drawGrass(image, center, pixelVals, tiles) {
    let list = []
    for (let i = 0; i < 13; i++) {
      center = drawTile(image, center, pixelVals, tiles.GRASS)
      list.push({ x: center.x, y: center.y, type: 'grass' })
      if (FroggerGame.objects.tiles.grass.length == 0) {
        FroggerGame.objects.tiles.grass = list
      }
    }
    center.x = 0
    center.y += pixelVals.pixelHeight
    return center
  }

  function drawWater(image, center, pixelVals, tiles) {
    let list = []
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 13; j++) {
        center = drawTile(image, center, pixelVals, tiles.WATER)
        list.push({ x: center.x, y: center.y, type: 'water' })
        if (FroggerGame.objects.tiles.water.length == 0) {
          FroggerGame.objects.tiles.water = list
        }
      }
      center.x = 0
      center.y += pixelVals.pixelHeight
    }
    return center
  }

  function drawPads(image, center, pixelVals, tiles) {
    let pads = []
    let bushes = []
    for (let i = 0; i < 13; i++) {
      let whichSprite = tiles.PAD
      let textWhich = "lilypad"
      if (i % 3 != 0) {
        whichSprite = tiles.BUSH
        textWhich = 'bush'
      }
      center = drawTile(image, center, pixelVals, whichSprite)
      if (textWhich == 'lilypad' && FroggerGame.objects.tiles.lilypad.length == 0) {
        pads.push({ x: center.x, y: center.y, type: textWhich })
      }
      else if (textWhich == 'bush' && FroggerGame.objects.tiles.bush.length == 0) {
        bushes.push({ x: center.x, y: center.y, type: textWhich })
      }
    }
    if (FroggerGame.objects.tiles.lilypad.length == 0 && FroggerGame.objects.tiles.bush.length == 0) {
      FroggerGame.objects.tiles.lilypad = pads
      FroggerGame.objects.tiles.bush = bushes
    }
    center.x = 0
    center.y += pixelVals.pixelHeight

    return center
  }

  function drawTile(image, center, pixelVals, whichSprite) {
    context.drawImage(
      image,
      pixelVals.pixelWidth * whichSprite, 0,    // Which sprite to pick out
      pixelVals.pixelWidth, pixelVals.pixelHeight,    // The size of the sprite in the sprite sheet
      center.x,        // Where to draw the sprite
      center.y,
      pixelVals.pixelWidth, pixelVals.pixelHeight
    );
    center.x += pixelVals.pixelWidth
    return center
  }

  function drawInformation() {
    if (Math.abs(velocity) <= 2) {
      context.fillStyle = colors.safeZone
    } else {
      context.fillStyle = colors.white
    }
    context.fillText(velocity + ' m/s', canvasData.width - textData.widthPadding, textData.heightPadding)
  }

  function generatePixelVals(image, spriteCount) {
    return {
      pixelHeight: image.height,
      pixelWidth: (image.width / spriteCount)
    }
  }

  function drawFrog(frog) {
    const center = frog.data.center
    const rotation = !frog.data.dead ? frog.data.rotation : 0
    const image = !frog.data.dead ? frog.drawable.image : frog.deadDraw.image
    const spriteVals = !frog.data.dead ? frog.data.sprite : { whichSprite: 0 }
    const pixelVals = !frog.data.dead ? generatePixelVals(image, spriteVals.numSprites) : generatePixelVals(image, 1)

    context.save()

    context.translate(center.x, center.y)
    context.rotate(rotation)
    context.translate(-center.x, -center.y)
    context.drawImage(
      image,
      pixelVals.pixelWidth * spriteVals.whichSprite, 0,    // Which sprite to pick out
      pixelVals.pixelWidth, pixelVals.pixelHeight,    // The size of the sprite in the sprite sheet
      center.x - pixelVals.pixelWidth / 2,        // Where to draw the sprite
      center.y - pixelVals.pixelHeight / 2,
      pixelVals.pixelWidth, pixelVals.pixelHeight
    );

    context.restore()
  }

  function drawCars(cars) {
    for (let i = 0; i < cars.length; i++) {
      drawCar(cars[i])
    }
  }

  function drawCar(car) {
    const center = car.data.center
    const image = car.drawable.image
    const spriteVals = car.data.sprite
    const pixelVals = generatePixelVals(image, spriteVals.numSprites)
    context.save()

    context.translate(center.x, center.y)
    context.translate(-center.x, -center.y)
    context.drawImage(
      image,
      pixelVals.pixelWidth * spriteVals.whichSprite, 0,    // Which sprite to pick out
      pixelVals.pixelWidth, pixelVals.pixelHeight,    // The size of the sprite in the sprite sheet
      center.x - pixelVals.pixelWidth / 2,        // Where to draw the sprite
      center.y - pixelVals.pixelHeight / 2,
      pixelVals.pixelWidth, pixelVals.pixelHeight
    );

    context.restore()
  }

  function drawTrucks(trucks) {
    for (let i = 0; i < trucks.length; i++) {
      drawTruck(trucks[i])
    }
  }

  function drawTruck(truck) {
    const center = truck.data.center
    const image = truck.drawable.image
    const spriteVals = truck.data.sprite
    const pixelVals = generatePixelVals(image, spriteVals.numSprites)

    context.drawImage(
      image,
      pixelVals.pixelWidth * spriteVals.whichSprite, 0,    // Which sprite to pick out
      pixelVals.pixelWidth, pixelVals.pixelHeight,    // The size of the sprite in the sprite sheet
      center.x - pixelVals.pixelWidth / 2,        // Where to draw the sprite
      center.y - pixelVals.pixelHeight / 2,
      pixelVals.pixelWidth, pixelVals.pixelHeight
    );
  }

  function drawLogs(logs) {
    for (let i = 0; i < logs.length; i++) {
      drawLog(logs[i])
    }
  }

  function drawLog(log) {
    const center = log.data.center
    const image = log.drawable.image
    const spriteVals = log.data.sprite
    const pixelVals = generatePixelVals(image, spriteVals.numSprites)
    context.save()

    context.drawImage(
      image,
      pixelVals.pixelWidth * spriteVals.whichSprite, 0,    // Which sprite to pick out
      pixelVals.pixelWidth, pixelVals.pixelHeight,    // The size of the sprite in the sprite sheet
      center.x - pixelVals.pixelWidth / 2,        // Where to draw the sprite
      center.y - pixelVals.pixelHeight / 2,
      pixelVals.pixelWidth, pixelVals.pixelHeight
    );

    context.restore()
  }

  function drawTurtles(turtles) {
    for (let i = 0; i < turtles.length; i++) {
      drawTurtle(turtles[i])
    }
  }

  function drawTurtle(turtle) {
    const center = turtle.data.center
    const image = turtle.drawable.image
    const spriteVals = turtle.data.sprite
    const pixelVals = generatePixelVals(image, spriteVals.numSprites)

    const pixelSize = constants.math.canvas.cellSize

    context.save()
    context.translate(center.x, center.y)
    context.rotate(Math.PI)
    context.translate(-center.x, -center.y)
    context.drawImage(
      image,
      pixelVals.pixelWidth * spriteVals.whichSprite + (spriteVals.whichSprite * 3), 0,    // Which sprite to pick out
      pixelVals.pixelWidth, pixelVals.pixelHeight,    // The size of the sprite in the sprite sheet
      center.x - pixelSize / 2,   // Where to draw the sprite
      center.y - pixelSize / 2,
      pixelSize, pixelSize
    );
    context.restore()
  }

  function drawAlligators(alligators) {
    for (let i = 0; i < alligators.length; i++) {
      drawAlligator(alligators[i])
    }
  }

  function drawAlligator(alligator) {
    const center = alligator.data.center
    const image = alligator.drawable.image
    const spriteVals = alligator.data.sprite
    const pixelVals = generatePixelVals(image, spriteVals.numSprites)
    context.drawImage(
      image,
      pixelVals.pixelWidth * spriteVals.whichSprite, 0,    // Which sprite to pick out
      pixelVals.pixelWidth, pixelVals.pixelHeight,    // The size of the sprite in the sprite sheet
      center.x - pixelVals.pixelWidth / 2,        // Where to draw the sprite
      center.y - pixelVals.pixelHeight / 2,
      pixelVals.pixelWidth, pixelVals.pixelHeight
    );
  }

  function drawTimeLine(timeLeft) {
    context.fillStyle = 'red';
    if (timeLeft >= 0) {
      context.fillRect(
        constants.math.canvas.width - 310,
        constants.math.canvas.height - 40,
        300 * (timeLeft / 30),
        30
      );
    }

    context.fillStyle = 'black';
    context.strokeRect(
      constants.math.canvas.width - 310,
      constants.math.canvas.height - 40,
      300,
      30
    );
  }

  function drawText(score) {
    context.font = constants.text.scoreText.font
    context.textAlign = constants.text.scoreText.textAlign

    context.fillText(
      score + " points",
      constants.math.canvas.width - constants.text.scoreText.widthPadding,
      constants.math.canvas.height - constants.text.scoreText.heightPadding
    )
  }

  function drawLives(numLives) {
    const frogDrawable = new Drawable(FroggerGame.assets["frog.png"])
    const center = { x: 0, y: 0 }
    const image = frogDrawable.image
    const spriteVals = { whichSprite: 0 }
    const pixelVals = { pixelHeight: 77, pixelWidth: 56.57142857142857 }
    for (let i = numLives - 1; i >= 0; i--) {
      context.drawImage(
        image,
        pixelVals.pixelWidth * spriteVals.whichSprite, 0,    // Which sprite to pick out
        pixelVals.pixelWidth, pixelVals.pixelHeight,    // The size of the sprite in the sprite sheet
        constants.math.canvas.width - 375 - (i * pixelVals.pixelWidth),  // Where to draw the sprite
        constants.math.canvas.height - 75,
        pixelVals.pixelWidth, pixelVals.pixelHeight
      );
    }
  }

  function drawWinners(winners) {
    const frogDrawable = new Drawable(FroggerGame.assets['frog.png'])
    const image = frogDrawable.image
    const spriteVals = { whichSprite: 0 }
    const pixelVals = { pixelHeight: 77, pixelWidth: 56.57142857142857 }
    for (let i = 0; i < winners.length; i++) {
      const center = winners[i]
      context.drawImage(
        image,
        pixelVals.pixelWidth * spriteVals.whichSprite, 0,    // Which sprite to pick out
        pixelVals.pixelWidth, pixelVals.pixelHeight,    // The size of the sprite in the sprite sheet
        center.x - 70, // where to draw sprite
        center.y,
        pixelVals.pixelWidth, pixelVals.pixelHeight
      );
    }
  }

  function drawBonus(bonuses) {
    if (bonuses.length > 0) {
      const bonus = bonuses[0]
      const center = bonus.data.center
      const image = FroggerGame.assets[bonus.data.type + '.png']//bonus.drawable.image
      const spriteVals = { whichSprite: 0 }
      const pixelVals = generatePixelVals(image, 1)

      context.drawImage(
        image,
        pixelVals.pixelWidth * spriteVals.whichSprite, 0,    // Which sprite to pick out
        pixelVals.pixelWidth, pixelVals.pixelHeight,    // The size of the sprite in the sprite sheet
        center.x - 70, // where to draw sprite
        center.y + 10,
        pixelVals.pixelWidth, pixelVals.pixelHeight
      );
    }
  }

  function drawRectangle(rect) {
    context.save();
    context.translate(rect.center.x, rect.center.y);
    context.rotate(rect.rotation);
    context.translate(-rect.center.x, -rect.center.y);

    context.fillStyle = rect.fill;
    context.fillRect(rect.center.x - rect.size.x / 2, rect.center.y - rect.size.y / 2, rect.size.x, rect.size.y);

    context.strokeStyle = rect.stroke;
    context.strokeRect(rect.center.x - rect.size.x / 2, rect.center.y - rect.size.y / 2, rect.size.x, rect.size.y);

    context.restore();
  }

  function drawLinearParticles(systems) {
    if (systems) {
      for (let i = 0; i < systems.length; i++) {

        systems[i].system.render()
      }
    }
  }

  function drawBurstParticles(system) {
    if (system) {
      system.render()
    }
  }

  function drawResetText() {
    context.font = constants.text.resetText.font
    context.textAlign = constants.text.resetText.textAlign

    context.fillText(
      "You've Been Squished!",
      constants.math.canvas.width - constants.math.canvas.width / 2,
      constants.math.canvas.height - constants.math.canvas.height / 2 + 25
    )
  }

  return {
    clear: clear,
    drawBackground: drawBackground,
    drawInformation: drawInformation,
    drawFrog: drawFrog,
    drawCars: drawCars,
    drawTurtles: drawTurtles,
    drawTrucks: drawTrucks,
    drawLogs: drawLogs,
    drawAlligators: drawAlligators,
    drawText: drawText,
    drawTimeLine: drawTimeLine,
    drawLives: drawLives,
    drawWinners: drawWinners,
    drawBonus: drawBonus,
    drawRectangle: drawRectangle,
    drawLinearParticles: drawLinearParticles,
    drawBurstParticles: drawBurstParticles,
    drawResetText: drawResetText
  }
}(FroggerGame.constants)
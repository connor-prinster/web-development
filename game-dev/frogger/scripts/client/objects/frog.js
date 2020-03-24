FroggerGame.frog = (function (location, imageSource, constants, graphics) {
  let drawable = new Drawable(imageSource, location)
  let deadDraw = new Drawable(FroggerGame.assets["dead.png"], location)
  const directions = constants.frog.directions
  let localTime = 0
  let score = 0
  let timeOverTimer = 3500

  const originalWinnerSpots = [
    { x: 77, y: 0, type: "lilypad" },
    { x: 308, y: 0, type: "lilypad" },
    { x: 539, y: 0, type: "lilypad" },
    { x: 770, y: 0, type: "lilypad" },
    { x: 1001, y: 0, type: "lilypad" }
  ]

  let data = {
    addedScore: false,
    linearParticleSystem: null,
    circleParticleSystem: null,
    linearParticleTime: 2000,
    circleParticleTime: 900,
    subTime: 30000,
    possibleWinnerSpots: originalWinnerSpots,
    winners: [],
    dead: false,
    center: location,
    rotation: constants.math.toRadians(180),
    image: drawable.image,
    deadImage: deadDraw.image,
    deadImage: JSON,
    numLives: 4,
    sprite: {
      rotText: "up",
      moving: false,
      numSprites: 7,
      whichSprite: 0,
      spriteTime: [200, 37.5, 35, 37.5, 40, 45, 100]
    },
    where: {
      object: null,
      tile: null
    }
  }

  function objectIntersection(objectSets) {
    const center = data.center
    center.radius = constants.math.canvas.cellSize / 2

    for (let idx in objectSets) {
      const objects = objectSets[idx]
      for (let i = 0; i < objects.length; i++) {
        const objData = objects[i].data
        if (lineCircleIntersection(
          { x: objData.center.x - objData.offsets.start, y: objData.center.y },
          { x: objData.center.x + objData.offsets.end, y: objData.center.y },
          center
        )) {
          return { idx: idx, data: objData }
        }
      }
    }
  }

  function tileIntersection(tileSets) {
    const center = data.center
    center.radius = constants.math.canvas.cellSize / 2

    for (let idx in tileSets) {
      const tiles = tileSets[idx]
      for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i]
        if (lineCircleIntersection(
          { x: tile.x - 77, y: tile.y + 38.5 },
          { x: tile.x, y: tile.y + 38.5 },
          center
        )) {
          return { idx: idx, tileCenter: tile } // returning the type of object we've intersected
        }
      }
    }
  }

  function checkIntersection(objectSets, elapsedTime, tiles, bonuses) {
    setWhichTile(
      { tile: tileIntersection(tiles), object: objectIntersection(objectSets) },
      elapsedTime,
      bonuses
    )
  }

  function lineCircleIntersection(pt1, pt2, circle) {

    const v1 = { x: pt2.x - pt1.x, y: pt2.y - pt1.y }
    const v2 = { x: pt1.x - circle.x, y: pt1.y - circle.y }
    const b = -2 * (v1.x * v2.x + v1.y * v2.y)
    const c = 2 * (v1.x * v1.x + v1.y * v1.y)

    const d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius))// * circle.radius))
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

  function update(elapsedTime) {
    if (data.linearParticleSystem && data.linearParticleTime >= 0) {
      data.linearParticleTime -= elapsedTime
      for (let i = 0; i < data.linearParticleSystem.length; i++) {
        const system = data.linearParticleSystem[i]
        // that.update = function(elapsedTime, direction, ranges)
        system.system.update(elapsedTime, system.direction, system.ranges)
      }
    }
    else {
      data.linearParticleSystem = null
      data.linearParticleTime = 2000
    }

    if (data.circleParticleSystem && data.circleParticleTime >= 0) {
      data.circleParticleTime -= elapsedTime
      data.circleParticleSystem.update(elapsedTime)
    }
    else {
      data.circleParticleTime = 900
      data.circleParticleSystem = null
    }

    data.subTime -= elapsedTime
    if (data.subTime < 0) {
      doDead(false, elapsedTime)
    }
    localTime += elapsedTime
    //
    // Check to see if we should update the animation frame
    if (!data.dead && isMoving() && localTime >= data.sprite.spriteTime[data.sprite.whichSprite]) {
      //
      // When switching sprites, keep the leftover time because
      // it needs to be accounted for the next sprite animation frame.
      localTime -= data.sprite.spriteTime[data.sprite.whichSprite];
      data.sprite.whichSprite += 1;
      data.sprite.whichSprite = data.sprite.whichSprite % data.sprite.numSprites
      incrementMove(elapsedTime)
      if (data.sprite.whichSprite == 6) {
        stopMove()
        if (data.sprite.rotText === directions.UP.text) {
          score += 10
        }
      }
    }
  };

  function setWhichTile(intersects, elapsedTime, bonuses) {
    if (!isMoving()) {
      data.where = { object: intersects.object, tile: intersects.tile }
      if (data.where.object !== undefined) {
        checkLogTurtleAlligator(elapsedTime)
      }
      if (!data.dead && data.where.object === undefined && data.where.tile !== undefined && (data.where.tile.idx === 'water' || data.where.tile.idx === 'bush')) {
        FroggerGame.assets['plunk.mp3'].play()
        doDead(false, elapsedTime)
      }
      if (data.where.tile && data.where.tile.idx === 'lilypad' && !data.winners.includes(data.where.tile.tileCenter)) {
        if (bonuses[0] !== undefined && bonuses[0].data.center.x == data.where.tile.tileCenter.x && bonuses[0].data.center.y == data.where.tile.tileCenter.y) {
          if (bonuses[0].data.type == 'fly') {
            score += 200
          }
          else {
            doDead(false, elapsedTime)
            return null
          }
        }
        lilyPadBurst(data.where.tile.tileCenter)
        data.winners.push(data.where.tile.tileCenter)

        score += toLilyPadPoints()
        if (data.winners.length === 5) {
          score += 1000
          resetFrogData()
        }
        returnToStart()
      }
    }
  }

  function resetPageToOriginal() {
    data.subTime = 30000
    data.possibleWinnerSpots = originalWinnerSpots
    data.addedScore = false
    data.winners = []
    data.dead = false
    data.numLives = 4
    data.sprite = {
      rotText: "up",
      moving: false,
      numSprites: 7,
      whichSprite: 0,
      spriteTime: [200, 37.5, 35, 37.5, 40, 45, 100]
    }
    data.where = {
      object: null,
      tile: null
    }
    score = 0
    returnToStart()
  }

  function returnToStart() {
    data.subTime = 30000
    moveTo(0, { x: constants.math.canvas.cellSize / 2, y: constants.math.canvas.height - (constants.math.canvas.cellSize / 2) })
    setRotation(directions.UP)
  }

  function resetFrogData() {
    data.possibleWinnerSpots = originalWinnerSpots
    data.addedScore = false
    data.winners = []
    data.dead = false
    data.sprite = {
      rotText: "up",
      moving: false,
      numSprites: 7,
      whichSprite: 0,
      spriteTime: [200, 37.5, 35, 37.5, 40, 45, 100]
    }
    data.where = {
      object: null,
      tile: null
    }
    returnToStart()
  }

  function toLilyPadPoints() {
    return (10 * (parseInt((data.subTime / 1000).toString().split('.')[0]) / 2)) + 50
  }

  function checkLogTurtleAlligator(elapsedTime) {
    if (data.where.object.idx === "Turtles" && !data.dead) {
      if (data.where.object.data.sprite.whichSprite === data.where.object.data.sprite.numSprites - 1) {
        doDead(false, elapsedTime)
      }
      else {
        moveTo(elapsedTime, {
          x: data.center.x + constants.math.speed.turtle,
          y: data.center.y
        })
      }
    }
    else if (data.where.object.idx === "Logs" && !data.dead) {
      if (data.center.y > 154) {
        moveTo(elapsedTime, {
          x: data.center.x + constants.math.speed.log,
          y: data.center.y
        })
      }
      else {
        moveTo(elapsedTime, {
          x: data.center.x + constants.math.speed.alligator,
          y: data.center.y
        })
      }
    }
    else if (data.where.object.idx === "Alligators" && !data.dead) {
      if (data.where.object.data.sprite.whichSprite == 0) {
        moveTo(elapsedTime, {
          x: data.center.x + constants.math.speed.alligator,
          y: data.center.y
        })
      }
      else {
        doDead(false, elapsedTime)
      }
    }
    else if (data.where.object) {
      if (data.where.object.idx === "Trucks" || data.where.object.idx === "Cars") {
        doDead(true, elapsedTime)
      }
      else {
        doDead(false, elapsedTime)
      }
    }
  }

  function doDead(vehicle, elapsedTime) {

    if (data.numLives > 0) {
      data.numLives--
      data.subTime = 30000
      if (vehicle) {
        FroggerGame.assets['squish.mp3'].play()
        frogBurst(data.center)
      }
      returnToStart()
    }
    else {
      if (!data.addedScore) {
        FroggerGame.utilities.storage.addScore(score)
        data.addedScore = true
      }
      data.dead = true
    }

  }

  function incrementMove(elapsedTime) {
    const direction = data.sprite.rotText
    const speed = {
      x: (constants.math.speed.frog / (data.sprite.numSprites - 1)),
      y: (constants.math.speed.frog / (data.sprite.numSprites - 1))
    }
    if (direction == directions.UP.text) {
      moveTo(elapsedTime, {
        x: data.center.x,
        y: data.center.y - speed.y
      })
    }
    else if (direction == directions.DOWN.text) {
      moveTo(elapsedTime, {
        x: data.center.x,
        y: data.center.y + speed.y
      })
    }
    else if (direction == directions.LEFT.text) {
      moveTo(elapsedTime, {
        x: data.center.x - speed.x,
        y: data.center.y
      })
    }
    else {
      moveTo(elapsedTime, {
        x: data.center.x + speed.x,
        y: data.center.y
      })
    }
  }

  function startMove() {
    if (!isMoving()) {
      data.sprite.whichSprite = 0
      data.sprite.moving = true
    }
  }

  function isMoving() {
    return data.sprite.moving
  }

  function stopMove() {
    data.sprite.whichSprite = 0
    data.sprite.moving = false
  }

  function up(elapsedTime) {
    setRotation(directions.UP)
    startMove()
  }

  function down(elapsedTime) {
    setRotation(directions.DOWN)
    startMove()
  }

  function left(elapsedTime) {
    setRotation(directions.LEFT)
    startMove()
  }

  function right(elapsedTime) {
    setRotation(directions.RIGHT)
    startMove()
  }

  function setRotation(angle) {
    if (!isMoving()) {
      data.sprite.rotText = angle.text
      data.rotation = constants.math.toRadians(angle.deg)
    }
  }

  function moveTo(elapsedTime, location) {
    FroggerGame.assets['hop.mp3'].play()

    data.center = location
  }

  function getScore() {
    return score
  }

  function frogBurst(center) {
    data.circleParticleSystem = ParticleSystem(constants.colors.chunks, graphics, {
      center: center,
      size: { mean: 8, stdev: 3 },
      speed: { mean: 0, stdev: 0.1 },
      lifetime: { mean: 10, stdev: 250 }
    });
  }

  function lilyPadBurst(center) {
    const x = center.x
    const y = center.y
    data.linearParticleSystem = [
      {
        // down
        system: ParticleSystemLinear(constants.colors.success, graphics, {
          width: 100,
          size: { mean: 5, stdev: 3 },
          speed: { mean: 0, stdev: 0.1 },
          // lifetime: { mean: 4000, stdev: 500 }
        }),
        direction: { x: 0, y: 1 },
        ranges: {
          x: { start: x - 77, end: x },
          y: { start: y + 77, end: y + 77 }
        }
      },
      {
        system: ParticleSystemLinear(constants.colors.success, graphics, {
          width: 100,
          size: { mean: 5, stdev: 3 },
          speed: { mean: 0, stdev: 0.1 },
        }),
        direction: { x: 1, y: 0 },
        ranges: {
          x: { start: x, end: x },
          y: { start: y, end: y + 77 }
        }
      },
      {
        system: ParticleSystemLinear(constants.colors.success, graphics, {
          width: 100,
          size: { mean: 5, stdev: 3 },
          speed: { mean: 0, stdev: 0.1 },
        }),
        direction: { x: 0, y: -1 },
        ranges: {
          x: { start: x - 77, end: x },
          y: { start: y, end: y }
        }
      },
      {
        system: ParticleSystemLinear(constants.colors.success, graphics, {
          width: 100,
          size: { mean: 5, stdev: 3 },
          speed: { mean: 0, stdev: 0.1 },
        }),
        direction: { x: -1, y: 0 },
        ranges: {
          x: { start: x - 77, end: x - 77 },
          y: { start: y, end: y + 77 }
        }
      },
    ]
  }

  return {
    drawable: drawable,
    deadDraw: deadDraw,
    data: data,
    setWhichTile: setWhichTile,
    update: update,
    up: up,
    down: down,
    left: left,
    right: right,
    moveTo: moveTo,
    checkIntersection: checkIntersection,
    getScore: getScore,
    resetPageToOriginal: resetPageToOriginal,
    lilypadBurst: lilyPadBurst
  }
})({ x: 0, y: 0 }, FroggerGame.assets['frog.png'], FroggerGame.constants, FroggerGame.graphics)

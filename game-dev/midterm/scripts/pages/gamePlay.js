MidtermGame.screens['game-play'] = (function (game, object, graphics, keyboard, mouse, constants, storage) {
  document.getElementById('newInMidtermGame').onclick = function () {
    run()
  }

  window.addEventListener('keydown', keyboard.keyDown)

  document.getElementById('hardBtn').onclick = function () {
    difficulty = constants.strings.hard
    run()
  }

  document.getElementById('easyBtn').onclick = function () {
    difficulty = constants.strings.easy
    run()
  }

  let canvas = document.getElementById('canvas-container')
  let prevTime = 0
  let difficulty = constants.strings.easy
  let totalTime = 0
  let board = null
  let totalClicks = 0
  let winner = false
  let totalMove = false
  let swappingData = null
  let currentlySwapping = false

  function initialize() {

  }

  function gameLoop(time) {
    const elapsedTime = time - prevTime
    prevTime = time
    processInput(elapsedTime)
    update(elapsedTime)
    render(elapsedTime)

    requestAnimationFrame(gameLoop)
  }

  function processInput(elapsedTime) {
    mouse.update(elapsedTime)
  }

  function checkXYs(position) {
    if (board[position.col][position.row].pos.x == board[position.col][position.row].tile.correctCell.x) {
      if (board[position.col][position.row].pos.y == board[position.col][position.row].tile.correctCell.y) {
        return true
      }
    }
    return false
  }

  function resetBoard() {
    totalTime = 0
    totalClicks = 0
    winner = false
  }

  function moving(cell) {

  }

  function checkBoardFinished() {
    let trues = 0
    for (let i = 0; i < difficulty.by; i++) {
      for (let j = 0; j < difficulty.by; j++) {
        if (checkXYs({ row: i, col: j })) {
          trues++
        }
      }
    }
    if (trues === ((difficulty.by * difficulty.by) - 1)) {
      winner = true
      storage.addScore({ difficulty: difficulty.title, clicks: totalClicks, time: Math.floor(totalTime / 1000) })
    }
  }

  function linearParticleUpdate(elapsedTime) {
    for (let i = 0; i < difficulty.by; i++) {
      for (let j = 0; j < difficulty.by; j++) {
        const linearParticleSystems = board[i][j].linearParticleSystem
        if (linearParticleSystems) {
          for (let idx in linearParticleSystems.systems) {
            let system = linearParticleSystems.systems[idx]
            const particleOffset = (constants.math.canvas.either / difficulty.by) / 2
            if (system.direction && system.ranges) {
              board[i][j].linearParticleSystem.systems[idx].system.update(elapsedTime, system.direction, system.ranges, particleOffset)
            }
          }
          if (linearParticleSystems.time >= 0) {
            board[i][j].linearParticleSystem.time -= elapsedTime
          }
          else {
            board[i][j].linearParticleSystem = null
          }
        }
      }
    }
  }

  function update(elapsedTime) {
    if (!winner) {
      totalTime += elapsedTime
    }
    if (swappingData) {
      updateSwapping(elapsedTime)
    }
    linearParticleUpdate(elapsedTime)
  }

  function finalSwap() {
    const orig = swappingData.orig
    const clickedPos = orig.clicked.atWhichCell
    const nullPos = orig.null.atWhichCell

    const origClickData = JSON.stringify(board[clickedPos.y][clickedPos.x].tile)
    board[clickedPos.y][clickedPos.x].tile = JSON.parse(JSON.stringify(board[nullPos.x][nullPos.y].tile))
    board[nullPos.y][nullPos.x].tile = JSON.parse(origClickData)

    board[clickedPos.y][clickedPos.x].tile.atWhichCell = JSON.parse(JSON.stringify(clickedPos))
    board[nullPos.y][nullPos.x].tile.atWhichCell = JSON.parse(JSON.stringify(nullPos))

    const nowNullPos = locationToCellPos(JSON.parse(JSON.stringify(board[clickedPos.y][clickedPos.x])).cell)
    const nowClickedPos = locationToCellPos(JSON.parse(JSON.stringify(board[nullPos.y][nullPos.x])).cell)

    board[clickedPos.y][clickedPos.x].pos = nowNullPos
    board[clickedPos.y][clickedPos.x].tile.imagePath = null
    board[nullPos.y][nullPos.x].pos = nowClickedPos

    if (checkXYs({row: nullPos.x, col: nullPos.y})) {
      const x = board[nullPos.x][nullPos.y].pos.x
      const y = board[nullPos.x][nullPos.y].pos.y
      const tileWidth = (constants.math.canvas.either / difficulty.by)
      board[nullPos.x][nullPos.y].linearParticleTime = constants.math.time.linearParticles
      board[nullPos.x][nullPos.y].linearParticleSystem = {
        systems: [
          {
            // down
            system: ParticleSystemLinear(constants.colors.success, graphics, {
              width: 100,
              size: { mean: 5, stdev: 3 },
              speed: { mean: 0, stdev: 0.1 },
            }),
            direction: { x: 0, y: 1 },
            ranges: {
              x: { start: y - tileWidth, end: y },
              y: { start: x + tileWidth, end: x + tileWidth }
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
              x: { start: y, end: y },
              y: { start: x, end: x + tileWidth }
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
              x: { start: y - tileWidth, end: y },
              y: { start: x, end: x }
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
              x: { start: y - tileWidth, end: y - tileWidth },
              y: { start: x, end: x + tileWidth }
            }
          },
        ],
        time: constants.math.time.linearParticles
      }
    }
    checkBoardFinished()
  }

  function updateSwapping(elapsedTime) {
    if (swappingData.transitionTime <= 0) {
      finalSwap()
      console.log(
        board[swappingData.clickedPos.row][swappingData.clickedPos.col],
        board[swappingData.nullPos.row][swappingData.nullPos.col]
      )//board[swappingData.clickedPos.row][swappingData.clickedPos.col].pos = board[swappingData.clickedPos.row][swappingData.clickedPos.col].pos
      swappingData = null
    }
    else {
      swappingData.transitionTime -= elapsedTime
      incrementMove(elapsedTime, swappingData.clickedPos, swappingData.nullPos)
      // console.log(board[swappingData.clickedPos.row][swappingData.clickedPos.col], board[swappingData.clickedPos.row][swappingData.clickedPos.col].pos)

    }
  }

  function whichDirection(clickedPos, nullPos) {
    if (clickedPos.row != nullPos.row) {
      return (clickedPos.row > nullPos.row) ? "up" : "down"
    }
    else {
      return (clickedPos.col > nullPos.col) ? "left" : "right"
    }
  }

  function incrementMove(elapsedTime, clickedPos, nullPos) {
    const halfEach = (constants.math.canvas.either / difficulty.by)
    const speed = (halfEach / 1000 * elapsedTime)

    if (swappingData.direction == "up") {
      board[clickedPos.row][clickedPos.col].pos.y -= speed
    }
    else if (swappingData.direction == "down") {
      board[clickedPos.row][clickedPos.col].pos.y += speed
    }
    else if (swappingData.direction == "left") {
      board[clickedPos.row][clickedPos.col].pos.x -= speed
    }
    else {
      board[clickedPos.row][clickedPos.col].pos.x += speed
    }
  }

  function linearParticleRender(elapsedTime) {
    for (let i = 0; i < difficulty.by; i++) {
      for (let j = 0; j < difficulty.by; j++) {
        const linearParticleSystems = board[i][j].linearParticleSystem
        if (linearParticleSystems) {
          for (let idx in linearParticleSystems.systems) {
            board[i][j].linearParticleSystem.systems[idx].system.render()
          }
        }
      }
    }
  }

  function render(elapsedTime) {
    graphics.clear()

    for (let i = 0; i < board[0].length; i++) {
      const row = board[i]
      for (let j = 0; j < row.length; j++) {
        const tile = board[j][i]
        if (tile != constants.strings.empty) {
          graphics.drawTile(tile, difficulty)
        }
      }
    }

    linearParticleRender(elapsedTime)
    if (winner) {
      graphics.drawWinScreen()
      graphics.drawInformation(totalClicks, totalTime)
    }
    else {
      graphics.drawInformation(totalClicks, totalTime)
    }
  }

  function buildBoard() {
    board = []
    for (let i = 0; i < difficulty.by; i++) {
      board.push([])
      for (let j = 0; j < difficulty.by; j++) {
        board[i].push({ tile: null, pos: null, cell: null, clickRange: null })
      }
    }
  }

  function locationToCell(cellId) {
    const x = cellId % (difficulty.by)
    const y = Math.floor(cellId / (difficulty.by))

    return { x: x, y: y }
  }

  function cellToLocation(cellId) {
    const loc = locationToCell(cellId)
    const maxEach = (constants.math.canvas.either / difficulty.by)
    const halfEach = maxEach / 2
    const x = halfEach + (loc.x * maxEach)
    const y = halfEach + (loc.y * maxEach)
    return { x: x, y: y }
  }

  function locationToCellPos(position) {
    console.log("position", position)
    const maxEach = (constants.math.canvas.either / difficulty.by)
    const halfEach = maxEach / 2
    const x = halfEach + (position.x * maxEach)
    const y = halfEach + (position.y * maxEach)
    return { x: x, y: y }
  }


  function generateClickableRange(currentCenter, centerDistance) {
    const ranges = {
      y: { min: currentCenter.y - centerDistance, max: currentCenter.y + centerDistance },
      x: { min: currentCenter.x - centerDistance, max: currentCenter.x + centerDistance }
    }

    return ranges
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array
  }

  function randomLocations() {
    const locations = []
    let ctr = 0
    for (let i = 0; i < difficulty.by; i++) {
      for (let j = 0; j < difficulty.by; j++) {
        const maxEach = (constants.math.canvas.either / difficulty.by)
        const halfEach = maxEach / 2
        const x = halfEach + (j * maxEach)
        const y = halfEach + (i * maxEach)
        locations.push({ x: x, y: y, spotInBoard: ctr })
        ctr++
      }
    }
    return shuffleArray(locations)
  }

  function buildTiles() {
    let ctr = 0
    const maxEach = (constants.math.canvas.either / difficulty.by)
    const halfEach = maxEach / 2

    const randomLocs = randomLocations()
    for (let i = 0; i < difficulty.by; i++) {
      for (let j = 0; j < difficulty.by; j++) {
        const randLoc = randomLocs.pop()
        const spotInBoard = locationToCell(randLoc.spotInBoard)
        const clickableRange = generateClickableRange(randLoc, halfEach)
        // const x = halfEach + (j * maxEach)
        // const y = halfEach + (i * maxEach)
        const newTile = MidtermGame.generateTile(
          (ctr < ((difficulty.by * difficulty.by) - 1)) ? './design/images/' + difficulty.title + "/" + difficulty.imagesPath + ctr + '.png' : null,
          // clickableRange, // range that can be clicked
          halfEach, // distance from center to edges
          spotInBoard, // cell spot in the board
          cellToLocation(ctr)
        )
        board[spotInBoard.y][spotInBoard.x] = {
          tile: newTile,
          pos: { x: randLoc.x, y: randLoc.y },
          correctPos: cellToLocation(ctr),
          cell: newTile.atWhichCell,
          clickRange: clickableRange,
          ctr: ctr,
          isMoving: {
            toWhere: null,
            direction: null,
          }
        }
        ctr++
      }
    }
  }

  function run() {
    resetBoard()

    mouse.registerHandler('mousedown', function (e, elapsedTime) {
      const x = e.clientX - canvas.offsetLeft
      const y = e.clientY - canvas.offsetTop
      let tileClicked = null
      for (let i = 0; i < difficulty.by; i++) {
        for (let j = 0; j < difficulty.by; j++) {
          const tile = board[i][j].tile
          if (tile) {
            const position = checkRanges(x, y, board[i][j].clickRange, { x: j, y: i })
            if (position !== false) {
              tileClicked = board[position.y][position.x]
            }
          }
        }
      }
      if (tileClicked && !winner) {
        totalClicks += (difficulty === constants.strings.easy ? 1 : .5)
        checkWhereCanMove(tileClicked)
      }
    })

    function checkWhereCanMove(tile) {
      if (board[tile.cell.y - 1] && board[tile.cell.y - 1][tile.cell.x] && (board[tile.cell.y - 1][tile.cell.x].tile.imagePath === null)) {
        swapTiles(
          { col: tile.cell.y, row: tile.cell.x },
          { col: tile.cell.y - 1, row: tile.cell.x }
        )
      }
      if (board[tile.cell.y + 1] && board[tile.cell.y + 1][tile.cell.x] && (board[tile.cell.y + 1][tile.cell.x].tile.imagePath === null)) {
        swapTiles(
          { col: tile.cell.y, row: tile.cell.x },
          { col: tile.cell.y + 1, row: tile.cell.x }
        )
      }
      if (board[tile.cell.y][tile.cell.x - 1] && (board[tile.cell.y][tile.cell.x - 1].tile.imagePath === null)) {
        swapTiles(
          { col: tile.cell.y, row: tile.cell.x },
          { col: tile.cell.y, row: tile.cell.x - 1 }
        )
      }
      if (board[tile.cell.y][tile.cell.x + 1] && (board[tile.cell.y][tile.cell.x + 1].tile.imagePath === null)) {
        swapTiles(
          { col: tile.cell.y, row: tile.cell.x },
          { col: tile.cell.y, row: tile.cell.x + 1 }
        )
      }
    }

    function notSwapping() {

    }

    function isSwapping() {
      const originalClicked = JSON.stringify(board[clickedPos.col][clickedPos.row].tile)
      board[clickedPos.col][clickedPos.row].tile = JSON.parse(JSON.stringify(board[nullPos.col][nullPos.row].tile))
      board[nullPos.col][nullPos.row].tile = JSON.parse(originalClicked)
      if (checkXYs(nullPos)) {
        const x = board[nullPos.col][nullPos.row].pos.x
        const y = board[nullPos.col][nullPos.row].pos.y
        const tileWidth = (constants.math.canvas.either / difficulty.by)
        board[nullPos.col][nullPos.row].linearParticleTime = constants.math.time.linearParticles
        board[nullPos.col][nullPos.row].linearParticleSystem = {
          systems: [
            {
              // down
              system: ParticleSystemLinear(constants.colors.success, graphics, {
                width: 100,
                size: { mean: 5, stdev: 3 },
                speed: { mean: 0, stdev: 0.1 },
              }),
              direction: { x: 0, y: 1 },
              ranges: {
                x: { start: x - tileWidth, end: x },
                y: { start: y + tileWidth, end: y + tileWidth }
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
                y: { start: y, end: y + tileWidth }
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
                x: { start: x - tileWidth, end: x },
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
                x: { start: x - tileWidth, end: x - tileWidth },
                y: { start: y, end: y + tileWidth }
              }
            },
          ],
          time: constants.math.time.linearParticles
        }

      }
      checkBoardFinished()
    }

    function swapTiles(clickedPos, nullPos) {
      if (!swappingData) {
        swappingData = {
          clickedPos: { row: clickedPos.col, col: clickedPos.row },
          nullPos: { row: nullPos.col, col: nullPos.row },
          orig: {
            clicked: JSON.parse(JSON.stringify(board[clickedPos.col][clickedPos.row].tile)),
            null: JSON.parse(JSON.stringify(board[nullPos.col][nullPos.row].tile))
          },
          transitionTime: 1000,
          totalTransition: 1000
        }
        swappingData.direction = whichDirection(swappingData.clickedPos, swappingData.nullPos)
      }
    }

    function checkRanges(x, y, clickRange, currentPosition) {
      const xs = clickRange.x
      const ys = clickRange.y

      if (x >= xs.min && x <= xs.max && y >= ys.min && y <= ys.max) {
        return currentPosition
      }
      return false
    }

    buildBoard()
    buildTiles()
    prevTime = performance.now()
    requestAnimationFrame(gameLoop)
  }

  return {
    initialize: initialize,
    run: run
  }
})(MidtermGame.game, MidtermGame.object, MidtermGame.graphics, MidtermGame.input.keyboard, MidtermGame.input.mouse, MidtermGame.constants, MidtermGame.utilities.storage)

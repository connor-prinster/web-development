let canvas = null
let context = null
let prevTime = performance.now();
let inputBuffer = {}
let fullMaze = {}
let shortestPath = null
let originalShortestPath = {}
let globalScore = 0
let globalTimer = null
let globalTime = 0

// for breadcrumbs
let breadCrumbs = []

let booleans = {
    characterMove: true,
    hints: false,
    breadcrumbs: false,
    path: false,
    newTimer: true
}

// --- Base Paths --- //
const basePath = './design/'
const audioBasePath = basePath + 'audio/'
const imageBasePath = basePath + 'images/'
const characterBasePath = imageBasePath + 'characters/'
const hintBasePath = imageBasePath + 'hints/'
// --- Character Paths --- //
const falconPath = characterBasePath + 'millenium_falcon.png'
const homeOnePath = characterBasePath + 'home_one.png'
const deathStarPath = characterBasePath + 'death_star.png'
// --- Hint Paths --- //
const blastPath = hintBasePath + 'blast.png'
const targetLockPath = hintBasePath + 'target_lock.png'
// --- Background --- //
const endorPath = imageBasePath + 'endor_space.jpg'
// -- Audio --- //
const landoYellPath = audioBasePath + 'lando_yell.mp3'

// === Constants === //
let constants = {
    WIDTH: 0,
    HEIGHT: 0,
    AREA: 0,
    COORD_SIZE: 1024,
    RATIO: 0,
    DIFFICULTY: null,
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right",
    solid: "solid",
    passage: "passage"
}

const mapDifficulties = {
    test: { height: 3, width: 3, ratio: .333, text: '3 x 3' },
    easy: { height: 5, width: 5, ratio: .200, text: '5 x 5' },
    medium: { height: 10, width: 10, ratio: .100, text: '10 x 10' },
    hard: { height: 15, width: 15, ratio: .066, text: '15 x 15' },
    insane: { height: 20, width: 20, ratio: .050, text: '20 x 20' }
}

function setDifficultyConstants(difficulty) {
    constants.DIFFICULTY = difficulty
    constants.WIDTH = difficulty.width
    constants.HEIGHT = difficulty.height
    constants.AREA = constants.WIDTH * constants.HEIGHT
    constants.RATIO = difficulty.ratio
}

// ================================ //
// === Functions for Characters === //
// ================================ //

let myFalcon = new Character(falconPath, { x: 0, y: 0 })
let myDeathStar = new Character(deathStarPath, { x: 0, y: 0 })
let myHomeOne = new Character(homeOnePath, { x: 0, y: 0 })
let myEndor = new Character(endorPath, { x: 0, y: 0 })

let landoYell = function (source) {
    let audio = new Audio(source)
    let stop = function () {
        audio.pause()
        audio.load()
    }
    let play = function () {
        audio.play()
    }

    return {
        audio: audio,
        play: play,
        stop: stop
    }
}(landoYellPath)

function characterGenerationFunctions(imageSource, location) {
    return new Character(imageSource, location)
}

function updateCharacters() {
    let falconCoords = myFalcon.location
    myFalcon = characterGenerationFunctions(falconPath, falconCoords)
}

function updateCharacterMove() {
    booleans.characterMove = !booleans.characterMove
}

function generateBreadCrumb(coords) {
    let newCoords = { x: coords.x, y: coords.y }
    let newCrumb = characterGenerationFunctions(blastPath, newCoords)
    return newCrumb
}

function updatePath(newPos, currentCoords) {
    newPos = { row: newPos.y, col: newPos.x }
    currPos = { row: currentCoords.y, col: currentCoords.x }
    let nextInShortestPath = shortestPath.peek()
    if (nextInShortestPath) {
        nextInShortestPath = nextInShortestPath.coordinates
        if (newPos.row == nextInShortestPath.row && newPos.col == nextInShortestPath.col) {
            shortestPath.pop()
        }
        else {
            const cell = fullMaze[currPos.row][currPos.col]
            shortestPath.push(cell)
        }
    }
}

function moveCharacters(key) {
    let coords = myFalcon.location
    const currentCoords = { x: coords.x, y: coords.y }
    let x = coords.x
    let y = coords.y

    if ((key == 'w' || key == 'i' || key == 'ArrowUp') && checkCanMove.up(coords)) {
        coords.y = (y - 1)
        breadCrumbs.push(generateBreadCrumb(coords))
        updatePath(coords, currentCoords)
        updateCharacterMove()
    }
    else if ((key == 's' || key == 'k' || key == 'ArrowDown') && checkCanMove.down(coords)) {
        coords.y = (y + 1)
        breadCrumbs.push(generateBreadCrumb(coords))
        updatePath(coords, currentCoords)
        updateCharacterMove()
    }
    else if ((key == 'a' || key == 'j' || key == 'ArrowLeft') && checkCanMove.left(coords)) {
        coords.x = (x - 1)
        breadCrumbs.push(generateBreadCrumb(coords))
        updatePath(coords, currentCoords)
        updateCharacterMove()
    }
    else if ((key == 'd' || key == 'l' || key == 'ArrowRight') && checkCanMove.right(coords)) {
        coords.x = (x + 1)
        breadCrumbs.push(generateBreadCrumb(coords))
        updatePath(coords, currentCoords)
        updateCharacterMove()
    }

    myFalcon.location = coords

    if (myDeathStar.location.x == myFalcon.location.x && myDeathStar.location.y == myFalcon.location.y) {
        landoYell.play()
        finishGame()
    }
    else {
        landoYell.stop()
    }
}

function finishGame() {
    let highScoreObj = {totalTime: prevTime, difficulty: constants.DIFFICULTY.text, timeCompleted: globalTime, score: globalScore}
    let newHighscore = new Highscores()
    newHighscore.add(highScoreObj)
    newHighscore.reportToNode()
    myFalcon = new Character(falconPath, { x: 0, y: 0 })
    setWinScreenActive()
}

function setWinScreenActive() {    
    const updateScreens = new UpdateScreens()
    updateScreens.setWinScreenActive(document)
}

function setGameScreenActive() {
    const updateScreens = new UpdateScreens()
    updateScreens.setGameScreenActive(document)
}

let checkCanMove = {
    up: function (coords) {
        let passages = fullMaze[coords.y][coords.x].passages
        let isPassage = (passages[constants.UP] == constants.passage)

        return (coords.y > 0 && isPassage)
    },
    down: function (coords) {
        let passages = fullMaze[coords.y][coords.x].passages
        let isPassage = (passages[constants.DOWN] == constants.passage)

        return (coords.y < (constants.HEIGHT - 1) && isPassage)
    },
    left: function (coords) {
        let passages = fullMaze[coords.y][coords.x].passages
        let isPassage = (passages[constants.LEFT] == constants.passage)

        return ((coords.x > 0) && isPassage)
    },
    right: function (coords) {
        let passages = fullMaze[coords.y][coords.x].passages
        let isPassage = (passages[constants.RIGHT] == constants.passage)

        return ((coords.x < (constants.WIDTH - 1)) && isPassage)
    }
}

// ============================= //
// === Functions for Toggles === //
// ============================= //

function toggleHelps(key) {
    if (key == 'h') {
        booleans.hints = !booleans.hints
    }
    else if (key == 'b') {
        booleans.breadcrumbs = !booleans.breadcrumbs
    }
    else if (key == 'p') {
        booleans.path = !booleans.path
    }
}

// ===================================== //
// ============= Game Loop ============= //
// ===================================== //

function printFps(elapsedTime) {
    let fps = 1000 / elapsedTime
    console.log("fps:", fps)
}

function gameLoop(time) {
    let elapsedTime = time - prevTime;
    prevTime = time;

    // === actually run the loop === //
    processInput(time)
    update(time)
    render(time)

    requestAnimationFrame(gameLoop)
}

function processInput(time) {
    // check if the character has moved
    for (input in inputBuffer) {
        let key = inputBuffer[input]
        moveCharacters(key)
        toggleHelps(key)

    }
    inputBuffer = {}
}

function update(time) {
    if (booleans.characterMove) {
        updateCharacters(constants.DIFFICULTY)
        updateScore()
        updateCharacterMove()
    }
    if (booleans.newTimer) {
        globalTimer = new Timer(time)
        booleans.newTimer = false
    }
    globalTime = Math.floor((time - globalTimer.timeStarted) / 1000)
}

function updateScore() {
    const currentPos = { row: myFalcon.location.y, col: myFalcon.location.x }
    const currentCell = fullMaze[currentPos.row][currentPos.col]
    if (!currentCell.entered && currentCell.id != 0) {
        fullMaze[currentPos.row][currentPos.col].entered = true
        if (currentCell.inShortest) {
            globalScore += 5
        }
        else {
            globalScore -= 1
        }
    }
}

function render(time) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    const characters = ([myHomeOne, myFalcon, myDeathStar])
    const draw = new Draw(context, characters, booleans, breadCrumbs, shortestPath)
    draw.drawBackground()
    draw.drawMaze(fullMaze)
    draw.drawHelps()
    draw.drawCharacters()
    updateHeaderValues()
}

// ====================== //
// === Maze Functions === //
// ====================== //

function updateMazeDifficulty(difficulty) {
    setDifficultyConstants(difficulty)
    setDeathStarEnd()
}

function returnRandom(max) {
    return Math.floor(Math.random() * Math.floor(max))
}

function genMaze(difficulty) {
    let maze = []
    const height = difficulty.height
    const width = difficulty.width

    // === Fill the Map With Cells === //
    // these cells have their neighbors generated
    for (let row = 0; row < height; row++) {
        maze.push([])
        for (let col = 0; col < width; col++) {
            maze[row].push(new Cell(row, col))
        }
    }

    fullMaze = new Prims(maze).maze
    shortestPath = new BreadthFirst(fullMaze, { x: 0, y: 0 }).shortestPath
    setShortestPathInCells(shortestPath.items)
}

function setShortestPathInCells(path) {
    for (let i = 0; i < path.length; i++) {
        const cell = path[i]
        const coords = cell.coordinates
        fullMaze[coords.row][coords.col].inShortest = true
    }
}

function updateHeaderValues() {
    const header = this.document.getElementById('header-text')
    header.innerHTML = ("Timer: " + globalTime + "\tScore: " + globalScore)
}

// ================ //
// === Start Up === //
// ================ //

function setDeathStarEnd() {
    let difficulty = constants.DIFFICULTY
    let deathStarCoords = { x: difficulty.width - 1, y: difficulty.height - 1 }
    myDeathStar = characterGenerationFunctions(deathStarPath, deathStarCoords)
}

function initialize(difficulty, shouldUpDateWinScreen) {
    // === Objects Based on Difficulties === //
    setDifficultyConstants(difficulty)
    setDeathStarEnd()
    clearBreadcrumbs()

    setGameScreenActive()

    myFalcon = new Character(falconPath, { x: 0, y: 0 })
    booleans.newTimer = true
    globalScore = 0

    // === Get Maze === //
    this.genMaze(difficulty)
} 

function clearBreadcrumbs() {
    breadCrumbs = []
}

function htmlAttachments() {
    // === Get Canvas Elements === //
    canvas = this.document.getElementById('canvas-container')
    context = canvas.getContext('2d')
    context.lineWidth = 3
    context.strokeStyle = '#05F140'

    // === Button Attachments === //
    const htmlEffects = new HtmlEffects(this.document)
    htmlEffects.setDifficultyButtonEffects('easyBtn', mapDifficulties.easy)
    htmlEffects.setDifficultyButtonEffects('mediumBtn', mapDifficulties.medium)
    htmlEffects.setDifficultyButtonEffects('hardBtn', mapDifficulties.hard)
    htmlEffects.setDifficultyButtonEffects('insaneBtn', mapDifficulties.insane)
    htmlEffects.setHighScoreButtonEffect()
    htmlEffects.setCreditButtonEffect()
}

window.onload = function () {
    // === initialize other values === //
    this.initialize(mapDifficulties.easy, false)
    this.htmlAttachments()

    // === Set OnClick Listeners === //
    window.addEventListener('keydown', function (event) {
        inputBuffer[event.key] = event.key;
    });

    this.gameLoop(this.performance.now())
}
let canvas = null
let context = null
let prevTime = performance.now();
let inputBuffer = {}

function printFps(elapsedTime) {
    let fps = 1000 / elapsedTime
    console.log("fps:", fps)
}

function gameLoop(time) {
    let elapsedTime = time - prevTime;
    prevTime = time;

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

}

function render(time) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function initialize() {
    initializeHtml()
}

function initializeHtml() {
    canvas = this.document.getElementById('canvas-container')
    context = canvas.getContext('2d')
    context.lineWidth = 3
    context.strokeStyle = '#05F140'
}

window.onload = function () {
    this.initialize()
    this.gameLoop(this.performance.now())
}
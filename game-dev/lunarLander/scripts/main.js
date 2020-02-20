let canvas = null
let context = null
let prevTime = performance.now();
let inputBuffer = {}

const keyBindings = {
    rotateLeft: "ArrowLeft",
    rotateRight: "ArrowRight",
    thrust: "ArrowUp"
}

// initialize
const constants = new Constants()
let lander = null

function gameLoop(time) {
    prevTime = time;
    processInput(time);
    update(time);
    render(time);

    requestAnimationFrame(gameLoop);
}

function processInput(time) {
    for (input in inputBuffer) {
        let key = inputBuffer[input];
    }
    inputBuffer = {};
}

function update(time) {

}

function render(time) {
    const draw = new Draw(context)
    context.clearRect(0, 0, canvas.width, canvas.height);

    draw.drawLander(lander)
}

function initialize() {
    setListeners();
    initializeHtml();
    initializeLander();
}

function initializeHtml() {
    canvas = this.document.getElementById('canvas-container');
    context = canvas.getContext('2d');
}

function initializeLander() {
    let initLocation = {x: 0, y: 0}
    lander = new Lander(constants.paths.landerPath, initLocation)
}

function setListeners() {
    window.addEventListener('keydown', function (event) {
        inputBuffer[event.key] = event.key;
    });
}

window.onload = function () {
    this.initialize();
    this.gameLoop(this.performance.now());
}
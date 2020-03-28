MidtermGame.screens['game-play'] = (function (game, objects, renderer, graphics, input) {
  const constants = MidtermGame.constants
  document.getElementById('newInMidtermGame').onclick = function () {
    initialize()
  }

  window.addEventListener('keydown', MidtermGame.inputs.onKeyDown)

  let canvas = null
  let context = null
  let prevTime = 0

  function initialize () {

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

  }

  function update(elapsedTime) {

  }

  function render (elapsedTime) {

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

FroggerGame.screens['game-play'] = (function (game, objects, renderer, graphics, input) {

  const constants = FroggerGame.constants

  document.getElementById('newInGame').onclick = function () {
    initialize()
  }

  function initialize () {
    
  }
  
  function run () {
    prevTime = performance.now()
    requestAnimationFrame(gameLoop)
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

  function update (elapsedTime) {
    
  }

  function render (elapsedTime) {

  }

  return {
    initialize: initialize,
    run: run
  }
})()

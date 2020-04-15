FroggerGame.screens.highscores = (function (game, objects, renderer, graphics, input) {
  function initialize() {

  }

  function run() {
    const highscores = FroggerGame.utilities.storage.retrieveHighscores()
    if (highscores) {
      const highs = []
      for (let i = 0; i < highscores.length; i++) {
        const high = highscores[i]
        highs.push(high)
      }
      highs.sort(function (a, b) { return parseFloat(b.score) - parseFloat(a.score) })
      highs.splice(5)
      const listDiv = document.getElementById('highscore-list')
      listDiv.innerHTML = ''
      for (const idx in highs) {
        const high = highs[idx]
        const scoreDiv = document.createElement('div')
        scoreDiv.innerText = high.name + ' : ' + high.score
        listDiv.appendChild(scoreDiv)
      }
    }
  }

  return {
    initialize: initialize,
    run: run
  }
})()

FroggerGame.screens['highscores'] = (function (game, objects, renderer, graphics, input) {
  function initialize () {

  }

  function run () {
    const localStorageHelper = new LocalStorageHelper()
    const objs = []
    for (const idx in localStorageHelper.highscores) {
      objs.push(JSON.parse(localStorageHelper.highscores[idx]))
    }
    objs.sort(function (a, b) { return parseFloat(b.score) - parseFloat(a.score) })
    objs.splice(5)
    const listDiv = document.getElementById('highscore-list')
    listDiv.innerHTML = ''
    for (const idx in objs) {
      const obj = objs[idx]
      const scoreDiv = document.createElement('div')
      scoreDiv.innerText = obj.name + ' : ' + obj.score
      listDiv.appendChild(scoreDiv)
    }
  }

  return {
    initialize: initialize,
    run: run
  }
})()

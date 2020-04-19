MidtermGame.screens.highscores = (function (constants) {
  function initialize() {

  }

  function run() {
    const highscores = MidtermGame.utilities.storage.retrieveHighscores()
    const objs = []
    for (const idx in highscores) {
      objs.push(JSON.parse(highscores[idx]))
    }
    const easys = []
    const hards = []
    for (let i = 0; i < objs.length; i++) {
      const obj = objs[i]
      if (obj.difficulty == constants.strings.easy.title) {
        easys.push(obj)
      }
      else {
        hards.push(obj)
      }
    }

    objs.splice(5)
    const listDiv = document.getElementById('highscore-list')
    listDiv.innerHTML = ''

    listDiv.appendChild(titleDivs("Easy", easys))
    listDiv.appendChild((titleDivs("Hard", hards)))
  }

  function titleDivs(difficultyText, arr) {
    const difficultyDiv = document.createElement('div')
    const easyTitle = document.createElement('h2')
    easyTitle.innerText = difficultyText
    difficultyDiv.appendChild(easyTitle)
    arr.sort(function (a, b) { return parseFloat(a.clicks) - parseFloat(b.clicks) })
    difficultyDiv.appendChild(fillDivs("Fewest Clicks", arr))
    arr.sort(function (a, b) { return parseFloat(a.time) - parseFloat(b.time) })
    difficultyDiv.appendChild(fillDivs("Shortest Time", arr))
    return difficultyDiv
  }

  function fillDivs(byWhat, inOrder) {
    const divvy = document.createElement('div')
    divvy.classList.add('highscore-sorts')
    const title = document.createElement('h3')
    title.innerText = byWhat

    divvy.appendChild(title)
    for (let i = 0; i < 5; i++) {
      
      const val = inOrder[i]
      if (val) {
        const scoreDiv = document.createElement('div')
        scoreDiv.innerHTML = ("Clicks: " + val.clicks + " Time: " + val.time)
        divvy.appendChild(scoreDiv)
      }
    }
    return divvy
  }

  return {
    initialize: initialize,
    run: run
  }
})(MidtermGame.constants)

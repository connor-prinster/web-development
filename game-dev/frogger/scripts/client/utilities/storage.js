FroggerGame.utilities.storage = function () {
  const storageKey = 'll-scores'
  const controlsKey = 'll-controls'
  let previousScores = localStorage[storageKey]

  function retrieveHighscores() {
    const toReturn = []
    previousScores = localStorage[storageKey]
    if (previousScores) {
      const highscores = JSON.parse(previousScores).highscores
      for (const idx in highscores) {
        toReturn.push(highscores[idx])
      }
    }
    return toReturn
  }

  function retrieveControls() {
    let bindings = {
      up: {
        method: "up",
        key: 'ArrowUp',
      },
      down: {
        method: "down",
        key: 'ArrowDown'
      },
      left: {
        method: "left",
        key: 'ArrowLeft',
      },
      right: {
        method: "right",
        key: 'ArrowRight',
      }
    }

    if (localStorage[controlsKey]) { // if bindings are stored in the browser already
      bindings = JSON.parse(localStorage[controlsKey])
    }
    else { // if no bindings, add it here
      addControls(bindings)
    }

    return bindings.controls
  }

  function addScore(value) {
    FroggerGame.assets['background.mp3'].pause()
    var name = prompt("Add your name to glory!")
    let pastScores = localStorage[storageKey]
    if (!pastScores) {
      localStorage[storageKey] = JSON.stringify({ highscores: [] })
    }
    pastScores = localStorage[storageKey]
    let scores = JSON.parse(pastScores).highscores
    scores.push({name: name, score: value})
    localStorage[storageKey] = JSON.stringify({ highscores: scores })
  }

  function addControls(controls) {
    const newControls = controls
    localStorage[controlsKey] = JSON.stringify({ controls: newControls })
  }

  function deleteStorage() {
    localStorage.removeItem(storageKey)
  }

  return {
    retrieveHighscores: retrieveHighscores,
    retrieveControls: retrieveControls,
    addScore: addScore,
    addControls: addControls,
    deleteStorage: deleteStorage
  }
}()

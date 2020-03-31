MidtermGame.utilities.storage = function () {
  const storageKey = 'mt-scores'
  const controlsKey = 'mt-controls'
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

  function addScore(value) {
    let pastScores = localStorage[storageKey]
    if (!pastScores) {
      localStorage[storageKey] = JSON.stringify({ highscores: [] })
    }
    pastScores = localStorage[storageKey]
    let scores = JSON.parse(pastScores).highscores
    scores.push(JSON.stringify(value))
    localStorage[storageKey] = JSON.stringify({ highscores: scores })
  }

  function deleteStorage() {
    localStorage.removeItem(storageKey)
  }

  return {
    retrieveHighscores: retrieveHighscores,
    addScore: addScore,
    deleteStorage: deleteStorage
  }
}()

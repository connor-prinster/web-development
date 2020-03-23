class LocalStorageHelper {
  constructor () {
    this.storageKey = 'll-scores'
    this.controlsKey = 'll-controls'
    this.controls = {}
    this.highscores = this.retrievePrevious()
  }

  retrievePrevious () {
    const toReturn = []
    const previousScores = localStorage[this.storageKey]

    if (previousScores) {
      const highscores = JSON.parse(previousScores).highscores
      for (const idx in highscores) {
        toReturn.push(highscores[idx])
      }
    }
    return toReturn
  }

  retrieveControls () {
    let bindings = null

    if (localStorage[this.controlsKey]) {
      bindings = JSON.parse(localStorage[this.controlsKey])
    }

    return bindings
  }

  addScore (value) {
    this.highscores.push(JSON.stringify(value))
    localStorage[this.storageKey] = JSON.stringify({ highscores: this.highscores })
  }

  addControls (controls) {
    this.controls = controls
    localStorage[this.controlsKey] = JSON.stringify({ controls: this.controls })
  }

  deleteStorage () {
    localStorage.removeItem(this.storageKey)
  }
}

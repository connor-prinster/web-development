class UpdateScreens {
    constructor() { }

    setInactive(element) {
        element.classList.remove('active')
        element.style.display = 'none'
    }

    setActive(element) {
        element.classList.add('active')
        element.style.display = 'flex'
    }

    clearAllScreens(document) {
        const gameScreen = document.getElementById('game-screen')
        const creditsScreen = document.getElementById('credits-screen')
        const winScreen = document.getElementById('win-screen')
        const highscoreScreen = document.getElementById('highscore-screen')

        this.setInactive(gameScreen)
        this.setInactive(creditsScreen)
        this.setInactive(winScreen)
        this.setInactive(highscoreScreen)
    }

    setGameScreenActive(document) {
        this.clearAllScreens(document)
        const headerVals = document.getElementById('headerVals')
        const gameScreen = document.getElementById('game-screen')
        this.setActive(gameScreen)
        this.setActive(headerVals)
    }

    setWinScreenActive(document) {
        this.clearAllScreens(document)
        const headerVals = document.getElementById('headerVals')
        const winScreen = document.getElementById('win-screen')
        this.setActive(winScreen)
        this.setInactive(headerVals)
    }

    setCreditScreenActive(document) {
        this.clearAllScreens(document)
        const headerVals = document.getElementById('headerVals')
        const creditScreen = document.getElementById('credits-screen')
        this.setActive(creditScreen)
        this.setInactive(headerVals)
    }

    setHighscoreScreenActive(document) {
        this.clearAllScreens(document)
        let hs = new Highscores()
        hs.reportToNode()
        const headerVals = document.getElementById('headerVals')
        const highscoreScreen = document.getElementById('highscore-screen')
        this.setActive(highscoreScreen)
        this.setInactive(headerVals)
    }
}
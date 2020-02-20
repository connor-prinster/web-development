class HtmlAttach {

    constructor() {}

    backButtons(showScreen) {
        const backButtons = document.getElementsByClassName('back-button')

        for(let i = 0; i < backButtons.length; i++) {
            const that = this
            let btn = backButtons[i]
            console.log("button", btn)
            btn.addEventListener('click', () => {showScreen('main-menu')})
        }
    }

    mainMenu(showScreen) {
        let btnIdList = [
            {buttonId: 'newGameBtn', destinationScreen: 'game-play'},
            {buttonId: 'highScoresBtn', destinationScreen: 'highscores'},
            {buttonId: 'customizeControlsBtn', destinationScreen: 'customize-controls'},
            {buttonId: 'creditsBtn', destinationScreen: 'credits'}
        ]

        for(let idx in btnIdList) {
            const btn = btnIdList[idx]

            const element = document.getElementById(btn.buttonId)
            element.addEventListener(
                'click', 
                () => {showScreen(btn.destinationScreen)}
            )
        }
    }
}
class HtmlEffects {
    constructor(document) { 
        this.localDocument = document
    }

    setDifficultyButtonEffects(className, difficulty) {
        const checkParentDiv = function(element) { // check if parent has image
            return element.parentElement.classList.contains('won')
        }
        const btns = this.localDocument.getElementsByClassName(className)
        for(let i = 0; i < btns.length; i++) {
            const btn = btns[i]
            btn.innerHTML = difficulty.text
            btn.onclick = () => {
                if(checkParentDiv(btn)) { // if parent is the win screen, update the win screen to remove the explosion image
                    initialize(difficulty, true)
                }
                else {
                    initialize(difficulty, false)
                }
            }
        }
    }

    setHighScoreButtonEffect() {
        const updateScreens = new UpdateScreens()
        const btns = this.localDocument.getElementsByClassName('highScoreBtn')
        for(let i = 0; i < btns.length; i++) {
            const btn = btns[i]
            btn.innerHTML = "High Scores"
            btn.onclick = () => {
                updateScreens.setHighscoreScreenActive(this.localDocument)
            }
        }
    }

    setCreditButtonEffect() {
        const updateScreens = new UpdateScreens()
        const btns = this.localDocument.getElementsByClassName('creditBtn')
        for(let i = 0; i < btns.length; i++) {
            const btn = btns[i]
            btn.innerHTML = "Credits"
            btn.onclick = () => {
                updateScreens.setCreditScreenActive(this.localDocument)
            }
        }
    }
}
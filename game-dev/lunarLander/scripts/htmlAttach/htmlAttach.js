class HtmlAttach {
  backButtons (showScreen) {
    const backButtons = document.getElementsByClassName('back-button')

    for (let i = 0; i < backButtons.length; i++) {
      const btn = backButtons[i]
      btn.addEventListener('click', () => {
        showScreen('main-menu')
        LanderGame.playing = false
      })
    }
  }

  mainMenu (showScreen) {
    const btnIdList = [
      { buttonId: 'newGameBtn', destinationScreen: 'game-play' },
      { buttonId: 'highScoresBtn', destinationScreen: 'highscores' },
      { buttonId: 'customizeControlsBtn', destinationScreen: 'customize-controls' },
      { buttonId: 'creditsBtn', destinationScreen: 'credits' }
    ]

    for (const idx in btnIdList) {
      const btn = btnIdList[idx]

      const elements = document.getElementsByClassName(btn.buttonId)
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i]
        element.addEventListener(
          'click',
          () => { showScreen(btn.destinationScreen) }
        )
      }
    }
  }
}

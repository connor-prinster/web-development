FroggerGame.utilities.htmlAttach = function (pages, buttons) {
  'use strict'
  const backButtons = function (showScreen) {
    const backButtons = document.getElementsByClassName('back-button')

    for (let i = 0; i < backButtons.length; i++) {
      const btn = backButtons[i]
      btn.addEventListener('click', () => {
        showScreen('main-menu')
        FroggerGame.playing = false
      })
    }
  }

  const mainMenu = function (showScreen) {
    let btnIdList = null
    if (buttons === undefined) {
      location.reload()
    }
    btnIdList = [
      { buttonId: buttons.gamePlay, destinationScreen: pages.gamePlay },
      { buttonId: buttons.highscores, destinationScreen: pages.highscores },
      { buttonId: buttons.customizeControls, destinationScreen: pages.customizeControls },
      { buttonId: buttons.credits, destinationScreen: pages.credits }
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

  const initialize = function (showScreen) {
    backButtons(showScreen)
    mainMenu(showScreen)
  }

  return {
    // backButtons: backButtons,
    // mainMenu: mainMenu
    initialize: initialize
  }
}(FroggerGame.constants.pages, FroggerGame.constants.buttons)

MidtermGame.game = (function (screens) {
  // ------------------------------------------------------------------
  //
  // This function is used to change to a new active screen.
  //
  // ------------------------------------------------------------------
  function showScreen (id) {
    const active = document.getElementsByClassName('active')
    for (let screen = 0; screen < active.length; screen++) {
      active[screen].classList.remove('active')
    }
    screens[id].run()
    document.getElementById(id).classList.add('active')
  }

  function initialize () {
    let screen = null
    for (screen in screens) {
      if (screens.hasOwnProperty(screen)) {
        screens[screen].initialize()
      }
    }

    initializeHtmlButtons()
    // showScreen('main-menu')
    showScreen('main-menu')
  }

  function initializeHtmlButtons () {
    const htmlAttach = new HtmlAttach(showScreen)

    htmlAttach.backButtons(showScreen)
    htmlAttach.mainMenu(showScreen)
  }

  return {
    initialize: initialize,
    showScreen: showScreen
  }
}(MidtermGame.screens))

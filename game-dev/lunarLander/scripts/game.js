// ------------------------------------------------------------------
//
// This is the game object.  Everything about the game is located in
// this object.
//
// ------------------------------------------------------------------

LanderGame.game = (function (screens) {
  // ------------------------------------------------------------------
  //
  // This function is used to change to a new active screen.
  //
  // ------------------------------------------------------------------
  function showScreen (id) {
    //
    // Remove the active state from all screens.  There should only be one...
    const active = document.getElementsByClassName('active')
    for (let screen = 0; screen < active.length; screen++) {
      active[screen].classList.remove('active')
    }
    //
    // Tell the screen to start actively running
    screens[id].run()
    //
    // Then, set the new screen to be active
    if (id == 'game-play') {
      LanderGame.playing = true
    }
    document.getElementById(id).classList.add('active')
  }

  // ------------------------------------------------------------------
  //
  // This function performs the one-time game initialization.
  //
  // ------------------------------------------------------------------
  function initialize () {
    let screen = null
    // Go through each of the screens and tell them to initialize
    for (screen in screens) {
      if (screens.hasOwnProperty(screen)) {
        screens[screen].initialize()
      }
    }
    initializeHtmlButtons()
    // Make the main-menu screen the active one
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
}(LanderGame.screens))

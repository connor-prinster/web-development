FroggerGame.game = (function (screens) {
  
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
    // Go through each of the screens and tell them to initialize
    for (screen in screens) {
      if (screens.hasOwnProperty(screen)) {
        screens[screen].initialize()
      }
    }
    initializeHtmlButtons()
    showScreen('main-menu')
  }

  function initializeHtmlButtons () {
    
  }

  return {
    initialize: initialize,
    showScreen: showScreen
  }
}(FroggerGame.screens))

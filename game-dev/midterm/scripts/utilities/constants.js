MidtermGame.constants = function () {
  this.math = {
    canvas: {
      width: 512,
      height: 512,
      either: 512
    },
    toRadians: function (degrees) {
      return (degrees * (Math.PI / 180))
    },
    time: {
      linearParticles: 500
    }
  }

  this.object = {
    ratio: .5,
    speed: 3
  }


  this.colors = {
    success: { fill: '#FCEC52', stroke: '#FBB02D' }
  }

  this.pages = {
    gamePlay: 'game-play',
    highscores: 'highscores',
    mainMenu: 'main-menu',
    customizeControls: 'customize-controls',
    credits: 'credits',
    active: 'active'
  }

  this.buttons = {
    gamePlay: 'newGameBtn',
    highscores: 'highscoresBtn',
    mainMenu: 'back-button',
    customizeControls: 'customizeControlsBtn',
    credits: 'creditsBtn',
  }

  this.strings = {
    easy: { title: 'easy', imagesPath: 'Tile128-', numTiles: 14, by: 4 },
    hard: { title: 'hard', imagesPath: 'Tile64-', numTiles: 62, by: 8 },
    empty: 'empty'
  }

  return {
    math: math,
    object: object,
    pages: pages,
    buttons: buttons,
    strings: strings,
    colors: colors
  }
}()
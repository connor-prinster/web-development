FroggerGame.constants = function () {
  const width = 1001
  const height = 1001
  const cellSize = 77
  this.math = {
    canvas: {
      cellSize: cellSize,
      width: width,
      height: height,
    },
    toRadians: function (degrees) {
      return (degrees * (Math.PI / 180))
    },
    speed: {
      truck: 3,
      car: 4,
      turtle: -3,
      log: 4,
      frog: cellSize,
      alligator: 3
    }
  },

    this.colors = {
      chunks: { fill: '#7CB518', stroke: '5C8001' },
      success: { fill: '#FCEC52', stroke: '#FBB02D' }
    }

  this.text = {
    scoreText: {
      font: '20px monospace',
      textAlign: 'right',
      widthPadding: 20,
      heightPadding: 50,
      upperPadding: 20,
      color: '#FFFFFF',

    },
    resetText: {
      font: '80px monospace',
      textAlign: 'center',
      widthPadding: 20,
      heightPadding: 50,
      upperPadding: 20,
      color: '#FFFFFF',
    }
  }

  this.frog = {
    ratio: .5,
    directions: {
      UP: {
        deg: 180,
        text: "up"
      },
      DOWN: {
        deg: 0,
        text: "down"
      },
      LEFT: {
        deg: 90,
        text: "left"
      },
      RIGHT: {
        deg: 270,
        text: "right"
      },
    }
  }

  this.sprites = {
    frog: {
      numSprites: 7,
      width: 396,
      height: 71,
    },
    tiles: {
      PAD: 0,
      WATER: 1,
      ROAD: 2,
      GRASS: 3,
      BUSH: 4,
    }
  }

  this.sprites.frog.pixelWidth = this.sprites.frog.width / this.sprites.frog.numSprites
  this.sprites.frog.pixelHeight = this.sprites.frog.height

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

  return {
    text: text,
    sprites: sprites,
    math: math,
    frog: frog,
    pages: pages,
    buttons: buttons,
    colors: colors
  }
}()
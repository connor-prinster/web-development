class Draw {
  constructor (context, canvas) {
    this.canvas = canvas
    this.context = context
    this.constants = new Constants()
  }

  drawBackground () {
    const constants = this.constants
    const context = this.context

    const backgroundPath = constants.paths.backgroundPath
    const location = { x: 0, y: 0 }
    const background = new Drawable(backgroundPath, location)
    const image = background.image
    context.drawImage(
      image,
      location.x,
      location.y,
      this.constants.math.canvasData.width,
      this.constants.math.canvasData.height
    )
  }

  drawLander (lander) {
    const context = this.context
    const constants = this.constants
    const imager = lander.image.image
    const ratio = constants.math.lander.landerSizeRatio
    const endWidth = imager.width * ratio
    const endHeight = imager.height * ratio

    const location = lander.data.location
    lander.data.center = {
      x: (endWidth - location.x) / 2,
      y: (endHeight - location.y) / 2
    }

    const center = lander.data.center

    if (imager.isReady) {
      context.save()
      context.translate(lander.data.center.x, lander.data.center.y)
      context.rotate(lander.data.angle)
      context.translate(-lander.data.center.x, -lander.data.center.y)
      context.drawImage(
        imager,
        center.x - endWidth / 2,
        center.y - endHeight / 2,
        endWidth, endHeight
      )
      context.restore()
    }
  }

  drawLanderInformation (lander) {
    const context = this.context
    const constants = this.constants
    const canvasData = constants.math.canvasData
    const landerMath = constants.math.lander
    const textData = constants.math.landerText
    const colors = constants.colors

    context.font = textData.font
    context.textAlign = textData.textAlign
    const velocity = Number.parseFloat(lander.data.velocity.y * landerMath.velocityModifier).toPrecision(4)
    const fuel = Number.parseFloat(lander.data.fuel).toPrecision(4)
    const angle = Number.parseFloat((lander.data.angle * (180 / Math.PI)) % 360).toPrecision(4)

    if (Math.abs(velocity) <= 2) {
      context.fillStyle = colors.safeZone
    } else {
      context.fillStyle = colors.white
    }
    context.fillText(velocity + ' m/s', canvasData.width - textData.widthPadding, textData.heightPadding)

    if (fuel > 0) {
      context.fillStyle = colors.safeZone
    } else {
      context.fillStyle = colors.white
    }
    context.fillText(fuel + ' liters', canvasData.width - textData.widthPadding, textData.heightPadding + textData.upperPadding)

    if ((angle >= 0 && angle <= 5) || angle <= 0 && angle >= -5) {
      context.fillStyle = colors.safeZone
    } else {
      context.fillStyle = colors.white
    }
    context.fillText(angle + ' degrees', canvasData.width - textData.widthPadding, textData.heightPadding + textData.upperPadding + textData.upperPadding)
  }

  drawCountdown (time, level) {
    const context = this.context
    const constants = this.constants
    const canvasData = constants.math.canvasData
    const textData = constants.math.countdownText
    const colors = constants.colors

    context.font = textData.font
    context.fillStyle = colors.white
    context.textAlign = 'center'

    context.fillText(level + ' ' + time, canvasData.width / 2, canvasData.height / 2)
  }

  drawGameOver (particleSystem, elapsedTime, center, angle, lines) {
    const context = this.context
    const constants = this.constants
    const canvasData = constants.math.canvasData
    const textData = constants.math.countdownText
    const colors = constants.colors

    context.font = textData.font
    context.fillStyle = colors.white
    context.textAlign = 'center'

    this.clearCanvas()
    this.drawBackground()
    this.drawTerrain(lines)
    particleSystem.shipCrash.render(elapsedTime, center, angle)
    context.fillText('Game Over!', canvasData.width / 2, canvasData.height / 2)
  }

  drawWinner () {
    this.clearCanvas()
    this.drawBackground()

    const context = this.context
    const constants = this.constants
    const canvasData = constants.math.canvasData
    const textData = constants.math.countdownText
    const colors = constants.colors

    context.font = textData.font
    context.fillStyle = colors.white
    context.textAlign = 'center'

    context.fillText('You Win!', canvasData.width / 2, canvasData.height / 2)
  }

  clearCanvas () {
    const canvasData = this.constants.math.canvasData
    this.context.clearRect(0, 0, canvasData.width, canvasData.height)
  }

  drawTerrain (procedural) {
    const lines = procedural.lines
    const context = this.context

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const start = line.start
      const end = line.end

      context.beginPath()
      context.moveTo(start.x, start.y)
      context.lineTo(end.x, end.y)
      if (line.isSafeZone === true) {
        context.strokeStyle = this.constants.colors.safeZone
      } else {
        context.strokeStyle = this.constants.colors.terrain
      }
      context.stroke()
    }
  }
}

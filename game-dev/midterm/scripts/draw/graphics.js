MidtermGame.graphics = function () {
  'use strict'

  const canvas = document.getElementById('canvas-container')
  const context = canvas.getContext('2d')
  const constants = MidtermGame.constants

  function clear () {
    context.clearRect(0, 0, canvas.width, canvas.height)
  }

  function drawBackground() {
    const image = {}
    context.drawImage(
      image,
      location.x,
      location.y,
      constants.math.canvasData.width,
      constants.math.canvasData.height
    )
  }

  function drawInformation () {
    if (Math.abs(velocity) <= 2) {
      context.fillStyle = colors.safeZone
    } else {
      context.fillStyle = colors.white
    }
    context.fillText(velocity + ' m/s', canvasData.width - textData.widthPadding, textData.heightPadding)
  }

  function drawObject (image, center, rotation, size) {
    context.save()

    context.translate(center.x, center.y)
    context.rotate(rotation)
    context.translate(-center.x, -center.y)

    context.drawImage(
      image,
      center.x - size.x / 2,
      center.y - size.y / 2,
      size.x, size.y)

    context.restore()
  }

  function drawRectangle (rect) {
    context.save()
    context.translate(rect.center.x, rect.center.y)
    context.rotate(rect.rotation)
    context.translate(-rect.center.x, -rect.center.y)

    context.fillStyle = rect.fill
    context.fillRect(rect.center.x - rect.size.x / 2, rect.center.y - rect.size.y / 2, rect.size.x, rect.size.y)

    context.restore()
  }

  return {
    clear: clear,
    drawBackground: drawBackground,
    drawInformation: drawInformation,
    drawObject: drawObject,
    drawRectangle: drawRectangle,
  }
}()

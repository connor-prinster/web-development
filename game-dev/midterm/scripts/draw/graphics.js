MidtermGame.graphics = (function (constants) {
  'use strict'
  let timeSoFar = 0

  const canvas = document.getElementById('canvas-container')
  const context = canvas.getContext('2d')

  function clear() {
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

  function drawInformation(counter, time) {

    context.fillStyle = "#4bbed9"
    context.font = '20px sans-serif'
    context.textAlign = 'right'

    context.fillText(counter + ' clicks. Time: ' + Math.floor(Number.parseFloat(time / 1000)) + ' seconds', 500, 30)
  }

  function drawWinScreen() {
    context.fillStyle = "#000000"
    context.font = '75px monospace'
    context.textAlign = 'center'

    context.fillText("Well Done!", constants.math.canvas.width / 2, constants.math.canvas.height / 2)

  }

  function drawTile(spec, difficulty) {
    if (spec.tile && spec.tile.imagePath) {
      const tile = spec.tile
      const image = new Image()
      image.src = spec.tile.imagePath

      const x = spec.pos.x//halfEach + (spec.cell.x * maxEach)
      const y = spec.pos.y//halfEach + (spec.cell.y * maxEach)

      context.drawImage(
        image,
        x - (image.width / 2),
        y - (image.height / 2),
        image.width,
        image.height
      )

      drawBorder(spec.pos, tile.edgeToCenter)
    }
  }

  function drawRectangle(rect) {
    context.save();
    context.translate(rect.center.x, rect.center.y);
    context.rotate(rect.rotation);
    context.translate(-rect.center.x, -rect.center.y);

    context.fillStyle = rect.fill;
    context.fillRect(rect.center.x - rect.size.x / 2, rect.center.y - rect.size.y / 2, rect.size.x, rect.size.y);

    context.strokeStyle = rect.stroke;
    context.strokeRect(rect.center.x - rect.size.x / 2, rect.center.y - rect.size.y / 2, rect.size.x, rect.size.y);

    context.restore();
  }

  function drawParticle(rect, offset) {
    context.save();
    context.translate(rect.center.x, rect.center.y);
    context.rotate(rect.rotation);
    context.translate(-rect.center.x, -rect.center.y);

    context.fillStyle = rect.fill;
    context.fillRect(rect.center.x + offset - rect.size.x / 2, rect.center.y - offset - rect.size.y / 2, rect.size.x, rect.size.y);

    context.strokeStyle = rect.stroke;
    context.strokeRect(rect.center.x + offset - rect.size.x / 2, rect.center.y - offset - rect.size.y / 2, rect.size.x, rect.size.y);

    context.restore();

  }

  function drawBorder(center, distanceFromCenter) {
    context.beginPath()
    // top
    context.moveTo(center.x - distanceFromCenter, center.y - distanceFromCenter)
    context.lineTo(center.x + distanceFromCenter, center.y - distanceFromCenter)
    // bottom
    context.moveTo(center.x - distanceFromCenter, center.y + distanceFromCenter)
    context.lineTo(center.x + distanceFromCenter, center.y + distanceFromCenter)
    // left
    context.moveTo(center.x - distanceFromCenter, center.y - distanceFromCenter)
    context.lineTo(center.x - distanceFromCenter, center.y + distanceFromCenter)
    // right
    context.moveTo(center.x + distanceFromCenter, center.y + distanceFromCenter)
    context.lineTo(center.x + distanceFromCenter, center.y - distanceFromCenter)

    context.stroke()
  }

  return {
    clear: clear,
    drawBackground: drawBackground,
    drawInformation: drawInformation,
    drawTile: drawTile,
    drawRectangle: drawRectangle,
    drawParticle: drawParticle,
    drawWinScreen: drawWinScreen
  }
})(MidtermGame.constants)

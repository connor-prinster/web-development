MidtermGame.object = (function (location, imageSource, constants) {
  const drawable = new Drawable(imageSource, location)

  let canvas = document.getElementById('canvas-container')
  let context = canvas.getContext('2d');

  const data = {
    center: location,
    rotation: 0,
    image: drawable.image
  }

  function up(elapsedTime) {
    moveTo(elapsedTime, {
      x: data.center.x,
      y: data.center.y - constants.object.speed
    })
  }

  function down(elapsedTime) {
    moveTo(elapsedTime, {
      x: data.center.x,
      y: data.center.y + constants.object.speed
    })
  }

  function left(elapsedTime) {
    moveTo(elapsedTime, {
      x: data.center.x - constants.object.speed,
      y: data.center.y
    })
  }

  function right(elapsedTime) {
    moveTo(elapsedTime, {
      x: data.center.x + constants.object.speed,
      y: data.center.y
    })
  }

  function moveTo(elapsedTime, location) {
    data.center = location
  }

  return {
    drawable: drawable,
    data: data,
    up: up,
    down: down,
    left: left,
    right: right,
    moveTo: moveTo
  }
})({ x: 0, y: 0 }, "./design/images/USU-Logo.png", MidtermGame.constants)

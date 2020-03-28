// ------------------------------------------------------------------
//
// This is a random number generation object.  It provides a handful
// of different ways to generate random numbers.  It is written as a
// Singleton so that there is only one of these throughout the program.
//
// ------------------------------------------------------------------
MidtermGame.inputs = function () {
  'use strict'

  const customControls = {}

  let keyBindings = {
    rotateLeft: 'a',
    rotateRight: 'd',
    thrust: 'w'
  }
  
  if (customControls) {
    keyBindings = customControls.controls
  }

  function onKeyDown (e) {
    const keyBindings = inputs.keyBindings
    if (e.key === keyBindings.rotateLeft) {
      booleans.rotLeft = true
      // lander.moveLeft();
    } else if (e.key === keyBindings.rotateRight) {
      booleans.rotRight = true
      // lander.moveRight();
    } else if (e.key === keyBindings.thrust) {
      booleans.thrust = true
    }
  }

  const booleans = {
    rotLeft: false,
    rotRight: false,
    thrust: false
  }

  function resetBooleans () {
    booleans.rotLeft = false
    booleans.rotRight = false
    booleans.thrust = false
  }

  return {
    onKeyDown: onKeyDown,
    resetBooleans: resetBooleans,
    keyBindings: keyBindings,
    booleans: booleans
  }
}()

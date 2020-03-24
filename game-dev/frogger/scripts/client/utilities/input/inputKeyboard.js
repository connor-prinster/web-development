FroggerGame.input.keyboard = function (game) {
  let handlers = {};
  let inputBuffer = {}
  let willMove = false
  let that = {};
  let keys = []

  // ------------------------------------------------------------------
  //
  // Allows the client code to register a keyboard handler.
  //
  // ------------------------------------------------------------------
  function registerHandler(handler, key) {
    for (let key in handlers)
      if (FroggerGame.isPlaying && handlers.hasOwnProperty(key) && handlers[key] == handler)
        delete handlers[key];
    handlers[key] = handler;
  }

  function keyDown(e) {
    inputBuffer[e.key] = e.key
  }

  function update(elapsedTime) {
    for (let key in inputBuffer) {
      if (inputBuffer.hasOwnProperty(key) && handlers[key]) {
        handlers[key](elapsedTime)
      }
    }
    inputBuffer = {}
  };

  window.addEventListener(
    'keydown',
    (e) => keyDown(e)
  );

  return {
    registerHandler: registerHandler,
    update: update,
    handlers: handlers,
  };
}(FroggerGame.game);

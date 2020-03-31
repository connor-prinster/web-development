MidtermGame.input.keyboard = function () {
  let handlers = {};
  let that = {};
  let keys = []

  // ------------------------------------------------------------------
  //
  // Allows the client code to register a keyboard handler.
  //
  // ------------------------------------------------------------------
  function registerHandler(handler, key) {
    for (let key in handlers)
      if (handlers.hasOwnProperty(key) && handlers[key] == handler)
        delete handlers[key];
    handlers[key] = handler;
  }

  function keyDown(e) {
    keys[e.key] = e.timeStamp;
  }

  function keyUp(e) {
    delete keys[e.key];
  }

  function update(elapsedTime) {
    for (let key in keys) {
      if (keys.hasOwnProperty(key) && handlers[key]) {
        handlers[key](elapsedTime)
      }
    }
  };

  window.addEventListener('keydown', keyDown);
  window.addEventListener('keyup', keyUp);

  return {
    registerHandler: registerHandler,
    update: update,
    handlers: handlers,
  };
}();

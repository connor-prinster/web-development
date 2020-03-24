FroggerGame.screens['customize-controls'] = (function(game, keyboard, constants, storage) {

  function initialize() {}

  function acceptNewControl(handler, methodName, oldKey) {
    const screen = document.getElementById('customize-controls')
    // create visual indication that user can press a new control
    let setter = document.createElement('div');
    setter.innerHTML = "PRESS NEW CONTROL KEY FOR BINDING"
    setter.setAttribute('tabindex', '0');
    setter.classList.add('set-controls');
    setter.focus();
    setter.addEventListener('keydown', function(e) {
      keyboard.registerHandler(handler, e.key, oldKey)
      const controls = storage.retrieveControls()
      controls[methodName].key = e.key
      storage.addControls(controls)
      setter.remove()
      run()
    })
    screen.appendChild(setter)
  }

  
  function run() {
    const customizeButtons = document.getElementById('customize-buttons')
    customizeButtons.innerHTML = ''

    const controls = FroggerGame.utilities.storage.retrieveControls()
    for(let idx in controls) {
      const buttonDiv = document.createElement('button')
      buttonDiv.classList.add('hoverButton', 'buttonTransCust')
      const binding = controls[idx]
      const key = binding.key
      const methodName = binding.method
      buttonDiv.onclick = function() {
        acceptNewControl(FroggerGame.frog[methodName], methodName, key)
      }
      buttonDiv.innerHTML = methodName + " : " + key
      customizeButtons.appendChild(buttonDiv)
    }
  }

  return {
    initialize: initialize,
    run: run
  }
}(FroggerGame.game, FroggerGame.input.keyboard, FroggerGame.constants, FroggerGame.utilities.storage));

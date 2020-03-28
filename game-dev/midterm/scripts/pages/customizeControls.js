MidtermGame.screens['customize-controls'] = (function (game, objects, renderer, graphics, input) {
  function initialize () { }

  let globalCommand = null

  function run () {
    fillButtons()
  }

  function keyPress (key) {
    const selectedCommand = document.getElementById(globalCommand + 'id')
    selectedCommand.classList.remove('selected')

    MidtermGame.inputs.keyBindings[globalCommand] = key.key
    const localStorage = {}
    localStorage.addControls(inputs.keyBindings)

    window.removeEventListener('keypress', keyPress)
    fillButtons()
  }

  function fillButtons () {
    const keyBindings = MidtermGame.inputs.keyBindings
    const buttons = document.getElementById('customize-buttons')
    buttons.innerHTML = ''

    for (const command in keyBindings) {
      const div = document.createElement('div')
      div.classList.add('customize-buttons')

      const button = document.createElement('button')
      button.id = command
      button.innerText = command
      button.onclick = function () {
        globalCommand = command
        const selectedCommand = document.getElementById(button.id + 'id')
        selectedCommand.classList.add('selected')
        window.addEventListener('keypress', keyPress)
      }

      const commandKey = document.createElement('div')
      commandKey.classList.add('command-key')
      commandKey.id = command + 'id'
      commandKey.innerText = keyBindings[command]

      div.appendChild(button)
      div.appendChild(commandKey)
      buttons.appendChild(div)
    }
  }

  return {
    initialize: initialize,
    run: run
  }
})()

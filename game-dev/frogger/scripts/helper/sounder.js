const Sounder = function (path) {
  const audio = new Audio(path)
  const constants = new Constants()
  const timeLeft = constants.math.sound.timeLeft
  let playing = false

  const stop = function () {
    if (playing) {
      audio.pause()
      audio.load()
      playing = false
    }
  }
  const play = function () {
    audio.play()
    playing = true
  }
  const pause = function () {
    audio.pause()
  }

  return {
    timeLeft: timeLeft,
    audio: audio,
    play: play,
    pause: pause,
    stop: stop
  }
}

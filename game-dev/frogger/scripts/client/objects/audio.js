const AudioObj = function (path, constants) {
  const audio = new Audio(path)
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
    audio: audio,
    play: play,
    pause: pause,
    stop: stop
  }
}

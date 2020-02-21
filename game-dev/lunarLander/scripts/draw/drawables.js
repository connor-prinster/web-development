class Drawable {
  constructor (imageSource, location) {
    this.image = new Image()
    this.image.src = imageSource
    this.image.isReady = true
    this.location = location
  }
}

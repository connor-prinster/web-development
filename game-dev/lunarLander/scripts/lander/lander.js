class Lander {
    constructor(imageSource, location) {
        this.image = new Image()
        this.image.src = imageSource
        this.image.isReady = true

        this.data = {
            location: location,
            angle: 0,
            fuel: 0,
            thrust: 0
        }
    }

    modifyLocation(location) {
        this.location = location
    }

    setAngle(angle) {
        angle = (this.angle + angle) % 360
    }
}
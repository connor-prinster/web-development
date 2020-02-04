class Character {
    constructor(imageSource, location) {
        this.image = new Image()
        this.location = location
        this.image.isReady = false
        this.image.src = imageSource
        this.image.isReady = true
    }

    getImage() {
        return this.image
    }

    getLocation() {
        return this.location
    }

    isReady() {
        return this.image.isReady
    }


}
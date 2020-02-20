class Draw {
    constructor(context) {
        this.context = context
        this.constants = new Constants()
    }

    drawLander(image) {
        const constants = this.constants
        const ratio = constants.math.landerSizeRatio
        const endWidth = image.image.width * ratio
        const endHeight = image.image.height * ratio
        const location = image.data.location
        if (image.image.isReady) {
            this.context.drawImage(
                image.image,
                location.x,
                location.y,
                endWidth,
                endHeight
            )
        }
    }
}
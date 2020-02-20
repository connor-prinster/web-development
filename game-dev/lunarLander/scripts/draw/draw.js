class Draw {
    constructor(context) {
        this.context = context
    }

    drawLander(image) {
        const ratio = constants.math.landerSizeRatio
        const endWidth = image.image.width * ratio
        const endHeight = image.image.height * ratio
        const location = image.data.location
        if (item.image.isReady) {
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
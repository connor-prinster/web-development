function generateBonus(imageSource, location, type) {
    const drawable = new Drawable(FroggerGame.assets[imageSource], location)

    const data = {
        timeLeft: 3000,
        type: type,
        drawable: drawable.image,
        sprite: {
            numSprites: 2,
            whichSprite: 0,
            spriteTime: [2000, 500]
        },
        offsets: {
            start: 77 + 38.5,
            end: 77 + 38.5,
        },
        center: location
    }

    function update(elapsedTime) {
        data.timeLeft -= elapsedTime
    };

    function moveTo(elapsedTime, location) {
        data.center = location
    }

    return {
        data: data,
        drawable: drawable,
        update: update,
        moveTo: moveTo
    }
}
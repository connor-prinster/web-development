FroggerGame.objects.tiles = {
    water: [],
    bush: [],
    lilypad: [],
    road: [],
    grass: []
}

FroggerGame.terrain = (function (imageSource, constants) {
    const drawable = new Drawable(imageSource, location)

    const data = {
        image: drawable.image,
        sprite: {
            numSprites: 5,
            whichSprite: 0
        },
    }

    function moveTo(elapsedTime, location) {
        data.center = location
    }

    return {
        data: data,
        drawable: drawable,
        moveTo: moveTo
    }
})(FroggerGame.assets['cars.png'], FroggerGame.constants)

function generateTruck(imageSource, location, which, random, constants) {
    const id = FroggerGame.assets[imageSource]
    const drawable = new Drawable(
        id, 
        location
    )

    const data = {
        drawable: drawable.image,
        sprite: {
            numSprites: 1,
            whichSprite: 0
        },
        offsets: {
            start: 77 + (which * 38.5),
            end: 77 + ((which + 1) * 38.5)
        },
        center: location
    }

    function moveTo(location) {
        data.center = location
        const tooFar = (1000 + (77 * (which + 1)))
        if (location.x >= tooFar) {
            data.center = { x: -154, y: location.y }
        }
    }

    function update() {
        moveTo({
            x: data.center.x + constants.math.speed.truck,
            y: data.center.y
        })
    }

    function reset() {
        moveTo({
            x: -(random.nextRange(10, 200)), 
            y: data.center.y
        })
    }

    return {
        data: data,
        drawable: drawable,
        update: update,
        moveTo: moveTo,
        reset: reset
    }
}

FroggerGame.objects.Trucks = []
const truckPos = [
    {row: 17, xPos: [{pos: [200]}, {pos: [700]}]}, 
    {row: 21, xPos: [{pos: [0]}, {pos: [700]}]}, 
]
for (let i = 0; i < truckPos.length; i++) {
    for(let j = 0; j < truckPos[i].xPos.length; j++) {
        for(let k = 0; k < truckPos[i].xPos[j].pos.length; k++) {
            const imageId = "truck" + i + ".png"
            FroggerGame.objects.Trucks.push(
                generateTruck(
                    imageId, 
                    { x: truckPos[i].xPos[j].pos[k], y: truckPos[i].row * 38.5},
                    i, 
                    FroggerGame.utilities.random, 
                    FroggerGame.constants
                )
            )

        }
    }
}
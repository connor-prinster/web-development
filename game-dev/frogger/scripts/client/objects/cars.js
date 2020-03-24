function generateCar(imageSource, location, which, speed, random, constants) {
    const drawable = new Drawable(imageSource, location)

    const data = {
        drawable: drawable.image,
        sprite: {
            numSprites: 3,
            whichSprite: which
        },
        offsets: {
            start: 77,
            end: 77
        },
        center: location
    }

    function moveTo(location) {
        data.center = location
        if (location.x >= 1077) {
            data.center = { x: -115.5, y: location.y }
        }
    }

    function update() {
        moveTo({
            x: data.center.x + constants.math.speed.car + speed,
            y: data.center.y
        })
    }

    return {
        data: data,
        drawable: drawable,
        update: update,
        moveTo: moveTo
    }
}

FroggerGame.objects.Cars = []
const carPos = [
    {row: 15, speed: .25, xPos: [{pos: [334]}, {pos: [667]}]}, 
    {row: 19, speed: .5, xPos: [{pos: [0]}, {pos: [800]}]}, 
    {row: 23, speed: 0,  xPos: [{pos: [0]}, {pos: [500]}]}
]
for (let i = 0; i < carPos.length; i++) {
    for(let j = 0; j < carPos[i].xPos.length; j++) {
        for(let k = 0; k < carPos[i].xPos[j].pos.length; k++) {
            FroggerGame.objects.Cars.push(
                generateCar(
                    FroggerGame.assets['cars.png'], 
                    { x: carPos[i].xPos[j].pos[k], y: carPos[i].row * 38.5},
                    i, 
                    carPos[i].speed,
                    FroggerGame.utilities.random, 
                    FroggerGame.constants
                )
            )

        }
    }
}
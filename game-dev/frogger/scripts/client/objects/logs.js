function generateLog(imageSource, location, which, speed, random, constants) {
    const drawable = new Drawable(imageSource, location)
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
        
        if(location.x >= tooFar) {
            data.center = {x: -154, y: location.y}
        }
    }

    function update() {
        moveTo({
            x: data.center.x + speed,
            y: data.center.y
        })
    }

    return {
        data: data,
        drawable: drawable,
        update: update,
        moveTo: moveTo,
    }
}

FroggerGame.objects.Logs = []
const logPos = [
    {row: 5, speed: 4.2, xPos: [{pos: [-100]}, {pos: [700]}]}, 
    {row: 9, speed: 4, xPos: [{pos: [0]}, {pos: [600]}]}, 
    {row: 3, speed: 3, xPos: [{pos: [100]}, {pos: [600]}]}, 
]
for (let i = 0; i < logPos.length; i++) {
    for(let j = 0; j < logPos[i].xPos.length; j++) {
        for(let k = 0; k < logPos[i].xPos[j].pos.length; k++) {
            FroggerGame.objects.Logs.push(
                generateLog(
                    FroggerGame.assets["log" + i + ".png"], 
                    { x: logPos[i].xPos[j].pos[k], y: logPos[i].row * 38.5},
                    i, 
                    logPos[i].speed,
                    FroggerGame.utilities.random, 
                    FroggerGame.constants
                )
            )

        }
    }
}
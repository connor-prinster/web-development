function generateTurtles(imageSource, location, which, random, constants) {
    const drawable = new Drawable(imageSource, location)
    let localTime = 0

    let increasing = true

    const data = {
        drawable: drawable.image,
        sprite: {
            numSprites: 9,
            whichSprite: which,
            spriteTime: [200, 200, 200, 500, 500, 500, 500, 1000, 700]
        },
        offsets: {
            start: 38.5,
            end: 38.5
        },
        center: location
    }

    function update(elapsedTime) {
        moveTo(elapsedTime, {
            x: data.center.x + constants.math.speed.turtle,
            y: data.center.y
        })
        localTime += elapsedTime;

        if (localTime >= data.sprite.spriteTime[data.sprite.whichSprite]) {
            localTime -= data.sprite.spriteTime[data.sprite.whichSprite];
            if(increasing) {
                data.sprite.whichSprite++
            }
            else {
                data.sprite.whichSprite--
            }
            data.sprite.whichSprite = data.sprite.whichSprite % data.sprite.numSprites
            if(data.sprite.whichSprite === data.sprite.numSprites - 1) {
                increasing = false
            }
            if(!increasing && data.sprite.whichSprite === 0) {
                increasing = true
            }
        }
    };

    function moveTo(elapsedTime, location) {
        data.center = location
        if(location.x < -77) {//location.x >= (1000 + (77/2))) {
            data.center = {x: 1077, y: location.y}
        }
    }

    return {
        data: data,
        drawable: drawable,
        update: update,
        moveTo: moveTo
    }
}

FroggerGame.objects.Turtles = []
const turtlePos = [
    {row: 7, xPos: [{pos: [38.5, 115.5]}, {pos: [308, 385]}, {pos: [654.5]}, {pos: [805.5]}]}, 
    {row: 11, xPos: [{pos: [0, 77, 154]}, {pos: [385, 462]}, {pos: [616, 693]}, {pos: [847]}]}
]
for (let i = 0; i < turtlePos.length; i++) {
    for(let j = 0; j < turtlePos[i].xPos.length; j++) {
        const which = FroggerGame.utilities.random.nextRange(0, 9)
        for(let k = 0; k < turtlePos[i].xPos[j].pos.length; k++) {
            FroggerGame.objects.Turtles.push(
                generateTurtles(
                    FroggerGame.assets["turtles.png"], 
                    { x: turtlePos[i].xPos[j].pos[k], y: turtlePos[i].row * 38.5},
                    which, 
                    FroggerGame.utilities.random, 
                    FroggerGame.constants
                )
            )

        }
    }
}
function generateAlligators(imageSource, location, which, random, constants) {
    const drawable = new Drawable(imageSource, location)
    let localTime = 0

    let increasing = true

    const data = {
        drawable: drawable.image,
        sprite: {
            numSprites: 2,
            whichSprite: which,
            spriteTime: [2000, 500]
        },
        offsets: {
            start: 77 + 38.5,
            end: 77 + 38.5,
        },
        center: location
    }

    function update(elapsedTime) {
        moveTo(elapsedTime, {
            x: data.center.x + constants.math.speed.alligator,
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
        if(location.x >= (1077)) {5
            data.center = {x: -308, y: location.y}
        }
    }

    return {
        data: data,
        drawable: drawable,
        update: update,
        moveTo: moveTo
    }
}

// {pos: [600]}
FroggerGame.objects.Alligators = []
const alligatorPos = [ {row: 3, xPos: [ {pos: [1000]},]} ]
for (let i = 0; i < alligatorPos.length; i++) {
    for(let j = 0; j < alligatorPos[i].xPos.length; j++) {
        for(let k = 0; k < alligatorPos[i].xPos[j].pos.length; k++) {
            FroggerGame.objects.Alligators.push(
                generateAlligators(
                    FroggerGame.assets["alligators.png"], 
                    { x: alligatorPos[i].xPos[j].pos[k], y: alligatorPos[i].row * 38.5},
                    i, 
                    FroggerGame.utilities.random, 
                    FroggerGame.constants
                )
            )
        }
    }
}
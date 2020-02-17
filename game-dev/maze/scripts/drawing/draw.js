class Draw {
    constructor(context, characters, booleans, breadCrumbs, shortestPath) {
        this.context = context
        this.characters = characters
        this.booleans = booleans
        this.breadCrumbs = breadCrumbs
        this.shortestPath = shortestPath
    }

    drawCharacters() {
        const COORD_SIZE = constants.COORD_SIZE
        const RATIO = constants.RATIO
        const cellSize = COORD_SIZE * RATIO
    
        for (let idx in this.characters) {
            let character = this.characters[idx]
            if (character.image.isReady) {
                // center an image if it needs to be centered
                let offsetWidth = Math.floor((cellSize - character.image.width * RATIO) / 2)
                let offsetHeight = Math.floor((cellSize - character.image.height * RATIO) / 2)
                // get the end coordinates of the resized image
                const endWidth = character.image.width * RATIO
                const endHeight = character.image.height * RATIO
                // draw the image
                context.drawImage(
                    character.image,
                    (character.location.x * cellSize) + offsetWidth,
                    (character.location.y * cellSize) + offsetHeight,
                    endWidth,
                    endHeight
                )
            }
        }
    }

    drawBackground() {
        let COORD_SIZE = constants.COORD_SIZE
        let RATIO = constants.RATIO
        let character = myEndor
        if (myEndor.image.isReady) {
            const endWidth = canvas.width
            const endHeight = canvas.height
            context.drawImage(
                character.image,
                character.location.x * (COORD_SIZE * RATIO),
                character.location.y * (COORD_SIZE * RATIO),
                endWidth,
                endHeight
            )
        }
    }

    drawHelps() {
        if (this.booleans.hints) {
            this.drawNextCell()
        }
        if (this.booleans.breadcrumbs) {
            this.drawBreadcrumbs()
        }
        if (this.booleans.path) {
            this.drawPathToFinish()
        }
    }

    drawNextCell() {
        const COORD_SIZE = constants.COORD_SIZE
        const RATIO = constants.RATIO
        const cellSize = COORD_SIZE * RATIO
    
        const short = this.shortestPath.returnStack()
        if(short.length > 0) {
            let cell = short[short.length - 1]
            let location = {x: cell.coordinates.col, y: cell.coordinates.row}
            const path = new Character(targetLockPath, location)

            if (path.image.isReady) {
                // center an image if it needs to be centered
                let offsetWidth = Math.floor((cellSize - path.image.width * RATIO) / 2)
                let offsetHeight = Math.floor((cellSize - path.image.height * RATIO) / 2)
                // get the end coordinates of the resized image
                const endWidth = path.image.width * RATIO
                const endHeight = path.image.height * RATIO
                // draw the image
                context.drawImage(
                    path.image,
                    (path.location.x * cellSize) + offsetWidth,
                    (path.location.y * cellSize) + offsetHeight,
                    endWidth,
                    endHeight
                )
            }
        }
    }

    drawBreadcrumbs() {
        const COORD_SIZE = constants.COORD_SIZE
        const RATIO = constants.RATIO
        const cellSize = COORD_SIZE * RATIO
    
        for (let i = 0; i < breadCrumbs.length - 1; i++) {
            let crumb = breadCrumbs[i]
            if (crumb.image.isReady) {
                // center an image if it needs to be centered
                let offsetWidth = Math.floor((cellSize - crumb.image.width * RATIO) / 2)
                let offsetHeight = Math.floor((cellSize - crumb.image.height * RATIO) / 2)
                // get the end coordinates of the resized image
                const endWidth = crumb.image.width * RATIO
                const endHeight = crumb.image.height * RATIO
                // draw the image
                context.drawImage(
                    crumb.image,
                    (crumb.location.x * cellSize) + offsetWidth,
                    (crumb.location.y * cellSize) + offsetHeight,
                    endWidth,
                    endHeight
                )
            }
        }
    }

    drawPathToFinish() {
        const COORD_SIZE = constants.COORD_SIZE
        const RATIO = constants.RATIO
        const cellSize = COORD_SIZE * RATIO
    
        const short = this.shortestPath.returnStack()
        for(let i = 0; i < short.length; i++) {
            let cell = short[i]
            let location = {x: cell.coordinates.col, y: cell.coordinates.row}
            const path = new Character(targetLockPath, location)

            if (path.image.isReady) {
                // center an image if it needs to be centered
                let offsetWidth = Math.floor((cellSize - path.image.width * RATIO) / 2)
                let offsetHeight = Math.floor((cellSize - path.image.height * RATIO) / 2)
                // get the end coordinates of the resized image
                const endWidth = path.image.width * RATIO
                const endHeight = path.image.height * RATIO
                // draw the image
                context.drawImage(
                    path.image,
                    (path.location.x * cellSize) + offsetWidth,
                    (path.location.y * cellSize) + offsetHeight,
                    endWidth,
                    endHeight
                )
            }
        }
    }

    drawMaze(maze) {
        const height = constants.HEIGHT
        const width = constants.WIDTH
        for (let row = 0; row < height; row++) {
            for (let col = 0; col < width; col++) {
                const cell = maze[row][col]
                const passages = cell.passages
                const coordSize = constants.COORD_SIZE * constants.RATIO
    
                this.context.beginPath();
    
                if (!passages[constants.UP]) {
                    this.context.moveTo(
                        col * coordSize,
                        row * coordSize
                    )
    
                    this.context.lineTo(
                        (col + 1) * coordSize,
                        row * coordSize
                    )
                }
    
                if (!passages[constants.DOWN]) {
                    this.context.moveTo(
                        col * coordSize,
                        (row + 1) * coordSize
                    )
                    this.context.lineTo(
                        (col + 1) * coordSize,
                        (row + 1) * coordSize
                    )
                }
    
                if (!passages[constants.LEFT]) {
                    this.context.moveTo(
                        col * coordSize,
                        row * coordSize
                    )
    
                    this.context.lineTo(
                        col * coordSize,
                        (row + 1) * coordSize
                    )
                }
    
                if (!passages[constants.RIGHT]) {
                    this.context.moveTo(
                        (col + 1) * coordSize,
                        row * coordSize
                    )
                    this.context.lineTo(
                        (col + 1) * coordSize,
                        (row + 1) * coordSize
                    )
                }
    
                this.context.stroke()
            }
        }
    }
}
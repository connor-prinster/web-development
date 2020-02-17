// for generating the maze
let frontiers = []
let inMazes = []

class Prims {
    constructor(maze) {
        this.maze = this.prims(maze)
    }

    /*
    choose random point and add to maze

    cells not in maze but adjacent to cell in maze = frontier

    while cells in frontier:
        choose a random frontier cell and add passage between frontier cell and a random cell in maze
            mark frontier cell as part of maze
            mark cells neighboring this new in maze as frontier
    */
    returnRandom(max) {
        return Math.floor(Math.random() * Math.floor(max))
    }

    prims(maze) {
        const height = constants.HEIGHT
        const width = constants.WIDTH

        maze = this.markCells(maze, this.returnRandom(height), this.returnRandom(width)) // mark the first random cell

        while (frontiers.length > 0) {

            let randomFrontierIdx = this.returnRandom(frontiers.length) // get the random index
            let randomFrontier = frontiers.splice(randomFrontierIdx, 1).pop() // get that random frontier object

            let neighborsInMaze = this.returnInMaze(randomFrontier, maze) // get the "inMaze" neighbors
            let randomInMaze = neighborsInMaze[this.returnRandom(neighborsInMaze.length)] // getRandom "in maze" neighbor

            let frontierToInMazeDirection = this.findDirectionFromFrontierToMaze(randomFrontier, randomInMaze)
            let inMazeToFrontierDirection = this.returnOppositeDirection(frontierToInMazeDirection)

            randomFrontier.inMaze = true
            randomFrontier.passages[frontierToInMazeDirection] = constants.passage
            randomInMaze.passages[inMazeToFrontierDirection] = constants.passage

            let randomFrontierCoords = randomFrontier.coordinates
            let randomInMazeCoords = randomInMaze.coordinates

            maze[randomFrontierCoords.row][randomFrontierCoords.col] = randomFrontier
            maze[randomInMazeCoords.row][randomInMazeCoords.col] = randomInMaze

            maze = this.markFrontier(randomFrontier, maze)
        }

        return maze
    }

    markCells(maze, row, col) {
        let cell1 = maze[row][col]
        cell1.inMaze = true

        return this.markFrontier(cell1, maze)
    }

    checkIfAddCellToFrontier(cell) {
        if (cell.inMaze) {
            return false
        }

        return !this.checkIfCellAlreadyFrontier(cell)
    }

    checkIfCellAlreadyFrontier(cell) {
        let cellId = cell.id
        for (let idx in frontiers) {
            let frontierCellId = frontiers[idx].id
            if (cellId == frontierCellId) {
                return true
            }
        }
        return false
    }

    markFrontier(inCell, maze) {
        let cellCoords = inCell.coordinates
        let neighbors = inCell.neighbors
        maze[cellCoords.row][cellCoords.col].inMaze = true
        const upCoord = neighbors.up
        const downCoord = neighbors.down
        const leftCoord = neighbors.left
        const rightCoord = neighbors.right

        if (neighbors.up && this.checkIfAddCellToFrontier(maze[upCoord.row][upCoord.col])) {
            const coord = upCoord
            maze[coord.row][coord.col].inFrontier = true
            frontiers.push(maze[coord.row][coord.col])
        }
        if (neighbors.down && this.checkIfAddCellToFrontier(maze[downCoord.row][downCoord.col])) {
            const coord = downCoord
            maze[coord.row][coord.col].inFrontier = true
            frontiers.push(maze[coord.row][coord.col])
        }
        if (neighbors.left && this.checkIfAddCellToFrontier(maze[leftCoord.row][leftCoord.col])) {
            const coord = leftCoord
            maze[coord.row][coord.col].inFrontier = true
            frontiers.push(maze[coord.row][coord.col])
        }
        if (neighbors.right && this.checkIfAddCellToFrontier(maze[rightCoord.row][rightCoord.col])) {
            const coord = rightCoord
            maze[coord.row][coord.col].inFrontier = true
            frontiers.push(maze[coord.row][coord.col])
        }

        return maze
    }

    findDirectionFromFrontierToMaze(frontierCell, inMazeCell) {
        let frontierNeighbors = frontierCell.neighbors
        let inMazeCoordinates = inMazeCell.coordinates

        let frontierUp = frontierNeighbors.up
        let frontierDown = frontierNeighbors.down
        let frontierLeft = frontierNeighbors.left
        let frontierRight = frontierNeighbors.right

        if (frontierUp && (frontierUp.row == inMazeCoordinates.row && frontierUp.col == inMazeCoordinates.col)) {
            return constants.UP
        }
        else if (frontierDown && (frontierDown.row == inMazeCoordinates.row && frontierDown.col == inMazeCoordinates.col)) {
            return constants.DOWN
        }
        else if (frontierLeft && (frontierLeft.row == inMazeCoordinates.row && frontierLeft.col == inMazeCoordinates.col)) {
            return constants.LEFT
        }
        else if (frontierRight && (frontierRight.row == inMazeCoordinates.row && frontierRight.col == inMazeCoordinates.col)) {
            return constants.RIGHT
        }
    }

    returnOppositeDirection(direction) {
        if (direction == constants.UP) {
            return constants.DOWN
        }
        else if (direction == constants.DOWN) {
            return constants.UP
        }
        else if (direction == constants.LEFT) {
            return constants.RIGHT
        }
        else {
            return constants.LEFT
        }
    }

    returnInMaze(frontierCell, maze) {
        let neighbors = frontierCell.neighbors
        let inMaze = []

        if (neighbors.up) {
            const coord = neighbors.up
            if (maze[coord.row][coord.col].inMaze) {
                inMaze.push(maze[coord.row][coord.col])
            }
        }
        if (neighbors.down) {
            const coord = neighbors.down
            if (maze[coord.row][coord.col].inMaze) {
                inMaze.push(maze[coord.row][coord.col])
            }
        }
        if (neighbors.left) {
            const coord = neighbors.left
            if (maze[coord.row][coord.col].inMaze) {
                inMaze.push(maze[coord.row][coord.col])
            }
        }
        if (neighbors.right) {
            const coord = neighbors.right
            if (maze[coord.row][coord.col].inMaze) {
                inMaze.push(maze[coord.row][coord.col])
            }
        }

        return inMaze
    }
}


class BreadthFirst {
    constructor(maze) {
        this.maze = maze
        this.bfStack = new Stack()
        this.breadthFirst()
        this.shortestPath = this.backtrack()
    }

    backtrack() {
        let track = []
        let cell = this.maze[constants.HEIGHT - 1][constants.WIDTH - 1]
        track.push(cell)
        while(cell.id != 0) {
            cell = this.maze[cell.bfParentCoords.row][cell.bfParentCoords.col]
            track.push(cell)
        }
        track.splice(track.length - 1, 1)

        const newStack = new Stack()
        for(let i = 0; i < track.length; i++) {
            newStack.push(track[i])
        }
        
        return newStack
    }


    /*
    create empty queue and enqueue source cell and mark as visited

    Add the starting node in queue
    While the queue is not empty, pop a node, do following:
        If we reach the wall or the node is already visited, skip to next iteration
        If exit node is reached, backtrack from current node till start node to find the shortest path
        Else, add all immediate neighbors in the four directions in queue
    */
    breadthFirst() {
        let currentCell = this.maze[0][0]
        this.bfStack.push(currentCell)

        while(!this.bfStack.isEmpty()) {
            currentCell = this.bfStack.pop()
            this.addNeighborsToStack(currentCell)
        }
    }

    isVisited(cell) {
        const row = cell.row
        const col = cell.col
        const neighbor = this.maze[row][col]
        return neighbor.isVisited
    }

    addNeighborsToStack(parentCell) {
        const passages = parentCell.passages

        const neighbors = parentCell.neighbors
        const up = neighbors.up
        const down = neighbors.down
        const left = neighbors.left
        const right = neighbors.right
        
        if(passages.up == constants.passage) {
            if(!this.isVisited(up)) {
                this.addToStack(up, parentCell)
            }
        }
        if(passages.down == constants.passage) {
            if(!this.isVisited(down)) {
                this.addToStack(down, parentCell)
            }
        }
        if(passages.left == constants.passage) {
            if(!this.isVisited(left)) {
                this.addToStack(left, parentCell)
            }
        }
        if(passages.right == constants.passage) {
            if(!this.isVisited(right)) {
                this.addToStack(right, parentCell)
            }
        }
    }

    addToStack(cell, parent) {
        // make sure that the cell has its parent assigned
        const row = cell.row
        const col = cell.col
        const parentCoords = parent.coordinates
        this.maze[row][col].bfParentCoords = {row: parentCoords.row, col: parentCoords.col}        

        // mark the cell as visited
        this.maze[row][col].isVisited = true
        this.bfStack.push(this.maze[row][col])
    }
}
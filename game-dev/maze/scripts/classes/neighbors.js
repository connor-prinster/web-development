class Neighbors {

    constructor() {
        const that = this
        this.neighborNumberFunctions = {
            up: function (cellId) {
                return that.genCellPos(cellId - constants.WIDTH)
            },
            down: function (cellId) {
                return that.genCellPos(cellId + constants.WIDTH)
            },
            left: function (cellId) {
                return that.genCellPos(cellId - 1)
            },
            right: function (cellId) {
                return that.genCellPos(cellId + 1)
            }
        }
        this.neighborRowFunctions = {
            firstRow: function (cellId) {
                let neighbors = that.genNeighborObj()
        
                if (cellId % constants.WIDTH == 0) { // first in first
                    neighbors.down = that.neighborNumberFunctions.down(cellId)
                    neighbors.right = that.neighborNumberFunctions.right(cellId)
                }
                else if ((cellId % constants.WIDTH) == (constants.WIDTH - 1)) { // last in first
                    neighbors.down = that.neighborNumberFunctions.down(cellId)
                    neighbors.left = that.neighborNumberFunctions.left(cellId)
                }
                else { // in first
                    neighbors.down = that.neighborNumberFunctions.down(cellId)
                    neighbors.left = that.neighborNumberFunctions.left(cellId)
                    neighbors.right = that.neighborNumberFunctions.right(cellId)
                }
        
                return neighbors
            },
            lastRow: function (cellId) {
                let neighbors = that.genNeighborObj()
        
                if (cellId % constants.WIDTH == 0) { // first in last
                    neighbors.up = that.neighborNumberFunctions.up(cellId)
                    neighbors.right = that.neighborNumberFunctions.right(cellId)
                }
                else if ((cellId % constants.WIDTH) == (constants.WIDTH - 1)) { // last in last
                    neighbors.up = that.neighborNumberFunctions.up(cellId)
                    neighbors.left = that.neighborNumberFunctions.left(cellId)
                }
                else { // in last
                    neighbors.up = that.neighborNumberFunctions.up(cellId)
                    neighbors.left = that.neighborNumberFunctions.left(cellId)
                    neighbors.right = that.neighborNumberFunctions.right(cellId)
                }
        
                return neighbors
            },
            centerRow: function (cellId) {
                let neighbors = that.genNeighborObj()
        
                if (cellId % constants.WIDTH == 0) { // first in center
                    neighbors.up = that.neighborNumberFunctions.up(cellId)
                    neighbors.down = that.neighborNumberFunctions.down(cellId)
                    neighbors.right = that.neighborNumberFunctions.right(cellId)
                }
                else if ((cellId % constants.WIDTH) == (constants.WIDTH - 1)) { // last in center
                    neighbors.up = that.neighborNumberFunctions.up(cellId)
                    neighbors.down = that.neighborNumberFunctions.down(cellId)
                    neighbors.left = that.neighborNumberFunctions.left(cellId)
                }
                else { // in center
                    neighbors.up = that.neighborNumberFunctions.up(cellId)
                    neighbors.down = that.neighborNumberFunctions.down(cellId)
                    neighbors.left = that.neighborNumberFunctions.left(cellId)
                    neighbors.right = that.neighborNumberFunctions.right(cellId)
                }
        
                return neighbors
            }
        }
    }

    neighbors(cellId) {
        if (cellId - constants.WIDTH < 0) { // if first row
            return this.neighborRowFunctions.firstRow(cellId)
        }
        else if (cellId + constants.WIDTH >= constants.AREA) { // if last row
            return this.neighborRowFunctions.lastRow(cellId)
        }
        else { // if not first or last row
            return this.neighborRowFunctions.centerRow(cellId)
        }
    }

    genNeighborObj() {
        return {
            up: null,
            down: null,
            left: null,
            right: null
        }
    }

    genCellPos(cellId) {
        let width = constants.WIDTH
        let height = constants.HEIGHT
        let row = Math.floor(cellId / height)
        let col = Math.floor(cellId % width)
        return { row: row, col: col }
    }
}
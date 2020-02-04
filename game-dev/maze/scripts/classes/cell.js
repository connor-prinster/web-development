class Cell {
    constructor(row, col) {
        let cellId = this.genCellId(row, col)
        this.id = cellId
        // === For Prims === //
        this.inFrontier = false
        this.inMaze = false
        // === For Breadth-First === //
        this.isVisited = false
        // === For Scoring === //
        this.entered = false
        this.inShortest = false
        // === General Cell Things === //
        this.neighbors = new Neighbors().neighbors(cellId)
        this.passages = {
            up: null,
            down: null,
            left: null,
            right: null
        }
        this.coordinates = {
            row: row,
            col: col
        }
    }

    genCellId(row, col) {
        return ((row * constants.WIDTH) + col)
    }
}
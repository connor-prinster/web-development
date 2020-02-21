class Procedural {
  constructor (xMin, xMax, height, level) {
    this.constants = new Constants()
    this.level = level
    this.lines = [] // will hold the lines making up the terrain
    this.safeZones = []
    this.mean = 10
    this.stdDev = 80
    this.height = height
    this.initLine = this.generateLine(xMin, xMax, height, height)
  }

  doProcedural () {
    this.generateLinesBetweenSafeZones()
  }

  generateLinesBetweenSafeZones () {
    const safeZones = this.generateSafeZones()
    if (this.level === this.constants.strings.levels.level1) { // there'll be two safezones
      const connectingLines = []
      const safeOne = safeZones[0]
      const safeTwo = safeZones[1]

      const height = this.height

      const leftSafeOne = this.generateLine(0, safeOne.start.x, height, safeOne.start.y)
      const middleSafe = this.generateLine(safeOne.end.x, safeTwo.start.x, safeOne.end.y, safeTwo.start.y)
      const rightSafeTwo = this.generateLine(safeTwo.end.x, this.constants.math.canvasData.width, safeTwo.end.y, height)
      connectingLines.push(leftSafeOne)
      connectingLines.push(middleSafe)
      connectingLines.push(rightSafeTwo)
      for (const idx in connectingLines) {
        const connecting = connectingLines[idx]
        this.splitLinesRecursion(connecting)
      }
    } else { // there'll be one safezone
      const connectingLines = []
      const safe = safeZones[0]

      const height = this.height

      const leftSafeOne = this.generateLine(0, safe.start.x, height, safe.start.y)
      const rightSafeTwo = this.generateLine(safe.end.x, this.constants.math.canvasData.width, safe.end.y, height)
      connectingLines.push(leftSafeOne)
      connectingLines.push(rightSafeTwo)
      for (const idx in connectingLines) {
        const connecting = connectingLines[idx]
        this.splitLinesRecursion(connecting)
      }
    }
  }

  generateSafeZone (minX, maxX) {
    const terrainData = this.constants.math.terrainData

    let safeZoneRanges = false
    const margin = terrainData.landingPadMargin
    const landingPadWidth = ((this.level === this.constants.strings.levels.level1) ? terrainData.landingPadOne : terrainData.landingPadTwo)

    const startX = this.returnRandom(minX, maxX - (margin + landingPadWidth))
    let endX = startX + landingPadWidth
    if (safeZoneRanges) {
      while (
        (startX >= safeZoneRanges.start && startX <= safeZoneRanges.end) ||
        (endX >= safeZoneRanges.start && endX <= safeZoneRanges.end)
      ) {
        const startX = this.returnRandom(minX, maxX - (margin + landingPadWidth))
        endX = startX + landingPadWidth
      }
    } else {
      safeZoneRanges = { start: startX, end: endX }
    }
    const startY = this.returnRandom(terrainData.minTerrainHeight, terrainData.maxTerrainHeight)
    const endY = startY

    const safeZone = this.generateLine(startX, endX, startY, endY)
    safeZone.isSafeZone = true
    this.lines.push(safeZone)
    this.safeZones.push(safeZone)
    return safeZone
  }

  generateSafeZones () {
    const canvasData = this.constants.math.canvasData
    const safeZones = []

    if (this.level == this.constants.strings.levels.level1) {
      const halfway = canvasData.width / 2
      const leftZone = this.generateSafeZone(0, halfway)
      const rightZone = this.generateSafeZone(halfway, canvasData.width)
      safeZones.push(leftZone)
      safeZones.push(rightZone)
    } else {
      const sz = this.generateSafeZone(0, canvasData.width)
      safeZones.push(sz)
    }

    return safeZones
  }

  splitLinesRecursion (unfinished) {
    const smallestLine = this.constants.math.terrainData.smallestLine
    const constants = this.constants
    const dimensions = this.getLineDimensions(unfinished)
    if (dimensions.width > smallestLine) {
      const start = unfinished.start
      const end = unfinished.end

      let newWidth = this.floorIt(start.x + (dimensions.width / 2))
      if (newWidth < 0) {
        newWidth = 0
      } else if (newWidth > constants.math.canvasData.width) {
        newWidth = constants.math.canvasData.width
      }

      let newHeight = this.floorIt(start.y + this.returnGaussian())
      if (newHeight >= constants.math.canvasData.height) {
        newHeight = constants.math.terrainData.minTerrainHeight
      } else if (newHeight <= constants.math.terrainData.maxTerrainHeight) {
        newHeight = constants.math.terrainData.maxTerrainHeight
      }

      const leftHalf = this.generateLine(
        start.x, newWidth, start.y, newHeight
      )
      const rightHalf = this.generateLine(
        newWidth, end.x, newHeight, end.y
      )

      this.splitLinesRecursion(leftHalf, smallestLine)
      this.splitLinesRecursion(rightHalf, smallestLine)
    } else {
      this.lines.push(unfinished)
    }
  }

  getLineDimensions (line) {
    const start = line.start
    const end = line.end

    return {
      width: (end.x - start.x),
      heightDiff: (end.y - start.y)
    }
  }

  generateLine (xMin, xMax, yMin, yMax) {
    const line = {
      start: { x: xMin, y: yMin },
      end: { x: xMax, y: yMax }
    }

    return line
  }

  returnGaussian () {
    const landerMath = this.constants.math.terrainData
    return Random.nextGaussian(landerMath.mean, landerMath.stdDev)
  }

  returnRandom (min, max) {
    return Random.nextRange(min, max)
  }

  floorIt (val) {
    return Math.floor(val)
  }
}

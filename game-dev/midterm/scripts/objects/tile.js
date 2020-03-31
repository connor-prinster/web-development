MidtermGame.generateTile = function(imagePath, centerDistance, atWhichCell, correctCell) {
     
    return {
        imagePath: imagePath,
        edgeToCenter: centerDistance,
        atWhichCell: atWhichCell,
        correctCell: correctCell
    }
}
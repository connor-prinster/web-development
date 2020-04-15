FroggerGame.utilities.intersection = function () {
    function checkIntersections(lines) {
        const lander = {}
        if (lander.data.center) {
            const imager = lander.image.image
            const ratio = constants.math.lander.landerSizeRatio
            const endWidth = imager.width * ratio
            const endHeight = imager.height * ratio
            const location = lander.data.location
            const circle = {}
            circle.center = {
                x: (endWidth - location.x) / 2,
                y: (endHeight - location.y) / 2
            }
            circle.radius = constants.math.lander.circleRadius
            lander.circle = circle

            for (const idx in lines) {
                const line = lines[idx]
                if (lineCircleIntersection(line.end, line.start, circle)) {
                    return true
                }
            }
        }
        return false
    }

    function lineCircleIntersection(pt1, pt2, circle) {
        const v1 = { x: pt2.x - pt1.x, y: pt2.y - pt1.y }
        const v2 = { x: pt1.x - circle.center.x, y: pt1.y - circle.center.y }
        const b = -2 * (v1.x * v2.x + v1.y * v2.y)
        const c = 2 * (v1.x * v1.x + v1.y * v1.y)
        const d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - circle.radius * circle.radius))
        if (isNaN(d)) { // no intercept
            return false
        }
        // These represent the unit distance of point one and two on the line
        const u1 = (b - d) / c
        const u2 = (b + d) / c
        if (u1 <= 1 && u1 >= 0) { // If point on the line segment
            return true
        }
        if (u2 <= 1 && u2 >= 0) { // If point on the line segment
            return true
        }
        return false
    }

    return {
        checkIntersections: checkIntersections
    }
}
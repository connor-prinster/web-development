// Clock hands
// Write a function that returns the acute angle between two clock hands, with two integers for the
// number of hours and number of minutes.
// E.g. For 3:00, the acute angle would be 90°. For 6:00, it would be 180°.

function main() {
    const arr = ["3:00", "6:00", "6:45"]
    for(let idx in arr) {
        acuteAngle(arr[idx])
    }
}

function acuteAngle(input) {
    const hands = input.split(':')
    const hour = hands[0]
    const minutes = hands[1]
    
    const hourToTwelveAngle = (hour / 12) * 360
    const minutesToTwelveAngle = (minutes / 60) * 360

    const difference = Math.abs(hourToTwelveAngle - minutesToTwelveAngle)
    console.log("input", input, "difference", difference)
}

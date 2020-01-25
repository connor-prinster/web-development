let events = []
let valids = []
let newEvents = []

window.onload = function() {
    // === get the submit button from the document === //
    let submitButton = this.document.getElementById("submitButton")
    submitButton.onclick = () => {
        this.submitButtonPress()
    }

    this.gameLoop(this.performance.now())
}

document.onkeydown = function(e) {
    // === submit on enter === //
    e = e || window.event;
    switch (e.which || e.keyCode) {
        case 13: //Your Code Here (13 is ascii code for 'ENTER')
            submitButtonPress()
    }
}

function reportToNode(event) {
    // === change event before printing it === //
    event = decrementTimesLeft(event)
    event = updateTime(event)

    // === Generate the individual nodes === //
    let singleEventNode = document.createElement("div")
    let eventText = document.createTextNode("Event: " + event.name + " (" + event.times + " remaining)")
    let br = document.createElement("br")
    singleEventNode.appendChild(eventText)
    singleEventNode.appendChild(br)

    // === Get and Append Value to Screen === //
    let eventsNode = this.document.getElementById("eventArticle")
    eventsNode.insertBefore(singleEventNode, eventsNode.childNodes[0])

    // === event was modified, return it === //
    return event
}

function submitButtonPress() {
    // === Nodes to Pull From === //
    let nameNode = this.document.getElementById("nameInput")
    let intervalNode = this.document.getElementById("intervalInput")
    let timesNode = this.document.getElementById("timesInput")

    // === Values From Nodes === //
    let name = nameNode.value
    let interval = this.parseInt(intervalNode.value)
    let times = this.parseInt(timesNode.value)

    // === Reset Values on Inputs === //
    nameNode.value = ""
    intervalNode.value = null
    timesNode.value = null

    // === Create an Event Object === //
    if (nameNode != "" && !this.isNaN(interval) && !this.isNaN(times)) { // if everything is all set correctly in the inputs
        let event = {
            "nextCall": 0,
            "name": name,
            "interval": interval,
            "times": times,
            "stringify": function() {
                return ("(" + this.name + ", " + this.times + ") => ")
            }
        }
        event.nextCall = (event.interval + performance.now())
        event = reportToNode(event)
        newEvents.push(event)
    } else { // if something is wrong with the input
        this.alert("Something was wrong with your input")
    }
}

function decrementTimesLeft(event) {
    // === decrement times to print === //
    event.times = event.times - 1
    return event
}

function updateTime(event) {
    // === update the number of calls left === //
    event.nextCall = (event.nextCall + event.interval) // set the next time it should print
    return event
}

function gameLoop(elapsedTime) {
    // === actually run the loop === //
    processInput(elapsedTime)
    update(elapsedTime)
    render()

    requestAnimationFrame(gameLoop)
}

function processInput(elapsedTime) {

}

function update(elapsedTime) {
    // === get all the events that need to be found === //
    while (newEvents.length > 0) {
        let newEvent = newEvents.pop()
        events.push(newEvent)
    }

    let temps = events
    events = []
        // go through the entire list of events
    for (let i = 0; i < temps.length; i++) {
        let event = temps[i] // get the current event
        if (event.times > 0) { // make sure that it should be valid
            if (elapsedTime > event.nextCall) { // should be printed
                valids.push(event) // pushed into valid
            } else {
                events.push(event)
            }
        }
    }
}

function render() {
    // === print all values that need to be printed === //
    while (valids.length > 0) {
        let valid = valids.pop()
        let event = reportToNode(valid)
        events.push(event)
    }
}
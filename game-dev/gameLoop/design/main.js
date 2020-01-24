let events = []
let validEvents = []
let newEvents = []

window.onload = function() {

    let submitButton = this.document.getElementById("submitButton")
    submitButton.onclick = () => {
        this.submitButtonPress()
    }

    this.gameLoop(this.performance.now())
}

document.onkeydown = function(e) {
    e = e || window.event;
    switch (e.which || e.keyCode) {
        case 13: //Your Code Here (13 is ascii code for 'ENTER')
            submitButtonPress()
    }
}

function reportToNode(event) {
    // === decrement the event before writing === //
    event.times--;

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
        let event = { // this is the event object
            "nextCall": 0,
            "name": name,
            "interval": interval,
            "times": times,
            "stringify": function() {
                return ("(" + this.name + ", " + this.times + ") => ")
            }
        }
        event = this.reportToNode(event) // print the node immediately
        event.nextCall = (event.interval + performance.now()) // set when the event should be printed next
        newEvents.push(event) // push the event to where events will have it placed
    } else { // if something is wrong with the input
        this.alert("Something was wrong with your input")
    }
}

function reportToScreen(event) {
    event = reportToNode(event) // returns an updated node after printint it to screen
    event.nextCall = (event.nextCall + event.interval) // set the next time it should print
    return event
}

function gameLoop(elapsedTime) {
    processInput(elapsedTime)
    update(elapsedTime)
    render()

    requestAnimationFrame(gameLoop)
}

function processInput(elapsedTime) {}

function update(elapsedTime) {

    while (newEvents.length > 0) {
        let newEvent = newEvents.pop()
        events.push(newEvent)
    }

    // for each event in the eventArray
    for (let i = 0; i < events.length; i++) {
        const event = events[i] // current event
        console.log("looking at:", event.stringify())
        if (event.times > 0) { // if there aren't times left, kill it
            if (elapsedTime >= event.nextCall) { // if it is time to print it
                events.pop() // remove that event 
                validEvents.push(event) // push the event onto the new events
            }
        } else { // remove the event from the array, 0 times remaining
            events.pop()
        }
    }
}

function render() {
    // === for each valid event, report it and then push it onto events === //
    while (validEvents.length > 0) {
        let validEvent = validEvents.pop()
        let event = reportToScreen(validEvent)
        events.push(event)
    }
}
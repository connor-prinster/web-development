let events = []
let validEvents = []

document.onkeydown = function(e) {
    e = e || window.event;
    switch (e.which || e.keyCode) {
        case 13: //Your Code Here (13 is ascii code for 'ENTER')
            submitButtonPress()
    }
}

window.onload = function() {

    let submitButton = this.document.getElementById("submitButton")
    submitButton.onclick = () => {
        this.submitButtonPress()
    }

    this.gameLoop(this.performance.now())
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
    if (nameNode != "" && !this.isNaN(interval) && !this.isNaN(times)) {
        let event = {
            "nextCall": 0,
            "name": name,
            "interval": interval,
            "times": times
        }
        this.reportToNode(event)
        event.nextCall = (event.interval + performance.now())
        console.log("createdEvent:", event)
        events.push(event)
    } else {
        this.alert("Something was wrong with your input")
    }
}

function reportToScreen(event) {
    event = reportToNode(event)
    event.nextCall = event.nextCall + event.interval
    return event
}

function gameLoop(elapsedTime) {
    // console.log(elapsedTime)
    processInput(elapsedTime)
    update(elapsedTime)
    render()

    requestAnimationFrame(gameLoop)
}

function processInput(elapsedTime) {

}

function update(elapsedTime) {
    for (let i = 0; i < events.length; i++) {
        const event = events[i]
        if (event.times > 0) {
            if (elapsedTime >= event.nextCall) {
                events.pop()
                validEvents.push(event)
            }
        } else {
            events.pop()
        }
    }

}

function render() {
    while (validEvents.length > 0) {
        events.push(reportToScreen(validEvents.pop()))
    }
}
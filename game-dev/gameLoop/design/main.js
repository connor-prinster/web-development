let events = []

window.onload = function() {
    let startTime = this.performance.now()
    console.log(startTime)

    let submitButton = this.document.getElementById("submitButton")
    submitButton.onclick = () => {
        // === Nodes to Pull From
        let nameNode = this.document.getElementById("nameInput")
        let intervalNode = this.document.getElementById("intervalInput")
        let timesNode = this.document.getElementById("timesInput")

        // === Values From Nodes === //
        let name = nameNode.value
        let interval = this.parseInt(intervalNode.value)
        let times = this.parseInt(timesNode.value)

        // === Reset Values === //
        nameNode.value = ""
        intervalNode.value = null
        timesNode.value = null

        // === Create an Event Object === //
        if(nameNode != "" && !this.isNaN(interval) && !this.isNaN(times)) {
            let event = {
                "name": name, 
                "interval": interval, 
                "times": times,
                "report": function() {
                    this.times--
                    return ("Event: " + this.name + " (" + this.times + " remaining)")
                }
            }
            events.push(event)
        }
        else {
            this.alert("Something was wrong with your input")
        }
    }

    this.gameLoop(startTime)
}

function gameLoop(elapsedTime) {
    // console.log(elapsedTime)
    processInput(elapsedTime)
    update(elapsedTime)
    render()

    requestAnimationFrame(gameLoop)
}

function processInput(elapsedTime) {
    // process input when the add event button is pressed  
    // console.log(elapsedTime)
}

function update(elapsedTime) {
    // any active events are updated
    if(events.length > 0) {
        let eventsNode = this.document.getElementById("eventText")
        const newEvents = []
        for(let i = 0; i < events.length; i++) {
            const event = events[i]
            eventsNode.innerHTML += (event.report() + "<br>")
            if(event.times != 0) {
                newEvents.push(event)
            }
        }
        events = newEvents
    }
}

function render() {
    // objects needing reporting are displayed
    
}
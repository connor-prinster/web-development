const events = []

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
                    if(this.times > 0) {
                        return ("Event: " + this.name + " (" + this.times + " remaining)")
                    }
                }
            }
            events.push(event)
            console.log(events)
        }
        else {
            this.alert("Something was wrong with your input")
        }
    }

    this.gameLoop(startTime)
}

function gameLoop(elapsedTime) {
    processInput(elapsedTime)
    update(elapsedTime)
    render()

    requestAnimationFrame(gameLoop)
}

function processInput(elapsedTime) {
    
}

function update(elapsedTime) {
    
}

function render() {
    
}
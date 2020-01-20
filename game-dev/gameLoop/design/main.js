const events = []

window.onload = function() {
    let startTime = this.performance.now()
    console.log(startTime)

    let submitButton = this.document.getElementById("submitButton")
    submitButton.onclick = () => {
        let name = this.document.getElementById("nameInput").value
        let interval = this.parseInt(this.document.getElementById("intervalInput").value)
        let times = this.parseInt(this.document.getElementById("timesInput").value)
        if(name != "" && !this.isNaN(interval) && !this.isNaN(times)) {
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
    // let newTime = performance.now() - elapsedTime
    // console.log(newTime)
}

function update(elapsedTime) {
    
}

function render() {
    
}
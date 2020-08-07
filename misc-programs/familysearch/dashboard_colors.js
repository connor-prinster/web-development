var c = document.querySelector("table").querySelectorAll("td > div"); 
function co() { 
    c.forEach(({ style }, l) => { 
        let splitArr = style.cssText.split("; ")
        style.cssText = ""
        if(style && splitArr.length === 7) {
            splitArr.push("opacity: 30%")
        }
        else if(splitArr.length === 8) {
        
            let opacity = parseInt(splitArr[7].split(": ")[1].split("%")[0])
            if(opacity < 1) {
                opacity += Math.random()
            }
            else {
                opacity -= Math.random
            }
            splitArr[7] = "opacity: " + opacity
        }

        for(let i in splitArr) {
            style.cssText += splitArr[i]
        }
    })
} setInterval(co, 300);
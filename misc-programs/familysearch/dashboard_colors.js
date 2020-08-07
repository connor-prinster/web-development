var c = document.querySelector("table").querySelectorAll("td > div"); 
function co() { 
    c.forEach(({ style }, l) => { 
            l < 12 && (style.backgroundColor = "#" + ((1 << 24) * Math.random() | 0).toString(16)) 
        }
    )
} setInterval(co, 300);
// Set the document title
document.title = 'Dynamic Fibonacci Sequence in JavaScript';

// Create a red div in the body
var divRed = document.createElement('div');
divRed.setAttribute('class', 'red shadowed stuff-box');
document.querySelector('body').appendChild(divRed);

// Creates Slider and appends it to the divRed element
var slider = document.createElement('input');
slider.setAttribute("type", 'range');
slider.setAttribute("min", '0');
slider.setAttribute("max", '11');
slider.setAttribute("value", "0");
slider.setAttribute('class', 'fib');
slider.setAttribute("id", "fibslider");

// Creates Div Holder
var origContainer = document.createElement('div');
origContainer.setAttribute('class', 'fib flex')

// updates the slider's output value
var sliderOutput = document.createElement('div');
sliderOutput.setAttribute('class', 'fib')
//      initializes value at Fib(0) = 0
sliderOutput.textContent = fibString(0, 0);

divRed.appendChild(slider);
origContainer.appendChild(sliderOutput);
divRed.appendChild(origContainer);

// onInput Method
slider.oninput = function() {
    // cleans out the divHolder
    origContainer.innerHTML = "";
    //Integer version of the slider value
    var sliderVal = parseInt(this.value);
    //update the data under the slider
    sliderOutput.textContent = fibString(sliderVal, fib(sliderVal));
    //deal with top div
    var topDiv = document.createElement('div');
    //append topDiv
    origContainer.appendChild(topDiv);
    //create the zero element
    var sliderReadout = document.createElement('div')
    //zeroDiv.setAttribute('class', 'fib')
    sliderReadout.textContent = fibString(sliderVal, fib(sliderVal));
    // appends the updated readout
    topDiv.appendChild(sliderReadout)
    //if the slider is over 1, need to add more stuff to it
    if (sliderVal > 1) {
        fibHelper(sliderReadout, sliderVal);
    }
    // if there are no nodes, add nothing other than the text content
    if(origContainer.childNodes.length == 0) {
        origContainer.appendChild(sliderOutput);
    }
}

// returns the string Fib(?) = ?? to avoid hardcoding stuff
function fibString(a, b) {
    //return Fib(?) = ?
    return String("Fib(" + a + ") = " + b)
}

// recursive to generate a tree for fibonacci values
function fibHelper(parentDiv, sliderVal) {
    //base cases
    if(sliderVal < 2) {
        //new div to return
        var newDiv = document.createElement('div');

        // div for the lefthand side
        var paraLeft = document.createElement('p');
        paraLeft.setAttribute('class', 'fib fib-left');
        paraLeft.textContent = fibString(1, fib(1));

        // dive for the righthand side
        var paraRight = document.createElement('p');
        paraRight.setAttribute('class', 'fib fib-right');
        paraRight.textContent = fibString(0, fib(0))

        // append the two divs to the parent
        newDiv.appendChild(paraLeft);
        newDiv.appendChild(paraRight);

        // returns the stuff
        return newDiv;
    }
    //for everything past n = 2
    else {
        // create the leftchild stuff
        var leftHand = document.createElement('p');
        leftHand.setAttribute('class', 'fib fib-left');
        leftHand.textContent = textContent = fibString((sliderVal - 1), fib(sliderVal - 1));
        
        // create the rightchild stuff
        var rightHand = document.createElement('p');
        rightHand.setAttribute('class', 'fib fib-right');
        rightHand.textContent = fibString((sliderVal - 2), fib(sliderVal - 2));

        // recurse your way through the left and righthand side
        fibHelper(leftHand, sliderVal - 1)
        fibHelper(rightHand, sliderVal - 2)

        //append the children
        parentDiv.appendChild(leftHand);
        parentDiv.appendChild(rightHand);
    }
}

// puts out the nth fibonacci number
function fib(n) {
    if( n <= 1) {
        return n;
    }
    return fib(n- 1) + fib(n - 2);
}
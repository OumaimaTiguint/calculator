"use strict";

const display = document.querySelector('.display');

const nodeList = document.querySelectorAll('button');
const buttons = Array.prototype.slice.call(nodeList,0); 
buttons.forEach(function(button) {
    button.addEventListener('click', calculate);
});

function calculate(event) {
    const clickedButtonValue = event.target.value;
    if (clickedButtonValue === '=') {
        if (display.value !== '') {
            // calculate and show the answer to display
            display.value = eval(display.value);
        }
    } else if (clickedButtonValue === 'C') {
        // clear everything
        display.value = '';
    } else {
        // add it to the display
        display.value += clickedButtonValue;
    }
}
//using keyboard
const operatorKeyCodes = [
    {name: "add", code: [61, 107]},
    {name: "subtract", code: [54, 109]},
    {name: "multiply", code: [180, 106]},
    {name: "divide", code: [58, 111]},
    {name: "equal", code: [187, 187]},
    {name: "clear", code: [67, 	67]},
    {name: "dot", code: [190, 59]}
]

const numKeyCodes = [
    {num: 0, code:[48, 96]},
    {num: 1, code:[49, 97]},
    {num: 2, code:[50, 98]},
    {num: 3, code:[51, 99]},
    {num: 4, code:[52, 100]},
    {num: 5, code:[53, 101]},
    {num: 6, code:[54, 102]},
    {num: 7, code:[55, 103]},
    {num: 8, code:[56, 104]},
    {num: 9, code:[57, 105]}
]

display.addEventListener("keyup", function(event) {
    console.log(event.keyCode)
    operatorKeyCodes.map(e=> {
        if(event.keyCode === e.code[0] || event.keyCode === e.code[1]) {
            event.preventDefault(); 
            //remove duplicates
            const strng = display.value;
            display.value = strng.substring(0,strng.length-1)
            document.getElementById(e.name).click();
        }
    })
    numKeyCodes.map(e=> {
        if(event.keyCode === e.code[0] || event.keyCode === e.code[1]) {
            event.preventDefault(); 
            buttons.forEach(function(button) {
                if(button.value === e.num) {
                    button.click();
                }
            });
        }
    })
});
//swiping
document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown= null                                                
var yDown= null

function getTouches(evt) {
  return evt.touches || evt.originalEvent.touches; 
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
            // left swipe 
            document.getElementById("clear").click()
        }                      
    } 
    // reset values 
    xDown = null;
    yDown = null;                                             
};

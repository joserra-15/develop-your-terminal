// Variable Definition

let historyArray = [];
let counter = 0;
const textarea = document.querySelector('.display-terminal__input');

// Define functions for update the history

function history(cmd, arg) {
    if(arg === '') {
        historyArray.push(cmd);
    } else {
        historyArray.push(cmd + ' ' + arg);
    }
    counter = historyArray.length -1;
    localStorage.setItem('history', JSON.stringify(historyArray));
}

// Add event listner to the up and down press.

window.addEventListener('keyup', controlHistory);

function controlHistory(e) {
    if(historyArray.length !== 0) {
        if(e.keyCode == 38) {
            textarea.value= historyArray[counter];
            if(counter > 0) {
                counter--;
            } else {
                counter = 0;
            }
        } else if(e.keyCode == 40) {
            textarea.value= historyArray[counter];
            if(counter < (historyArray.length-1)) {
                counter++;
            } else {
                counter = historyArray.length-1;
            }
        }
    }
}


// Variable Definition

let historyArray = [];
let pulsedKeys=[]
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

window.addEventListener('keydown', controlHistory);

function controlHistory(e) {
    pulsedKeys.push(e.keyCode)
    if(pulsedKeys[pulsedKeys.length-1]===81 && pulsedKeys[pulsedKeys.length-2]=== 17){
        document.querySelector(".header").classList.toggle("invisible");
        document.querySelector(".display-terminal").classList.toggle("invisible");
        document.getElementById("body").classList.toggle("controlq")
    }
    if(pulsedKeys[pulsedKeys.length-1]===76 && pulsedKeys[pulsedKeys.length-2]=== 17){
        e.preventDefault();
        clear()
    }
    if (e.keyCode == 9) {
        e.preventDefault()
        let i = e.target.value, cmd = i.split(' ')[0].trim(), arg = ''
        for(let index = 1; index < i.split(' ').length; index++){
            arg += i.split(' ')[index] + ' '
        }
        arg = arg.trim()
        tab(cmd,arg);
    }
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


let historyArray = [];
let counter = 0;
const textarea = document.querySelector('.display-terminal__input');

function history(cmd, arg) {
    if(arg === '') {
        historyArray.push(cmd);
    } else {
        historyArray.push(cmd + ' ' + arg);
    }
    counter = historyArray.length -1;
    localStorage.setItem('history', JSON.stringify(historyArray));
}

window.addEventListener('keyup', controlHistory);

function controlHistory(e) {
    if(historyArray.length !== 0) {
        if(e.keyCode == 38) {
            //arrow up
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


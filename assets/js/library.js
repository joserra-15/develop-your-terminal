// Create constant to take the DOM element

const input = document.querySelector('.display-terminal label');

// Add event listner to the enter press and take the values of cmd and arguments

window.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        let i = e.target.value, cmd = i.split(' ')[0].trim(), arg = ''
        for(let index = 1; index < i.split(' ').length; index++){
            arg += i.split(' ')[index] + ' '
        }
        arg = arg.trim()
        if (cmd == 'clear'){
            library(cmd, arg)
        } else {
            let p = document.createElement('p')
            p.textContent = `${inUseRoute}: ${cmd} ${arg}`
            input.insertAdjacentElement('beforebegin', p)
            let result = document.createElement('p')
            result.textContent = library(cmd, arg)
            input.insertAdjacentElement('beforebegin', result)
        }
        setTimeout(()=>{e.target.value = ''}, 1)
    }
})

// Add the principal function to work with the bash

function library(cmd, arg = '') {
    history(cmd, arg);
    switch(cmd) {
        case 'pwd':
            return pwd();
        case 'ls':
            return ls(arg);
        case 'cd':
            return cd(arg);
        case 'mkdir':
            return mkdir(arg);
        case 'echo':
            return echo(arg);
        case 'cat':
            return cat(arg);
        case 'JS':
            return JS(arg);
        case 'rm':
            return rm(arg);
        case 'mv':
            return mv(arg);
        case 'clear':
            return clear();
        case 'help':
            return help();
        case 'man':
            return man(arg);
        case 'cmatrix':
            return cmatrix(arg);
        case 'ckirby':
            return ckirby();
        case 'y':
            return yes();
        case 'n':
            return no();
        case 'rch':
            return rootChange(arg);
        default:
            return new Error('this command is not available.')
    }
}

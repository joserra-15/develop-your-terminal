// The terminal must be able to interpret the following Unix commands and offer the user a response according to the command used. 
// Keep in mind that if the user enters an incorrect command, you should display an error message indicating that this command is not available.
// pwd
// ls
// Optional parameters:
// ls -R
// ls -S
// ls -t
// cd
// cd ..
// mkdir
// echo
// Use this command to create files and the possibility of adding a text inside each of them
// cat 
// Use this command to show the content of the created files
// rm
// mv
// The user can both move files / directories or modify their name
// clear
// If the user executes the "clear" command, the previous records WON’T be deleted from localStorage, it only clears visually in Terminal.
const input = document.querySelector('.display-terminal label');

window.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        let i = e.target.value, cmd = i.split(' ')[0], arg = i.split(' ')[1] || ' '
        let p = document.createElement('p')
        p.textContent = `>raulrexulon: ${cmd} ${arg}`
        input.insertAdjacentElement('beforebegin', p)
        let result = document.createElement('p')
        result.textContent = library(cmd, arg)
        input.insertAdjacentElement('beforebegin', result)
        e.target.value = ''
    }
})


function library(cmd, arg1 = '') {
    switch(cmd) {
        case 'pwd':
            return pwd()
        case 'ls':
            return ls(arg1) 
        case 'cd':
            return cd(arg1)
        case 'mkdir':
            return mkdir(arg1)
        case 'echo':
            return echo(arg1)  // echo "my name is yogi" > text.txt
        case 'cat':
            return cat(arg1) // cat text.txt
        case 'rm':
            return rm(arg1)
        case 'mv':
            return mv(arg1) // mv text.txt /my/new/folder
        case 'clear':
            return clear()
        case 'help':
            return help()
        default:
            return new Error('this command is not available.')

    }

    // history()
}

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

function library(cmd, arg1 = '') {
    switch(cmd) {
        case 'pwd':
            pwd()
            break;
        case 'ls':
            ls(arg1) 
            break;
        case 'cd':
            cd(arg1)
            break;
        case 'mkdir':
            mkdir(arg1)
            break;
        case 'echo':
            echo(arg1)  // echo "my name is yogi" > text.txt
            break;
        case 'cat':
            cat(arg1) // cat text.txt
            break;
        case 'rm':
            rm(arg1)
            break;
        case 'mv':
            mv(arg1) // mv text.txt /my/new/folder
            break;
        case 'clear':
            clear()
            break;
        default:
            return new Error('this command is not available.')

    }

    // history()
}

// let history = []
// let counter = 0
// window.addEventListener('keypress', (e)=> {
//     if(e.key = 'Up'){
//         counter++
//         console.log(history[history.length - counter])
//     }
// })
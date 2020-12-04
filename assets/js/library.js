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

function library(cmd) {
    switch(cmd) {
        case 'pwd':
            //execute function pwd(){}
            break;
        case 'ls':
            //execute function ls(flag = default value){}
            break;
        default:
            return new Error('this command is not available.')

    }
}
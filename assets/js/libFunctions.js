// individual functions

function pwd() {
    return "Estamos haciendo un pwd";
}

function ls(flag = "") {
    switch(flag) {
        case "-R":
            return "Estamos haciendo un ls -R"
        case "-S":
            return "Estamos haciendo un ls -S"
        case "-t":
            return "Estamos haciendo un ls -t"
        case "":
            return "Estamos haciendo un ls"
        default:
            return new Error('this command is not available.');
    }
}

function cd(flag = "") {
    switch(flag) {
        case "..":
            //Create funcionality
            break;
        case "":
            //Create funcionality
            break;
        default:
            throw new Error();
    }
}

function mkdi() {

}

function echo() {

}

function cat() {

}

function rm() {

}

function mv() {

}

function clear() {
    document.querySelectorAll('.display-terminal p').forEach(e => e.remove())
}
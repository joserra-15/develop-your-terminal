// Create the object to simulate directorys

let directoryObject = {
    "raulrexulon": {
        "Desktop" : {"Mierdas": {}, "No Mierdas": {}},
        "Documents Mi Abuela": {"Mierdas": {"1": "1", "2": "2", "3": "3"}, "No Mierdas": {}},
        "Downloads": {}
    }
};
//updateObject();



// create variables

let inUseRoute = `>raulrexulon`;
let manolo = dotify(directoryObject);
let rutas = Object.keys(manolo);
console.log(rutas);


// individual functions

function pwd() {
    return inUseRoute;
}

function ls(flag) {
    let routeObject = "directoryObject";
    route = inUseRoute.split("").slice(1).join("");
    route = route.split("/");
    console.log(route);
    for (let i = 0; i < route.length; i++) {
        routeObject += "[" + "'" + route[i] + "'" + "]";
    }
    switch(flag) {
        case "-R":
            return "Estamos haciendo un ls -R"
        case "-S":
            return "Estamos haciendo un ls -S"
        case "-t":
            return "Estamos haciendo un ls -t"
        case "":
            return printFolders()
        default:
            return new Error('this command is not available.');
    }
    function printFolders() {
        let folder = Object.keys(eval(routeObject));
        folder.forEach(e => {
            let p = document.createElement('p');
            p.textContent = e;
            input.insertAdjacentElement('beforebegin', p);
        })
    }
}

function cd(flag) {
    let route = inUseRoute.split("").slice(1).join("");
    if (flag.length === 0) {
        return goDirectoryDefault();
    } else if (flag === "..") {
        let route = inUseRoute.split("/");
        route.pop();
        route.join("/");
        input.innerHTML = route + ":";
        inUseRoute = route[0];
        if (input.textContent === ">raulrexulon:") {
            console.log(inUseRoute);
        }
    } else if (flag.length > 0 && rutas.includes(`${route}/${flag}`)) {
        let route = input.textContent.split(":");
        input.innerHTML = route[0] + `/` + flag + ":";
        inUseRoute = route[0] + `/` + flag;
    } else {
        return new Error ('this command is not available.');
    }
    function goDirectoryDefault() {
        inUseRoute = `>raulrexulon`;
        input.innerHTML = `>raulrexulon:`;
    }
}

function mkdir() {

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

function help(){
    const help=`These shell commands are defined internally.  Type 'help' to see this list.
    Type 'help name' to find out more about the function 'name'.
    Use 'info bash' to find out more about the shell in general.
    Use 'man -k' or 'info' to find out more about commands not in this list.

    A star (*) next to a name means that the command is disabled.

    job_spec [&]                                                                                                                    history [-c] [-d offset] [n] or history -anrw [filename] or history -ps arg [arg...]
    (( expression ))                                                                                                                if COMMANDS; then COMMANDS; [ elif COMMANDS; then COMMANDS; ]... [ else COMMANDS; ] fi
    . filename [arguments]                                                                                                          jobs [-lnprs] [jobspec ...] or jobs -x command [args]
    :                                                                                                                               kill [-s sigspec | -n signum | -sigspec] pid | jobspec ... or kill -l [sigspec]
    [ arg... ]                                                                                                                      let arg [arg ...]
    [[ expression ]]                                                                                                                local [option] name[=value] ...
    alias [-p] [name[=value] ... ]                                                                                                  logout [n]
    bg [job_spec ...]                                                                                                               mapfile [-d delim] [-n count] [-O origin] [-s count] [-t] [-u fd] [-C callback] [-c quantum] [array]
    bind [-lpsvPSVX] [-m keymap] [-f filename] [-q name] [-u name] [-r keyseq] [-x keyseq:shell-command] [keyseq:readline-functio>  popd [-n] [+N | -N]
    break [n]                                                                                                                       printf [-v var] format [arguments]
    builtin [shell-builtin [arg ...]]                                                                                               pushd [-n] [+N | -N | dir]
    caller [expr]                                                                                                                   pwd [-LP]
    case WORD in [PATTERN [| PATTERN]...) COMMANDS ;;]... esac                                                                      read [-ers] [-a array] [-d delim] [-i text] [-n nchars] [-N nchars] [-p prompt] [-t timeout] [-u fd] [name ...]
    cd [-L|[-P [-e]] [-@]] [dir]                                                                                                    readarray [-d delim] [-n count] [-O origin] [-s count] [-t] [-u fd] [-C callback] [-c quantum] [array]
    command [-pVv] command [arg ...]                                                                                                readonly [-aAf] [name[=value] ...] or readonly -p
    compgen [-abcdefgjksuv] [-o option] [-A action] [-G globpat] [-W wordlist]  [-F function] [-C command] [-X filterpat] [-P pre>  return [n]
    complete [-abcdefgjksuv] [-pr] [-DEI] [-o option] [-A action] [-G globpat] [-W wordlist]  [-F function] [-C command] [-X filt>  select NAME [in WORDS ... ;] do COMMANDS; done
    compopt [-o|+o option] [-DEI] [name ...]                                                                                        set [-abefhkmnptuvxBCHP] [-o option-name] [--] [arg ...]
    continue [n]                                                                                                                    shift [n]
    coproc [NAME] command [redirections]                                                                                            shopt [-pqsu] [-o] [optname ...]
    declare [-aAfFgilnrtux] [-p] [name[=value] ...]                                                                                 source filename [arguments]
    dirs [-clpv] [+N] [-N]                                                                                                          suspend [-f]
    disown [-h] [-ar] [jobspec ... | pid ...]                                                                                       test [expr]
    echo [-neE] [arg ...]                                                                                                           time [-p] pipeline
    enable [-a] [-dnps] [-f filename] [name ...]                                                                                    times
    eval [arg ...]                                                                                                                  trap [-lp] [[arg] signal_spec ...]
    exec [-cl] [-a name] [command [arguments ...]] [redirection ...]                                                                true
    exit [n]                                                                                                                        type [-afptP] name [name ...]
    export [-fn] [name[=value] ...] or export -p                                                                                    typeset [-aAfFgilnrtux] [-p] name[=value] ...
    false                                                                                                                           ulimit [-SHabcdefiklmnpqrstuvxPT] [limit]
    fc [-e ename] [-lnr] [first] [last] or fc -s [pat=rep] [command]                                                                umask [-p] [-S] [mode]
    fg [job_spec]                                                                                                                   unalias [-a] name [name ...]
    for NAME [in WORDS ... ] ; do COMMANDS; done                                                                                    unset [-f] [-v] [-n] [name ...]
    for (( exp1; exp2; exp3 )); do COMMANDS; done                                                                                   until COMMANDS; do COMMANDS; done
    function name { COMMANDS ; } or name () { COMMANDS ; }                                                                          variables - Names and meanings of some shell variables
    getopts optstring name [arg]                                                                                                    wait [-fn] [id ...]
    hash [-lr] [-p pathname] [-dt] [name ...]                                                                                       while COMMANDS; do COMMANDS; done
    help [-dms] [pattern ...]                                                                                                       { COMMANDS ; }`;
    console.log(help)
    input.insertAdjacentHTML("beforebegin", `<pre>${help}</pre>`)
}

// Function to store in local storage the dyrectorys

function updateObject() {
    if(localStorage.getItem("directory") === null) {
        let raulrexulonString = JSON.stringify(raulrexulon);
        localStorage.setItem("directory", raulrexulonString);
    } else {
        raulrexulon = JSON.parse(localStorage.getItem("directory"));
    }
}

//Function to have al the directorys

function dotify(obj) {
    const res = {};
    function recurse(obj, current) {
        for (const key in obj) {
            const value = obj[key];
            if(value != undefined) {
                const newKey = (current ? current + '/' + key : key);
                if (value && typeof value === 'object') {
                    res[newKey] = value;
                    recurse(value, newKey);
                } else {
                    res[newKey] = value;
                }
            }
        }
    }
    recurse(obj);
    return res;
}

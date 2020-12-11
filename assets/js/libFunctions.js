// Create the object to simulate directorys

let directoryObject = {
    "raulrexulon": {}
};
let metaData = [];
//updateObject();

class MetaDataObject {
    constructor(name, time, size) {
        this.name = name;
        this.time = time;
        this.size = size;
    }
}

// create variables

let inUseRoute = `>raulrexulon`;
let manolo = dotify(directoryObject);
let rutas = Object.keys(manolo);
updateRutas();
//update rutas
function updateRutas(){
    rutas = Object.keys(dotify(directoryObject));
    console.log(rutas);
}

// individual functions

function pwd() {
    return inUseRoute;
}

function ls(flag) {
    let routeObject = "directoryObject";
    let route = inUseRoute.split("").slice(1).join("");
    route = route.split("/");
    for (let i = 0; i < route.length; i++) {
        routeObject += "[" + "'" + route[i] + "'" + "]";
    }
    console.log(routeObject);
    switch (flag) {
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
        console.log(Object.keys(eval(routeObject)));
        console.log(folder);
        if (folder[0] === "0" || folder.length === 0) {
            return new Error('there are not folder/files abiable.');
        } else {
            folder.forEach(e => {
                let p = document.createElement('p');
                p.textContent = e;
                input.insertAdjacentElement('beforebegin', p);
            })
        }
    }
}

function cd(flag) {
    let route = inUseRoute.split("").slice(1).join("");
    let absoluteFlag = "";

    if (flag.length > 0 && flag[0] === "/") {
        absoluteFlag = flag;
        absoluteFlag = absoluteFlag.split("").slice(1).join("");
    }

    if (flag.length === 0) {
        return goDirectoryDefault();
    } else if (flag === "..") {
        if (input.textContent === ">raulrexulon:") {
            return new Error('you are in the root directory.');
        } else {
            let route = inUseRoute.split("/");
            route.pop();
            route.join("/");
            input.innerHTML = "";
            inUseRoute = "";
            route.forEach(e => {
                if (e === route[route.length - 1]) {
                    input.innerHTML += `${e}`;
                    inUseRoute += `${e}`;
                    input.innerHTML += ":";
                } else {
                    input.innerHTML += `${e}/`;
                    inUseRoute += `${e}/`;
                }
            })
        }
    } else if (flag.length > 0 && rutas.includes(`${route}/${flag}`)) {
        let route = input.textContent.split(":");
        input.innerHTML = route[0] + `/` + flag + ":";
        inUseRoute = route[0] + `/` + flag;
        console.log(inUseRoute);
    } else if (flag.length > 0 && flag[0] === "/" && rutas.includes(absoluteFlag)) {
        inUseRoute = `>${absoluteFlag}`;
        input.innerHTML = `>${absoluteFlag}:`;
    } else {
        return new Error('this command is not available.');
    }

    function goDirectoryDefault() {
        inUseRoute = `>raulrexulon`;
        input.innerHTML = `>raulrexulon:`;
    }
}

function mkdir(flag) {
    let route = inUseRoute.split("").slice(1).join("");
    let absoluteFlag = "";

    if (flag.length > 0 && flag[0] === "/") {
        absoluteFlag = flag;
        absoluteFlag = absoluteFlag.split("").slice(1).join("");
    }
    if (flag.length > 0 && flag[0] === "/" && rutas.includes(absoluteFlag)) {
        return new Error('this directory/file allready exist.');
    } else if (flag.length > 0 && flag[0] === "/" && !rutas.includes(absoluteFlag)) {
        if (flag[1] !== "r") {
            return new Error('you can´t create a new root.');
        } else {
            console.log('aqui 2')
            let otherRoute = flag.split('').slice(1).join('');
            otherRoute = otherRoute.split("/");
            console.log(otherRoute);
            let routeObject = "directoryObject";
            let routeToCompare = "";
            for (let i = 0; i < otherRoute.length; i++) {
                let newRouteObject = routeObject;
                if(i===0) {
                    routeToCompare += otherRoute[i];
                } else {
                    routeToCompare += "/" + otherRoute[i];
                }
                newRouteObject += "[" + "'" + otherRoute[i] + "'" + "]";
                routeObject = newRouteObject;
                newRouteObject += "={}";
                console.log(newRouteObject);
                if(rutas.includes(routeToCompare)) {
                    continue;
                } else {
                    eval(newRouteObject);
                }
            }
            let manolo = dotify(directoryObject);
            rutas = Object.keys(manolo);
        }
    } else if (flag.length > 0 && !rutas.includes(`${route}/${flag}`)) {
        let routeObject = "directoryObject";
        route = route.split('/');
        for(let i=0; i<route.length; i++){
            routeObject += "[" + "'" + route[i] + "'" + "]";
        }
        routeObject += "[" + "'" + flag + "'" + "]";
        routeObject += "={}";
        let actualTime = new Date().getTime();
        /* let metaDataFile = new MetaDataObject(flag, actualTime, 0);
        metaData.push(metaDataFile); */
        eval(routeObject);
        let manolo = dotify(directoryObject);
        rutas = Object.keys(manolo);
    } else if (flag.length > 0 && rutas.includes(`${route}/${flag}`)) {
        return new Error('this directory/file allready exist.');
    }
}

function echo() {

}

function cat() {

}

function rm(flag) {
    let routeObject = "directoryObject";
    route = inUseRoute.split("").slice(1).join("");
    route = route.split("/");
    for (let i = 0; i < route.length; i++) {
        routeObject += "[" + "'" + route[i] + "'" + "]";
    }
    if(flag.includes('/')) {
        if(flag[0] === "/" && flag[flag.length -1]!== "/") {
            flag = flag.slice(1);
            if(rutas.filter(e=>e===flag).length !==0){
                routeObject = "directoryObject";
                flag = flag.split("/");
                for (let i = 0; i < flag.length; i++) {
                    routeObject += "[" + "'" + flag[i] + "'" + "]";
                }
                eval("delete "+ routeObject);
                updateRutas();
            } else {return new Error (`rm: No such file or directory`);}
        } else {return new Error (`rm: need to start with '/' and finish without '/': No such file or directory`);}
    } else {
        let value = false;
        console.log(routeObject);
        Object.keys(eval(routeObject)).forEach(e=>{
            console.log(e);
            console.log(flag);
            if(e===flag){
                value = true;
            }
        })
        if(value){
            console.log(routeObject + "[" + "'" + flag + "'" + "]");
            eval("delete "+ routeObject + "[" + "'" + flag + "'" + "]");
            updateRutas();
        } else {return new Error (`rm: cannot start '${flag}': No such file or directory`);}
    }
}

function mv(flag) {
    let routeObject = "directoryObject";
    route = inUseRoute.split("").slice(1).join("");
    route = route.split("/");
    for (let i = 0; i < route.length; i++) {
        routeObject += "[" + "'" + route[i] + "'" + "]";
    }
    let words=flag.split("--")
    if(checkWords(words[0].trim())){
        if(words[1].trim().includes("/")){
            let finalRoute= words[1].trim()
            if(finalRoute[0]==="/" && finalRoute[finalRoute.length -1]!== "/" ){
                finalRoute=finalRoute.slice(1)
                if(rutas.filter(e=>e===finalRoute).length!==0){
                    let nRoute = "directoryObject";
                    finalRoute = finalRoute.split("/");
                    for (let i = 0; i < finalRoute.length; i++) {
                        nRoute += "[" + "'" + finalRoute[i] + "'" + "]";
                    }
                    console.log(nRoute)
                    eval(nRoute + "[" + "'" + words[0].trim() + "'" + "]" + "="+ "JSON.parse(JSON.stringify(eval("+routeObject + "[" + "'" + words[0].trim() + "'" + "]" +")))" )
                    eval("delete "+routeObject + "[" + "'" + words[0].trim() + "'" + "]")
                    updateRutas()
                }else{return new Error (`mv: No such file or directory`);}
            }else{return new Error (`mv: need to start with '/' and finish without '/': No such file or directory`);}
        }else if(checkWords(words[1].trim())){
            eval(routeObject + "[" + "'" + words[1].trim() + "'" + "]" + "[" + "'" + words[0].trim() + "'" + "]" + "="+ "JSON.parse(JSON.stringify(eval("
            +routeObject + "[" + "'" + words[0].trim() + "'" + "]" +")))" )
            eval("delete "+routeObject + "[" + "'" + words[0].trim() + "'" + "]")
            updateRutas()
        }else{
            eval(routeObject + "[" + "'" + words[1].trim() + "'" + "]" + "="+ "JSON.parse(JSON.stringify(eval("
            +routeObject + "[" + "'" + words[0].trim() + "'" + "]" +")))" )
            eval("delete "+routeObject + "[" + "'" + words[0].trim() + "'" + "]")
            updateRutas()
        }
    }else{
        return new Error (`mv: cannot stat '${words[0]}': No such file or directory`);
    }
    function checkWords(word){
        let value=false
        Object.keys(eval(routeObject)).forEach(e=>{
            if(e===word){
                value=true
            }
        })
        console.log(value)
        return value
    }
}

function clear() {
    document.querySelectorAll('.display-terminal p').forEach(e => e.remove())
}

function help() {
    const help = `These shell commands are defined internally.  Type 'help' to see this list.
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
    input.insertAdjacentHTML("beforebegin", `<p>${help}</p>`)
}

// Function to store in local storage the dyrectorys

function updateObject() {
    if (localStorage.getItem("directory") === null) {
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
            if (value != undefined) {
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
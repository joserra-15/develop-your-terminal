// Variable Definition

let directoryObject = {"raulrexulon": {}};
let metaData = [{"name": "raulrexulon", "time": 1607677301663, "size": 0}];
let inUseRoute = `>raulrexulon`;
let rutas;

// Create class Metadata

class MetaDataObject {
    constructor(name, time, size) {
        this.name = name;
        this.time = time;
        this.size = size;
    }
}

// Update variables from localStorage and the simulated directory

updateObject();
updateMetadata();
updateLocalStorage();
updateRutas();

// Define functions for all the updates

function updateObject() {
    if (localStorage.getItem("directory") === null) {
        let directoryObjectString = JSON.stringify(directoryObject);
        localStorage.setItem("directory", directoryObjectString);
    } else {
        directoryObject = JSON.parse(localStorage.getItem("directory"));
    }
}
function updateMetadata() {
    if (localStorage.getItem("directoryMetadata") === null) {
        let directoryMetadataString = JSON.stringify(metaData);
        localStorage.setItem("directoryMetadata", directoryMetadataString);
    } else {
        metaData = JSON.parse(localStorage.getItem("directoryMetadata"));
    }
}
function updateLocalStorage() {
    let directoryObjectString = JSON.stringify(directoryObject);
    let directoryMetadataString = JSON.stringify(metaData);
    localStorage.setItem("directory", directoryObjectString);
    localStorage.setItem("directoryMetadata", directoryMetadataString);
}
function updateRutas(){
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
    rutas = Object.keys(dotify(directoryObject));
}
function storeMetadata(name){
    let actualTime = new Date().getTime();
    let metaDataFile = new MetaDataObject(name, actualTime, 0);
    metaData.push(metaDataFile);
}
function deleteMetadata(routeToCompare) {
    for(let i = 0; i < metaData.length; i++) {
        if(metaData[i].name === routeToCompare) {
            metaData.splice(i, 1);
        }
    }
}

// Define the function for each command

function pwd() {
    return inUseRoute;
}
//TODO: Actualizar size de metadata, acabar ls con args.
function ls(arg) {
    let routeObject = "directoryObject";
    let route = inUseRoute.split("").slice(1).join("");
    route = route.split("/");

    route.forEach(e => {
        routeObject += `['${e}']`;
    })

    switch (arg) {
        case "-R":
            return printFoldersR();
        case "-S":
            return printFoldersS();
        case "-t":
            return printFoldersT();
        case "":
            return printFolders();
        default:
            return new Error('this command is not available.');
    }

    function printFolders() {
        let folder = Object.keys(eval(routeObject));
        if(folder[0] === "0" || folder.length === 0) {
            return new Error('there are not folder/files abiable.');
        } else {
            folder.forEach(e => {
                let p = document.createElement('p');
                p.textContent = e;
                input.insertAdjacentElement('beforebegin', p);
            })
        }
    }
    function printFoldersR() {

    }
    function printFoldersS() {

    }
    function printFoldersT() {

    }
}
function cd(arg) {
    let route = inUseRoute.split("").slice(1).join("");
    let absoluteDirectory = "";

    if(arg.length > 0 && arg[0] === "/") {
        absoluteDirectory = arg;
        absoluteDirectory = absoluteDirectory.split("").slice(1).join("");
    }

    if(arg.length === 0) {
        return goDirectoryDefault();
    } else if(arg === "..") {
        if(input.textContent === ">raulrexulon:") {
            return new Error('cd: you are in the root directory.');
        } else {
            let route = inUseRoute.split("/");
            route.pop();
            route.join("/");
            input.innerHTML = "";
            inUseRoute = "";
            route.forEach(e => {
                if(e === route[route.length - 1]) {
                    input.innerHTML += `${e}`;
                    inUseRoute += `${e}`;
                    input.innerHTML += ":";
                } else {
                    input.innerHTML += `${e}/`;
                    inUseRoute += `${e}/`;
                }
            })
        }
    } else if(arg.length > 0 && rutas.includes(`${route}/${arg}`)) {
        let route = input.textContent.split(":");
        input.innerHTML = route[0] + `/` + arg + ":";
        inUseRoute = route[0] + `/` + arg;
    } else if(arg.length > 0 && arg[0] === "/" && rutas.includes(absoluteDirectory)) {
        inUseRoute = `>${absoluteDirectory}`;
        input.innerHTML = `>${absoluteDirectory}:`;
    } else {
        return new Error('this command is not available.');
    }

    function goDirectoryDefault() {
        inUseRoute = `>raulrexulon`;
        input.innerHTML = `>raulrexulon:`;
    }
}
//TODO: Existe un todo dentro de esta funcion
function mkdir(arg) {
    let route = inUseRoute.split("").slice(1).join("");
    let absoluteDirectory = "";

    if(arg.length > 0 && arg[0] === "/") {
        absoluteDirectory = arg;
        absoluteDirectory = absoluteDirectory.split("").slice(1).join("");
    }

    if(arg.length > 0 && arg[0] === "/" && rutas.includes(absoluteDirectory)) {
        return new Error('this directory/file allready exist.');
    } else if(arg.length > 0 && arg[0] === "/" && !rutas.includes(absoluteDirectory)) {
        if(arg[1] !== "r") { //TODO: Comprobar que es raulrexulon entero no solo r y preguntar si se quiere crear un nuevo root.
            return new Error('you can´t create a new root.');
        } else {
            let otherRoute = arg.split('').slice(1).join('');
            otherRoute = otherRoute.split("/");
            let routeObject = "directoryObject";
            let routeToCompare = "";
            for (let i = 0; i < otherRoute.length; i++) {
                let newRouteObject = routeObject;
                if(i===0) {
                    routeToCompare += otherRoute[i];
                } else {
                    routeToCompare += "/" + otherRoute[i];
                }
                newRouteObject += `['${otherRoute[i]}']`;
                routeObject = newRouteObject;
                newRouteObject += "={}";
                if(rutas.includes(routeToCompare)) {
                    continue;
                } else {
                    storeMetadata(routeToCompare);
                    eval(newRouteObject);
                }
            }
            updateLocalStorage();
            updateRutas();
        }
    } else if(arg.length > 0 && !rutas.includes(`${route}/${arg}`)) {
        let routeObject = "directoryObject";
        let routeName = `${route}/${arg}`;
        route = route.split('/');
        for(let i=0; i < route.length; i++){
            routeObject += `['${route[i]}']`;
        }
        routeObject += `['${arg}'] = {}`;
        storeMetadata(routeName);
        eval(routeObject);
        updateLocalStorage();
        updateRutas();
    } else if(arg.length > 0 && rutas.includes(`${route}/${arg}`)) {
        return new Error('this directory/file allready exist.');
    }
}
function echo(arg) {
    let newFlag = arg.split(">")
    newFlag = newFlag.map(e => e.trim())
    let route = inUseRoute.split("").slice(1).join("");
    let absoluteDirectory = "";

    if(newFlag[1].length > 0 && newFlag[1][0] === "/") {
        absoluteDirectory = newFlag[1];
        absoluteDirectory = absoluteDirectory.split("").slice(1).join("");
    }

    if(newFlag[1].length > 0 && newFlag[1][0] === "/" && rutas.includes(absoluteDirectory)) {
        let routeObject = "directoryObject";
        let routeToCompare = "";
        absoluteDirectory = absoluteDirectory.split('/');
        for(let i=0; i < absoluteDirectory.length; i++){
            if(i===0) {
                routeToCompare += absoluteDirectory[i];
            } else {
                routeToCompare += "/" + absoluteDirectory[i];
            }
            routeObject += `['${absoluteDirectory[i]}']`;
        }
        storeMetadata(routeToCompare);
        routeObject += ` = ${newFlag[0]}`
        eval(routeObject)
        updateLocalStorage();
        updateRutas();
    } else if(newFlag[1].length > 0 && newFlag[1][0] === "/" && !rutas.includes(absoluteDirectory)) {
        if(newFlag[1][1] !== "r") {
            return new Error('you can´t create a new root.');
        } else {
            let otherRoute = newFlag[1].split('').slice(1).join('');
            otherRoute = otherRoute.split("/");
            let routeObject = "directoryObject";
            let routeToCompare = "";
            for (let i = 0; i < otherRoute.length - 1; i++) {
                let newRouteObject = routeObject;
                if(i===0) {
                    routeToCompare += otherRoute[i];
                } else {
                    routeToCompare += "/" + otherRoute[i];
                }
                newRouteObject += `['${otherRoute[i]}']`;
                routeObject = newRouteObject;
                newRouteObject += " = {}";
                if(rutas.includes(routeToCompare)) {
                    continue;
                } else {
                    storeMetadata(routeToCompare);
                    eval(newRouteObject);
                }
            }
            routeToCompare += "/" + otherRoute[otherRoute.length - 1];
            storeMetadata(routeToCompare);
            routeObject += `['${otherRoute[otherRoute.length - 1]}'] = ${newFlag[0]}`;
            eval(routeObject)
            updateLocalStorage();
            updateRutas();
        }
    } else if(newFlag[1].length > 0 && (!rutas.includes(`${route}/${newFlag[1]}`) || rutas.includes(`${route}/${newFlag[1]}`))) {
        let routeObject = "directoryObject";
        let routeName = `${route}/${newFlag[1]}`;
        route = route.split('/');
        for(let i=0; i<route.length; i++){
            routeObject += `['${route[i]}']`;
        }
        routeObject += `['${newFlag[1]}'] = ${newFlag[0]}`;
        storeMetadata(routeName);
        eval(routeObject);
        updateLocalStorage();
        updateRutas();
    } else {
        return new Error('Syntax Error');
    }
}
function cat(arg) {
    let route = inUseRoute.split("").slice(1).join("");
    let absoluteDirectory = "";

    if (arg.length > 0 && arg[0] === "/") {
        absoluteDirectory = arg;
        absoluteDirectory = absoluteDirectory.split("").slice(1).join("");
    }
    if (arg.length > 0 && arg[0] === "/" && rutas.includes(absoluteDirectory)) {
        let routeObject = "directoryObject";
        absoluteDirectory = absoluteDirectory.split('/');
        for(let i=0; i < absoluteDirectory.length; i++){
            routeObject += `['${absoluteDirectory[i]}']`;
        }
        let p = document.createElement('p')
        p.textContent = `${eval(routeObject)}`
        input.insertAdjacentElement('beforebegin', p)

    } else if (arg.length > 0 && rutas.includes(`${route}/${arg}`)) {
        let routeObject = "directoryObject";
        route = route.split('/');
        for(let i=0; i<route.length; i++){
            routeObject += `['${route[i]}']`;
        }
        routeObject += `['${arg}']`;
        let p = document.createElement('p');
        p.textContent = `${eval(routeObject)}`;
        input.insertAdjacentElement('beforebegin', p)
    } else {
        return new Error('file doesn\'t exist');
    }
}
function rm(arg) {
    let routeObject = "directoryObject";
    route = inUseRoute.split("").slice(1).join("");
    route = route.split("/");
    for (let i = 0; i < route.length; i++) {
        routeObject += `['${route[i]}']`;
    }
    if(arg.includes('/')) {
        if(arg[0] === "/" && arg[arg.length -1]!== "/") {
            if(arg!=="/raulrexulon"){
                arg = arg.slice(1);
                if(rutas.filter(e=>e===arg).length !==0){
                    routeObject = "directoryObject";
                    let routeToCompare = arg;
                    arg = arg.split("/");
                    for (let i = 0; i < arg.length; i++) {
                        routeObject += `['${arg[i]}']`;
                    }
                    deleteMetadata(routeToCompare);
                    eval("delete "+ routeObject);
                    updateRutas();
                    updateLocalStorage();
                } else {return new Error (`rm: No such file or directory`);}
            }else {return new Error (`rm: you can't remove root directory`);}
        } else {return new Error (`rm: need to start with '/' and finish without '/': No such file or directory`);}
    } else {
        let value = false;
        Object.keys(eval(routeObject)).forEach(e=>{
            if(e===arg){
                value = true;
            }
        })
        if(value){
            let routeToCompare = inUseRoute.split("").slice(1).join("");
            routeToCompare += "/" + arg;
            deleteMetadata(routeToCompare);
            eval(`delete ${routeObject}['${arg}']`);
            updateRutas();
            updateLocalStorage();
        } else {return new Error (`rm: cannot start '${arg}': No such file or directory`);}
    }
}
function mv(arg) {
    let routeObject = "directoryObject";
    route = inUseRoute.split("").slice(1).join("");
    route = route.split("/");
    for (let i = 0; i < route.length; i++) {
        routeObject += `['${route[i]}']`;
    }
    let words=arg.split("--")
    if(checkWords(words[0].trim())){
        if(words[1].trim().includes("/")){
            let finalRoute= words[1].trim()
            if(finalRoute[0]==="/" && finalRoute[finalRoute.length -1]!== "/" ){
                finalRoute=finalRoute.slice(1)
                if(rutas.filter(e=>e===finalRoute)!==0){
                    let nRoute = "directoryObject";
                    let routeToCompare = inUseRoute.split("").slice(1).join("");
                    let newRoute = finalRoute + "/" + words[0].trim();
                    routeToCompare += "/" + words[0].trim();
                    finalRoute = finalRoute.split("/");
                    for (let i = 0; i < finalRoute.length; i++) {
                        nRoute += `['${finalRoute[i]}']`;
                    }
                    storeMetadata(newRoute);
                    eval(`${nRoute}['${words[0].trim()}'] = JSON.parse(JSON.stringify(eval(${routeObject}['${words[0].trim()}'])))`)
                    deleteMetadata(routeToCompare);
                    eval(`delete ${routeObject}['${words[0].trim()}']`)
                    updateLocalStorage()
                    updateRutas()
                }else{return new Error (`mv: No such file or directory`);}
            }else{return new Error (`mv: need to start with '/' and finish without '/': No such file or directory`);}
        }else if(checkWords(words[1].trim())){
            let routeToCompare = inUseRoute.split("").slice(1).join("");
            let newRoute = `${routeToCompare}/${words[1].trim()}/${words[0].trim()}`;
            routeToCompare += "/" + words[0].trim();
            storeMetadata(newRoute);
            eval(`${routeObject}['${words[1].trim()}']['${words[0].trim()}'] = JSON.parse(JSON.stringify(eval(${routeObject}['${words[0].trim()}'])))`);
            deleteMetadata(routeToCompare);
            eval(`delete ${routeObject}['${words[0].trim()}']`)
            updateLocalStorage();
            updateRutas();
        }else{
            let routeToCompare = inUseRoute.split("").slice(1).join("");
            let newRoute = routeToCompare + "/" + words[1].trim();
            routeToCompare += "/" + words[0].trim();
            storeMetadata(newRoute);
            eval(`${routeObject}['${words[1].trim()}'] = JSON.parse(JSON.stringify(eval(${routrObject}['${words[0].trim()}'])))`);
            deleteMetadata(routeToCompare);
            eval(`delete ${routeObject}['${words[0].trim()}']`);
            updateLocalStorage()
            updateRutas()
        }
    }else{
        return new Error (`mv: cannot stat '${words[0]}': No such file or directory`);
    }
    function checkWords(word) {
        let value = false
        Object.keys(eval(routeObject)).forEach(e=>{
            if(e === word){
                value = true
            }
        })
        return value
    }
}
function clear() {
    document.querySelectorAll('.display-terminal p').forEach(e => e.remove())
    document.querySelectorAll('.display-terminal pre').forEach(e => e.remove())
}
function help() {
    const help = `These shell commands are defined internally.  Type 'help' to see this list.
    cat
    cd
    clear
    echo
    help
    ls
    mkdir
    mv
    pwd
    rm
    cmatrix
    ckirby`;
    input.insertAdjacentHTML("beforebegin", `<pre>${help}</pre>`)
}
function man(arg) {
    switch (arg) {
        case "pwd":
            input.insertAdjacentHTML("beforebegin",
`<pre>Print the name of the current working directory.</pre>`);
            break;
        case "ls":
            input.insertAdjacentHTML("beforebegin",
`<pre>List information about the FILEs (the current directory by default).
ls [OPTION]... [FILE]...
Optional parameters:
* ls -R: list subdirectories recursively.
* ls -S: sort by file size, largest first.
* ls -t: sort by time, newest first; see --time.</pre>`);
            break;
        case "cd":
            input.insertAdjacentHTML("beforebegin",
`<pre>Change the shell working directory.
cd [dir]
Change the current directory to DIR.  The default DIR is the value
of the HOME shell variable.
'cd ..' is processed by removing the immediately previous pathname
component back to a slash or the beginning of DIR.</pre>`);
            break;
        case "mkdir":
            input.insertAdjacentHTML("beforebegin",
`<pre>Create the DIRECTORY(ies), if they do not already exist.
mkdir DIRECTORY...</pre>`);
            break;
        case "echo":
            input.insertAdjacentHTML("beforebegin",
`<pre>Write arguments to the standard output.
Display the ARGs, separated by a single space character and
followed by a newline, on the standard output.
echo [arg ...]</pre>`);
            break;
        case "cat":
            input.insertAdjacentHTML("beforebegin",
`<pre>Concatenate FILE(s) to standard output.
cat [FILE]...</pre>`);
            break;
        case "rm":
            input.insertAdjacentHTML("beforebegin",
`<pre>Remove each specified file.
rm [FILE]...</pre>`);
            break;
        case "mv":
            input.insertAdjacentHTML("beforebegin",
`<pre>Move SOURCE(s) to DIRECTORY.
mv SOURCE... DIRECTORY</pre>`);
            break;
        case "clear":
            input.insertAdjacentHTML("beforebegin",
`<pre>Clear your screen if this is possible, including
its scrollback buffer.</pre>`);
            break;
        case "help":
            input.insertAdjacentHTML("beforebegin",
`<pre>Display information about builtin commands.</pre>`);
            break;
        case "cmatrix":
            input.insertAdjacentHTML("beforebegin",
`<pre>To change background to cmatrix.
Command to exit:
cmatrix q</pre>`);
            break;
        case "ckirby":
            input.insertAdjacentHTML("beforebegin",
`<pre>Show an image of Kirby in your screen. It is the titular
protagonist of the Kirby series of video games owned by
Nintendo and HAL Laboratory.</pre>`);
            break;
    }
}
function cmatrix(arg){
    if(arg==="q"){
        document.querySelector('.display-terminal').classList.remove("cmatrix")
        textarea.style.color= "lime";
    }else if(arg===""){
        document.querySelector('.display-terminal').classList.add("cmatrix")
        textarea.style.color= "white";
        clear()
    }
}
function ckirby(){
    input.insertAdjacentHTML("beforebegin", `<pre>

    <(-'.'-)>
    </pre>`)
}
//TODO: Preguntar a jose bien sobre el funcionamiento de remove.(carpeta final o todo el absolute path).
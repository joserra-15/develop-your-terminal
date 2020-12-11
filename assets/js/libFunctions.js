//TODO: AÑADIR METADATA, ACABAR LS.
// Create the object to simulate directorys

let directoryObject = {"raulrexulon": {}};
let metaData = [{"name": "raulrexulon", "time": 1607677301663, "size": 0}];
updateObject();
updateMetadata();
updateLocalStorage();

class MetaDataObject {
    constructor(name, time, size) {
        this.name = name;
        this.time = time;
        this.size = size;
    }
}

// create variables

let inUseRoute = `>raulrexulon`;
let rutas;
updateRutas();

//function to update rutas
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
                    storeMetadata(routeToCompare);
                    eval(newRouteObject);
                }
            }
            updateLocalStorage();
            updateRutas();
        }
    } else if (flag.length > 0 && !rutas.includes(`${route}/${flag}`)) {
        let routeObject = "directoryObject";
        let routeName = `${route}/${flag}`;
        route = route.split('/');
        for(let i=0; i<route.length; i++){
            routeObject += "[" + "'" + route[i] + "'" + "]";
        }
        routeObject += "[" + "'" + flag + "'" + "]";
        routeObject += "={}";
        storeMetadata(routeName);
        eval(routeObject);
        updateLocalStorage();
        updateRutas();
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
                if(rutas.filter(e=>e===finalRoute)!==0){
                    let nRoute = "directoryObject";
                    finalRoute = finalRoute.split("/");
                    for (let i = 0; i < finalRoute.length; i++) {
                        nRoute += "[" + "'" + finalRoute[i] + "'" + "]";
                    }
                    console.log(nRoute)
                    eval(nRoute + "[" + "'" + words[0].trim() + "'" + "]" + "="+ "JSON.parse(JSON.stringify(eval("+routeObject + "[" + "'" + words[0].trim() + "'" + "]" +")))" )
                    eval("delete "+routeObject + "[" + "'" + words[0].trim() + "'" + "]")
                    updateLocalStorage()
                    updateRutas()
                }else{return new Error (`mv: No such file or directory`);}
            }else{return new Error (`mv: need to start with '/' and finish without '/': No such file or directory`);}
        }else if(checkWords(words[1].trim())){
            eval(routeObject + "[" + "'" + words[1].trim() + "'" + "]" + "[" + "'" + words[0].trim() + "'" + "]" + "="+ "JSON.parse(JSON.stringify(eval("
            +routeObject + "[" + "'" + words[0].trim() + "'" + "]" +")))" )
            eval("delete "+routeObject + "[" + "'" + words[0].trim() + "'" + "]")
            updateLocalStorage()
            updateRutas()
        }else{
            eval(routeObject + "[" + "'" + words[1].trim() + "'" + "]" + "="+ "JSON.parse(JSON.stringify(eval("
            +routeObject + "[" + "'" + words[0].trim() + "'" + "]" +")))" )
            eval("delete "+routeObject + "[" + "'" + words[0].trim() + "'" + "]")
            updateLocalStorage()
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
    document.querySelectorAll('.display-terminal pre').forEach(e => e.remove())
}

function help() {
    const help = `These shell commands are defined internally.  Type 'help' to see this list.
    cat
    cd [dir]
    clear
    echo [arg ...]
    help [pattern ...]
    ls
    mkdir
    mv
    pwd
    rm
    cmatrix
    ckirby`;
    input.insertAdjacentHTML("beforebegin", `<pre>${help}</pre>`)
}

function man(flag) {
    switch (flag) {
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

// Function to store in local storage the dyrectorys adn to update it from local storage

function updateObject() {
    if (localStorage.getItem("directory") === null) {
        let directoryObjectString = JSON.stringify(directoryObject);
        localStorage.setItem("directory", directoryObjectString);
    } else {
        directoryObject = JSON.parse(localStorage.getItem("directory"));
    }
}

function updateLocalStorage() {
    let directoryObjectString = JSON.stringify(directoryObject);
    let directoryMetadataString = JSON.stringify(metaData);
    localStorage.setItem("directory", directoryObjectString);
    localStorage.setItem("directoryMetadata", directoryMetadataString);
}

function updateMetadata() {
    if (localStorage.getItem("directoryMetadata") === null) {
        let directoryMetadataString = JSON.stringify(metaData);
        localStorage.setItem("directoryMetadata", directoryMetadataString);
    } else {
        metaData = JSON.parse(localStorage.getItem("directoryMetadata"));
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

// Function to store the metadata of the directory/file

function storeMetadata(flag){
    let actualTime = new Date().getTime();
    let metaDataFile = new MetaDataObject(flag, actualTime, 0);
    metaData.push(metaDataFile);
}

function cmatrix(flag){
    if(flag==="q"){
        document.querySelector('.display-terminal').classList.remove("cmatrix")
        textarea.style.color= "lime";
    }else if(flag===""){
        document.querySelector('.display-terminal').classList.add("cmatrix")
        textarea.style.color= "white";
        clear()
    }
}
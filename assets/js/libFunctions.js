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

function echo(flag) {
    let newFlag = flag.split(">")
    newFlag = newFlag.map(e => e.trim())
    let route = inUseRoute.split("").slice(1).join("");
    let absoluteFlag = "";

    if (newFlag[1].length > 0 && newFlag[1][0] === "/") {
        absoluteFlag = newFlag[1];
        absoluteFlag = absoluteFlag.split("").slice(1).join("");
    }
    if (newFlag[1].length > 0 && newFlag[1][0] === "/" && rutas.includes(absoluteFlag)) {
        
        let routeObject = "directoryObject";
        let routeToCompare = "";
        absoluteFlag = absoluteFlag.split('/');
        for(let i=0; i < absoluteFlag.length; i++){
            if(i===0) {
                routeToCompare += absoluteFlag[i];
            } else {
                routeToCompare += "/" + absoluteFlag[i];
            }
            routeObject += "[" + "'" + absoluteFlag[i] + "'" + "]";
        }
        storeMetadata(routeToCompare);
        routeObject += ` = ${newFlag[0]}`
        eval(routeObject)
        updateLocalStorage();
        updateRutas();

    } else if (newFlag[1].length > 0 && newFlag[1][0] === "/" && !rutas.includes(absoluteFlag)) {
        
        if (newFlag[1][1] !== "r") {
            return new Error('you can´t create a new root.');
        } else {
            let otherRoute = newFlag[1].split('').slice(1).join('');
            otherRoute = otherRoute.split("/");
            console.log(otherRoute);
            let routeObject = "directoryObject";
            let routeToCompare = "";
            for (let i = 0; i < otherRoute.length - 1; i++) {
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
            routeToCompare += "/" + otherRoute[otherRoute.length - 1];
            storeMetadata(routeToCompare);
            routeObject += "[" + "'" + otherRoute[otherRoute.length - 1] + "'" + "]";
            routeObject += ` = ${newFlag[0]}`
            eval(routeObject)
            updateLocalStorage();
            updateRutas();
        }
    } else if (newFlag[1].length > 0 && (!rutas.includes(`${route}/${newFlag[1]}`) || rutas.includes(`${route}/${newFlag[1]}`))) {
        let routeObject = "directoryObject";
        let routeName = `${route}/${newFlag[1]}`;
        route = route.split('/');
        for(let i=0; i<route.length; i++){
            routeObject += "[" + "'" + route[i] + "'" + "]";
        }
        routeObject += "[" + "'" + newFlag[1] + "'" + "]";
        routeObject += ` = ${newFlag[0]}`;
        storeMetadata(routeName);
        eval(routeObject);
        updateLocalStorage();
        updateRutas();
    } else {
        return new Error('Syntax Error');
    }
}


function cat(flag) {
    let route = inUseRoute.split("").slice(1).join("");
    let absoluteFlag = "";

    if (flag.length > 0 && flag[0] === "/") {
        absoluteFlag = flag;
        absoluteFlag = absoluteFlag.split("").slice(1).join("");
    }
    if (flag.length > 0 && flag[0] === "/" && rutas.includes(absoluteFlag)) {
        let routeObject = "directoryObject";
        absoluteFlag = absoluteFlag.split('/');
        for(let i=0; i < absoluteFlag.length; i++){
            routeObject += "[" + "'" + absoluteFlag[i] + "'" + "]";
        }
        let p = document.createElement('p')
        p.textContent = `${eval(routeObject)}`
        input.insertAdjacentElement('beforebegin', p)

    } else if (flag.length > 0 && rutas.includes(`${route}/${flag}`)) {
        let routeObject = "directoryObject";
        route = route.split('/');
        for(let i=0; i<route.length; i++){
            routeObject += "[" + "'" + route[i] + "'" + "]";
        }
        routeObject += "[" + "'" + flag + "'" + "]";
        let p = document.createElement('p')
        p.textContent = `${eval(routeObject)}`
        input.insertAdjacentElement('beforebegin', p)
    } else {
        return new Error('file doesn\'t exist');
    }
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
            if(flag!=="/raulrexulon"){
                flag = flag.slice(1);
                if(rutas.filter(e=>e===flag).length !==0){
                    routeObject = "directoryObject";
                    let routeToCompare = flag;
                    flag = flag.split("/");
                    for (let i = 0; i < flag.length; i++) {
                        routeObject += "[" + "'" + flag[i] + "'" + "]";
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
            let routeToCompare = inUseRoute.split("").slice(1).join("");
            routeToCompare += "/" + flag;
            deleteMetadata(routeToCompare);
            eval("delete "+ routeObject + "[" + "'" + flag + "'" + "]");
            updateRutas();
            updateLocalStorage();
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
                console.log(finalRoute);
                if(rutas.filter(e=>e===finalRoute)!==0){
                    let nRoute = "directoryObject";
                    let routeToCompare = inUseRoute.split("").slice(1).join("");
                    let newRoute = finalRoute + "/" + words[0].trim();
                    routeToCompare += "/" + words[0].trim();
                    finalRoute = finalRoute.split("/");
                    for (let i = 0; i < finalRoute.length; i++) {
                        nRoute += "[" + "'" + finalRoute[i] + "'" + "]";
                    }
                    console.log(nRoute)
                    storeMetadata(newRoute);
                    eval(nRoute + "[" + "'" + words[0].trim() + "'" + "]" + "="+ "JSON.parse(JSON.stringify(eval("+routeObject + "[" + "'" + words[0].trim() + "'" + "]" +")))" )
                    deleteMetadata(routeToCompare);
                    eval("delete "+routeObject + "[" + "'" + words[0].trim() + "'" + "]")
                    updateLocalStorage()
                    updateRutas()
                }else{return new Error (`mv: No such file or directory`);}
            }else{return new Error (`mv: need to start with '/' and finish without '/': No such file or directory`);}
        }else if(checkWords(words[1].trim())){
            let routeToCompare = inUseRoute.split("").slice(1).join("");
            let newRoute = routeToCompare + "/" + words[1].trim() + "/" + words[0].trim();
            routeToCompare += "/" + words[0].trim();
            storeMetadata(newRoute);
            eval(routeObject + "[" + "'" + words[1].trim() + "'" + "]" + "[" + "'" + words[0].trim() + "'" + "]" + "="+ "JSON.parse(JSON.stringify(eval("
            +routeObject + "[" + "'" + words[0].trim() + "'" + "]" +")))" )
            deleteMetadata(routeToCompare);
            eval("delete "+routeObject + "[" + "'" + words[0].trim() + "'" + "]")
            updateLocalStorage()
            updateRutas()
        }else{
            let routeToCompare = inUseRoute.split("").slice(1).join("");
            let newRoute = routeToCompare + "/" + words[1].trim();
            routeToCompare += "/" + words[0].trim();
            storeMetadata(newRoute);
            eval(routeObject + "[" + "'" + words[1].trim() + "'" + "]" + "="+ "JSON.parse(JSON.stringify(eval("
            +routeObject + "[" + "'" + words[0].trim() + "'" + "]" +")))" )
            deleteMetadata(routeToCompare);
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
}

function help() {
    const help = `These shell commands are defined internally.  Type 'help' to see this list.
    
    cat
    cd [-L|[-P [-e]] [-@]] [dir]
    clear
    echo [-neE] [arg ...]
    help [-dms] [pattern ...]
    ls
    mkdir
    mv
    pwd [-LP]
    rm`;
    input.insertAdjacentHTML("beforebegin", `<p>${help}</p>`)
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
//pinguland

function ckirby(){
    input.insertAdjacentHTML("beforebegin", `<pre>

    <(-'.'-)>
    </pre>`)
}

// Delete metadada function

function deleteMetadata(routeToCompare) {
    for(let i = 0; i < metaData.length; i++) {
        if(metaData[i].name === routeToCompare) {
            metaData.splice(i, 1);
        }
    }
}

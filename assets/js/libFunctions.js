// Variable Definition

let directoryObject = {"raulrexulon": {}};
let metaData = [{"name": "raulrexulon", "time": 1607677301663, "size": 0}];
let inUseRoute = `>raulrexulon`;
let rutas;
let newRootDirectory = false;
let changeUser = false;
let yesOrNoMkdirArgument;
let yesOrNoRootchangeArgument;
let inUseRoot = `>raulrexulon`;

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
    let metaDataToDelete = []
    for(let i = 0; i < metaData.length; i++) {
        if(metaData[i].name.includes(routeToCompare)) {
            metaDataToDelete.push(metaData[i].name);
        }
    }
    metaDataToDelete.forEach(e => {
        for(let i = 0; i < metaData.length; i++) {
            if(e === metaData[i].name) {
                metaData.splice(i, 1);
            }
        }
    })
}

// Define the function for each command

function pwd() {
    newRootDirectory = false;
    changeUser = false;
    return inUseRoute;
}
function ls(arg) {
    newRootDirectory = false;
    changeUser = false;
    let startDirectory = arg.split(" ");
    let argument;
    let relativeRoute;
    if(startDirectory.length === 1) {
        if(startDirectory[0][0] === "-") {
            argument = startDirectory[0];
            relativeRoute = "";
        }else if(startDirectory.includes("/")) {
            argument = "";
            relativeRoute = startDirectory[0];
        } else {
            argument = "";
            relativeRoute = startDirectory[0];
        }
    } else {
        if(startDirectory[0][0] === "-") {
            argument = startDirectory[0];
            relativeRoute = startDirectory[1];
        } else {
            argument = "";
            relativeRoute = startDirectory[1];
        }
    }
    if(relativeRoute.includes(".")) {
        let argumentToFile = relativeRoute.split("").slice(1).join("");
        if(argumentToFile.includes(".")) {
            return new Error("ls: you can not do ls into a file");
        } else {
            switch (argument) {
                case "-R":
                    return printFoldersR(relativeRoute);
                case "-S":
                    return printFoldersS(relativeRoute);
                case "-t":
                    return printFoldersT(relativeRoute);
                case "":
                    return printFolders(relativeRoute);
                case "-RTD":
                    return printRootDirectorys();
                default:
                    return new Error('this command is not available.');
            }
        }
    } else {
        switch (argument) {
            case "-R":
                return printFoldersR(relativeRoute);
            case "-S":
                return printFoldersS(relativeRoute);
            case "-t":
                return printFoldersT(relativeRoute);
            case "":
                return printFolders(relativeRoute);
            case "-RTD":
                return printRootDirectorys();
            default:
                return new Error('this command is not available.');
        }
    }
    function printFolders(arg) {
        let absoluteDirectory;
        let relativeDirectory;
        if(arg === "") {
            let routeObject = "directoryObject";
            let routeToWork = inUseRoute.split("").slice(1).join("");
            routeToWork = routeToWork.split("/");
            routeToWork.forEach(e => {
                routeObject += `['${e}']`;
            })
            return print(routeObject);
        } else {
            if(arg[0] === "/") {
                absoluteDirectory = arg;
                absoluteDirectory = absoluteDirectory.split("").slice(1).join("");
                let routeObject = "directoryObject";
                let routeToWork = absoluteDirectory;
                routeToWork = routeToWork.split("/");
                routeToWork.forEach(e => {
                    routeObject += `['${e}']`;
                })
                return print(routeObject);
            } else if(arg[0] === "." && arg[1] === "/") {
                absoluteDirectory = arg.split("").slice(1).join("");
                absoluteDirectory = absoluteDirectory.split("").slice(1).join("");
                let routeToCompare = inUseRoute.split("").slice(1).join("");
                let compareRoute;
                if(absoluteDirectory === ""){
                    compareRoute = `${routeToCompare}`
                } else {
                    compareRoute = `${routeToCompare}/${absoluteDirectory}`
                }
                if (rutas.includes(compareRoute)) {
                    if(absoluteDirectory === "") {
                        routeToCompare = compareRoute.split("/");
                        let routeObject = "directoryObject";
                        routeToCompare.forEach(e => {
                            routeObject += `['${e}']`;
                        })
                        return print(routeObject);
                    } else {
                        absoluteDirectory = absoluteDirectory.split("/");
                    routeToCompare = routeToCompare.split("/");
                    let routeObject = "directoryObject";
                    routeToCompare.forEach(e => {
                        routeObject += `['${e}']`;
                    })
                    absoluteDirectory.forEach(e => {
                        routeObject += `['${e}']`;
                    })
                    return print(routeObject);
                    }
                } else {
                    return new Error('the path does not exist.');
                }
            }else if(arg.includes("/")) {
                let route = arg.split("/");
                let newRoute = inUseRoute.split("").slice(1).join("");
                newRoute = newRoute.split("/");
                let actualPath = "directoryObject";
                inUseRoute.split("").slice(1).join("");
                newRoute.forEach(e => {
                    actualPath += `['${e}']`;
                })
                route.forEach(e => {
                    actualPath += `['${e}']`;
                })
                return print(actualPath);
            } else {
                relativeDirectory = inUseRoute.split("").slice(1).join("");
                relativeDirectory += `/${arg}`;
                let routeObject = "directoryObject";
                let routeToWork = relativeDirectory.split("/");
                routeToWork.forEach(e => {
                    routeObject += `['${e}']`;
                })
                return print(routeObject);
            }
        }
        function print(route) {
            folder = Object.keys(eval(route));
            if(folder[0] === "0" || folder.length === 0) {
                return new Error('there are not folders available.');
            } else {
                folder.forEach(e => {
                    let p = document.createElement('p');
                    p.textContent = e;
                    input.insertAdjacentElement('beforebegin', p);
                })
            }
        }
    }
    function printFoldersR(arg) {
        let startRoute = inUseRoute.split("").slice(1).join("");
        let routes = [];
        let absoluteDirectory;
        if(arg.length === 0) {
            for(let i = 0; i < rutas.length; i++) {
                if(rutas[i].includes(startRoute)) {
                    if(!(rutas[i].endsWith(".txt") || rutas[i].endsWith(".js"))) {
                        routes.push(rutas[i]);
                    }
                }
            }
            printR();
        } else if(arg.length > 0) {
            if(arg[0] === "/") {
                absoluteDirectory = arg;
                absoluteDirectory = absoluteDirectory.split("").slice(1).join("");
                for(let i = 0; i < rutas.length; i++) {
                    if(rutas[i].includes(startRoute)) {
                        if(!(rutas[i].endsWith(".txt") || rutas[i].endsWith(".js"))) {
                            routes.push(rutas[i]);
                        }
                    }
                }
                printR();
            } else if(arg[0] === "." && arg[1] === "/") {
                absoluteDirectory = startRoute;
                let arfument = arg.split("").slice(1).join("");
                let arfument1 = arfument.split("").slice(1).join("");
                if(arfument1 === "") {
                    absoluteDirectory += `${arfument1}`;
                } else {
                    absoluteDirectory += `${arfument}`;
                }
                for(let i = 0; i < rutas.length; i++) {
                    if(rutas[i].includes(startRoute)) {
                        if(!(rutas[i].endsWith(".txt") || rutas[i].endsWith(".js"))) {
                            routes.push(rutas[i]);
                        }
                    }
                }
                printR();
            } else if(arg.includes("/")) {
                absoluteDirectory = startRoute;
                absoluteDirectory += `/${arg}`;
                for(let i = 0; i < rutas.length; i++) {
                    if(rutas[i].includes(startRoute)) {
                        if(!(rutas[i].endsWith(".txt") || rutas[i].endsWith(".js"))) {
                            routes.push(rutas[i]);
                        }
                    }
                }
                printR();
            } else {
                for(let i = 0; i < rutas.length; i++) {
                    if(rutas[i].includes(startRoute)) {
                        if(!(rutas[i].endsWith(".txt") || rutas[i].endsWith(".js"))) {
                            routes.push(rutas[i]);
                        }
                    }
                }
                printR();
            }
        }
        function printR() {
            for(let i = 0; i < routes.length; i++) {
                let partsOfTheRoute = routes[i]
                partsOfTheRoute = partsOfTheRoute.split("/");
                let routeToEval = "directoryObject";
                if(partsOfTheRoute.length === 1) {
                    let route = partsOfTheRoute[0];
                    routeToEval += `['${route}']`;
                    let folder = Object.keys(eval(routeToEval));
                    if(folder[0] === "0" || folder.length === 0) {
                        let routeToShow = "./";
                        let cr = document.createElement("br");
                        input.insertAdjacentElement('beforebegin', cr);
                        let q = document.createElement('p');
                        q.textContent = `${routeToShow}${route}`;
                        input.insertAdjacentElement('beforebegin', q);
                        let p = document.createElement('p');
                        input.insertAdjacentElement('beforebegin', p);
                        let br = document.createElement("br");
                        input.insertAdjacentElement('beforebegin', br);
                    } else {
                        let routeToShow = "./";
                        let cr = document.createElement("br");
                        input.insertAdjacentElement('beforebegin', cr);
                        let q = document.createElement('p');
                        q.textContent = `${routeToShow}${route}`;
                        input.insertAdjacentElement('beforebegin', q);
                        folder.forEach(e => {
                        let p = document.createElement('p');
                        p.textContent = e;
                        input.insertAdjacentElement('beforebegin', p);
                        })
                        let br = document.createElement("br");
                        input.insertAdjacentElement('beforebegin', br);
                    }
                } else {
                    let routeToShow = "./";
                    for(let i = 0; i < partsOfTheRoute.length; i++) {
                        routeToEval += `['${partsOfTheRoute[i]}']`;
                        routeToShow += `${partsOfTheRoute[i]}/`;
                    }
                    let p = document.createElement('p');
                    p.textContent = routeToShow;
                    input.insertAdjacentElement('beforebegin', p);
                    let folder = Object.keys(eval(routeToEval));
                    folder.forEach(e => {
                        let q = document.createElement('p');
                        q.textContent = e;
                        input.insertAdjacentElement('beforebegin', q);
                    })
                    let br = document.createElement("br");
                    input.insertAdjacentElement('beforebegin', br);
                }
            }
        }
    }
    function printFoldersS(arg) {
        updateMetadataSize();
        if(arg.length > 0) {
            if(arg[0] === "/"){
                let route = arg.split("").slice(1).join("");
                if(rutas.includes(route)) {
                    let routeObject = "directoryObject";
                    let routeToCompareMetadata = "";
                    route = route.split("/");
                    for(let i = 0; i < route.length; i++) {
                        if(i === 0) {
                            routeToCompareMetadata += route[i];
                        } else {
                            routeToCompareMetadata += `/${route[i]}`;
                        }
                        routeObject += `['${route[i]}']`;
                    }
                    return printDirectorysSizeOrdered(routeObject, routeToCompareMetadata);
                } else {
                    return new Error('the path does not exist.')
                }
            } else if(arg[0] === "." && arg[1] === "/") {
                let actualRoute = inUseRoute.split("").slice(1).join("");
                let route = arg.split("").slice(1).join("");
                route = route.split("").slice(1).join("");
                if(route === "") {
                    actualRoute += `${route}`;
                } else {
                    actualRoute += `/${route}`;
                }
                if(rutas.includes(actualRoute)) {
                    let routeObject = "directoryObject";
                    let routeToCompareMetadata = "";
                    route = actualRoute.split("/");
                    for(let i = 0; i < route.length; i++) {
                        if(i === 0) {
                            routeToCompareMetadata += route[i];
                        } else {
                            routeToCompareMetadata += `/${route[i]}`;
                        }
                        routeObject += `['${route[i]}']`;
                    }
                    return printDirectorysSizeOrdered(routeObject, routeToCompareMetadata);
                } else {
                    return new Error('the path does not exist.')
                }
            } else if(arg.includes("/")) {
                let actualRoute = inUseRoute.split("").slice(1).join("");
                let route = arg
                actualRoute += `/${route}`;
                if(rutas.includes(actualRoute)) {
                    let routeObject = "directoryObject";
                    let routeToCompareMetadata = "";
                    route = actualRoute.split("/");
                    for(let i = 0; i < route.length; i++) {
                        if(i === 0) {
                            routeToCompareMetadata += route[i];
                        } else {
                            routeToCompareMetadata += `/${route[i]}`;
                        }
                        routeObject += `['${route[i]}']`;
                    }
                    return printDirectorysSizeOrdered(routeObject, routeToCompareMetadata);
                } else {
                    return new Error('the path does not exist.')
                }
            } else {
                let actualRoute = inUseRoute.split("").slice(1).join("");
                let route = arg
                actualRoute += `/${route}`;
                if(rutas.includes(actualRoute)) {
                    let routeObject = "directoryObject";
                    let routeToCompareMetadata = "";
                    route = actualRoute.split("/");
                    for(let i = 0; i < route.length; i++) {
                        if(i === 0) {
                            routeToCompareMetadata += route[i];
                        } else {
                            routeToCompareMetadata += `/${route[i]}`;
                        }
                        routeObject += `['${route[i]}']`;
                    }
                    return printDirectorysSizeOrdered(routeObject, routeToCompareMetadata);
                } else {
                    return new Error('the path does not exist.')
                }
            }
        } else {
            let route = inUseRoute.split("").slice(1).join("");
            let routeObject = "directoryObject";
            let routeToCompareMetadata = "";
            route = route.split("/");
            for(let i = 0; i < route.length; i++) {
                if(i === 0) {
                    routeToCompareMetadata += route[i];
                } else {
                    routeToCompareMetadata += `/${route[i]}`;
                }
                routeObject += `['${route[i]}']`;
            }
            return printDirectorysSizeOrdered(routeObject, routeToCompareMetadata);
        }
        function updateMetadataSize() {
            metaData.forEach(e => {
                let name = e.name;
                name = name.split("/");
                let nameBites = name[name.length -1];
                let totalSize = 0;
                if(nameBites.includes(".")) {
                    let routeObject = "directoryObject";
                    for(let i = 0; i < nameBites.length; i++) {
                        totalSize += nameBites[i].charCodeAt();
                    }
                    name.forEach(e => {
                        routeObject += `['${e}']`
                    })
                    let fileContent = eval(routeObject);
                    for(let i = 0; i < fileContent.length; i++) {
                        totalSize += fileContent[i].charCodeAt();
                    }
                } else {
                    for(let i = 0; i < nameBites.length; i++) {
                        totalSize += nameBites[i].charCodeAt();
                    }
                }
                e.size = totalSize;
                updateLocalStorage();
            })
            metaData.forEach(e => {
                let name = e.name;
                let rutas = [];
                let totalSize = 0;
                metaData.forEach(e => {
                    if(e.name.includes(name)) {
                        rutas.push(e.name);
                    }
                })
                rutas.forEach(e => {
                    metaData.forEach(j => {
                        if(j.name === e) {
                            totalSize += j.size;
                        }
                    })
                })
                metaData.forEach(e => {
                    if(e.name === name) {
                        e.size = totalSize;
                    }
                })
                updateLocalStorage();
            })
        }
        function printDirectorysSizeOrdered(arg, route) {
            let folders = Object.keys(eval(arg));
            if(folders[0] === "0" || folders.length === 0) {
                return new Error('there are not folders available.');
            } else {
                let sizeArray = [];
                let finalArray = [];
                folders.forEach(e => {
                    let finalRoute = route + `/${e}`;
                    metaData.forEach(e => {
                        if(e.name === finalRoute) {
                            sizeArray.push(e.size);
                        }
                    })
                })
                let arrayForFinalArray = [];
                for(let i = 0; i < folders.length; i ++) {
                    arrayForFinalArray.push(folders[i]);
                    arrayForFinalArray.push(sizeArray[i]);
                    finalArray.push(arrayForFinalArray);
                    arrayForFinalArray = [];
                }
                finalArray.sort(function (a, b) {
                    return b[1] - a[1];
                })
                finalArray.forEach(e => {
                    let p = document.createElement('p');
                        p.textContent = e[0];
                        input.insertAdjacentElement('beforebegin', p);
                })
            }
        }
    }
    function printFoldersT(arg) {
        if(arg.length > 0) {
            if(arg[0] === "/"){
                let route = arg.split("").slice(1).join("");
                if(rutas.includes(route)) {
                    let routeObject = "directoryObject";
                    let routeToCompareMetadata = "";
                    route = route.split("/");
                    for(let i = 0; i < route.length; i++) {
                        if(i === 0) {
                            routeToCompareMetadata += route[i];
                        } else {
                            routeToCompareMetadata += `/${route[i]}`;
                        }
                        routeObject += `['${route[i]}']`;
                    }
                    return printDirectorysTimeOrdered(routeObject, routeToCompareMetadata);
                } else {
                    return new Error('the path does not exist.')
                }
            } else if(arg[0] === "." && arg[1] === "/") {
                let actualRoute = inUseRoute.split("").slice(1).join("");
                let route = arg.split("").slice(1).join("");
                route = route.split("").slice(1).join("");
                if(route === "") {
                    actualRoute += `${route}`;
                } else {
                    actualRoute += `/${route}`;
                }
                if(rutas.includes(actualRoute)) {
                    let routeObject = "directoryObject";
                    let routeToCompareMetadata = "";
                    route = actualRoute.split("/");
                    for(let i = 0; i < route.length; i++) {
                        if(i === 0) {
                            routeToCompareMetadata += route[i];
                        } else {
                            routeToCompareMetadata += `/${route[i]}`;
                        }
                        routeObject += `['${route[i]}']`;
                    }
                    return printDirectorysTimeOrdered(routeObject, routeToCompareMetadata);
                } else {
                    return new Error('the path does not exist.')
                }
            } else if(arg.includes("/")) {
                let actualRoute = inUseRoute.split("").slice(1).join("");
                let route = arg
                actualRoute += `/${route}`;
                if(rutas.includes(actualRoute)) {
                    let routeObject = "directoryObject";
                    let routeToCompareMetadata = "";
                    route = actualRoute.split("/");
                    for(let i = 0; i < route.length; i++) {
                        if(i === 0) {
                            routeToCompareMetadata += route[i];
                        } else {
                            routeToCompareMetadata += `/${route[i]}`;
                        }
                        routeObject += `['${route[i]}']`;
                    }
                    return printDirectorysTimeOrdered(routeObject, routeToCompareMetadata);
                } else {
                    return new Error('the path does not exist.')
                }
            } else {
                let actualRoute = inUseRoute.split("").slice(1).join("");
                let route = arg
                actualRoute += `/${route}`;
                if(rutas.includes(actualRoute)) {
                    let routeObject = "directoryObject";
                    let routeToCompareMetadata = "";
                    route = actualRoute.split("/");
                    for(let i = 0; i < route.length; i++) {
                        if(i === 0) {
                            routeToCompareMetadata += route[i];
                        } else {
                            routeToCompareMetadata += `/${route[i]}`;
                        }
                        routeObject += `['${route[i]}']`;
                    }
                    return printDirectorysTimeOrdered(routeObject, routeToCompareMetadata);
                } else {
                    return new Error('the path does not exist.')
                }
            }
        } else {
            let route = inUseRoute.split("").slice(1).join("");
            let routeObject = "directoryObject";
            let routeToCompareMetadata = "";
            route = route.split("/");
            for(let i = 0; i < route.length; i++) {
                if(i === 0) {
                    routeToCompareMetadata += route[i];
                } else {
                    routeToCompareMetadata += `/${route[i]}`;
                }
                routeObject += `['${route[i]}']`;
            }
            return printDirectorysTimeOrdered(routeObject, routeToCompareMetadata);
        }
        function printDirectorysTimeOrdered(arg, route) {
            let folders = Object.keys(eval(arg));
            if(folders[0] === "0" || folders.length === 0) {
                return new Error('there are not folders available.');
            } else {
                let timeArray = [];
                let finalArray = [];
                folders.forEach(e => {
                    let finalRoute = route + `/${e}`;
                    metaData.forEach(e => {
                        if(e.name === finalRoute) {
                            timeArray.push(e.time);
                        }
                    })
                })
                let arrayForFinalArray = [];
                for(let i = 0; i < folders.length; i ++) {
                    arrayForFinalArray.push(folders[i]);
                    arrayForFinalArray.push(timeArray[i]);
                    finalArray.push(arrayForFinalArray);
                    arrayForFinalArray = [];
                }
                finalArray.sort(function (a, b) {
                    return b[1] - a[1];
                })
                finalArray.forEach(e => {
                    let p = document.createElement('p');
                        p.textContent = e[0];
                        input.insertAdjacentElement('beforebegin', p);
                })
            }
        }
    }
    function printRootDirectorys() {
        let rootDirectorys = Object.keys(directoryObject);
        rootDirectorys.forEach(e => {
            let p = document.createElement('p');
            p.textContent = e;
            input.insertAdjacentElement('beforebegin', p);
        })
    }
}
function cd(arg) {
    newRootDirectory = false;
    changeUser = false;
    if(arg.includes(".")) {
        let argumentToFile = arg.split("").slice(1).join("");
        argumentToFile = argumentToFile.split("").slice(1).join("");
        if(argumentToFile.includes(".")) {
            return new Error("cd: you can not do cd into a file");
        } else {
            if(arg[0] === "." && arg[1] === "/") {
                let startDirectory = arg.split(" ");
                let relativeRoute;
                if(startDirectory[0] === "") {
                    argument = "";
                } else {
                    if(startDirectory[0] === "..") {
                        argument = startDirectory[0];
                        relativeRoute = "";
                    } else {
                        argument = " ";
                        relativeRoute = startDirectory[0];
                    }
                }
                let finalRoute = relativeRoute.split("").slice(1).join("");
                finalRoute = finalRoute.split("").slice(1).join("");
                let routeToCompare = inUseRoute.split("").slice(1).join("");
                if(finalRoute === "") {
                    routeToCompare += `${finalRoute}`
                } else {
                    routeToCompare += `/${finalRoute}`
                }
                if(rutas.includes(routeToCompare)) {
                    input.innerHTML = `>${routeToCompare}:`;
                    inUseRoute = `>${routeToCompare}`;
                } else {
                    return new Error('cd: the path does not exist.');
                }
            } else if(arg[0] === "." && arg[1] === ".") {
                let route = inUseRoute.split("").slice(1).join("");
                let startDirectory = arg.split(" ");
                let argument;
                let relativeRoute;
                if(startDirectory[0] === "") {
                    argument = "";
                } else {
                    if(startDirectory[0] === "..") {
                        argument = startDirectory[0];
                        relativeRoute = "";
                    } else {
                        argument = " ";
                        relativeRoute = startDirectory[0];
                    }
                }
                if(argument === "..") {
                    if(input.textContent === inUseRoot + ":") {
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
                }
            }
        }
    } else {
        let route = inUseRoute.split("").slice(1).join("");
        let startDirectory = arg.split(" ");
        let argument;
        let relativeRoute;
        if(startDirectory[0] === "") {
            argument = "";
        } else {
            if(startDirectory[0] === "..") {
                argument = startDirectory[0];
                relativeRoute = "";
            } else {
                argument = " ";
                relativeRoute = startDirectory[0];
            }
        }
        if(argument === ""){
            goDirectoryDefault();
        } else if(argument === "..") {
            if(input.textContent === inUseRoot + ":") {
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
        } else {
            if(startDirectory[0][0] === "/") {
                absoluteDirectory = arg.split("").slice(1).join("");
                if(rutas.includes(absoluteDirectory)) {
                    inUseRoute = `>${absoluteDirectory}`;
                    input.innerHTML = `>${absoluteDirectory}:`;
                } else {
                    return new Error('cd: the path does not exist.');
                }
            } else if(startDirectory[0].includes("/")) {
                if(startDirectory[0][0] === "." && startDirectory[0][1] === "/") {
                    let finalRoute = relativeRoute.split("").slice(1).join("");
                    finalRoute = finalRoute.split("").slice(1).join("");
                    finalRoute = finalRoute.split("").slice(1).join("");
                    let routeToCompare = inUseRoute.split("").slice(1).join("");
                    routeToCompare += `/${finalRoute}`
                    if(rutas.includes(routeToCompare)) {
                        input.innerHTML = `>${routeToCompare}:`;
                        inUseRoute = `>${routeToCompare}`;
                    } else {
                        return new Error('cd: the path does not exist.');
                    }
                } else {
                    let finalRoute = relativeRoute
                    let routeToCompare = inUseRoute.split("").slice(1).join("");
                    routeToCompare += `/${finalRoute}`
                    if(rutas.includes(routeToCompare)) {
                        input.innerHTML = `>${routeToCompare}:`;
                        inUseRoute = `>${routeToCompare}`;
                    } else {
                        return new Error('cd: the path does not exist.');
                    }
                }
            } else {
                if(rutas.includes(`${route}/${relativeRoute}`)) {
                    let route = input.textContent.split(":");
                    input.innerHTML = route[0] + `/` + relativeRoute + ":";
                    inUseRoute = route[0] + `/` + relativeRoute;
                } else {
                    return new Error('cd: the path does not exist.');
                }
            }
        }
    }
    function goDirectoryDefault() {
        let route = inUseRoute.split("").slice(1).join("");
        route = route.split("/");
        inUseRoute = `>${route[0]}`;
        input.innerHTML = `>${route[0]}:`;
    }
}
function mkdir(arg) {
    newRootDirectory = false;
    changeUser = false;
    let route = inUseRoute.split("").slice(1).join("");
    let absoluteDirectory = "";
    let argument;
    if(arg.includes(".")){
        let argumentToFile = arg.split("").slice(1).join("");
        if(argumentToFile.includes(".")) {
            return new Error("mkdir: you can not create files whith mkdir");
        } else {
            absoluteDirectory = arg.split("").slice(1).join("");
            absoluteDirectory = absoluteDirectory.split("").slice(1).join("");
            if(absoluteDirectory === "") {
                route += `${absoluteDirectory}`;
            } else {
                route += `/${absoluteDirectory}`;
            }
            if(rutas.includes(route)) {
                return new Error('this directory/file allready exist.');
            } else {
                argument = route.split('/');
                let routeObject = "directoryObject";
                let routeToEval;
                let routeToMetadata = "";
                for(let i = 0; i < argument.length; i++) {
                    if(i === 0) {
                        routeToMetadata += argument[i];
                    } else {
                        routeToMetadata += "/" + argument[i];
                    }
                    routeObject += `['${argument[i]}']`;
                    routeToEval = routeObject;
                    routeToEval += "={}";
                    if(rutas.includes(routeToMetadata)) {
                        continue;
                    } else {
                        storeMetadata(routeToMetadata);
                        eval(routeToEval);
                        updateLocalStorage();
                        updateRutas();
                    }
                }
            }
        }
    } else {
        if (arg !== ""){
            if(arg[0] === "." && arg[1] === "/"){
                absoluteDirectory = arg.split("").slice(1).join("");
                absoluteDirectory = absoluteDirectory.split("").slice(1).join("");
                if(absoluteDirectory === "") {
                    route += `${absoluteDirectory}`;
                } else {
                    route += `/${absoluteDirectory}`;
                }
                if(rutas.includes(route)) {
                    return new Error('this directory/file allready exist.');
                } else {
                    argument = route.split('/');
                    let routeObject = "directoryObject";
                    let routeToEval;
                    let routeToMetadata = "";
                    for(let i = 0; i < argument.length; i++) {
                        if(i === 0) {
                            routeToMetadata += argument[i];
                        } else {
                            routeToMetadata += "/" + argument[i];
                        }
                        routeObject += `['${argument[i]}']`;
                        routeToEval = routeObject;
                        routeToEval += "={}";
                        if(rutas.includes(routeToMetadata)) {
                            continue;
                        } else {
                            storeMetadata(routeToMetadata);
                            eval(routeToEval);
                            updateLocalStorage();
                            updateRutas();
                        }
                    }
                }
            } else if (arg[0] === "/") {
                yesOrNoArgument = arg;
                let argument = arg.split("").slice(1).join("");
                argument = argument.split('/');
                if(argument[0] !== "raulrexulon") {
                    let p = document.createElement('p');
                    p.textContent = `Do you wan't to create a new Root Directory?`;
                    input.insertAdjacentElement('beforebegin', p);
                    newRootDirectory = true;
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
            } else if (arg.includes("/")) {
                absoluteDirectory = arg;
                route += `/${absoluteDirectory}`;
                if(rutas.includes(route)) {
                    return new Error('this directory/file allready exist.');
                } else {
                    argument = route.split('/');
                    let routeObject = "directoryObject";
                    let routeToEval;
                    let routeToMetadata = "";
                    for(let i = 0; i < argument.length; i++) {
                        if(i === 0) {
                            routeToMetadata += argument[i];
                        } else {
                            routeToMetadata += "/" + argument[i];
                        }
                        routeObject += `['${argument[i]}']`;
                        routeToEval = routeObject;
                        routeToEval += "={}";
                        if(rutas.includes(routeToMetadata)) {
                            continue;
                        } else {
                            storeMetadata(routeToMetadata);
                            eval(routeToEval);
                            updateLocalStorage();
                            updateRutas();
                        }
                    }
                }
            } else {
                absoluteDirectory = arg;
                route += `/${absoluteDirectory}`;
                if(rutas.includes(route)) {
                    return new Error('this directory/file allready exist.');
                } else {
                    argument = route.split('/');
                    let routeObject = "directoryObject";
                    let routeToEval;
                    let routeToMetadata = "";
                    for(let i = 0; i < argument.length; i++) {
                        if(i === 0) {
                            routeToMetadata += argument[i];
                        } else {
                            routeToMetadata += "/" + argument[i];
                        }
                        routeObject += `['${argument[i]}']`;
                        routeToEval = routeObject;
                        routeToEval += "={}";
                        if(rutas.includes(routeToMetadata)) {
                            continue;
                        } else {
                            storeMetadata(routeToMetadata);
                            eval(routeToEval);
                            updateLocalStorage();
                            updateRutas();
                        }
                    }
                }
            }
        } else {
            return new Error('You have to declare a path or file to create');
        }
    }
}
function echo(arg) {
    try {
        newRootDirectory = false;
        changeUser = false;
        let newFlag = arg.split(">>")
        newFlag = newFlag.map(e => e.trim())
        if (!(newFlag[1].endsWith('.txt') || newFlag[1].endsWith('.js')) ){
            return new Error('Invalid file type')
        }
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
        } else if (newFlag[1].length > 0 && newFlag[1].includes("/")) {
            route += `/${newFlag[1]}`;
            if(rutas.includes(route)) {
                let routeObject = "directoryObject";
                let routeName = route;
                route = route.split('/');
                for(let i=0; i<route.length; i++){
                    routeObject += `['${route[i]}']`;
                }
                routeObject += ` = ${newFlag[0]}`;
                storeMetadata(routeName);
                eval(routeObject);
                updateLocalStorage();
                updateRutas();
            } else {
                route = route.split('/');
                let routeObject = "directoryObject";
                let routeToEval;
                let routeToMetadata = "";
                for(let i = 0; i < route.length - 1; i++) {
                    if(i === 0) {
                        routeToMetadata += route[i];
                    } else {
                        routeToMetadata += "/" + route[i];
                    }
                    routeObject += `['${route[i]}']`;
                    routeToEval = routeObject;
                    routeToEval += "={}";
                    if(rutas.includes(routeToMetadata)) {
                        continue;
                    } else {
                        storeMetadata(routeToMetadata);
                        eval(routeToEval);
                        updateLocalStorage();
                        updateRutas();
                    }
                }
                routeToMetadata += "/" + route[route.length - 1];
                storeMetadata(routeToMetadata);
                routeObject += `['${route[route.length - 1]}'] = ${newFlag[0]}`;
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
    } catch (error) {
        let p = document.createElement('p');
        p.textContent = error;
        input.insertAdjacentElement('beforebegin', p)
    }
}
function cat(arg) {
    if (!(arg.endsWith('.txt') || arg.endsWith('.js')) ){
        return new Error('Invalid file type')
    }
    newRootDirectory = false;
    changeUser = false;
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

    } else if (arg.length > 0 && arg.includes("/")) {
        route += `/${arg}`;
        if(rutas.includes(route)) {
            let routeObject = "directoryObject";
            route = route.split('/');
            for(let i=0; i<route.length; i++){
                routeObject += `['${route[i]}']`;
            }
            let p = document.createElement('p')
            p.textContent = `${eval(routeObject)}`
            input.insertAdjacentElement('beforebegin', p)
        } else {
            return new Error('file doesn\'t exist');
        }
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
function JS(arg) {
    if (!arg.endsWith('.js')){
        return new Error('Invalid file type')
    }
    newRootDirectory = false;
    changeUser = false;
    let route = inUseRoute.split("").slice(1).join("");
    let absoluteDirectory = "";
    let p = document.createElement('p')
    // changing default console.log to print on screen
    console.old = console.log;
    (function () {
        console.log = function () {
            let output = "", arg, i;
            for (i = 0; i < arguments.length; i++) {
                arg = arguments[i];
                if (
                    typeof arg === "object" &&
                    typeof JSON === "object" &&
                    typeof JSON.stringify === "function"
                ) {
                    output += JSON.stringify(arg) + '\n';
                } else {
                    output += arg + '\n ';
                }
            }
            return p.innerHTML += output;
        }
    })();
    // --finish--
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
        try {
            p.textContent += eval(eval(routeObject))
        } catch (error) {
            p.textContent += error
        }
        input.insertAdjacentElement('beforebegin', p)
    } else if (arg.length > 0 && arg.includes("/")) {
        route += `/${arg}`;
        if(rutas.includes(route)) {
            let routeObject = "directoryObject";
            route = route.split('/');
            for(let i=0; i<route.length; i++){
                routeObject += `['${route[i]}']`;
            }
            try {
                p.textContent += eval(eval(routeObject))
            } catch (error) {
                p.textContent += error
            }
            input.insertAdjacentElement('beforebegin', p)
        } else {
            return new Error('file doesn\'t exist');
        } 
    } else if (arg.length > 0 && rutas.includes(`${route}/${arg}`)) {
        let routeObject = "directoryObject";
        route = route.split('/');
        for(let i=0; i<route.length; i++){
            routeObject += `['${route[i]}']`;
        }
        routeObject += `['${arg}']`;
        try {
            p.textContent += eval(eval(routeObject))
        } catch (error) {
            p.textContent += error
        }
        input.insertAdjacentElement('beforebegin', p)
    } else {
        return new Error('file doesn\'t exist');
    }
    console.log = console.old;  // changing console.log to default
}
function rm(arg) {
    newRootDirectory = false;
    changeUser = false;
    let routeObject = "directoryObject";
    let route = inUseRoute.split("").slice(1).join("");
    route = route.split("/");
    for (let i = 0; i < route.length; i++) {
        routeObject += `['${route[i]}']`;
    }
    if(arg.includes('/')) {
        let routeToCompare = inUseRoute.split("").slice(1).join("");
        if(arg[0]==="." && arg[1]==="/" ){
            arg=arg.slice(1)
            arg= `/${routeToCompare}${arg}`
        }else if(arg[0]!== "/"){
            arg= `/${routeToCompare}/${arg}`
        }
        if(arg[0] === "/" && arg[arg.length -1]!== "/") {
            arg = arg.slice(1);
            let notRoot=true
            rutas.forEach(e=>{
                if(!(e.includes("/")) && e===arg){
                notRoot=false;
                }
            })
            if(notRoot){
                if(rutas.filter(e=>e===arg).length !==0){
                    routeObject = "directoryObject";
                    routeToCompare = arg;
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
    newRootDirectory = false;
    changeUser = false;
    let routeObject = "directoryObject";
    let route = inUseRoute.split("").slice(1).join("");
    route = route.split("/");
    for (let i = 0; i < route.length; i++) {
        routeObject += `['${route[i]}']`;
    }
    let words=arg.split("--")
    if(checkWords(words[0].trim())){
        if(words[1].trim().includes("/")){
            let finalRoute= words[1].trim()
            let nRoute = "directoryObject";
            let routeToCompare = inUseRoute.split("").slice(1).join("");
            if(finalRoute[0]==="." && finalRoute[1]==="/" ){
                finalRoute=finalRoute.slice(1)
                finalRoute= `/${routeToCompare}${finalRoute}`
            }else if(finalRoute[0]!== "/"){
                finalRoute= `/${routeToCompare}/${finalRoute}`
            }
            if(finalRoute[0]==="/" && finalRoute[finalRoute.length -1]!== "/" ){
                finalRoute=finalRoute.slice(1)
                if(rutas.filter(e=>e===finalRoute)!==0){
                    let newRoute = finalRoute + "/" + words[0].trim();
                    routeToCompare += "/" + words[0].trim();
                    finalRoute = finalRoute.split("/");
                    for (let i = 0; i < finalRoute.length; i++) {
                        nRoute += `['${finalRoute[i]}']`;
                    }
                    storeMetadata(newRoute);
                    if(words[0].includes(".")){
                        let x = eval(`${routeObject}['${words[0].trim()}']`)
                        eval(`${nRoute}['${words[0].trim()}'] = "${x}"`)
                    }else{
                        eval(`${nRoute}['${words[0].trim()}'] = JSON.parse(JSON.stringify(eval(${routeObject}['${words[0].trim()}'])))`)
                    }
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
            if(words[0].includes(".")){
                let x = eval(`${routeObject}['${words[0].trim()}']`)
                eval(`${routeObject}['${words[1].trim()}']['${words[0].trim()}'] = "${x}"`);
            }else{
                eval(`${routeObject}['${words[1].trim()}']['${words[0].trim()}'] = JSON.parse(JSON.stringify(eval(${routeObject}['${words[0].trim()}'])))`);
            }
            deleteMetadata(routeToCompare);
            eval(`delete ${routeObject}['${words[0].trim()}']`)
            updateLocalStorage();
            updateRutas();
        }else{
            let routeToCompare = inUseRoute.split("").slice(1).join("");
            let newRoute = routeToCompare + "/" + words[1].trim();
            routeToCompare += "/" + words[0].trim();
            storeMetadata(newRoute);
            if(words[0].includes(".")){
                let x = eval(`${routeObject}['${words[0].trim()}']`)
                if(words[1].trim().includes(".txt") || words[1].trim().includes(".js")){
                    eval(`${routeObject}['${words[1].trim()}'] = "${x}"`);
                }else{return new Error (`mv: cannot change file name without extension`);}
            }else{
                eval(`${routeObject}['${words[1].trim()}'] = JSON.parse(JSON.stringify(eval(${routeObject}['${words[0].trim()}'])))`);
            }
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
    newRootDirectory = false;
    changeUser = false;
    document.querySelectorAll('.display-terminal p').forEach(e => e.remove())
    document.querySelectorAll('.display-terminal pre').forEach(e => e.remove())
    document.querySelectorAll('.display-terminal br').forEach(e => e.remove())
}
function help() {
    newRootDirectory = false;
    changeUser = false;
    const help = `These shell commands are defined internally.  Type 'help' to see this list.
    cat
    cd
    ckirby
    clear
    cmatrix
    cassembler
    echo
    help
    ls
    man
    mkdir
    mv
    n
    pwd
    rch
    rm
    y`;
    input.insertAdjacentHTML("beforebegin", `<pre>${help}</pre>`)
}
function man(arg) {
    newRootDirectory = false;
    changeUser = false;
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
* ls -t: sort by time, newest first; see --time.
* ls -RTD: list of the existing root directory / Users.</pre>`);
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
        case "cassembler":
            input.insertAdjacentHTML("beforebegin",
`<pre>To change background to cassembler.
Command to exit:
cassembler q</pre>`);
            break;
        case "ckirby":
            input.insertAdjacentHTML("beforebegin",
`<pre>Show an image of Kirby in your screen. It is the titular
protagonist of the Kirby series of video games owned by
Nintendo and HAL Laboratory.</pre>`);
            break;
        case "y":
            input.insertAdjacentHTML("beforebegin",
`<pre>When a yes or no question shows in console you can use for an affirmative answer</pre>`);
            break;
        case "n":
            input.insertAdjacentHTML("beforebegin",
`<pre>When a yes or no question shows in console you can use for an negative answer</pre>`);
            break;
        case "rch":
            input.insertAdjacentHTML("beforebegin",
`<pre>cd [RootDirectory]
Change the current root directory to RootDirectory.`);
            break;
        default:
            return new Error('man: you need to add command name as argument.')
    }
}
function cmatrix(arg){
    newRootDirectory = false;
    changeUser = false;
    if(arg==="q"){
        document.querySelector('.display-terminal').classList.remove("cmatrix")
        textarea.style.color= "lime";
    }else if(arg===""){
        document.querySelector('.display-terminal').classList.add("cmatrix")
        textarea.style.color= "white";
        clear()
    }
}
function cassembler(arg){
    newRootDirectory = false;
    changeUser = false;
    if(arg==="q"){
        document.querySelector('.display-terminal').classList.remove("cassembler")
        textarea.style.color= "lime";
    }else if(arg===""){
        document.querySelector('.display-terminal').classList.add("cassembler")
        textarea.style.color= "red";
        clear()
    }
}
function ckirby(){
    newRootDirectory = false;
    changeUser = false;
    input.insertAdjacentHTML("beforebegin", `<pre>

    <(-'.'-)>
    </pre>`)
}
function yes(){
    if(newRootDirectory === true) {
        let otherRoute = yesOrNoArgument.split('').slice(1).join('');
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
        newRootDirectory = false;
    } else if(changeUser === true) {
        let route = yesOrNoRootchangeArgument.split('').slice(1).join('');
        if(route.length > 0 && rutas.includes(`${route}`)) {
            inUseRoute = `>${route}`;
            input.innerHTML = "";
            input.innerHTML = `>${route}:`;
            let newRoot = inUseRoute.split("").slice(1).join("");
            newRoot = route.split("/");
            inUseRoot = `>${newRoot[0]}`;
        } else {
            return new Error('cd: this root is not aviable');
        }
        changeUser = false;
    }
}
function no() {
    if(newRootDirectory === true) {
        newRootDirectory = false;
    } else if(changeUser === true) {
        changeUser = false;
    }
}
function rootChange(arg) {
    newRootDirectory = false;
    changeUser = false;
    if(arg[0] !== "/") {
        return new Error('You need to enter absolute path to change to another root directory');
    } else {
        yesOrNoRootchangeArgument = arg;
        let p = document.createElement('p');
        p.textContent = `Are you sure you want to change the root directory/User?`;
        input.insertAdjacentElement('beforebegin', p);
        changeUser = true;
    }
}

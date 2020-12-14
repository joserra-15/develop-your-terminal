function tab(cmd,arg){
    let routeObject = "directoryObject";
    let route = inUseRoute.split("").slice(1).join("");
    route = route.split("/");
    for (let i = 0; i < route.length; i++) {
        routeObject += `['${route[i]}']`;
    }
    let array=Object.keys(eval(routeObject))
    console.log(array)
    if(cmd === "mv"){
        if(arg.includes("--")){
            let words=arg.split("--");
            words[1]=autocomplete(words[1].trim());
            textarea.value=`${cmd} ${words[0].trim()} -- ${words[1]}`
        }else{
            arg=autocomplete(arg);
            textarea.value=`${cmd} ${arg}`
        }
    }else if(cmd === "echo"){
        if(arg.includes(">")){
            let words=arg.split(">");
            words[1]=autocomplete(words[1].trim());
            textarea.value=`${cmd} ${words[0].trim()} > ${words[1]}`
        }
    }else if(cmd == "rch"){
        if(arg[0] === "/"){
            arg=arg.split("").slice(1).join("");
            routeObject = "directoryObject";
            array=Object.keys(eval(routeObject));
            arg=autocomplete(arg)
            textarea.value=`${cmd} /${arg}`
        }
    }else if(cmd!== "help" && cmd !== "man" && cmd !== "clear" && cmd!== "cmatrix" && cmd !== "y" && cmd!== "n" && cmd!== "ckirby"){
        arg=autocomplete(arg);
        textarea.value=`${cmd} ${arg}`
    }

    function autocomplete(arg){
        array.forEach(e => {
            if(e.includes(arg)){
                arg= e;
            }
        });
        return arg
    }
}
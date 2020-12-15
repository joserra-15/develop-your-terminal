function tab(cmd,arg){
    let routeObject = "directoryObject";
    let route = inUseRoute.split("").slice(1).join("");
    route = route.split("/");
    for (let i = 0; i < route.length; i++) {
        routeObject += `['${route[i]}']`;
    }
    let array=Object.keys(eval(routeObject))
    if(cmd === "mv"){
        if(arg.includes("--")){
            let words=arg.split("--");
            if(words[1].trim().includes("/")){
                words[1]=routeCheck(words[1].trim())
                words[1]=`/${autocompleteRoute(words[1])}`
            }else{
            words[1]=autocomplete(words[1].trim());
            }
            textarea.value=`${cmd} ${words[0].trim()} -- ${words[1]}`
        }else{
            if(arg.includes("/")){
                arg=routeCheck(arg)
                arg=`/${autocompleteRoute(arg)}`
            }else{
            arg=autocomplete(arg);
            }
            textarea.value=`${cmd} ${arg}`
        }
    }else if(cmd === "echo"){
        if(arg.includes(">>")){
            let words=arg.split(">>");
            if(words[1].includes("/")){
                words[1]=routeCheck(words[1].trim())
                words[1]=`/${autocompleteRoute(words[1])}`
            }else{words[1]=autocomplete(words[1].trim());}
            textarea.value=`${cmd} ${words[0].trim()} >> ${words[1]}`
        }
    }else if(cmd == "rch"){
        if(arg[0] === "/"){
            arg=arg.split("").slice(1).join("");
            routeObject = "directoryObject";
            array=Object.keys(eval(routeObject));
            arg=autocomplete(arg)
            textarea.value=`${cmd} /${arg}`
        }
    }else if(cmd === "ls" && arg[0]==="-"){
        if(arg[0]==="-" && arg[1]==="R"){
            arg=arg.split("").slice(2).join("");
            if(arg.includes("/")){
                arg=routeCheck(arg.trim())
                arg=`/${autocompleteRoute(arg)}`
            }else{
                arg=arg.split("").slice(2).join("");
                arg=autocomplete(arg.trim());
            }
            textarea.value=`${cmd} -R ${arg}`
        }else if(arg[0]==="-" && arg[1]==="S"){
            arg=arg.split("").slice(2).join("");
            if(arg.includes("/")){
                arg=routeCheck(arg.trim())
                arg=`/${autocompleteRoute(arg)}`
            }else{
                arg=arg.split("").slice(2).join("");
                arg=autocomplete(arg.trim());
            }
            textarea.value=`${cmd} -S ${arg}`
        }else if(arg[0]==="-" && arg[1]==="t"){
            arg=arg.split("").slice(2).join("");
            if(arg.includes("/")){
                arg=routeCheck(arg.trim())
                arg=`/${autocompleteRoute(arg)}`
            }else{
                arg=arg.split("").slice(2).join("");
                arg=autocomplete(arg.trim());
            }
            textarea.value=`${cmd} -t ${arg}`
        }
    }else if(cmd!== "help" && cmd !== "man" && cmd !== "clear" && cmd!== "cmatrix" && cmd !== "y" && cmd!== "n" && cmd!== "ckirby"){
        if(arg.includes("/")){
            arg=routeCheck(arg)
            arg=`/${autocompleteRoute(arg)}`
        }else{
            arg=autocomplete(arg);
        }
        textarea.value=`${cmd} ${arg}`
    }
    function autocomplete(arg){
        let cont=0
        array.forEach(e => {
            if(e.includes(arg) && cont===0){
                if(arg!==e){
                    cont++;
                }
                arg= e;
            }
        });
        return arg
    }
    function autocompleteRoute(arg){
        let cont=0
        rutas.forEach(e=>{
            if(e.includes(arg) && cont===0){
                if(arg!==e){
                    cont++;
                }
                arg=e;
            }
        })
        return arg
    }
    function routeCheck(arg){
        let userRoute=inUseRoute.split("").slice(1).join("");
        if(arg[0]==="." && arg[1]==="/"){
            arg=arg.split("").slice(1).join("");
            arg=`${userRoute}${arg}`;
        }else if(arg[0]==="/"){
            arg=arg.split("").slice(1).join("");
        }else{
            arg=`${userRoute}/${arg}`;
        }
        return arg
    }
}
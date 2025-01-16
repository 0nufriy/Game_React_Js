import { json } from "react-router-dom";

const BASE_URL = "http://16.170.255.158:3030/api";

const requestJSON = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true"
    })
    if(localStorage.getItem("TOKEN")) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem("TOKEN"));
    }
    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    return fetch(options.url,options)
    .then(response => 
        response.status !== 401?
        response.json().then( json =>{
            if(!response.ok){
                return Promise.reject(json);
            }
            return json
            }
        ) : localStorage.removeItem("TOKEN")
    )
}


export function login(loginRequest){
    return requestJSON({
        url: BASE_URL + "/users/login",
        method: "POST",
        body: JSON.stringify(loginRequest)
    })
}

export function getPlanets(){
    return requestJSON({
        url: BASE_URL + "/planets",
        method: "GET"
    })
}

export function getPlanet(id){
    return requestJSON({
        url: BASE_URL + "/planets/get/" + id,
        method: "GET"
    })
}
export function getBaseByPlanet(planetId){
    return requestJSON({
        url: BASE_URL + "/bases/planet/" + planetId,
        method: "GET"
    })
}
export function getArtifacts(){
    return requestJSON({
        url: BASE_URL + "/artifacts/",
        method: "GET"
    })
}
export function getRobots(){
    return requestJSON({
        url: BASE_URL + "/equipment/robots",
        method: "GET"
    })
}
export function upgradeShip(){
    return requestJSON({
        url: BASE_URL + "/equipment/ship/upgrade",
        method: "PUT"
    })
}

export function getMyPlanet(){
    return requestJSON({
        url: BASE_URL + "/planets/my",
        method: "GET"
    })
}

export function goToPlanet(planetId){
    return requestJSON({
        url: BASE_URL + "/planets/go/" + planetId,
        method: "PUT"
    })
}
export function colonizePlanet(planetId){
    return requestJSON({
        url: BASE_URL + "/planets/colonize/" + planetId,
        method: "PUT"
    })
}

export function getProbes(){
    return requestJSON({
        url: BASE_URL + "/equipment/probes",
        method: "GET"
    })
}

export function asignProbes(){
    return requestJSON({
        url: BASE_URL + "/equipment/probe/asign",
        method: "PUT"
    })
}

export function startProbes(probeId){
    return requestJSON({
        url: BASE_URL + "/equipment/startProbe/" + probeId,
        method: "PUT"
    })
}

export function stopProbes(probeId){
    return requestJSON({
        url: BASE_URL + "/equipment/stopProbe/" + probeId,
        method: "PUT"
    })
}

export function addDrill(baseId){
    return requestJSON({
        url: BASE_URL + "/bases/drill/add/" + baseId,
        method: "PUT"
    })
}

export function addToGenerator(baseId, amount){
    return requestJSON({
        url: BASE_URL + `/bases/rungen/${baseId}/${amount}`,
        method: "PUT"
    })
}

export function getResources(baseId){
    return requestJSON({
        url: BASE_URL + "/bases/resorce/get/" + baseId,
        method: "PUT"
    })
}

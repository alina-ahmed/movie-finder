import { apiKey } from "/etc/secrets/env";

const options ={
    method: 'GET',
    headers: {
        accept: 'application/JSON',
        authorization: apiKey
    }
}


export function get(url){
    let response;
    fetch(url,options)
    .then(res=>res.json())
    .then(json=> response = json)
    .catch(err=>console.log(err));
    console.log("In api call")
    console.log(response);
    return response;

}


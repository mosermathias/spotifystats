import { useEffect } from "react";


export default function Logout(){
    async function callApi(){
        const url = window.location.protocol + "//" + window.location.host + '/api/api_logout';
        const response = await fetch(url);
        switch(response.status){
          case 200:
            window.location.replace("/");
            break;
        
          default:
            window.location.replace('/error');
            break;
        }   
    }
    useEffect(() => {
        callApi();
    },[])
    
    return(
<>
<div></div>
</>
    )
}
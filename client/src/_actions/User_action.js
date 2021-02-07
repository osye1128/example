import axios from "axios";

export function loginUser(datatoSubmit){
    const request=axios.post('/api/users/login',datatoSubmit).then(response=>response.data);

    return{
        type:'LOGIN_USER',
        payload:request
    }
}
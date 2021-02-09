import axios from "axios";
import {LOGIN_USER,REGISTER_USER} from './types';


export function loginUser(datatoSubmit){
    const request=axios.post('/api/users/login',datatoSubmit).then(response=>response.data);

    return{
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(datatoSubmit){
    const request=axios.post('/api/users/register',datatoSubmit).then(response=>response.data);

    return{
        type: REGISTER_USER,
        payload: request
    }
}
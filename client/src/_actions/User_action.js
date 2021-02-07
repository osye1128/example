import axios from "axios";
import {LOGIN_USER} from './types'

export function loginUser(datatoSubmit){
    const request=axios.post('/api/users/login',datatoSubmit).then(response=>response.data);

    return{
        type: LOGIN_USER,
        payload: request
    }
}
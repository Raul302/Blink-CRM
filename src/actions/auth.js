import { types } from "../types/types";
import axios from 'axios';
import { setError,removeError, startLoading, finishLoading } from "./ui";
import { useHistory } from "react-router-dom";

export const callLogin  = (data) => {
    return async (dispatch) => {
        dispatch( startLoading() );
       await axios.post('http://api.boardingschools.mx/api/login',data)
        .then(function (response) {
            let user = response.data.data;
            localStorage.setItem( 'user', JSON.stringify(user));
            console.log('response',response);
            dispatch( login( response.data.data.name,response.data.data.type,response.data.data.token ));
            dispatch( removeError());
            dispatch( finishLoading() );
          
            
        }).catch(error =>{
            dispatch(setError('Credenciales invalidas'));
            dispatch( finishLoading() );
            });
    }
}

export const login = (username,type,token) => ({
        type: types.login,
        payload:{
            username,
            type,
            token,
        }
})

export const startLogout = () => {
    return  (dispatch) => {
        // Aqui va un async await
        // LOGOUT DE API
        // localStorage.getItem('lastPath') || '/dashboard';
        // Clear localStorage
        localStorage.removeItem('user');
        dispatch( logout() );
        
    }
}

export const logout = () => ({
    type: types.logout
})

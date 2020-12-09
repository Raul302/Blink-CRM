import { types } from "../types/types";
import axios from 'axios';
import { setError,removeError, startLoading, finishLoading } from "./ui";

export const callLogin  = (data) => {
    return  (dispatch) => {
        dispatch( startLoading() );
        axios.post('http://api.boardingschools.mx/api/login',data)
        .then(function (response) {
            console.log('response',response);
            dispatch( login( response.data.data.name,response.data.data.type,response.data.data.token ));
            dispatch( removeError());
            dispatch( finishLoading() );
            let user = response.data.data;
            localStorage.setItem( 'user', JSON.stringify(user));
        }).catch(error =>{
            dispatch(setError('Credenciales invalidas'));
            dispatch( finishLoading() );
            //     alert.show('Credenciales invalidas');
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
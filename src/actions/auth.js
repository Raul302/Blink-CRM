import { types } from "../types/types";
import axios from 'axios';
import { setError, removeError, startLoading, finishLoading } from "./ui";
import { useHistory } from "react-router-dom";
import { constaApi } from "constants/constants";

export const callLogin = (data) => {
    return async (dispatch) => {
        dispatch(startLoading());
        await axios.post( constaApi + 'login', data)
            .then(function (response) {
                let { data: { data } } = response;
                dispatch(login(
                    data.email,
                    data.id,
                    data.name,
                    data.token,
                    data.type
                ));
                localStorage.setItem('user', JSON.stringify(data));
                dispatch(removeError());
                dispatch(finishLoading());
            }).catch(error => {
                dispatch(setError('Credenciales invalidas'));
                dispatch(finishLoading());
            });
    }
}

export const login = (email, id, name, token, type) => ({
    type: types.login,
    payload: {
        email,
        id,
        name,
        token,
        type
    }
})

export const startLogout = () => {
    return (dispatch) => {
        // Aqui va un async await
        // LOGOUT DE API
        // localStorage.getItem('lastPath') || '/dashboard';
        // Clear localStorage
        localStorage.removeItem('user');
        dispatch(logout());

    }
}

export const logout = () => ({
    type: types.logout
})

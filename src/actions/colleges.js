import { types } from "../types/types";
import axios from 'axios';
import { setError,removeError, startLoading, finishLoading } from "./ui";
import { useHistory } from "react-router-dom";
import { loadColleges } from '../helpers/loadColleges';       

export const newCollege = (data) =>{
    return async (dispatch) => {
        dispatch( startLoading() );
    await axios.post('http://api.boardingschools.mx/api/colleges/save',data)
        .then(function (response) {
            dispatch( removeError());
            dispatch( finishLoading() );
        }).catch(error =>{
            dispatch(setError('Credenciales invalidas'));
            dispatch( finishLoading() );
            });
    }
}

export const starLoadingColleges = () => {
    return async (dispatch) => {
        const colleges = await loadColleges();
        dispatch( setColleges(colleges) );
    }
}

export const activeCollege = (id,college) => ({
    type: types.collegesActive,
    payload:{
        id,
        ...college
    }
})

export const setColleges = ( colleges ) => ({
    type: types.collegesLoad,
    payload:[...colleges]
})
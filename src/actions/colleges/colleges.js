import { types } from "../../types/types";
import axios from 'axios';
import { setError,removeError, startLoading, finishLoading } from "../uiNotificactions/ui";
import { loadColleges } from '../../helpers/collegesHelpers/loadColleges';       
import { constaApi } from "constants/constants";

export const newCollege = (data) =>{
    return async (dispatch) => {
        dispatch( startLoading() );
    await axios.post( constaApi +'colleges/save',data)
        .then(function (response) {
            dispatch( removeError());
            dispatch( starLoadingColleges() );
            dispatch( finishLoading() );
        }).catch(error =>{
            dispatch(setError('Credenciales invalidas'));
            dispatch( finishLoading() );
            });
    }
}

export const deleteCollege = (id) =>{
    return async (dispatch) => {
        dispatch( startLoading() );
    await axios.post(constaApi+'colleges/delete',{id:id})
        .then(function (response) {
            dispatch( removeError());
            dispatch( starLoadingColleges() );
            dispatch( finishLoading() );
        }).catch(error =>{
            dispatch(setError('Ocurrio un error'));
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
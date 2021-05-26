import { types } from "../../types/types";
import axios from 'axios';
import { setError,removeError, startLoading, finishLoading } from "../uiNotificactions/ui";
import { loadColleges, loadCollegesByProspeccion, loadLocalColleges } from '../../helpers/collegesHelpers/loadColleges';       
import { constaApi } from "../../constants/constants";

export const newCollege = (data,local = 0) =>{
    return async (dispatch) => {
        dispatch( startLoading() );
    await axios.post( constaApi +'colleges/save',data)
        .then(function (response) {
            dispatch( removeError());
            local == 0 ? dispatch( starLoadingColleges()) : dispatch(starLoadingLocalColleges());
            dispatch( finishLoading() );
        }).catch(error =>{
            dispatch( starLoadingColleges() );
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
        dispatch( startLoading() );
        const colleges = await loadColleges();
        dispatch( setColleges(colleges) );
        dispatch( finishLoading() );
    }
}

export const starLoadingLocalColleges = () => {
    return async (dispatch) => {
        dispatch( startLoading() );
        const colleges = await loadLocalColleges();
        dispatch( setColleges(colleges) );
        dispatch( finishLoading() );
    }
}

export const starLoadingCollegesByProspeccion = (type = null) => {
    return async (dispatch) => {
        dispatch( startLoading() );
        const colleges = await loadCollegesByProspeccion(type);
        dispatch( setColleges(colleges) );
        dispatch( finishLoading() );
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
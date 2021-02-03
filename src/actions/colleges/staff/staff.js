import { types } from "../../../types/types";
import axios from 'axios';
import { setError,removeError, startLoading, finishLoading } from "../../uiNotificactions/ui";
import { constaApi } from "../../../constants/constants";
import { loadStaffs } from "helpers/collegesHelpers/staffHelper/loadStaffs";

export const newStaff = (data) =>{
    return async (dispatch) => {
        dispatch( startLoading() );
    await axios.post( constaApi +'colleges/staff/save',data)
        .then(function (response) {
            dispatch( removeError());
            dispatch( startLoadingStaffs(data.id_college) );
            dispatch( finishLoading() );
        }).catch(error =>{
            dispatch(setError('Credenciales invalidas'));
            dispatch( finishLoading() );
            });
    }
}
export const updateStaff = (data) =>{
    return async (dispatch) => {
        dispatch( startLoading() );
    await axios.post( constaApi +'colleges/staff/updated',data)
        .then(function (response) {
            dispatch( removeError());
            dispatch( startLoadingStaffs(data.id_college) );
            dispatch( finishLoading() );
        }).catch(error =>{
            dispatch(setError('Ocurrio un error en updatedReminder'));
            dispatch( finishLoading() );
            });
    }
}
export const deleteStaff = (id,idContact) =>{
    return async (dispatch) => {
        dispatch( startLoading() );
    await axios.post(constaApi+'colleges/staff/delete',{id:id})
        .then(function (response) {
            dispatch( removeError());
            dispatch( startLoadingStaffs(idContact) );
            dispatch( finishLoading() );
        }).catch(error =>{
            dispatch(setError('Ocurrio un error'));
            dispatch( finishLoading() );
            });
    }
}
export const startLoadingStaffs = (id) => {
    return async (dispatch) => {
        dispatch( startLoading() );
        const staffs = await loadStaffs(id);
        await dispatch( setStaffs(staffs) );
        dispatch( finishLoading() );
    }
}

export const activeStaff = (id,staffs) => ({
    type: types.StaffCActive,
    payload:{
        id,
        ...staffs
    }
})

export const setStaffs = ( staffs ) => ({
    type: types.StaffCLoad,
    payload:[...staffs]
})
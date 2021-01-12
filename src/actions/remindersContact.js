import { types } from "../types/types";
import axios from 'axios';
import { setError,removeError, startLoading, finishLoading } from "./ui";
import { constaApi } from "constants/constants";
import { loadReminders } from "helpers/loadReminders";

export const newReminderC = (data) =>{
    return async (dispatch) => {
        dispatch( startLoading() );
    await axios.post( constaApi +'reminders/save',data)
        .then(function (response) {
            dispatch( removeError());
            dispatch( starLoadingRemindersC() );
            dispatch( finishLoading() );
        }).catch(error =>{
            dispatch(setError('Credenciales invalidas'));
            dispatch( finishLoading() );
            });
    }
}

export const deleteReminderC = (id,idContact) =>{
    return async (dispatch) => {
        dispatch( startLoading() );
    await axios.post(constaApi+'reminders/delete',{id:id})
        .then(function (response) {
            dispatch( removeError());
            dispatch( starLoadingRemindersC(idContact) );
            dispatch( finishLoading() );
        }).catch(error =>{
            dispatch(setError('Ocurrio un error'));
            dispatch( finishLoading() );
            });
    }
}
export const starLoadingRemindersC = (id) => {
    return async (dispatch) => {
        dispatch( startLoading() );
        const reminders = await loadReminders(id);
        await dispatch( setRemindersC(reminders) );
        dispatch( finishLoading() );
    }
}

export const activeReminderC = (id,reminderC) => ({
    type: types.remindersCActive,
    payload:{
        id,
        ...reminderC
    }
})

export const setRemindersC = ( remindersC ) => ({
    type: types.remindersCLoad,
    payload:[...remindersC]
})
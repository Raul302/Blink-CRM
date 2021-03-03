import { types } from "../../../types/types";
import axios from 'axios';
import { setError,removeError, startLoading, finishLoading } from "../../uiNotificactions/ui";
import { constaApi } from "../../../constants/constants";
import { loadReminders } from "helpers/contactsHelpers/loadReminders";
import { loadAllRemindersColleges } from "helpers/collegesHelpers/reminderHelper/loadRemindersColleges";
import { loadAllReminders } from "helpers/contactsHelpers/loadReminders";
import { loadProspectReminders } from "helpers/contactsHelpers/loadReminders";

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
export const updatedReminderC = (data) =>{
    return async (dispatch) => {
        dispatch( startLoading() );
    await axios.post( constaApi +'reminders/updated',data)
        .then(function (response) {
            dispatch( removeError());
            dispatch( starLoadingRemindersC(data.id_contact) );
            dispatch( finishLoading() );
        }).catch(error =>{
            dispatch(setError('Ocurrio un error en updatedReminder'));
            dispatch( finishLoading() );
            });
    }
}
export const deleteReminderC = (id,idContact = null) =>{
    return async (dispatch) => {
        dispatch( startLoading() );
    await axios.post(constaApi+'reminders/delete',{id:id})
        .then(function (response) {
            dispatch( removeError());
            if(idContact){
                dispatch( starLoadingRemindersC(idContact) );
            } else {
                dispatch(starLoadingAllRemindersC());
            }
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

export const starLoadingAllRemindersC = () => {
    return async (dispatch) => {
        dispatch( startLoading() );
        const reminders = await loadAllReminders();
        await dispatch( setRemindersC(reminders) );
        dispatch( finishLoading() );
    }
}

export const starLoadingProspectRemindersC = (idContact,id_type,type='Prospeccion') => {
    console.log('CONST',id_type);
    return async (dispatch) => {
        dispatch( startLoading() );
        const reminders = await loadProspectReminders(idContact,id_type,type);
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
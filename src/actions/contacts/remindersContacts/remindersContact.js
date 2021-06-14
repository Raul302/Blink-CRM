import { types } from "../../../types/types";
import axios from 'axios';
import { setError,removeError,setMessage, startLoading, finishLoading } from "../../uiNotificactions/ui";
import { constaApi } from "../../../constants/constants";
import { loadReminders } from "helpers/contactsHelpers/loadReminders";
import { loadAllRemindersColleges } from "helpers/collegesHelpers/reminderHelper/loadRemindersColleges";
import { loadAllReminders } from "helpers/contactsHelpers/loadReminders";
import { loadProspectReminders } from "helpers/contactsHelpers/loadReminders";
import { loadApplicationReminders } from "helpers/contactsHelpers/loadReminders";
import { loadAllRemindersContact } from "helpers/contactsHelpers/loadReminders";
import { loadTrackingReminders } from "helpers/contactsHelpers/loadReminders";

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
export const deleteReminderC = (id,idContact = null,section = 'General',id_user = 0,id_type,type='Prospeccion') =>{
    return async (dispatch) => {
        let obj = {
            id:id,
            id_contact:idContact ?? null
        };
        dispatch( startLoading() );
    await axios.post(constaApi+'reminders/delete',obj)
        .then(function (response) {
            if(response.data.message){
                dispatch( setMessage(response.data.message));
            } else {
                dispatch( removeError());
            }
            if(section == 'General'){
                dispatch( starLoadingRemindersC(idContact) );
            }
            if(section == 'Dashboard'){
                dispatch( starLoadingAllRemindersC(id_user));
            }
            if(section == 'Section'){
                dispatch( starLoadingAllReminders() );
            }
            if(section == 'Prospeccion'){
                dispatch( starLoadingProspectRemindersC(idContact,id_type,'Prospeccion'));
            }
            if(section == 'Aplicaciones'){
                dispatch( starLoadingApplicationRemindersC(idContact,id_type,'Aplicaciones'));
            }
            if(section == 'Trackings'){
                dispatch( starLoadingTrackingsRemindersC(idContact,id_type,'Tracking'));
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

export const starLoadingAllRemindersC = (id=null) => {
    return async (dispatch) => {
        dispatch( startLoading() );
        const reminders = await loadAllReminders(id);
        await dispatch( setRemindersC(reminders) );
        dispatch( finishLoading() );
    }
}

export const starLoadingAllReminders = () => {
    return async (dispatch) => {
        dispatch( startLoading() );
        const reminders = await loadAllRemindersContact();
        await dispatch( setRemindersC(reminders) );
        dispatch( finishLoading() );
    }
}

export const starLoadingProspectRemindersC = (idContact,id_type,type='Prospeccion') => {
    return async (dispatch) => {
        dispatch( startLoading() );
        const reminders = await loadProspectReminders(idContact,id_type,type);
        await dispatch( setRemindersC(reminders) );
        dispatch( finishLoading() );
    }
}

export const starLoadingApplicationRemindersC = (idContact,id_type,type='Prospeccion') => {
    return async (dispatch) => {
        dispatch( startLoading() );
        const reminders = await loadApplicationReminders(idContact,id_type,type);
        await dispatch( setRemindersC(reminders) );
        dispatch( finishLoading() );
    }
}

export const starLoadingTrackingsRemindersC = (idContact,id_type,type='Tracking') => {
    return async (dispatch) => {
        dispatch( startLoading() );
        const reminders = await loadTrackingReminders(idContact,id_type,type);
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
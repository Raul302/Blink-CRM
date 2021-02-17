import { types } from "../../../types/types";
import axios from 'axios';
import { setError,removeError, startLoading, finishLoading } from "../../uiNotificactions/ui";
import { constaApi } from "../../../constants/constants";
import { loadReminders } from "helpers/contactsHelpers/loadReminders";
import { loadRemindersColleges } from "helpers/collegesHelpers/reminderHelper/loadRemindersColleges";
import { loadAllReminders } from "helpers/contactsHelpers/loadReminders";
import { loadAllRemindersColleges } from "helpers/collegesHelpers/reminderHelper/loadRemindersColleges";

export const newReminderCollege = (data) =>{
    return async (dispatch) => {
        dispatch( startLoading() );
    await axios.post( constaApi +'reminders/save',data)
        .then(function (response) {
            dispatch( removeError());
            dispatch( starLoadingRemindersColleges(data.id_college) );
            dispatch( finishLoading() );
        }).catch(error =>{
            dispatch(setError('Credenciales invalidas'));
            dispatch( finishLoading() );
            });
    }
}
export const updatedReminderCollege = (data) =>{
    return async (dispatch) => {
        dispatch( startLoading() );
    await axios.post( constaApi +'reminders/updated',data)
        .then(function (response) {
            dispatch( removeError());
            dispatch( starLoadingRemindersColleges(data.id_college) );
            dispatch( finishLoading() );
        }).catch(error =>{
            dispatch(setError('Ocurrio un error en updatedReminder'));
            dispatch( finishLoading() );
            });
    }
}
export const deleteReminderCollege = (id,idCollege=null) =>{
    return async (dispatch) => {
        dispatch( startLoading() );
    await axios.post(constaApi+'reminders/delete',{id:id})
        .then(function (response) {
            dispatch( removeError());
            if(idCollege){
                dispatch( starLoadingRemindersColleges(idCollege) );
            } else {
                dispatch( starLoadingAllRemindersColleges() );
            }
            dispatch( finishLoading() );
        }).catch(error =>{
            dispatch(setError('Ocurrio un error'));
            dispatch( finishLoading() );
            });
    }
}
export const starLoadingRemindersColleges = (id) => {
    return async (dispatch) => {
        dispatch( startLoading() );
        const reminders = await loadRemindersColleges(id);
        await dispatch( setRemindersColleges(reminders) );
        dispatch( finishLoading() );
    }
}

export const starLoadingAllRemindersColleges = () => {
    return async (dispatch) => {
        dispatch( startLoading() );
        const reminders = await loadAllRemindersColleges();
        await dispatch( setRemindersColleges(reminders) );
        dispatch( finishLoading() );
    }
}

export const activeReminderColleges = (id,reminderColleges) => ({
    type: types.remindersCollActive,
    payload:{
        id,
        ...reminderColleges
    }
})

export const setRemindersColleges = ( remindersColleges ) => ({
    type: types.remindersCollLoad,
    payload:[...remindersColleges]
})
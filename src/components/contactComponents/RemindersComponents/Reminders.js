import React,{useState,useEffect} from 'react'
import AddEditReminders from './AddEditReminders'
import TableReminders from './TableReminders'
import { useDispatch, useSelector,shallowEqual } from 'react-redux';
import { useParams } from "react-router";
import { starLoadingRemindersC } from 'actions/contacts/remindersContacts/remindersContact';

function Reminders(props) {
    const dispatch = useDispatch();
    let { id } = useParams();
    useEffect(() => {
        if(props.prospection){

        }else if(props.applications){

        } else if(props.activeTracking){
            
        }
         else {
            dispatch(starLoadingRemindersC(id))
        }
    }, [])
    function open(){
    }
    return (
        <div className="content">
        <div class="mt-n5 row">
            <div class="col-12">
            <div class="col d-flex justify-content-end">
            <AddEditReminders 
            route={'General'}
            {...props}/>
            </div>
            <TableReminders
            route={'General'}
            openModal={open}
            {...props}/>
            </div>
        </div>
        </div>
    )
}

export default Reminders

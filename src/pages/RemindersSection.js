import { starLoadingAllRemindersColleges } from 'actions/colleges/remindersColleges/remindersColleges';
import { starLoadingAllRemindersC } from 'actions/contacts/remindersContacts/remindersContact';
import AddEditReminders from 'components/collegeComponents/ReminderComponent/AddEditReminders';
import TableColleges from 'components/collegeComponents/ReminderComponent/TableReminders';
import AddEditContacts from 'components/contactComponents/RemindersComponents/AddEditReminders';
import TableContacts from 'components/contactComponents/RemindersComponents/TableReminders';
import TableRemindersColleges from 'components/RemindersSectionComponent/TableRemindersColleges';
import TableRemindersContacts from 'components/RemindersSectionComponent/TableRemindersContacts';
import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Link, useLocation  } from 'react-router-dom';

export default function RemindersSection(props) {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const { remindersCollege } = useSelector(state => state.remindersColleges);
    const { remindersC } = useSelector(state => state.remindersC);

    useEffect(() => {
        dispatch(starLoadingAllRemindersC());
        dispatch(starLoadingAllRemindersColleges());
    }, [dispatch])
    function open(){}
    return (
        <div class="content">
           <div class="row">
           <div class="col-12">
            <div class="mt-3 col d-flex justify-content-end">
            <AddEditContacts openContacts={true} {...props}/>
            </div>
            <TableContacts  openModal={open}{...props}/>
            </div>
           </div>
           <div class="row">
           <div class="col-12">
            <div class="mt-5 col d-flex justify-content-end">
            <AddEditReminders  openContacts={true} {...props}/>
            </div>
            <TableColleges openModal={open}{...props}/>
            </div>
               
               {/* <div class="col-12">
               <h6 class="text-center">
                Recordatorios Colegios
               </h6>
            <TableColleges noaction={true} />
               </div> */}
           </div>
        </div>
    )
}

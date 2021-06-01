import { starLoadingAllRemindersColleges } from 'actions/colleges/remindersColleges/remindersColleges';
import { starLoadingAllReminders } from 'actions/contacts/remindersContacts/remindersContact';
import { starLoadingAllRemindersC } from 'actions/contacts/remindersContacts/remindersContact';
import AddEditReminders from 'components/collegeComponents/ReminderComponent/AddEditReminders';
import TableColleges from 'components/collegeComponents/ReminderComponent/TableReminders';
import AddEditContacts from 'components/contactComponents/RemindersComponents/AddEditReminders';
import TableContacts from 'components/contactComponents/RemindersComponents/TableReminders';
import SearchBar from 'components/GeneralComponents/SearchBar';
import TableRemindersColleges from 'components/RemindersSectionComponent/TableRemindersColleges';
import TableRemindersContacts from 'components/RemindersSectionComponent/TableRemindersContacts';
import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Link, useLocation  } from 'react-router-dom';

export default function RemindersSection(props) {
    const [param,setParam] = useState(null);
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const { remindersCollege } = useSelector(state => state.remindersColleges);
    const { remindersC } = useSelector(state => state.remindersC);
    const [init] = useState(JSON.parse(localStorage.getItem('user')) || { logged: false });
    useEffect(() => {
        if(init){
            dispatch(starLoadingAllReminders());
            dispatch(starLoadingAllRemindersColleges(init.id));
        }
    }, [dispatch])
    useEffect(() => {
    }, [param])
    const consult = (e) => {
        e.target.value === "" ?  setParam('keyWordSeccret302') :  setParam(e.target.value);
    }
    function open(){}
    return (
        <div class="content">
           <div class="row">
           <div class="col-12">
            <div class="mt-5 col d-flex justify-content-end">
            <AddEditContacts openContacts={true} {...props}/>
            </div>
            <div>
            <SearchBar consult={(e) => consult(e)}/>
            </div>
            <h6>Contactos</h6>
            <TableContacts  param={param} fromRemindersSection={true} openModal={open}{...props}/>
            </div>
           </div>
           {init.type === 'Administrador' ? 
           <div class="row">
           <div class="col-12">
            <div class="mt-5 col d-flex justify-content-end">
            <AddEditReminders  openContacts={true} {...props}/>
            </div>
            <h6>Colegios</h6>
            <TableColleges fromRemindersSection={true} openModal={open}{...props}/>
            </div>
           </div>
           :
           <div></div>
            }
        </div>
    )
}

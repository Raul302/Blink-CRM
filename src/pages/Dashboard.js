import React,{useState,useEffect} from 'react'
import  'bootstrap/dist/css/bootstrap.min.css';
import TableContacts from 'components/contactComponents/RemindersComponents/TableReminders';
import { BrowserRouter as Router, Link, useLocation  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { starLoadingAllRemindersC } from 'actions/contacts/remindersContacts/remindersContact';
import { starLoadingAllRemindersColleges } from 'actions/colleges/remindersColleges/remindersColleges';
import AddEditContacts from 'components/contactComponents/RemindersComponents/AddEditReminders';
import SearchBar from 'components/GeneralComponents/SearchBar';

function Dashboard(props) {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const { remindersCollege } = useSelector(state => state.remindersColleges);
    const { remindersC } = useSelector(state => state.remindersC);
    const [init] = useState(JSON.parse(localStorage.getItem('user')) || { logged: false });
    const [param,setParam] = useState(null);
    useEffect(() => {
        if(init){
            dispatch(starLoadingAllRemindersC(init.id));
        }
    }, [dispatch])
    function open(){}
    const consult = (e) => {
        e.target.value === "" ?  setParam('keyWordSeccret302') :  setParam(e.target.value);
    }
    useEffect(() => {
    }, [param])
    return (
        <div className="content">
        <div className="row">
            <div class="col-11">
            <div class="mt-5 col d-flex justify-content-end">
            <AddEditContacts
            route={'Dashboard'}
            userDash={init}
            openContacts={true} {...props}/>
            </div>
            <SearchBar consult={(e) => consult(e)}/>
        <TableContacts
            route={'Dashboard'}
            userDash={init}
            param={param}
            fromRemindersSection={true} openModal={open}{...props}/>
            </div>
        </div>    
        </div>
    )
}

export default Dashboard

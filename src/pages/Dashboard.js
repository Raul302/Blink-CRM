import React,{useState,useEffect} from 'react'
import  'bootstrap/dist/css/bootstrap.min.css';
import TableContacts from 'components/contactComponents/RemindersComponents/TableReminders';
import { BrowserRouter as Router, Link, useLocation  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { starLoadingAllRemindersC } from 'actions/contacts/remindersContacts/remindersContact';
import { starLoadingAllRemindersColleges } from 'actions/colleges/remindersColleges/remindersColleges';

function Dashboard(props) {
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const { remindersCollege } = useSelector(state => state.remindersColleges);
    const { remindersC } = useSelector(state => state.remindersC);
    const [init] = useState(JSON.parse(localStorage.getItem('user')) || { logged: false });
    useEffect(() => {
        if(init){
            dispatch(starLoadingAllRemindersC(init.id));
            dispatch(starLoadingAllRemindersColleges(init.id));
        }
    }, [dispatch])
    function open(){}

    return (
        <div className="content">
        <div className="row">
            <div class="col-11">
        <TableContacts  fromRemindersSection={true} openModal={open}{...props}/>
            </div>
        </div>    
        </div>
    )
}

export default Dashboard

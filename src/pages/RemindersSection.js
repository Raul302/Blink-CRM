import TableRemindersColleges from 'components/RemindersSectionComponent/TableRemindersColleges';
import TableRemindersContacts from 'components/RemindersSectionComponent/TableRemindersContacts';
import React from 'react'
import { BrowserRouter as Router, Link, useLocation  } from 'react-router-dom';

export default function RemindersSection() {
    const { pathname } = useLocation();

    return (
        <div class="content">
           <div class="row">
               <TableRemindersColleges />
           </div>
           <div class="row">
               <TableRemindersContacts />
           </div>
        </div>
    )
}

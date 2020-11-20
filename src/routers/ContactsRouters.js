import React from 'react'
import NavBar  from '../components/NavBar';
import { BrowserRouter as Router, Switch, Redirect,
    Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Report from '../pages/Report';
import Contacts from '../pages/Contacts';
import ContactsView from '../pages/ContactsView';
import Bio from '../components/Bio';
import TabTwo from '../components/TabTwo';
import TabThree from '../components/TabThree';


function ContactsRouters() {
    return (
        <>
        <NavBar />
        <div>
        <ContactsView />
        <Switch>
        <Route exact path="/contacts/:id/bio" component={Bio} />
        <Route exact path="/contacts/:id/profile" component={TabTwo} />
        <Route exact path="/contacts/:id/references" component={TabThree} />
                    <Redirect to="/login" />
                </Switch>      
         </div>

            
        </>
    )
}

export default ContactsRouters

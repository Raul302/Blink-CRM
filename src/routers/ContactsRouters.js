import React from 'react'
import NavBar  from '../components/NavBar';
import { BrowserRouter as Router, Switch, Redirect,
    Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Report from '../pages/Report';
import Contacts from '../pages/Contacts';
import ContactsView from '../pages/ContactsView';
import TabOne from '../components/TabOne';
import TabTwo from '../components/TabTwo';
import TabThree from '../components/TabThree';


function ContactsRouters() {
    return (
        <>
        <NavBar />
        <div>
        <ContactsView />
        <Switch>
        <Route exact path="/contacts/:id/tabOne" component={TabOne} />
        <Route exact path="/contacts/:id/tabTwo" component={TabTwo} />
        <Route exact path="/contacts/:id/tabThree" component={TabThree} />
                    <Redirect to="/login" />
                </Switch>      
         </div>

            
        </>
    )
}

export default ContactsRouters

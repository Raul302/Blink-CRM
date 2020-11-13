import React from 'react'
import NavBar  from '../components/NavBar';
import { BrowserRouter as Router, Switch, Redirect,
    Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Report from '../pages/Report';
import Contacts from '../pages/Contacts';

function DashboardRoutes() {
    return (
        <>
        <NavBar />
        <div>
        <Switch>
                    <Route exact path="/dashboard"  component={Dashboard} />
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/contacts" component={Contacts} />
                    <Route exact path="/reports" component={Report} />
                    <Redirect to="/login" />
                </Switch>      
                  </div>

            
        </>
    )
}

export default DashboardRoutes

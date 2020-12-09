// import logo from './logo.svg';
import '../App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import DashboardRoutes from './DashboardRoutes';
import ContactsRouters from './ContactsRouters';
import Login from '../pages/Login';
import React, { useState,useEffect } from 'react';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';

function AppRouter() {
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')));
    useEffect(() => {
    console.log('USER',user);
    } , [ user]);
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRouter 
                    exact path="/login"  
                    component={Login}
                    isAuthenticated= { user.token ? true : false }
                    />
                    <PrivateRouter
                    
                    path="/contacts/:id" 
                    component={ContactsRouters}
                    isAuthenticated= { user.token ? true : false } 
                    
                    />
                    <PrivateRouter
                    path="/" 
                    component={DashboardRoutes}
                    isAuthenticated= { user.token ? true : false } 
                    />
                    
                </Switch>
        </div>
</Router>
    )
}
export default AppRouter;


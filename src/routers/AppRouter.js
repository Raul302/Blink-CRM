// import logo from './logo.svg';
import '../App.css';
import { BrowserRouter as Router, Switch, 
Route } from 'react-router-dom';
import DashboardRoutes from './DashboardRoutes';
import Login from '../pages/Login';
import React, { useContext } from 'react';
import PrivateRouter from './PrivateRouter';
import { AuthContext } from '../auth/AuthContext';

function AppRouter() {
    const { user } = useContext(AuthContext);
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/login"  component={Login} />
                    <PrivateRouter
                     
                     path="/" 
                     component={DashboardRoutes}
                     isAuthenticated= { user.logged } 
                     />
                </Switch>
        </div>
   </Router>
    )
}
export default AppRouter;


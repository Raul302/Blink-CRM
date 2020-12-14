// import logo from './logo.svg';
import '../App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import DashboardRoutes from './DashboardRoutes';
import ContactsRouters from './ContactsRouters';
import CollegesRouter from './CollegesRouter';

import Login from '../pages/Login';
import React, { useState,useEffect } from 'react';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';
import { useDispatch, useSelector,shallowEqual } from 'react-redux';
import { login } from '../actions/auth';
import Loader from '../components/loaderComponents/Loader';
import { loadColleges } from '../helpers/loadColleges';       
import { setColleges, starLoadingColleges,activeCollege } from '../actions/colleges';
export const AppRouter = () => {
    const dispatch = useDispatch();

    const [ checking, setChecking ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);



    const select = useSelector(state => state.auth,shallowEqual);
    // const[flag,setFlag] = useState(false);
    // const [user,setUser] = useState();
    useEffect(() => {
        if(JSON.parse(localStorage.getItem('user'))){
            const {name,type,token} = JSON.parse(localStorage.getItem('user'));
            dispatch( login(name,type,token));
            dispatch ( starLoadingColleges() );
            if(JSON.parse(localStorage.getItem('collegeActive'))){
                const json = JSON.parse(localStorage.getItem('collegeActive'));
                dispatch( activeCollege( json[0].id,json[0]) );
            }

            setIsLoggedIn(true);
        }else {
            setIsLoggedIn(false);
        }
        setChecking(false);

    }, [ dispatch ,select, setChecking, setIsLoggedIn ])
    if ( checking ) {
        return (
            <Loader />
        )
    }


    return (
        <Router>
            <div>
                <Switch>
                    <PublicRouter 
                    exact path="/login"  
                    component={Login}
                    isAuthenticated={ isLoggedIn }
                    />
                    <PrivateRouter
                    
                    path="/contacts/:id" 
                    component={ContactsRouters}
                    isAuthenticated={ isLoggedIn }
                    />
                     <PrivateRouter
                    
                    path="/colleges/:id" 
                    component={CollegesRouter}
                    isAuthenticated={ isLoggedIn }
                    
                    />
                    <PrivateRouter
                    path="/" 
                    component={DashboardRoutes}
                    isAuthenticated={ isLoggedIn }
                    />
                    
                </Switch>
        </div>
</Router>
    )
}
export default AppRouter;


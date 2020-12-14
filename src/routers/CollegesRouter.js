import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar';
import {
    BrowserRouter as Router, Switch, Redirect,
    Route,useLocation
} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Users from '../pages/Users';
import Report from '../pages/Report';
import Contacts from '../pages/Contacts';
import CollegesView from '../pages/CollegesView';
import Bio from '../components/collegeComponents/Bio';
import Contact from '../components/collegeComponents/Contact';
import Detail from '../components/collegeComponents/detailsComponent/Detail';
import Docs from '../components/collegeComponents/Docs';
import Reminds from '../components/collegeComponents/Reminds';
import { Spinner } from 'react-bootstrap';
import { useParams } from "react-router";
import axios from 'axios';



function CollegesRouter() {
    const [loading, setLoading] = useState(false);
   
    return (
        <>
            <NavBar />
            { loading === true ?
                <div className="mt-5 container cwml">
                    <Spinner animation="border" variant="primary" />
                </div>
                :
                <>
                    <CollegesView  />
                    <Switch>
                    <Route exact path="/colleges/:id/bio"
                        render={(props) => (
                            <Bio {...props}
                            />
                        )}
                        />
                        <Route exact path="/colleges/:id/detail"
                        render={(props) => (
                            <Detail {...props}
                            />
                        )}
                        />
                        <Route exact path="/colleges/:id/contact"
                        render={(props) => (
                                <Contact {...props}
                                    />
                        )}
                    />
                      <Route exact path="/colleges/:id/docs"
                        render={(props) => (
                                <Docs {...props}
                                    />
                        )}
                    />
                      <Route exact path="/colleges/:id/reminds"
                        render={(props) => (
                                <Reminds {...props}
                                    />
                        )}
                    />
                        <Redirect to="/login" />
                    </Switch>
                </>
            }


        </>
    )
}

export default CollegesRouter

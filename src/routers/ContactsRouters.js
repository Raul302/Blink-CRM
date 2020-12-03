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
import ContactsView from '../pages/ContactsView';
import Bio from '../components/bioComponents/Bio';
import Profile from '../components/profileComponents/Profile';
import References from '../components/referencesComponent/References';
import { Spinner } from 'react-bootstrap';
import { useParams } from "react-router";
import axios from 'axios';



function ContactsRouters() {
    let { id } = useParams();
    const { pathname } = useLocation();
    const [loading, setLoading] = useState(true);
    const [contact, setContact] = useState(null);
    const [references,setReferences] = useState(null);
    useEffect(() => {
        consultContact(id);
    }, [])
    async function consultContact() {
        setLoading(true);
        await axios.get('http://api.boardingschools.mx/api/contacts/' + id, {
            headers: {
                "Accept": "application/json"
            }
        }).then(function (response) {
            setContact(response.data[0])
            setLoading(false);
        });
    }
    function update(){
        consultContact(id);
    }
    return (
        <>
            <NavBar />
            { loading === true ?
                <div className="mt-5 container cwml">
                    <Spinner animation="border" variant="primary" />
                </div>
                :
                <>
                    <ContactsView contact={contact } />
                    <Switch>
                    <Route exact path="/contacts/:id/bio"
                        render={(props) => (
                            <Bio {...props}
                            updateRoute={update}
                            contact={contact}
                            />
                        )}
                        />
                        <Route exact path="/contacts/:id/profile"
                        render={(props) => (
                            <Profile {...props}
                            updateRoute={update}
                            contact={contact}
                            />
                        )}
                        />
                        <Route exact path="/contacts/:id/references"
                        render={(props) => (
                                <References {...props}
                                updateRoute={update}
                                contact={contact}
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

export default ContactsRouters

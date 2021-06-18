import React, { useState,useRef, useEffect} from 'react';
import {
    Switch, Redirect,
    Route, useLocation
} from 'react-router-dom';
import { constaApi } from '../constants/constants';
import ContactsView from '../pages/ContactsView';
import Bio from '../components/bioComponents/Bio';
import Profile from '../components/profileComponents/Profile';
import References from '../components/referencesComponent/References';
import { Spinner } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useParams } from "react-router";
import Docs from '../components/contactComponents/docsComponents/Docs';
import axios from 'axios';
import Nav from "../components/Nav/Nav";
import SideBar from '../components/SideBar/SideBar';
import routes from "../routes.js";
import Reminders from 'components/contactComponents/RemindersComponents/Reminders';
import NotificationAlert from "react-notification-alert";
import Prospection from 'components/contactComponents/Prospection/Prospection';
import Aplications from 'components/contactComponents/Aplications/Aplications';
import TrackingsContact from 'components/contactComponents/Trackings/TrackingsContact';


function ContactsRouters(props) {
    const notificationAlert = useRef();
    let { id } = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [contact, setContact] = useState(null);
    const [backgroundColor, setBackGroundColor] = useState(JSON.parse(localStorage.getItem('bgColor')) || 'white');
    const [activeColor, setActiveColor] = useState(JSON.parse(localStorage.getItem('activeColor')) || 'info');
    // const {name} = useSelector(state => state.auth,shallowEqual);
    // const [condiitionalX,setC] =useState(false);
    const mainPanel = useRef();
    useEffect(() => {
        consultContact(id);
        if(id){
            // dispatch(starLoadingRemindersC(id))
        }
    }, [dispatch])
    // if(notificationAlert.current != undefined && name){
    //     if(condiitionalX === false){
    //         notification('success',name);
    //         setC(true);
    //     } else {
    //        
    //     }
    // }
    // methods
    function notification(type, message) {
        let place = "tc";
        var options = {};
        options = {
            place: place,
            message: (
                <div>
                    <div>
                        {message}
                    </div>
                </div>
            ),
            type: type,
            icon: "nc-icon nc-bell-55",
            autoDismiss: 7,
        }
        notificationAlert.current.notificationAlert(options);
    }
    async function consultContact() {
        setLoading(true);
        await axios.get(constaApi + 'contacts/' + id, {
            headers: {
                "Accept": "application/json"
            }
        }).then(function (response) {
            setContact(response.data[0])
            setLoading(false);
        });
    }
    function update() {
        consultContact(id);
    }
    return (
        <div className="wrapper">
            <SideBar
                {...props}
                routes={routes}
                // bgColor={backgroundColor}
                // activeColor={activeColor}
            />
            <div  style={{backgroundColor:'#f9fafb'}}className="main-panel" ref={mainPanel}>
                <Nav {...props} />
                <NotificationAlert ref={notificationAlert} />
                { loading === true ?
                <div className="content">
                    <Spinner animation="border" variant="info" />
                </div>
                :
                <>
                   <ContactsView contact={contact } />
                   <Nav {...props}/>
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
                    <Route exact path="/contacts/:id/docs"
                        render={(props) => (
                                <Docs {...props}
                                updateRoute={update}
                                contact={contact}
                                />
                        )}
                    />

                    <Route exact path="/contacts/:id/reminders"
                        render={(props) => (
                                <Reminders {...props}
                                updateRoute={update}
                                contact={contact}
                                />
                        )}
                    />

                    <Route exact path="/contacts/:id/prospection"
                        render={(props) => (
                                <Prospection {...props}
                                updateRoute={update}
                                contact={contact}
                                />
                        )}
                    />
                     <Route exact path="/contacts/:id/applications"
                        render={(props) => (
                                <Aplications {...props}
                                updateRoute={update}
                                contact={contact}
                                />
                        )}
                    />

                    <Route exact path="/contacts/:id/trackings"
                        render={(props) => (
                                <TrackingsContact {...props}
                                updateRoute={update}
                                contact={contact}
                                />
                        )}
                    />
                        <Redirect to="/login" />
                    </Switch>
                    </>
            }
            </div>
        </div>
    )
}

export default ContactsRouters

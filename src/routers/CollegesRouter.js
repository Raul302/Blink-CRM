import React, { useState,useRef, useEffect } from 'react'
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
import Detail from '../components/collegeComponents/detailsComponent/Detail';
import Docs from '../components/collegeComponents/Docs';
import Reminds from '../components/collegeComponents/ReminderComponent/Reminds';
import { Spinner } from 'react-bootstrap';
import { useParams } from "react-router";
import axios from 'axios';
import Nav from "../components/Nav/Nav";
import SideBar from '../components/SideBar/SideBar';
import routes from "../routes.js";
import Staff from '../components/collegeComponents/staffComponents/Staff';



function CollegesRouter(props) {
    const [loading, setLoading] = useState(false);
    const [backgroundColor, setBackGroundColor] = useState(JSON.parse(localStorage.getItem('bgColor')) || 'white');
    const [activeColor, setActiveColor] = useState(JSON.parse(localStorage.getItem('activeColor')) || 'info');
    const mainPanel = useRef();
    return (
        <div className="wrapper">
        <SideBar
          {...props}
          routes={routes}
          bgColor={backgroundColor}
          activeColor={activeColor}
        />
        <div className="main-panel" ref={mainPanel}>
            <Nav {...props} />
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
                        <Route exact path="/colleges/:id/staff"
                        render={(props) => (
                                <Staff {...props}
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
          {/* <Footer fluid /> */}
        </div>
        {/* <FixedPlugin
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
          handleActiveClick={this.handleActiveClick}
          handleBgClick={this.handleBgClick}
        /> */}
      </div>
        
                    
    )
}

export default CollegesRouter

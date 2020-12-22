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
import Contact from '../components/collegeComponents/Contact';
import Detail from '../components/collegeComponents/detailsComponent/Detail';
import Docs from '../components/collegeComponents/Docs';
import Reminds from '../components/collegeComponents/Reminds';
import { Spinner } from 'react-bootstrap';
import { useParams } from "react-router";
import axios from 'axios';
import Nav from "../components/Nav/Nav";
import SideBar from '../components/SideBar/SideBar';
import routes from "../routes.js";



function CollegesRouter(props) {
    const [loading, setLoading] = useState(false);
    const [backgroundColor, setBackGroundColor] = useState('black');
    const [activeColor, setActiveColor] = useState('info');
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

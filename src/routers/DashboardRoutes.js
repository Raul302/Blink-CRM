
import React from "react";
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch, Redirect } from "react-router-dom";
import SideBar from '../components/SideBar/SideBar';
import Nav from '../components/Nav/Nav';

import routes from "../routes.js";
import Footer from "components/Footer/Footer";
import FixedPlugin from "components/Plugin/FixedPlugin";

var ps;

class DashboardRoutes extends React.Component {
  constructor(props) {
    super(props);
    let color = JSON.parse(localStorage.getItem('bgColor')) || 'white';
    let activeColor = JSON.parse(localStorage.getItem('activeColor')) || 'info';
    this.state = {
      backgroundColor: color,
      activeColor: activeColor,
    };
    this.mainPanel = React.createRef();
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  handleActiveClick = (color) => {
    localStorage.setItem( 'activeColor', JSON.stringify(color));
    this.setState({ activeColor: color });
  };
  handleBgClick = (color) => {
    localStorage.setItem( 'bgColor', JSON.stringify(color));
    this.setState({ backgroundColor: color });
  };
  render() {
    return (
      <div className="wrapper">
        <SideBar
          {...this.props}
          routes={routes}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
        />
        <div className="main-panel" ref={this.mainPanel}>
            <Nav {...this.props} />
          <Switch>
            {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}
           <Redirect to="/login" />
          </Switch>
           <Footer fluid />
        </div>
         <FixedPlugin
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
          handleActiveClick={this.handleActiveClick}
          handleBgClick={this.handleBgClick}
        /> 
      </div>
    );
  }
}

export default DashboardRoutes;

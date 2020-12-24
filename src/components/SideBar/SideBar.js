
import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import logo from "../../logo.svg";
import {store} from '../../store/store';
var ps;
var typeUser ;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
    this.sidebar = React.createRef();
    typeUser = store.getState().auth ?store.getState().auth.type : 'user';
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    return (
      <div
        className="sidebar"
        data-color={this.props.bgColor}
        data-active-color={this.props.activeColor}
      >
        <div className="logo">
          <a
            href="https://www.creative-tim.com"
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <img src={logo} alt="react-logo" />
            </div>
          </a>
          <a
            // href="https://www.creative-tim.com"
            className="simple-text logo-normal"
          >
          Blink
          </a>
        </div>
        <div className="sidebar-wrapper" ref={this.sidebar}>
          <Nav>
            
            {this.props.routes.map((prop, key) => {
              return (
                <li
                  className={
                    this.activeRoute(prop.path) +
                    (prop.pro ? "Inter active-pro" : "")
                  }
                  key={key}
                >
                 { (typeUser === 'Supervisor' || typeUser == 'Administrador')  ?
                <NavLink
                to={prop.path}
                className="Inter nav-link"
                activeClassName="active"
              >
                <i className='nc-icon'>
                {prop.icon}
                </i>
                <p>{prop.name}</p>
              </NavLink>
                :
                [(prop.path !=='/users')
                ? 
                 <NavLink
                to={prop.path}
                className="Inter nav-link"
                activeClassName="active"
              >
                <i className='nc-icon'>
                {prop.icon}
                </i>
                <p>{prop.name}</p>
              </NavLink>
                :
                ''
                ]
                }
                </li>
              );
            })}
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;

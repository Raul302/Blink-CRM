
import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import routes from '../../routes';
import { Nav } from "reactstrap";
import {store} from '../../store/store';
import { NavLink } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import logo from 'resources/images/blinkLogo.png';

import { Popover,OverlayTrigger } from "react-bootstrap";
var ps;
var typeUser ;
const StyledSideBar = styled.div`   
    position: fixed;     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
    height: 200%;
    width: 50px;     /* Set the width of the sidebar */
    z-index: 1;      /* Stay on top of everything */
    // top: 3.4em;      /* Stay at the top */
    background-color: #222; /* Black */
    overflow-x: hidden;     /* Disable horizontal scroll */
    padding-top: 10px;
`;

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.sidebar = React.createRef();
        typeUser = store.getState().auth ?store.getState().auth.type : 'user';
        this.state = {
            items: [
                {
                  path: '/', /* path is used as id to check which NavItem is active basically */
                  name: 'Home',
                  css: 'fa fa-fw fa-home',
                  key: 1 /* Key is required, else console throws error. Does this please you Mr. Browser?! */
                },
                {
                  path: '/about',
                  name: 'About',
                  css: 'fa fa-fw fa-clock',
                  key: 2
                },
                {
                  path: '/NoMatch',
                  name: 'NoMatch',
                  css: 'fas fa-hashtag',
                  key: 3
                },
              ]
        }
    }
   activeRoute(routeName) {
     return this.props.location.pathname.indexOf(routeName) > -1 ? 1 : 0;
   }
   componentDidMount() {
     if (navigator.platform.indexOf("Win") > -1) {
      //  ps = new PerfectScrollbar(this.sidebar.current, {
      //    suppressScrollX: true,
      //    suppressScrollY: false,
      //  });
     }
   }
   componentWillUnmount() {
     if (navigator.platform.indexOf("Win") > -1) {
      //  ps.destroy();
     }
   }
    PopoverComponent = (text) => {
     return (
     <Popover className="ml-2" id="popover-basic">
         <Popover.Content >
             <strong>{text}</strong>
         </Popover.Content>
     </Popover>)
 }
    onItemClick = (path) => {
        this.setState({ activePath: path });
    }
    // // Cuenta hsbc
    // 021180550300001161 IPF México 
    // 10665966734
    // hola@CredentialsContainer.mx

    render() {
        const { items, activePath } = this.state;
        return(
            <StyledSideBar>
              <Nav>
                <img class="mb-2" style={{width:"40px",marginLeft:"10%", display:'flex',alignItems:'center',justifyContent:'center'}} src={logo} alt="Logo"></img>
            {routes.map((prop,key) => {
              return(
                <li
                style={{color:this.activeRoute(prop.path) == 0 ? 'white' : '#497cff'}}
                className={
                  this.activeRoute(prop.path) +
                  (prop.pro ? "montse" : "")
                }
                key={key}
                >
               { (typeUser === 'Supervisor' || typeUser == 'Administrador')  ?
              <NavLink
              to={prop.path}
              className="Inter nav-link"
              activeClassName="active"
              style={{color:this.activeRoute(prop.path) == 0 ? 'white' : '#497cff'}}
              >
              <OverlayTrigger  trigger={["hover", "hover"]} placement="right"
              overlay={this.PopoverComponent(prop.name)}>
              <a>
              <i className='nc-icon mt-3'>
                      {prop.icon}
                      </i>
              </a>
          </OverlayTrigger>
                        
            </NavLink>
              :
              [(prop.path !=='/users')
              ? 
              <NavLink
              to={prop.path}
              className="Inter nav-link"
              activeClassName="active"
              >
              <i 
              style={{width:'5%'}}
              className='nc-icon'>
              {prop.icon}
              </i>
              <p>&nbsp;</p>
            </NavLink>
              :
              ''
            ]
          }
              </li>
          )
            })}
            </Nav>
            </StyledSideBar>
            );
    }
}
export default SideBar;























// import React from "react";
// import { NavLink } from "react-router-dom";
// import { Nav } from "reactstrap";
// // javascript plugin used to create scrollbars on windows
// import PerfectScrollbar from "perfect-scrollbar";
// import logo from "../../logo.svg";
// import {store} from '../../store/store';
// import { Popover,OverlayTrigger } from "react-bootstrap";

// var ps;
// var typeUser ;

// class Sidebar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.activeRoute.bind(this);
//     this.sidebar = React.createRef();
//     typeUser = store.getState().auth ?store.getState().auth.type : 'user';
//   }
//   activeRoute(routeName) {
//     return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
//   }
//   componentDidMount() {
//     if (navigator.platform.indexOf("Win") > -1) {
//       ps = new PerfectScrollbar(this.sidebar.current, {
//         suppressScrollX: true,
//         suppressScrollY: false,
//       });
//     }
//   }
//   componentWillUnmount() {
//     if (navigator.platform.indexOf("Win") > -1) {
//       ps.destroy();
//     }
//   }
//    PopoverComponent = (text) => {
//     return (<Popover id="popover-basic">
//         <Popover.Content>
//             <strong>{text}</strong>
//         </Popover.Content>
//     </Popover>)
// }
//   render() {
//     return (
//       <div
//       // style={{width:'5%',minWidth:'5%' ,maxWidth:'5%'}}
//         className="sidebar"
//         data-color={this.props.bgColor}
//         data-active-color={this.props.activeColor}
//       >
//         <div 
//         style={{marginRight:'0px',width:'30%'}}
//         className="logo">
//           <a
//             // href="https://www.creative-tim.com"
//             className="simple-text logo-mini"
//           >
//             <div className="logo-img">
//               <img src={logo} alt="react-logo" />
//             </div>
//           </a>
//           <a
//             // href="https://www.creative-tim.com"
//             className="simple-text logo-normal"
//           >
//           &nbsp;
//           </a>
//         </div>
//         <div 
//         className="sidebar-wrapper" ref={this.sidebar}>
//           <Nav>
//             {this.props.routes.map((prop, key) => {
//               return (
//                 <li
//                 style={{width:'5%'}}
//                   className={
//                     this.activeRoute(prop.path) +
//                     (prop.pro ? "Inter active-pro" : "")
//                   }
//                   key={key}
//                 >
//                  { (typeUser === 'Supervisor' || typeUser == 'Administrador')  ?
//                 <NavLink
//                 to={prop.path}
//                 className="Inter nav-link"
//                 activeClassName="active"
//               >
//                 <OverlayTrigger className="ml-5" trigger={["hover", "hover"]} placement="right"
//                 overlay={this.PopoverComponent(prop.name)}>
//                 <a>
//                 <i className='nc-icon'>
//                         {prop.icon}
//                         </i>
//                         <p>&nbsp;</p>
//                 </a>
//             </OverlayTrigger>
              
//               </NavLink>
//                 :
//                 [(prop.path !=='/users')
//                 ? 
//                  <NavLink
//                 to={prop.path}
//                 className="Inter nav-link"
//                 activeClassName="active"
//               >
//                 <i 
//                                 style={{width:'5%'}}
//                 className='nc-icon'>
//                 {prop.icon}
//                 </i>
//                 <p>&nbsp;</p>
//               </NavLink>
//                 :
//                 ''
//                 ]
//                 }
//                 </li>
//               );
//             })}
//           </Nav>
//         </div>
//       </div>
//     );
//   }
// }

// export default Sidebar;

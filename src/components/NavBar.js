import React, { useState, useContext } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as GrIcons from 'react-icons/gr';
import { Link , useHistory} from 'react-router-dom';
import { SideBar } from "./SideBar";
import '../styles/NavBar.css';
import { IconContext } from 'react-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button, Navbar, NavDropdown, Nav, Form, FormControl } from 'react-bootstrap';
import { AuthContext } from '../auth/AuthContext';
import { types } from '../types/types';

function NavBar() {
    const [sidebar, setSidebar] = useState(true);
    const { user: { name }, dispatch } = useContext(AuthContext)
    const showSidebar = () => setSidebar(!sidebar);

    const history = useHistory();

    const handleLogout = () => {
        dispatch({
            type: types.logout
        });
        history.replace('/login');
    }
    return (
        <>

            {/* navbar */}
            <IconContext.Provider className="nav-text" value={{ color: '#1a83ff' }}>
                <Navbar bg="light" expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link style={{ marginLeft:'130px'}} > 
                            <FaIcons.FaBars  onClick={showSidebar} /></Nav.Link>
                        </Nav>
                        <Form inline>
                            <NavDropdown style={{ marginRight:'80px'}} title={name} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={ handleLogout }>Salir</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                                                    </Form>
                    </Navbar.Collapse>
                </Navbar>

                {/* <IconContext.Provider className="nav-text" value={{ color: '#1a83ff' }}>
                    <div className='navbar'>
                        <Link to='#' className='menu-bars mb-5'>
                            <FaIcons.FaBars onClick={showSidebar} />
                        </Link>
                        <Row className="mb-5">
                            <Col className="pull-right mb-3">
                                <Button
                                    variant="primary"
                                    style={{ height: '32px', width: '32px' }}><RiIcons.RiAddLine style={{ marginLeft: '-5px' }} className="mb-2 mr-5" color='white' />
                                </Button >{' '}
                            </Col>
                            <Col className="pull-right mb-3"><GrIcons.GrNotification /></Col>
                            <Col className="pull-right mb-3" ><div clasName="diSpan"><span className="SpanL"></span></div></Col>
                        </Row>
                    </div> */}




                    {/* Sidebar LATERAL */}
                    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                        <ul className='nav-menu-items'>
                            <li className='navbar-toggle'>
                            </li>
                            {SideBar.map((item, index) => {
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </nav>
                </IconContext.Provider>
        </>
    );
}

export default NavBar;

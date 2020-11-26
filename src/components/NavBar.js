import React, { useState, useContext, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link , useHistory} from 'react-router-dom';
import { SideBar } from "./SideBar";
import '../styles/NavBar.css';
import { IconContext } from 'react-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button, Navbar, NavDropdown, Nav, Form, FormControl } from 'react-bootstrap';
import { AuthContext } from '../auth/AuthContext';
import { types } from '../types/types';

function NavBar() {
    const [init,setInit] = useState(JSON.parse(localStorage.getItem('user')) || { logged: false });
    useEffect(() => {
        // setInit(JSON.parse(localStorage.getItem('user')) || { logged: false });
          console.log('init',init)
    }, [])
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

         
            <IconContext.Provider className="nav-text" value={{ color: '#1a83ff' }}>
                {/* <Navbar bg="white" expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link> 
                            <FaIcons.FaBars  style={{ position:'fixed', marginBottom:'70px' ,marginLeft:'130px'}}  onClick={showSidebar} /></Nav.Link>
                        </Nav>
                        <Form inline>
                            <NavDropdown style={{ marginRight:'80px'}} title={name} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={ handleLogout }>Salir</NavDropdown.Item>
                            </NavDropdown>
                        </Form>
                    </Navbar.Collapse>
                </Navbar> */}

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
                            <li className="nav-text">
                            <Link to='/contacts'>
                            <AiIcons.AiFillContacts />
                                            <span>Contacts</span>
                                        </Link>
                            </li>
                            { init.type == 'Supervisor' || init.type == 'Administrador' ?
                            <li className="nav-text">
                            <Link to='/users'>
                            <FaIcons.FaUser />
                                            <span>Users</span>
                                        </Link>
                        </li>
                        : ''
                        }
                        </ul>
                    </nav>
                       {/* navbar */}
                       <Navbar collapseOnSelect expand="lg" bg="white" variant="dark">
  {/* <Navbar.Brand onClick={showSidebar} ><FaIcons.FaBars/></Navbar.Brand> */}
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
    </Nav>
    <Nav>
      <Nav.Link style={{color:'#182739'}}>{init.username}</Nav.Link>
      <Nav.Link style={{color:'#182739'}} onClick={ handleLogout }>
        Cerrar sesion
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
                </IconContext.Provider>
        </>
    );
}

export default NavBar;

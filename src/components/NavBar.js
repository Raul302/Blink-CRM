import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as RiIcons from 'react-icons/ri';
import * as GrIcons from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { SideBar } from "./SideBar";
import '../styles/NavBar.css';
import { IconContext } from 'react-icons';
import  'bootstrap/dist/css/bootstrap.min.css';
import { Row,Col,Button  } from 'react-bootstrap';


function NavBar() {
    const [sidebar, setSidebar] = useState(true);

    const showSidebar = () => setSidebar(!sidebar);
    return (
        <>
        
        {/* navbar */}
        <IconContext.Provider className="nav-text" value={{ color: '#1a83ff' }}>
        <div className='navbar'>
        <Link to='#' className='menu-bars mb-5'>
            <FaIcons.FaBars onClick={showSidebar} />
        </Link>
        <Row className="mb-5">
            <Col>
            <Button 
            variant="primary"
            style={{height: '32px', width : '32px' }}><RiIcons.RiAddLine style={{marginLeft: '-5px'}} className="mb-2 mr-5" color='white'/>
            </Button >{' '}
            </Col>
            <Col><GrIcons.GrNotification /></Col>
            <Col><div clasName="diSpan"><span className="SpanL">L</span></div></Col>
        </Row>
        </div>
        {/* Sidebar LATERAL */}
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items'>
                <li className='navbar-toggle'>
                    <Link to="#" className='menu-bars'>
                        <AiIcons.AiFillCloseCircle  onClick={showSidebar} />
                    </Link>
                </li>
                {SideBar.map((item,index) =>{
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

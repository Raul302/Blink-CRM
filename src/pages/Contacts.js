import React from 'react'
import  'bootstrap/dist/css/bootstrap.min.css';
import '../styles/GlobalStyles.css';
import { Row, Col, Button  } from 'react-bootstrap';
import MultipleModals from '../components/MultipleModals';
// import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

function Contacts() {
    return (
        <>
        <div className="mr-5 mt-3 container">
            <Row>
            <h1 className="ml-0 Inter400">Contactos</h1>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col><Button style={{color:'#182739', backgroundColor:'#FFFFFF', boxShadow:'rgb(209, 221, 235) 0px 0px 0px 1px inset' }} className="Inter600" variant="light">Import</Button></Col>
            <Col md="auto"><MultipleModals /></Col>
            </Row>
            <div className="table mr-5 mt-4 row">
                Tabla nueva
            </div>
        </div>
        </>
        
    )
}

export default Contacts

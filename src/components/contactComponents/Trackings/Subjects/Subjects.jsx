import React, { useState, useEffect, useRef } from 'react'
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Skeleton from 'react-loading-skeleton';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { constaApi } from 'constants/constants';

export default function Subjects(props) {
    const [rowData,setRowData] = useState([]);
    const [gridApi, setGridApi] = useState();
    const [columnApi, setColumnApi] = useState();
    const [frameworkComponents, setFramwrokw] = useState({});
    const [modalS,setModalS] = useState(false);
    const [subject,setSubject] =useState({type:" ",name:" "});
    const [typesSubject,setTypesSubject] = useState([
        "Science",
        "Math",
        "Language",
        "Social Studies",
        "Elective"
    ]);
    useEffect(() => {
        if(props.activeTracking){
            consultAllTrackings(props.activeTracking.id,props.activeTracking.id_last_contact);
        }
    },[props.activeTracking])
    const onGridReady = (params) => {
        setGridApi(params);
        setColumnApi(params);
    }
    const openModalSubjects = () =>{
        setModalS(!modalS);
    }
    const handleClose = () => {
        setModalS(false);
    }
    const consultAllTrackings = (id,id_contact) =>{
        let newObj ={
            id_tracking: props.activeTracking.id,
            id_contact: props.activeTracking.id_last_contact
         };
        axios.post(constaApi+'allTrackingSubject',newObj)
        .then(function (response) {
            setRowData(response.data);
            handleClose();
        });
    }
    const onSubmit = (data) =>{
         let newObj ={
            id_tracking: props.activeTracking.id,
            id_contact: props.activeTracking.id_last_contact,
            type: subject.type,
            name: subject.name
         };
        axios.post(constaApi+'saveTrackingSubject',newObj)
        .then(function (response) {
            setSubject({});
            consultAllTrackings(props.activeTracking.id,props.activeTracking.id_last_contact);
        });
    }
    const SaveType = (e) => {
        setSubject({...subject,type:e.target.value});
    }
    const SaveName = (e) => {
        setSubject({...subject,name:e.target.value})
    }
    return (
        <div className="content">
        <div class="mt-n5 row">
            <div class="col-12">
            <div class="col d-flex justify-content-end">
            <button  onClick={ e => openModalSubjects()}className="btn btn-info">
                <span className="Inter"
                    style={{ fontSize: "18px" }}>+</span> Materia</button>
            </div>
            <div
                className="ag-theme-alpine"
                style={{ height: '150%', width: '100%' }}
                >
                    <AgGridReact
                        rowData={rowData}
                        rowHeight={40}
                        cellStyle={{ fontFamily:'Montserrat,sans-serif',fontSize:'13px',fontWeight:'500', color:'#3B3B3B'}}
                        domLayout="autoHeight"
                        onGridReady={onGridReady}
                        frameworkComponents={frameworkComponents}
                        pagination={true}
                        paginationPageSize={10}
                        paginationNumberFormatter={function (params) {
                            return params.value.toLocaleString();
                        }}
                        rowSelection="multiple"
                        >
                            {/* Column Name */}
                        <AgGridColumn
                            cellStyle={{ fontFamily:'Montserrat,sans-serif',fontSize:'13px',fontWeight:'500', color:'#3B3B3B'}}
                            headerName="Tipo" sortable={true} field="type" width="300" />
                             {/* Column Rating */}
                             <AgGridColumn
                           cellStyle={{ fontFamily:'Montserrat,sans-serif',fontSize:'13px',fontWeight:'500', color:'#3B3B3B'}}
                           cellRenderer="slotRating"
                           headerName="Materia" sortable={true} field="name" width="300" />
                            
                    </AgGridReact>
                </div>
            </div>
        </div>

            {/* MODAL */}
        <Modal
                style={{marginTop:'50px'}}
                dialogClassName="modal-90w"
                show={modalS}
                onHide={e => handleClose(e)}
            >
                <Modal.Header style={{height:'60px'}} closeButton>
                    <Modal.Title style={{ fontFamily: 'Inter', marginTop:'5px', fontWeight: '600', fontSize: '18px' }}>Agregar Materia </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>

                    <form onSubmit={e => onSubmit(e)}>
                        <div className="container-fluid">
                            <Row className="mt-1">
                                  <Col className="col-4">
                                    <Form.Label className="formGray">Materia:</Form.Label>
                                    <Form.Control  autoComplete="off" 
                                    onChange={(e) => SaveType(e)}
                                    name="country" value={subject.type} as="select" size="sm" custom>
                                        {typesSubject.map(ty => (
                                                        <option key={ty} value={ty}>
                                                            {ty}
                                                        </option>
                                                    ))}
                                    </Form.Control>
                                </Col>
                                <Col className="col-4">
                                <Form.Label className="formGray">Nombre</Form.Label>
                                    <Form.Control  autoComplete="off" name="text"
                                    onChange={(e) => SaveName(e)}
                                    value={subject.name}
                                        className="formGray" type="text" placeholder="Nombre de la materia" />
                                </Col>
                                </Row>
                        </div>
                        <Row>

                            <Col>
                                <Button
                                    className="float-right mb-3 mr-2" type="button"
                                    onClick={e => onSubmit(e)}
                                    variant="info">Guardar</Button>
                                <Button onClick={e => handleClose(e)} style={{  fontFamily: 'Inter', fontWeight: '500' }} className="float-right mb-3 mr-2" variant="danger" >
                                    Cancelar
                </Button>

                            </Col>
                        </Row>
                    </form>
                </Modal.Body>
            </Modal>
            {/* FIN MODAL */}


        </div>


    
    )
}

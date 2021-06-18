import React, { useState, useEffect, useRef } from 'react'
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Skeleton from 'react-loading-skeleton';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { constaApi } from 'constants/constants';
import NotificationAlert from "react-notification-alert";

export default function Subjects(props) {
    const notificationAlert = useRef();
    const [rowData,setRowData] = useState([]);
    const [gridApi, setGridApi] = useState();
    const [columnApi, setColumnApi] = useState();
    const [frameworkComponents, setFramwrokw] = useState({});
    const [objSubject,setObjectSubject] = useState([
        {
        type:"Science",
        name:""
    },   {
        type:"Science",
        name:""
    },   {
        type:"Science",
        name:""
    },   {
        type:"Science",
        name:""
    },   {
        type:"Science",
        name:""
    }
])
    const [modalS,setModalS] = useState(false);
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
    const cleanCamps = () =>{
        setObjectSubject([   {
            type:"Science",
            name:""
        },   {
            type:"Science",
            name:""
        },   {
            type:"Science",
            name:""
        },   {
            type:"Science",
            name:""
        },   {
            type:"Science",
            name:""
        }]);
    }
    const handleClose = () => {
        setModalS(false);
        cleanCamps();
    }
    const handleAddSubject = () =>{
        setObjectSubject([...objSubject,{type:"Science",name:""}]);
    }
    const handleChangeObj = (e,index) => {
        const { name, value } = e.target;
        const list = [...objSubject];
        list[index][name] = value;
        setObjectSubject(list);
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
         };
         let theobj = {
             objSubject:objSubject,
             otherData : newObj
         }
         let flag = false;
         objSubject.map(obj => {
             if(!obj.type){
                 flag = true;
             }
             if(!obj.name){
                 flag = true;
             }
         })
         if(!flag){
             axios.post(constaApi+'saveTrackingSubject',theobj)
             .then(function (response) {
                 // setSubject({});
                 cleanCamps();
                 consultAllTrackings(props.activeTracking.id,props.activeTracking.id_last_contact);
             });
         } else {
            notification('warning','Campos vacios');
         }
    }
    function notification(type, message) {
        let place = "tc";
        var options = {};
        options = {
            place: place,
            message: (
                <div>
                    <div>
                        {message}
                    </div>
                </div>
            ),
            type: type,
            icon: "nc-icon nc-bell-55",
            autoDismiss: 7,
        }
        notificationAlert.current.notificationAlert(options);
    }
    // const SaveType = (e) => {
    //     setSubject({...subject,type:e.target.value});
    // }
    // const SaveName = (e) => {
    //     setSubject({...subject,name:e.target.value})
    // }
    return (
        <div className="content">
                            <NotificationAlert ref={notificationAlert} />
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
                            {objSubject.map((ob,i) =>{
                                return(
                            <Row className="mt-1">
                                  <Col className="col-4">
                                    <Form.Label className="formGray">Materia:</Form.Label>
                                    <Form.Control  autoComplete="off" 
                                    onChange={(e) => handleChangeObj(e,i)}
                                    name="type" value={ob.type} as="select" size="sm" custom>
                                        {typesSubject.map(ty => (
                                                        <option key={ty} value={ty}>
                                                            {ty}
                                                        </option>
                                                    ))}
                                    </Form.Control>
                                </Col>
                                <Col className="col-4">
                                <Form.Label className="formGray">Nombre</Form.Label>
                                    <Form.Control  autoComplete="off" name="name"
                                    onChange={(e) => handleChangeObj(e,i)}
                                    value={ob.name}
                                        className="formGray" type="text" placeholder="Nombre de la materia" />
                                </Col>
                                </Row>
                                )
                            })}
                            <Row>
                                <Col>
                            <button onClick={handleAddSubject}
                                                    type="button"
                                                    class="montse ml-1 btn btn-info btn-sm"><span style={{ fontSize: '18px' }} class="montse">+</span></button>
                                </Col>
                            </Row>
                        </div>
                        <Row>

                            <Col>
                                <Button
                                    className="float-right mb-3 mr-2" type="button"
                                    onClick={e => onSubmit(e)}
                                    variant="info">Guardar</Button>
                                <Button onClick={e => handleClose(e)} style={{  fontFamily: 'Inter', fontWeight: '500' }} className="float-right mb-3 mr-2 montse btnBee" >
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

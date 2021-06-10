import React, { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/GlobalStyles.css';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Skeleton from 'react-loading-skeleton';
import {
    Row,
    Col,
} from "reactstrap";
import { Link } from 'react-router-dom';
import axios from 'axios';
import NotificationAlert from "react-notification-alert";
import LateralReference from './LateralReference';
import References from 'components/referencesComponent/References';
import { useForm } from "react-hook-form";
import { Button, Modal, Form } from 'react-bootstrap';
import { constaApi } from '../../constants/constants';
import SearchBar from 'components/GeneralComponents/SearchBar';
import { SlotName, SlotOrigin, SlotProgram } from './SlotContacts';
import *  as RIcons from "react-icons/ri";
import { SlotActions } from './SlotContacts';
import { SlotRating } from './SlotContacts';
import { SlotRef1,SlotRef2,SlotRef3 } from './SlotContacts';

export const SlotReferences = function SlotReferences(props) {
    const showModalS = (id) => {
        // props.clickx(id);
        props.context.showModal(id)
    }
    return (
        <>
            <a> <RIcons.RiEyeFill onClick={(e) => showModalS(props.data.id)} style={{ color: '#497cff' }} size={18} /></a>
        </>
    )
}
function TableContacts(props) {
    const [rowData, setRowData] = useState(props.rowData);
    const notificationAlert = useRef();
    const [frameworkComponents, setFramwrokw] = useState({slotRef1:SlotRef1,slotRef2:SlotRef2,slotRef3:SlotRef3,slotRating:SlotRating,slotActions: SlotActions ,slotName: SlotName, slotOrigin: SlotOrigin, slotProgram: SlotProgram, slotReferences: SlotReferences });
    const [gridApi, setGridApi] = useState();
    const [columnApi, setColumnApi] = useState();
    const [dinamicwidth, setDinamicWidth] = useState('0px');
    const [lateralReference, setLateralReference] = useState(null);
    const [modal, setmodal] = useState(false);
    const [modalPro, setModalPro] = useState(false);
    const [loading,setLoading] = useState(false);
    const [prospections,setProspespections] = useState([]);
    const { register, handleSubmit, errors, reset, watch } = useForm({ mode: 'onChange' });
    const [theContact, setTheContact] = useState(null);
    const [columnDefs, setColumns] = useState([
        {
            headerName: "Nombre", field: "name", width: 250,
            cellRenderer: "slotName",
            getQuickFilterText: function (params) {
                return params.value.name;
            },
            cellRendererParams: {
                clicked: function (data) {
                    alert(`${data} was clicked`);
                },
            }
        },
        {
            headerName: "Ciudad", field: "city", width: 200,
            cellRenderer: 'slotOrigin'
        },
        { headerName: "Programa", field: "prospections", width: 200, cellRenderer: 'slotProgram' },
        {
            headerName: "Referencia", width: 200,
            cellRenderer: "slotReferences",
            cellRendererParams: {
                clickx: function (id) {
                    showModal(id);
                },
            }
        },
        { headerName: "Acciones", width: 220 },
    ]);
    useEffect(() => {
        consultRow();
    }, [props.reload]);

    useEffect(() => {
        if(props.param){
            quickSearch(props.param);
        }
        if(props.refe.isChecked && props.param != 'keyWordSeccret302'){
            async function consultRowExtern(obj){
                setLoading(true);
                let val = '';
                if(obj){
                    if(obj.target){
                        val = obj.target.value;
                    } else {
                        val = obj;
                    }
                }
                setLoading(true);
                await axios.get(constaApi+'search/contact/'+val+'/'+true, {
                    headers: {
                        "Accept": "application/json"
                    }
                }).then(function (response) {
                    setRowData(response.data);
                }).catch(error =>{
                    setLoading(false);
                });
            }
            consultRowExtern(props.param);
            Promise.all([consultRowExtern(props.param)])
            .then(function (result){
                setTimeout(() => {  setLoading(false); }, 1000);               
            })

        } else{
            consultRow();
        }
        if(props.param === 'keyWordSeccret302'){
            quickSearch(props.param);
        }
        if (!props.refe.isChecked && props.param && props.param != 'keyWordSeccret302') {
            quickSearch(props.param);
        }
    }, [props]);
    function quickSearch(value) {
        let objx = gridApi;
        value === 'keyWordSeccret302' ? objx.api.setQuickFilter("") : objx.api.setQuickFilter(value);
        setGridApi(objx);
    }
    async function consultRow() {
        await axios.get(constaApi + 'contacts', {
            headers: {
                "Accept": "application/json"
            }
        }).then(function (response) {
            const {data:dx} = response;
            let array = [];
            dx.map(d => {
                let obj ={
                    ...d,
                    ref1:d.contacts_references[0] ? d.contacts_references[0].name + " " +  d.contacts_references[0].father_lastname + " " +  d.contacts_references[0].mother_lastname : null,
                    ref2:d.contacts_references[1] ? d.contacts_references[1].name + " " +  d.contacts_references[1].father_lastname + " " +  d.contacts_references[1].mother_lastname : null,
                    ref3:d.contacts_references[2] ? d.contacts_references[2].name + " " +  d.contacts_references[2].father_lastname + " " +  d.contacts_references[2].mother_lastname : null,
                }
                array.push(obj);
            })
            setRowData(array);
        });
    }
    const onGridReady = (params) => {
        setGridApi(params);
        setColumnApi(params);
    }
    const openLateral = (obj) => {
        if (obj != null) {
            setLateralReference(obj[0]);
            setDinamicWidth('50%');
        }
    }
    const closeLateral = () => {
        setDinamicWidth('0px');
        setLateralReference(null);
    }
    const handleClose = () => {
        setmodal(false);
        setModalPro(false);
    }
    const onSubmit = () => {

    }
    const showModal = (id) => {
        let contact = { id: id };
        setTheContact(contact);
        setmodal(!modal);
    }
    const clickx = () => {}
    const updateRoute = () => {
        notification('success', 'Actualizado correctamente');
    }
    const notification = (type, message) => {
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
    function setData(e) {
        setRowData(e);
    }
    async function dropContact(id){
        await axios.post(constaApi + 'contacts/delete',{id:id}, {
            headers: {
                "Accept": "application/json"
            }
        }).then(function (response) {
            consultRow();
        });
    }
    function modalProspections(obj){
        setProspespections(obj);
        setModalPro(true);
    }
    return (
        <>
            <div className="content">
                <NotificationAlert ref={notificationAlert} />
               {loading 
               ?
               <Skeleton width="60rem" height={30} count={10} />
                :
           
                <div
                className="ag-theme-alpine"
                style={{ height: '100%', width: '100%' }}
                >
                    <AgGridReact
                        context={{
                            showModal,
                            dropContact,
                            modalProspections,
                        }}
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
                            cellRenderer="slotName"
                            headerName="Nombre" sortable={true} field="fullname" width="300" />
                             {/* Column Rating */}
                             <AgGridColumn
                           cellStyle={{ fontFamily:'Montserrat,sans-serif',fontSize:'13px',fontWeight:'500', color:'#3B3B3B'}}
                           cellRenderer="slotRating"
                           headerName="Rating" sortable={true} field="rating" width="300" />
                             {/* Column City */}
                             <AgGridColumn
                            cellStyle={{ fontFamily:'Montserrat,sans-serif',fontSize:'13px',fontWeight:'500', color:'#3B3B3B'}}
                            headerName="Ciudad" sortable={true} field="ciy" width="200" cellRenderer="slotOrigin" />

                            {/* Column Program */}
                            <AgGridColumn 
                             cellStyle={{ fontFamily:'Montserrat,sans-serif',fontSize:'13px',fontWeight:'500', color:'#3B3B3B'}}
                             headerName="Programa" field="prospections" width="200" cellRenderer="slotProgram" />

                             {/* Column references */}
                             <AgGridColumn 
                             headerName="Referencia" cellRenderer="slotReferences" width="200" />
                              {/* Column Advisor */}
                              <AgGridColumn 
                             headerName="Advisor" sortable={true} field="name_advisor" width="200" />
                             {/* Column Actions  */}
                             <AgGridColumn
                            headerName="Acciones"
                            cellRenderer="slotActions"
                            width={220}
                            />
                            
                             <AgGridColumn
                            cellStyle={{ fontFamily:'Montserrat,sans-serif',fontSize:'13px',fontWeight:'500', color:'#3B3B3B'}}
                            // cellRenderer="slotRef1"
                            headerName="Referencia 1" sortable={true} field="ref1" width="300" />
                             <AgGridColumn
                            cellStyle={{ fontFamily:'Montserrat,sans-serif',fontSize:'13px',fontWeight:'500', color:'#3B3B3B'}}
                            // cellRenderer="slotRef2"
                            headerName="Referencia 2" sortable={true} field="ref2" width="300" />
                             <AgGridColumn
                            cellStyle={{ fontFamily:'Montserrat,sans-serif',fontSize:'13px',fontWeight:'500', color:'#3B3B3B'}}
                            // cellRenderer="slotRef3"
                            headerName="Referencia 3 " sortable={true} field="ref3" width="300" />
                           
                        
                       
                        
                      
                    </AgGridReact>
                </div>
                }

                {/* editModal */}
                <Modal
                show={modal}
                dialogClassName="modalMax"
                onHide={handleClose}
                dialogClassName="modal-90w">
                    <Modal.Header style={{ height: '60px' }} closeButton>
                        <Modal.Title style={{ fontFamily:'Montserrat,sans-serif',color:'#000000', marginTop: '5px', fontWeight: '600', fontSize: '18px' }}>Referencias </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>
                        <div className="container-fluid">
                            <NotificationAlert ref={notificationAlert} />
                            <Row className="mt-1">
                                <Col>
                                    <References update={updateRoute} noReload={true} contact={theContact} />
                                </Col>
                            </Row>
                        </div>
                        <Row>

                            <Col>
                                <Button onClick={handleClose} className="float-right mb-3 mr-2 btn-info">
                                    Cerrar
                                    </Button>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>

                 {/* modal Prospecions */}
                 <Modal
                show={modalPro}
                dialogClassName="modalMax"
                onHide={handleClose}
                dialogClassName="modal-90w">
                    <Modal.Header style={{ height: '60px' }} closeButton>
                        <Modal.Title style={{ fontFamily:'Montserrat,sans-serif',color:'#000000', marginTop: '5px', fontWeight: '600', fontSize: '18px' }}>Prospecciones </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>
                        <div className="container-fluid">
                            <NotificationAlert ref={notificationAlert} />
                            <Row className="mt-1">
                            <div
        className="ag-theme-alpine"
        style={{ height: '100%', width: '100%' }}
      >
         <AgGridReact
           rowData={prospections}
        //    context={{
        //      exporta,
        //      loadProspections
        //    }}
           rowHeight={40}
           cellStyle={{ fontFamily:'Montserrat,sans-serif',fontSize:'13px',fontWeight:'500', color:'#3B3B3B'}}
           domLayout="autoHeight"
           rowClassRules={{
            'colorGrayAG': function (params) {
              var backColor = params.data.color;
              return params.data.color === 0 ;
            },
            'colorWhiteAG': 'data.color === -1',
          }}
           onGridReady={onGridReady}
           suppressRowTransform={true}
           pagination={true}
           paginationPageSize={10}
           frameworkComponents={frameworkComponents}
           paginationNumberFormatter={function (params) {
               return params.value.toLocaleString();
           }}
           rowSelection="multiple"
        >
          
          <AgGridColumn 
          headerName="Prospección"
          field="name_prospection" width={250}
          filter="agTextColumnFilter"
          />
          
         
            <AgGridColumn 
          headerName="Status"
          filter="agTextColumnFilter"
          field="status" width={150} />
        </AgGridReact>
      </div>
                            </Row>
                        </div>
                        <Row>

                            <Col>
                                <Button onClick={handleClose}  className="float-right mb-3 mr-2 btn-info"  >
                                    Cerrar
                                    </Button>
                            </Col>
                        </Row>
                    </Modal.Body>
                </Modal>


            </div>
        </>
    )
}

export default TableContacts

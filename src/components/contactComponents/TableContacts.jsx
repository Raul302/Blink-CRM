import React, { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/GlobalStyles.css';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
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
import { SlotName, SlotOrigin, SlotProgram, SlotReferences } from './SlotContacts';

function TableContacts(props) {
    const [frameworkComponents, setFramwrokw] = useState({ slotName: SlotName, slotOrigin: SlotOrigin, slotProgram: SlotProgram, slotReferences: SlotReferences });
    const [rowData, setRowData] = useState(props.rowData);
    const notificationAlert = useRef();
    const [gridApi, setGridApi] = useState();
    const [columnApi, setColumnApi] = useState();
    const [dinamicwidth, setDinamicWidth] = useState('0px');
    const [lateralReference, setLateralReference] = useState(null);
    const [modal, setmodal] = useState(false);
    const { register, handleSubmit, errors, reset, watch } = useForm({ mode: 'onChange' });
    const [theContact, setTheContact] = useState(null);
    const [columnDefs, setColumns] = useState([
        {
            headerName: "Nombre", field: "name", width: 250,
            cellRenderer: "slotName",
            getQuickFilterText: function (params) {
                console.log('GETQUICKFILTER');
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
        { headerName: "Programa", field: "id_program", width: 200, cellRenderer: 'slotProgram' },
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
        if (props.param) {
            quickSearch(props.param);
        }
    }, [props]);
    function quickSearch(value) {
        let objx = gridApi;
        console.log(value);
        value === 'keyWordSeccret302' ? objx.api.setQuickFilter("") : objx.api.setQuickFilter(value);
        setGridApi(objx);
    }
    async function consultRow() {
        await axios.get(constaApi + 'contacts', {
            headers: {
                "Accept": "application/json"
            }
        }).then(function (response) {
            setRowData(response.data);
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
    return (
        <>
            <div className="content">
                <NotificationAlert ref={notificationAlert} />
                <div
                    className="ag-theme-alpine"
                    style={{ height: '100%', width: '100%' }}
                >
                    <AgGridReact

                        rowData={rowData}
                        rowHeight={40}
                        domLayout="autoHeight"
                        onGridReady={onGridReady}
                        frameworkComponents={frameworkComponents}
                        pagination={true}
                        paginationPageSize={10}
                        paginationNumberFormatter={function (params) {
                            return '[' + params.value.toLocaleString() + ']';
                        }}
                        rowSelection="multiple"
                    >
                        <AgGridColumn
                            cellRenderer="slotName"
                            headerName="Nombre" field="fullname" width="250" />
                        <AgGridColumn headerName="Ciudad" field="ciy" width="200" cellRenderer="slotOrigin" />
                        <AgGridColumn headerName="Programa" field="id_program" width="200" cellRenderer="slotProgram" />
                        <AgGridColumn 
                        // cellRendererParams clickx: function(id){

                        // }
                        //  cellRendererParams: {
                        //     clickx: function (id) {
                        //         showModal(id);
                        //     },
                        // }
                        headerName="Referencia" field="fullnameReference" cellRenderer="slotReferences" width="200" />
                        <AgGridColumn
                            headerName="Acciones"
                            width={220}
                        />
                    </AgGridReact>
                </div>

                {/* editModal */}
                <Modal
                    show={modal}
                    dialogClassName="modalMax"
                    onHide={handleClose}
                    dialogClassName="modal-90w">
                    <Modal.Header style={{ height: '60px' }} closeButton>
                        <Modal.Title style={{ fontFamily: 'Inter', marginTop: '5px', fontWeight: '600', fontSize: '18px' }}>Referencias </Modal.Title>
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
                                <Button onClick={handleClose} style={{ fontFamily: 'Inter', fontWeight: '500' }} className="float-right mb-3 mr-2" variant="danger" >
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

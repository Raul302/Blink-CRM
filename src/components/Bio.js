import React, { useState } from 'react'
import { useParams } from "react-router";
import *  as FIcons from "react-icons/fi";
import *  as FAIcons from "react-icons/fa";
import *  as HIcons from "react-icons/hi";
import *  as RIcons from "react-icons/ri";
import * as CGIcons from "react-icons/cg";
import { Row, Col, Button, Modal, Form, FormControl, FormLabel } from 'react-bootstrap';


import {
    BrowserRouter as Router, Switch,
    Route, Link
} from 'react-router-dom';

function Bio() {
    let { id } = useParams();
    const [modal,setModal] = useState(false);
    const [param,setParam] = useState("");
    const [rowData, setRowData] = useState([
        { Nombre: "Email to Luis", Colegio: "Hace 2 meses", Grado: '10 min', Email: 'email@email.com' },
        { Nombre: "Email to Juan", Colegio: "Hace 1 mes", Grado: '3 min', Email: 'email@email2.com' },
        { Nombre: "Email to Alberto", Colegio: "Hace 5 meses", Grado: '8 min', Email: 'email3@email3.com' }
    ]);
    const showModal = function showModal(row) {
        setModal(true);
        setParam(row);
    };
    const handleClose = function close() {
        setModal(false);
    }

    return (
        <>
            <div className="mt-3 container cwml">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Grafica</h5>
                    </div>
                </div>
                <div class="card mt-3">
                    <div class="card-body">
                        <div class="row">
                            <span style={{ color: 'rgb(24, 39, 57)' }} class="Inter600B">
                                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="nonzero" d="M21 16.92v-.025a.998.998 0 0 0-.85-1.014 13.845 13.845 0 0 1-3.032-.755.998.998 0 0 0-1.05.221l-1.27 1.27a1 1 0 0 1-1.202.162 17 17 0 0 1-6.375-6.375 1 1 0 0 1 .162-1.201l1.266-1.266a1 1 0 0 0 .224-1.057 13.817 13.817 0 0 1-.753-3.02A1.003 1.003 0 0 0 7.11 3h-3a1 1 0 0 0-.996 1.074 18.8 18.8 0 0 0 2.92 8.24 18.511 18.511 0 0 0 5.7 5.697 18.774 18.774 0 0 0 8.176 2.913A1 1 0 0 0 21 19.92v-3zm2 2.996a3 3 0 0 1-3.288 2.998 20.78 20.78 0 0 1-9.058-3.22 20.49 20.49 0 0 1-6.303-6.3A20.805 20.805 0 0 1 1.124 4.27 3 3 0 0 1 4.11 1H7.1a3.002 3.002 0 0 1 3.001 2.59c.117.885.334 1.754.645 2.588a3.002 3.002 0 0 1-.679 3.17l-.717.716a15 15 0 0 0 4.586 4.586l.72-.721a3 3 0 0 1 3.164-.676c.836.312 1.705.529 2.6.647A3 3 0 0 1 23 16.93v2.985z"></path></svg>
                        &nbsp;Log a Call</span>
                            <span class="ml-4 Inter600B">
                                <FIcons.FiCalendar />
                        &nbsp; Log a meeting</span>
                            <span class="ml-4 Inter600B">
                                <HIcons.HiOutlineMail size={16} />
                        Log an email</span>
                        </div>
                    </div>
                </div>

                <div className="ag-theme-alpine  mt-3" style={{ width: '100%', height: '300px' }}>
                    <table class="table">
                        <thead style={{ width: '100%', backgroundColor: '#F8F8F8' }} >
                            <tr>
                                <th >Tipo</th>
                                <th >Cuando</th>
                                <th >Duracion</th>
                                <th >Raiting</th>
                                <th >Participantes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rowData.map(row => (
                                <tr id="tableBio" onClick={() => showModal(row)}>
                                    <td class="Inter500BT"><HIcons.HiOutlineMail style={{ color: '#4479FF' }} size={32} />
                    &nbsp; &nbsp;{row.Nombre} </td>
                                    <td class="Inter500BT"><RIcons.RiCalendarEventFill style={{ color: 'gray' }} size={12} />&nbsp; &nbsp; {row.Colegio}</td>
                                    <td class="Inter500BT">
                                        <FAIcons.FaClock style={{ color: '#CCCCCC' }} size={12} />
                        &nbsp; {row.Grado}</td>
                                    <td></td>
                                    <td><span class=" sc-fAjcbJ hkWfcR styles__User-sc-103gogw-2 gBkpnV">U</span>
                                        <CGIcons.CgFileDocument size={16} class="ml-5" style={{ color: '#C4CEE5' }} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>        
                    </div>


                     {/* FirstModal */}
            <Modal
                show={modal}
                dialogClassName="modalMax"
                onHide={handleClose}

            >
                <Modal.Body style={{ background: '#F4F5F6', border: '1px' }}>
                     <form >
                        <div className="container-fluid">
                            <Row>
                                <div style={{fontSize:'18px'}} class="col Inter600B">
                                    {param.Nombre}
                                </div>
                            </Row>
                            <Row class="mt-3">
                                <div class="col Inter600B">
                                <RIcons.RiCalendarEventFill style={{ color: 'gray' }} size={12} /> {param.Colegio}
                                </div>
                            </Row>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            </div>
        </>
    )
}

export default Bio

import React, { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/GlobalStyles.css';
import {
    Card,
    CardHeader,
    CardBody,
    Table,
    Row,
    Col,
} from "reactstrap";
import *  as RIcons from "react-icons/ri";
import { Link } from 'react-router-dom';
import axios from 'axios';
import NotificationAlert from "react-notification-alert";
import LateralReference from './LateralReference';
import References from 'components/referencesComponent/References';
import { useForm } from "react-hook-form";
import {Button, Modal, Form } from 'react-bootstrap';
import { constaApi } from 'constants/constants';

function TableContacts(props) {
    const [rowData, setRowData] = useState(props.rowData);
    const notificationAlert = useRef();
    const [dinamicwidth, setDinamicWidth] = useState('0px');
    const [lateralReference, setLateralReference] = useState(null);
    const [modal, setmodal] = useState(false);
    const { register, handleSubmit, errors, reset,watch } = useForm({ mode: 'onChange' });
    const [theContact,setTheContact] = useState(null);

    useEffect(() => {
        consultRow();

    }, [props]);
    async function consultRow() {
        await axios.get(constaApi +'contacts', {
            headers: {
                "Accept": "application/json"
            }
        }).then(function (response) {
            setRowData(response.data);
        });
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
    const showModal = (row) => {
        console.log('row',row);
        setTheContact(row);
        setmodal(!modal);
    }
    const updateRoute = () => {
        console.log('updateROute');
        notification('success','Actualizado correctamente');
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
    return (
        <>
            <div className="content">
                <NotificationAlert ref={notificationAlert} />
                <Row>
                    <Col className="mt-3" md="12">
                        <Card>
                            <CardHeader>
                                {/* <CardTitle tag="h4">Usuarios</CardTitle> */}
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Ciudad</th>
                                            <th>Programa</th>
                                            <th>Referencia</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rowData.map(row => (
                                            <tr key={row.id}>
                                                <td><RIcons.RiUser3Fill size={32} />
                                                    <Link to={"contacts/" + (row.id) + "/bio"} > {row.name} {row.father_lastname} {row.mother_lastname} </Link></td>
                                                <td>
                                                {(row.city ? row.city : ' ') + (row.state ? ', ' + row.state : '')}
                                                </td>
                                                <td>{row.id_program} {row.year}</td>
                                                {/* <td class="hover" onClick={(e) => 
                                                openLateral(row.contacts_references.length > 0 ? row.contacts_references : null)}
                                                >{row.contacts_references.length > 0 ?
                                                    [(row.contacts_references.map((contacts, i) => (
                                                        (i === 0 ?
                                                            (contacts.name + ' ' + contacts.father_lastname)
                                                            :
                                                            ''
                                                        )
                                                    )))
                                                    ]
                                                    : <h8>Sin referencias</h8>
                                                }</td> */}
                                                <td>
                                                    <a> <RIcons.RiEyeFill onClick={(e) => showModal(row)} style={{ color: '#79B9E1' }} size={18} /></a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                {/* editModal */}
                <Modal
                    show={modal}
                    dialogClassName="modalMax"
                    onHide={handleClose}
                    dialogClassName="modal-90w">
                    <Modal.Header style={{height:'60px'}} closeButton>
                    <Modal.Title style={{ fontFamily: 'Inter', marginTop:'5px', fontWeight: '600', fontSize: '18px' }}>Referencias </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>
                            <div className="container-fluid">
                            <NotificationAlert ref={notificationAlert} />
                                <Row className="mt-1">
                                <Col>
                                 <References update={updateRoute} noReload={true} contact={theContact}/>
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

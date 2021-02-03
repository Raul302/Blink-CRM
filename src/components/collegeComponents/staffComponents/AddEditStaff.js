import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { constaApi } from '../../../constants/constants';
import Select from 'react-select';
import NotificationAlert from "react-notification-alert";
import { activeReminderC, starLoadingRemindersC } from 'actions/contacts/remindersContacts/remindersContact';
import moment from 'moment'
import { newStaff,updateStaff } from 'actions/colleges/staff/staff';

export default function AddEditStaff(props) {
    useEffect(() => {
        if(props.flag){
            setObj({...activeStaff});
            showModal();
        }
    }, [props])
    const { active:activeStaff } = useSelector(state => state.staff);
    const dispatch = useDispatch();
    const notificationAlert = useRef();
    const [obj, setObj] = useState({ name: "", fname: "", mname: "", position: "", email: "", phone: "", ext: "",id_college:"" });
    const [modal, setModal] = useState(false);
    const [flagEdit, setflagEdit] = useState(false);
    const { register, handleSubmit, errors, reset, watch } = useForm({ mode: "onChange" });
    let { active } = useSelector(state => state.colleges);
    if(!active){
        active =  JSON.parse(localStorage.getItem('staffActive'));
     }
    // Methods
    function changeObj(e) {
        const { name, value } = e.target;
        switch (name) {
            case "name":
                setObj({ ...obj, name: value });
                break;
            case "fname":
                setObj({ ...obj, fname: value });
                break;
            case "mname":
                setObj({ ...obj, mname: value });
                break;
            case "email":
                setObj({ ...obj, email: value });
                break;
            case "position":
                setObj({ ...obj, position: value });
                break;
            case "phone":
                setObj({ ...obj, phone: value });
                break;
            case "ext":
                setObj({ ...obj, ext: value });
                break;
            default:
                break;
        }
    }
    function onSubmit() {
        setObj({ ...obj, id_college: active.id });
        if(props.flag){
            dispatch( updateStaff(obj) );
        } else {
            dispatch( newStaff(obj) );
        }
        props.clickFlag();
        handleClose();
    }
    
    function showModal() {
        setModal(!modal);

    }
    function handleClose() {
        setModal(!modal);
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

    return (
        <div className="mt-n5">
            <button onClick={(e) => showModal()} className="btn btn-primary">
                <span className="Inter"
                    style={{ fontSize: "18px" }}>+</span> Staff</button>

            <Modal
                style={{ marginTop: "50px" }}
                dialogClassName="modal-90w"
                show={modal}
                onHide={e => handleClose()}
            >
                <Modal.Header style={{ height: "60px" }} closeButton>
                    <Modal.Title style={{ fontFamily: "Inter", marginTop: "5px", fontWeight: "600", fontSize: "18px" }}>
                        {flagEdit ? 'Actualizar Staff' : 'Agregar Staff'} </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: "#F4F5F6", border: "0px" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="container-fluid">
                            <Row>
                                <Col>
                                    <Form.Label className="formGray">Nombre</Form.Label>
                                    <Form.Control name="name"
                                        onChange={(e) => changeObj(e)}
                                        autoComplete="off" className="formGray"
                                        type="text" placeholder="Escriba su nombre"
                                        value={obj.name}
                                        required
                                        title="Nombre requerido"
                                    />
                                </Col>
                                <Col>
                                    <Form.Label className="formGray">Apellido paterno</Form.Label>
                                    <Form.Control
                                        name="fname"
                                        onChange={(e) => changeObj(e)}
                                        autoComplete="off"
                                        className="formGray"
                                        type="text"
                                        placeholder="Escriba su apellido paterno.."
                                        value={obj.fname}
                                        required
                                        title="apellido requerido"
                                    />
                                </Col>
                                <Col>
                                    <Form.Label className="formGray">Apellido materno</Form.Label>
                                    <Form.Control name="mname"
                                        onChange={(e) => changeObj(e)}
                                        autoComplete="off" className="formGray" type="text" placeholder="Escriba su apellido materno..."
                                        value={obj.mname}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-8">
                                    <Form.Label className="formGray">Puesto</Form.Label>
                                    <Form.Control name="position"
                                        onChange={(e) => changeObj(e)}
                                        autoComplete="off" className="formGray" type="text" placeholder="Especifique su puesto..."
                                        value={obj.position}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-4">
                                    <Form.Label className="formGray">Email</Form.Label>
                                    <Form.Control name="email"
                                        onChange={(e) => changeObj(e)}
                                        autoComplete="off" className="formGray" type="email" placeholder="Escriba su email..."
                                        value={obj.email}
                                        required
                                    />
                                </Col>
                                <Col className="col-4">
                                    <Form.Label className="formGray">Telefono</Form.Label>
                                    <Form.Control name="phone"
                                        onChange={(e) => changeObj(e)}
                                        autoComplete="off" className="formGray" type="tel" placeholder="Escriba su telefono..."
                                        value={obj.phone}
                                        pattern="[0-9]{10}"
                                        title="Formato incorrecto"
                                    />
                                </Col>
                                <Col className="col-4">
                                    <Form.Label className="formGray">Ext.</Form.Label>
                                    <Form.Control name="ext"
                                        onChange={(e) => changeObj(e)}
                                        autoComplete="off" className="formGray" type="text" placeholder="Escriba la extension..."
                                        value={obj.ext}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <Row className="mt-3">

                            <Col>
                                <Button
                                    className="float-right mb-3 mr-2" type="submit"
                                    onSubmit={handleSubmit(onSubmit)}
                                    variant="primary">{flagEdit ? 'Actualizar' : 'Guardar'}</Button>
                                <Button onClick={handleClose} style={{ fontFamily: "Inter", fontWeight: "500" }} className="float-right mb-3 mr-2" variant="danger" >
                                    Cancelar
                        </Button>

                            </Col>
                        </Row>
                    </form>
                </Modal.Body>
            </Modal>
        </div>


    )
}

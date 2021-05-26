import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { constaApi } from '../../../constants/constants';
import Select from 'react-select';
import NotificationAlert from "react-notification-alert";
import { activeReminderC,starLoadingRemindersC } from 'actions/contacts/remindersContacts/remindersContact';
import moment from 'moment'
import '../../../styles/RBCheckboxFormStyles.css';
import { Checkbox } from '../../collegeComponents/AddOrEditCollege';
import { starLoadingAllRemindersC } from 'actions/contacts/remindersContacts/remindersContact';
import { starLoadingProspectRemindersC } from 'actions/contacts/remindersContacts/remindersContact';
import { starLoadingApplicationRemindersC } from 'actions/contacts/remindersContacts/remindersContact';
import { BrowserRouter as Router, Switch, 
    Route, Link, useLocation  } from 'react-router-dom';
import { useParams,} from "react-router";


export default function AddEditReminders(props) {
    // variables
    const { pathname } = useLocation();
    let { id:idInUrl } = useParams();
    const dispatch = useDispatch();
    const [contacts,setContacts] = useState();
    const [selectContact,setSelectContact] = useState(null);
    const [flagEdit, setFlago] = useState(false);
    const { active: activeReminder } = useSelector(state => state.remindersC);
    const { id: IDX } = useSelector(state => state.auth);
    const [selectValue, setSelectValue] = useState();
    let { active: contact } = useSelector(state => state.contacts);
    if(!contact){
        contact = JSON.parse(localStorage.getItem('contactsACtive'));
    }
    const [init] = useState(JSON.parse(localStorage.getItem('user')) || { logged: false });
    const { register, handleSubmit, errors, reset, watch } = useForm({ mode: "onChange" });
    const [modal, setModal] = useState(false);
    const [nameContact, setNameContact] = useState(contact ? contact.name + ' ' + (contact.father_lastname ?? '') + ' ' + (contact.mother_lastname ?? '') : null);
    const [subject, setSubject] = useState("");
    const [users, setUsers] = useState([{}]);
    const [timeReminder, setTimeReminder] = useState("");
    const [dateReminder, setDateReminder] = useState("");
    const [notificationReminder, setNotificationReminder] = useState();
    const [notes, setNotes] = useState("");
    const [departament, setDepartament] = useState("");
    const [values, setValues] = useState([{}]);
    const notificationAlert = useRef();
    const [now, setNow] = useState();
    const [nowTime, setNowTime] = useState();
    const [urgent, setUrgent] = useState(false);
    const [flagImportant,setFlagImportant] = useState({
        value:'Urgente',
        isChecked:false,
        label:'Urgente'
    });
    useEffect(() => {
        consult();
        present();
        if (activeReminder != null) {
            setActiveReminder();
        }
    }, [activeReminder])

    // Methods

    function resetArrays(){
        setFlagImportant({...flagImportant,isChecked:false});
    }
    function changeChecked(){
        let check = flagImportant.isChecked;
        check = check ? false : true ;
        setFlagImportant({...flagImportant,isChecked:check});
    }
    function present() {
        setNow(moment().format("YYYY-MM-DD"));
        setNowTime(moment().format("HH:mm"));
    }
    function setActiveReminder() {
        if (activeReminder.id != null) {
            let array = [];
            activeReminder.emails_to.forEach((element, index) => {
                values.forEach(el => {
                    if (element.email_user === el.email) {
                        array[index] = el;
                    }
                })
            })
            let datex = moment(activeReminder.dateReminder).format('YYYY-MM-DD')
            let timex = moment(activeReminder.dateReminder).format('HH:mm');
            setTimeReminder(timex);
            setDateReminder(datex);
            setFlago(true);
            setFlagImportant({...flagImportant,isChecked:activeReminder.urgent == "0" ? false : true});
            if(activeReminder.contact){
                setNameContact(activeReminder.contact);
            }
            setSubject(activeReminder.subject ?? null);
            setSelectValue(array ?? null);
            setDepartament(activeReminder.departament ?? null);
            setNotes(activeReminder.notes ?? null);
            setNotificationReminder(activeReminder.timenotification ?? null);
            showModal();
        }
    }
    function changeSubject(e) {
        setSubject(e.target.value);
    }
    function changeDepartament(e) {
        setDepartament(e.target.value);
    }
    function changeNotes(e) {
        setNotes(e.target.value);
    }
    function changeTimeReminder(e) {
        let currendate = moment(dateReminder + " "+ timeReminder).format("YYYY-MM-DD HH:mm");
        let nowDatecomparison = moment(now + " "+ nowTime).format("YYYY-MM-DD HH:mm");
        let strings = e.target.value;
        strings = strings.charAt(1)  + strings.charAt(2);
        let nowDate = moment(currendate).subtract(parseInt(strings), 'hour').format("YYYY-MM-DD HH:mm");
        if(nowDate < nowDatecomparison){
            notification('warning','Cuidado,estas ingresando un rango de valor no permitido');
            setNotificationReminder("");
        } else {
            setNotificationReminder(e.target.value);
        }

    }
    function changeDate(e) {
        if(e.target.value < now){
            notification('warning','Cuidado,estas ingresando una Fecha menor a la permitida');
        } else {
            setDateReminder(e.target.value)
        }
    }
    function changeTime(e) {
        if(e.target.value < nowTime){
            notification('warning','Cuidado,estas ingresando una Hora menor a la permitida');
        } else {
            setTimeReminder(e.target.value);
        }
    }
    const handleChange = (e) => {
        setSelectValue(e);
    }
    const handleChangeSelect = (e) =>{
        setSelectContact(e);
    }
    const consult = async () => {
        let data = {
            id: contact ? contact.id : null,
            idx: IDX
        };
        let result = [];
        let contactsResult = [];
        await axios.post(constaApi + 'defaultSelectBio', data)
            .then(function (response) {
                let { users,contacts:contactx } = response.data;
                users.forEach(us => {
                    result.push({
                        id: us.id,
                        value: us.name,
                        label:  us.name + ' ' + us.father_lastname + ' ' + us.mother_lastname,
                        email: us.email,
                        fullname: us.name + ' ' + us.father_lastname + ' ' + us.mother_lastname,
                        type: 'user',
                    })
                });
                contactx.forEach(us => {
                    contactsResult.push({
                        id: us.id,
                        value: us.name,
                        label:  us.name + ' ' + us.father_lastname + ' ' + us.mother_lastname,
                        email: us.email,
                        fullname: us.name + ' ' + us.father_lastname + ' ' + us.mother_lastname,
                        type: 'user',
                    })
                });
                setContacts(contactsResult);
                setValues(result);
            });
    }
    function showModal() {
        setModal(!modal);
    }
    async function onSubmit(data) {
        let url = flagEdit ? 'reminders/updated' : 'reminders/save';
        let datex = dateReminder + " " + timeReminder;
        let obj = {
            id: activeReminder ? activeReminder.id : null,
            id_contact: selectContact ? selectContact.id : contact.id ?? null,
            contact: selectContact ? selectContact.fullname : nameContact ?? null,
            subject: subject ?? null,
            emailTo: selectValue ?? null,
            dateReminder: datex ?? null,
            timenotification: notificationReminder ?? null,
            notes: notes ?? null,
            departament: props.prospection ? 'prospeccion' : props.applications ? 'aplicacion' : departament ?? null,
            urgent: flagImportant ? flagImportant.isChecked : null,
            type: props.prospection ? 'Prospeccion' : props.activeApplication ? 'Aplicacion' : 'General',
            id_type: props.activeProspect ? props.activeProspect.id : props.activeApplication ? props.activeApplication.id : 0
        };
        await axios.post(constaApi + url, obj)
            .then(function (response) {
                if(props.prospection){
                    dispatch( starLoadingProspectRemindersC(contact.id,props.activeProspect.id,'Prospeccion'));
                }else if(props.applications){
                    dispatch( starLoadingApplicationRemindersC(contact.id,props.activeApplication.id,'Aplicaciones'));
                }else {
                    dispatch(starLoadingRemindersC(contact.id));
                }
            }).catch(error => {

            });
        dispatch(activeReminderC(null, null));
        if(init && pathname != '/contacts/'+idInUrl+'/reminders'){
        dispatch(starLoadingAllRemindersC(init.id));
        } else {
            dispatch(starLoadingRemindersC(contact.id));
        }
        handleClose();
    }
    function handleClose() {
        resetArrays();
        dispatch(activeReminderC(null, null));
        setTimeReminder(null);
        setDateReminder(null);
        setSubject(null);
        setSelectValue(null);
        setSelectContact(null);
        setDepartament(null);
        setNotes(null);
        setNotificationReminder(null);
        setModal(false);
        setFlago(false);
    }
    const styles = {
        container: {
            width: "80%",
            margin: "0 auto",
        },
        input: {
            width: "100%",
        },
    };
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
                            <NotificationAlert ref={notificationAlert} />
            <button 
             disabled={props.blocked ? true:false}
            onClick={(e) => showModal()} className="btn btn-info">
                <span className="Inter"
                    style={{ fontSize: "18px" }}>+</span> Recordatorio</button>

            <Modal
                style={{ marginTop: "50px" }}
                dialogClassName="modal-90w"
                show={modal}
                onHide={e => handleClose()}
            >
                <Modal.Header style={{ height: "60px" }} closeButton>
                    <Modal.Title style={{ fontFamily: "Inter", marginTop: "5px", fontWeight: "600", fontSize: "18px" }}>
                        {flagEdit ? 'Actualizar Recordatorio' : 'Agregar Recordatorio'} </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: "#F4F5F6", border: "0px" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="container-fluid">
                            <Row>
                                {!props.openContacts || flagEdit
                                ?
                                <Col>
                                    <Form.Label className="formGray">Nombre</Form.Label>
                                    <Form.Control name="name"
                                        disabled
                                        autoComplete="off" className="formGray" type="text" placeholder="Ingrese su nombre"
                                        value={nameContact}
                                    />
                                </Col>
                                :
                                <Col>
                                    <Form.Label className="formGray">Contacto</Form.Label>
                                        <Select
                                            name="values"
                                            value={selectContact}
                                            onChange={(e) => handleChangeSelect(e)}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            placeholder="Selecciona un contacto"
                                            isLoading={true}
                                            options={contacts}
                                        />
                                </Col>
                                }
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-8">
                                    <Form.Label className="formGray">Asunto</Form.Label>
                                    <Form.Control name="subject"
                                        onChange={(e) => changeSubject(e)}
                                        autoComplete="off" className="formGray" type="text" placeholder="Escriba el asunto..."
                                        value={subject}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    <Form.Label className="formGray">Usuarios</Form.Label>
                                    {values &&
                                        <Select
                                            isMulti
                                            name="values"
                                            value={selectValue}
                                            onChange={(e) => handleChange(e)}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            placeholder="Selecciona un usuario"
                                            isLoading={true}
                                            options={values}
                                        />
                                    }
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col >
                                    <Form.Control style={{ height: '100px', width: '180px' }}
                                        onChange={(e) => changeDate(e)}
                                        value={dateReminder} autoComplete="off" name="date"
                                        className="formGray" type="date" placeholder="Ingrese su Fecha" />
                                </Col>
                                {/* <DatePicker 
                                selected={dateReminder}
                                className="mt-4 inputinvisible"
                                onChange={date => changeDate(date)}
                                /> */}
                                <Col className="mt-4">
                                    <Form.Control style={{ height: '30px', width: '120px' }}
                                        onChange={(e) => changeTime(e)}
                                        value={timeReminder} autoComplete="off" name="date"
                                        className="formGray"  type="time" placeholder="Ingrese su Fecha" />
                                </Col>
                                <Col className="col-5">
                                    <Form.Label className="formGray">Notificación</Form.Label>
                                    <Form.Control onChange={(e) => changeTimeReminder(e)}
                                        autoComplete="off"
                                        value={notificationReminder} name="type" as="select" size="sm" custom>
                                        <option disabled selected value=""></option>
                                        <option value="-0 hour">Misma hora</option>
                                        <option value="-1 hour">1 Hora Antes</option>
                                        <option value="-24 hour">1 Día Antes</option>
                                        <option value="-48 hour">2 Días Antes</option>
                                        <option value="-168 hour">1 Semana Antes</option>
                                    </Form.Control>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col>
                                    <Form.Label className="formGray">Notas</Form.Label>
                                    <InputGroup style={{ borderTop: '0', width: '100%', marginTop: '0px' }}>
                                        <Form.Control
                                            onChange={(e) => changeNotes(e)}
                                            value={notes} as="textarea" placeholder="Escriba su mensaje..." rows={8} />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                            {!props.prospection
                            ?
                            [!props.applications ?
                                <Col className="col-6">
                                <Form.Label className="formGray">Departamento</Form.Label>
                                <Form.Control onChange={(e) => changeDepartament(e)}
                                    autoComplete="off"
                                    value={departament} name="type" as="select" size="sm" custom>
                                    <option disabled value="" selected></option>
                                    <option value="prospeccion">Prospección</option>
                                    <option value="aplicacion">Aplicación</option>
                                    <option value="general">General</option>
                                </Form.Control>
                            </Col>
                            :
                            <></>
                            ]
                            :<></>
                            }
                                <Col className="mt-4 col-6">
                                <label class="custom-radio-checkbox">
                                <input class="custom-radio-checkbox__input" 
                                value={flagImportant}
                                checked={flagImportant.isChecked} type="checkbox" onChange={(e) => changeChecked(e)} />
                                <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                                <span class="custom-radio-checkbox__text">Urgente</span>
                                 </label>
                                </Col>
                            </Row>

                        </div>
                        <Row>

                            <Col>
                                <Button
                                    disabled={!subject ? true : !dateReminder ? true : !timeReminder ? true : !notificationReminder ? true : !departament ? true : false}
                                    className="float-right mb-3 mr-2 montse" type="submit"
                                    onSubmit={handleSubmit(onSubmit)}
                                    variant="info">{flagEdit ? 'Actualizar' : 'Guardar'}</Button>
                                <Button onClick={handleClose}  className="float-right mb-3 mr-2 montse" variant="danger" >
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

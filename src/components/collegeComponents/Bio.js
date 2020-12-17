import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react'
import *  as FIcons from "react-icons/fi";
import *  as FAIcons from "react-icons/fa";
import *  as HIcons from "react-icons/hi";
import *  as RIcons from "react-icons/ri";
import * as CGIcons from "react-icons/cg";
import * as MDIcons from "react-icons/md";
import * as BIIcons from "react-icons/bi";
import * as GRIcons from "react-icons/gr";
import { useForm } from "react-hook-form";
import { Row, Col, Button, Modal, Form, InputGroup, Popover, OverlayTrigger, FormControl, FormLabel } from 'react-bootstrap';
import Select from 'react-select';
import moment from 'moment'
import 'moment/locale/es'  // without this line it didn't work
import {
    BrowserRouter as Router, Switch,
    Route, Link
} from 'react-router-dom';
import { useAlert } from 'react-alert'
import axios from 'axios';

function Bio() {
    // Set moment spanish
    moment.locale('es-mx')
    const alert = useAlert();
    const { username: email } = useSelector(state => state.auth);
    const { active } = useSelector(state => state.colleges);
    useEffect(() => {
        consult();
        getBioRecords();
    }, [])
    const [twopart, setTwoPart] = useState(false);
    const [bioRecords, setBioRecords] = useState([]);
    const { handleSubmit } = useForm({});
    const [modal, setModal] = useState(false);
    const [modalLog, setModalLog] = useState(false);
    const [param, setParam] = useState("");
    const [tempParam, setTempParam] = useState("");
    const [rowData, setRowData] = useState([
        { Nombre: "Email to Luis", Colegio: "Hace 2 meses", Grado: '10 min', Email: 'email@email.com' },
        { Nombre: "Email to Juan", Colegio: "Hace 1 mes", Grado: '3 min', Email: 'email@email2.com' },
        { Nombre: "Email to Alberto", Colegio: "Hace 5 meses", Grado: '8 min', Email: 'email3@email3.com' }
    ]);
    const [tempsubject, setTemp] = useState();
    const [subject, setSubject] = useState("");
    const [selectValue, setSelectValue] = useState();
    const [dateBio, setDateBio] = useState();
    const [textBio, setTextBio] = useState();

    const getBioRecords = async () => {
        let obj = {
            id: active.id
        }
        await axios.post('http://api.boardingschools.mx/api/bio/colleges', obj, {
            headers: {
                "Accept": "application/json"
            }
        })
            .then(function (response) {
                console.log('response', response.data);
                setBioRecords(response.data);
            });
    }
    const consult = async () => {
        let data = {
            id: active.id,
            email: email
        };
        await axios.post('http://api.boardingschools.mx/api/defaultCollegeBio', data)
            .then(function (response) {
                let { college, user, users } = response.data;
                let result = user.map(col => {
                    return {
                        value: col.name,
                        label: col.name
                    };
                })
                college.map(u => {
                    result.push(
                        {
                            value: u.name,
                            label: u.name
                        }
                    )
                })
                users.forEach(us => {
                    if (us.name === result[1].value) {
                    } else {
                        result.push({
                            value: us.name,
                            label: us.name
                        })
                    }
                });
                setValues(result);
            });
    }
    const [values, setValues] = useState([{}]);
    const showModal = function showModal(row) {
        setModal(true);
        console.log('ROW', row);
        setParam(row);
        setTempParam(row.text);
    };
    const handleChange = (e) => {
        setSubject(e[1] ? tempsubject + ' a ' + e[1].value : tempsubject + ' a ' + '')
        setSelectValue(e);
    }
    const showModalLog = function showModalLog(subject) {
        setTextBio("");
        setModalLog(true);
        setTemp(subject);
        setSubject(values[1] ? subject + ' a ' + values[1].value : subject + ' a ' + '');
    }
    const handleClose = function close() {
        setModal(false);
        setModalLog(false);
    }
    async function onSubmit(data) {
        if(modal){
            let obj = param;
            console.log('obj',obj);
            obj.text = tempParam;
            console.log(obj);
            await axios.post('http://api.boardingschools.mx/api/bio/update', obj, {
                headers: {
                    "Accept": "application/json"
                }
            })
                .then(function (response) {
                    setParam(response.data);
                    getBioRecords();
                    handleEdit();
                });
        } else {
            let datax = {
                id_college: active.id,
                subject: subject,
                values: selectValue ? selectValue : [values[0], values[1]],
                date: dateBio,
                text: textBio
            };
            axios.post('http://api.boardingschools.mx/api/bio/save', datax)
                .then(function (response) {
                    alert.show('Guardado correctamente');
                    getBioRecords();
                });
            // alert.show('Ocurrio un error inesperado en la Base de datos');
        }
        handleClose();
    }

    function changeDate(e) {
        setDateBio(e.target.value);
    }
    function changeText(e) {
        setTextBio(e.target.value);
    }
    // const showText = (text) =>{
    // console.log('text');
    // }
    const handleEdit = (e) => {
        setTempParam(param.text);
        setTwoPart(!twopart);
    }
    const showDate = (dateBD) => {
        return moment(dateBD).locale('es-mx').format('LL');
    }
    const showSubject = (subject) => {
        let tag = '';
        if (subject.includes('Llamada')) {
            tag = <span class="Inter600B">
                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" fillRule="nonzero" d="M21 16.92v-.025a.998.998 0 0 0-.85-1.014 13.845 13.845 0 0 1-3.032-.755.998.998 0 0 0-1.05.221l-1.27 1.27a1 1 0 0 1-1.202.162 17 17 0 0 1-6.375-6.375 1 1 0 0 1 .162-1.201l1.266-1.266a1 1 0 0 0 .224-1.057 13.817 13.817 0 0 1-.753-3.02A1.003 1.003 0 0 0 7.11 3h-3a1 1 0 0 0-.996 1.074 18.8 18.8 0 0 0 2.92 8.24 18.511 18.511 0 0 0 5.7 5.697 18.774 18.774 0 0 0 8.176 2.913A1 1 0 0 0 21 19.92v-3zm2 2.996a3 3 0 0 1-3.288 2.998 20.78 20.78 0 0 1-9.058-3.22 20.49 20.49 0 0 1-6.303-6.3A20.805 20.805 0 0 1 1.124 4.27 3 3 0 0 1 4.11 1H7.1a3.002 3.002 0 0 1 3.001 2.59c.117.885.334 1.754.645 2.588a3.002 3.002 0 0 1-.679 3.17l-.717.716a15 15 0 0 0 4.586 4.586l.72-.721a3 3 0 0 1 3.164-.676c.836.312 1.705.529 2.6.647A3 3 0 0 1 23 16.93v2.985z"></path></svg>
&nbsp;{subject}</span>;
        }
        if (subject.includes('Whatssap')) {
            tag = <span class="Inter600B"><FAIcons.FaWhatsapp />&nbsp; {subject}</span>
        }
        if (subject.includes('Cita')) {
            tag = <span class="Inter600B">
                <FIcons.FiCalendar />&nbsp;
            {subject}</span>
        }
        if (subject.includes('Email')) {
            tag = <span class=" Inter600B">
                <HIcons.HiOutlineMail size={16} />&nbsp;
    {subject}</span>
        }
        return tag
    }
    const showParticipant = (name) => {
        let n = name ? name : " ";
        if (n) {
            n = n.charAt(0) + n.charAt(1);
        }
        return n;
    }
    const PopoverComponent = (text) => {
        return (<Popover id="popover-basic">
            {/* <Popover.Title as="h3">Popover right</Popover.Title> */}
            <Popover.Content>
                <strong>{text}</strong>
            </Popover.Content>
        </Popover>)
    }

    const changeBio = async (e) => {
        console.log('EEE',e.target.value);
        setTempParam(e.target.value);
        let name = '';
        name = await e.target.value;
    }
    const deleteComment = async (id) => {
        console.log('id',id);
        await axios.post('http://api.boardingschools.mx/api/bio/delete', {id:id}, {
            headers: {
                "Accept": "application/json"
            }
        })
            .then(function (response) {
                alert.show('Borrado correctamente');
                handleClose();
                getBioRecords();
            });
    }

    return (
        <>
            <div className="mt-3 container cwml">
                <div class="card mt-3">
                    <div class="card-body">
                        <div class="row">
                            <span onClick={() => showModalLog('Llamada')} class="Inter600B">
                                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" fillRule="nonzero" d="M21 16.92v-.025a.998.998 0 0 0-.85-1.014 13.845 13.845 0 0 1-3.032-.755.998.998 0 0 0-1.05.221l-1.27 1.27a1 1 0 0 1-1.202.162 17 17 0 0 1-6.375-6.375 1 1 0 0 1 .162-1.201l1.266-1.266a1 1 0 0 0 .224-1.057 13.817 13.817 0 0 1-.753-3.02A1.003 1.003 0 0 0 7.11 3h-3a1 1 0 0 0-.996 1.074 18.8 18.8 0 0 0 2.92 8.24 18.511 18.511 0 0 0 5.7 5.697 18.774 18.774 0 0 0 8.176 2.913A1 1 0 0 0 21 19.92v-3zm2 2.996a3 3 0 0 1-3.288 2.998 20.78 20.78 0 0 1-9.058-3.22 20.49 20.49 0 0 1-6.303-6.3A20.805 20.805 0 0 1 1.124 4.27 3 3 0 0 1 4.11 1H7.1a3.002 3.002 0 0 1 3.001 2.59c.117.885.334 1.754.645 2.588a3.002 3.002 0 0 1-.679 3.17l-.717.716a15 15 0 0 0 4.586 4.586l.72-.721a3 3 0 0 1 3.164-.676c.836.312 1.705.529 2.6.647A3 3 0 0 1 23 16.93v2.985z"></path></svg>
                        &nbsp;LLamada</span>
                            <span onClick={() => showModalLog('Whatssap')} class="ml-4 Inter600B">
                                <FAIcons.FaWhatsapp />
                                &nbsp; Whatssap
                        </span>
                            <span onClick={() => showModalLog('Cita')} class="ml-4 Inter600B">
                                <FIcons.FiCalendar />
                        &nbsp; Cita</span>
                            <span onClick={() => showModalLog('Email')} class="ml-4 Inter600B">
                                <HIcons.HiOutlineMail size={16} />
                        Email</span>
                        </div>
                    </div>
                </div>
                {bioRecords ?
                    <div className="ag-theme-alpine twml mt-3" style={{ width: '100%', height: '300px' }}>
                        <table class="table">
                            <thead style={{ backgroundColor: '#F8F8F8' }} >
                                <tr>
                                    <th >Motivo</th>
                                    <th >Fecha</th>
                                    <th >Texto</th>
                                    <th >Participantes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bioRecords.map(row => (
                                    <tr onClick={(e) => showModal(row)} key={row.id}>
                                        <td>{showSubject(row.subject)}</td>
                                        <td>{showDate(row.date)}</td>
                                        <td >
                                            <OverlayTrigger trigger={["hover", "hover"]} placement="top"
                                                overlay={PopoverComponent(row.text)}>
                                                <Button variant="white">
                                                    <svg width="16" height="16" viewBox="0 0 16 16" style={{ color: 'rgb(192, 203, 227)' }}>
                                                        <path fill="currentColor"
                                                            d="M9.944 0a.72.72 0 0 1 .511.213l4.333 4.364A.73.73 0 0 1 15 5.09v8.727C15 15.023 14.03 16 12.833 16H4.167A2.174 2.174 0 0 1 2 13.818V2.182C2 .977 2.97 0 4.167 0h5.777zm-.299 1.455H4.167a.725.725 0 0 0-.723.727v11.636c0 .402.324.727.723.727h8.666a.725.725 0 0 0 .723-.727V5.392l-3.91-3.937z"></path><path fill="currentColor" d="M10.667 4.364h3.61c.4 0 .723.325.723.727a.725.725 0 0 1-.722.727H9.944a.725.725 0 0 1-.722-.727V.727c0-.401.324-.727.722-.727.4 0 .723.326.723.727v3.637zM11.389 8c.399 0 .722.326.722.727a.725.725 0 0 1-.722.728H5.61a.725.725 0 0 1-.722-.728c0-.401.323-.727.722-.727h5.778zM11.389 10.91c.399 0 .722.325.722.726a.725.725 0 0 1-.722.728H5.61a.725.725 0 0 1-.722-.728c0-.401.323-.727.722-.727h5.778zM7.056 5.09c.398 0 .722.327.722.728a.725.725 0 0 1-.722.727H5.61a.725.725 0 0 1-.722-.727c0-.401.323-.727.722-.727h1.445z">
                                                        </path>
                                                    </svg>
                                                </Button>
                                            </OverlayTrigger>
                                        </td>
                                        <td>{row.participants.map(part => (
                                            <span class=" sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnV">{showParticipant(part.name)}</span>
                                        ))}

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    :
                    ''
                }


                {/* FirstModal */}
                <Modal
                    show={modal}
                    dialogClassName="modalMax"
                    onHide={handleClose}

                >
                    <Modal.Body style={{ background: '#F4F5F6', border: '1px' }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="container" >
                                <Row>
                                    <div style={{ fontSize: '18px' }} class="col Inter600B">
                                        {param.subject}
                                    </div>
                                    <div class="justify-content-end">
                                    <FAIcons.FaTrashAlt style={{color:'red'}} size={18} onClick={(e) => {deleteComment(param.id)}} /> 
                                    </div>
                                </Row>
                                <Row className="mt-2">
                                    <div style={{ fontSize: '14px' }} class="col Inter">
                                        <svg width="18" height="20" viewBox="0 0 18 20" style={{ color: 'rgb(66, 82, 110)', height: '16px', width: '14px' }}>
                                            <g fill="none" fillRule="evenodd">
                                                <path fill="currentColor" fillRule="nonzero" d="M14 11H9v5h5v-5zM13 0v2H5V0H3v2H2C.89 2 .01 2.9.01 4L0 18a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2h-1V0h-2zm3 18H2V7h14v11z">
                                                </path>
                                                <path d="M-3-1h24v24H-3z">
                                                </path>
                                            </g>
                                        </svg>  {showDate(param.date)}
                                    </div>
                                </Row>
                                {param.participants
                                    &&
                                    <Row className="mt-3">
                                        <div style={{ fontSize: '14px' }} class="col Inter600B">
                                            Atendido por :
                                        {param.participants.map(part => (
                                            <Row className="mt-2">
                                                <span class=" sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnV">{showParticipant(part.name)}</span>
                                                <span>{part.name}</span>
                                            </Row>
                                        ))}
                                        </div>
                                    </Row>
                                }
                                {twopart ?
                                    <>
                                        <Row className="mt-2">
                                            <div style={{ fontSize: '16px' }} class="col Inter600B">
                                                Editar la nota
                                    </div>
                                            <InputGroup className="mt-2 ml-3" style={{ borderTop: '0', width: '100%', marginTop: '0px' }}>
                                                <Form.Control
                                                    onChange={(e) => changeBio(e)}
                                                    value={tempParam} as="textarea" placeholder="Escriba su mensaje..." rows={8} />
                                            </InputGroup>
                                        </Row>
                                        <Row>
                                            <Col className="mt-3 ">

                                                <Button
                                                    style={{ marginRight: '-15px' }}
                                                    onSubmit={handleSubmit(onSubmit)}
                                                    className="float-right" type="submit"
                                                    variant="primary">Guardar</Button>
                                                <Button onClick={handleEdit} style={{ color: '#4479ff', fontFamily: 'Inter', fontWeight: '500' }} className="float-right mb-3 mr-2" variant="light" >
                                                    Cancelar
                                </Button>
                                            </Col>
                                        </Row>
                                    </>
                                    :
                                    <Row >
                                        <div onClick={(e) => handleEdit(e)} style={{ backgroundColor: 'white' }} class="ml-3 mt-3 container">
                                            <p style={{ color: '#7A859C' }}> {param.text}</p>
                                        </div>
                                    </Row>
                                }
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>

                <Modal
                    show={modalLog}
                    dialogClassName="modalMax"
                    onHide={handleClose}

                >
                    <Modal.Body style={{ background: '#F4F5F6', border: '1px' }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="container-fluid">
                                <Row>
                                    <Col className="col-2">
                                        Atendido:
                                </Col>
                                    <Col className="col-1">
                                        <MDIcons.MdGroup />
                                    </Col>
                                    <Col style={{ marginLeft: '-30px' }} className="col">
                                        {values &&
                                            <Select
                                                isMulti
                                                name="values"
                                                value={selectValue}
                                                onChange={(e) => handleChange(e)}
                                                defaultValue={[values[0], values[1]]}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                options={values}
                                            />
                                        }
                                    </Col>

                                </Row>
                                <Row className="mt-3">
                                    <Col className="col-6">
                                        <Form.Control style={{ height: '100px', width: '180px' }}
                                            onChange={(e) => changeDate(e)}
                                            value={dateBio} autoComplete="off" name="date"
                                            className="formGray" type="date" placeholder="Ingrese su Fecha" />
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <InputGroup className="">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text className="Inter600B" style={{ backgroundColor: '#FFFFFF', borderRight: '0' }}>Motivo:</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl style={{ backgroundColor: '#FFFFFF', borderBottom: '0', borderLeft: '0' }} value={subject} id="inlineFormInputGroup" placeholder="" />
                                    </InputGroup>
                                    <InputGroup className="ml-3" style={{ borderTop: '0', width: '100%', marginTop: '0px' }}>
                                        <Form.Control
                                            onChange={(e) => changeText(e)}
                                            value={textBio} as="textarea" placeholder="Escriba su mensaje..." rows={8} />
                                    </InputGroup>
                                </Row>
                                <Row>

                                    <Col className="mt-3 ">
                                        <Button
                                            style={{ marginRight: '-15px' }}
                                            onSubmit={handleSubmit(onSubmit)}
                                            className="float-right" type="submit"
                                            variant="primary">Guardar</Button>
                                        <Button onClick={handleClose} style={{ color: '#4479ff', fontFamily: 'Inter', fontWeight: '500' }} className="float-right mb-3 mr-2" variant="light" >
                                            Cancelar
                                </Button>

                                    </Col>
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

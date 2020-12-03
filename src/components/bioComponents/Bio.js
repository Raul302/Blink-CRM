import React, { useState,useEffect } from 'react'
import *  as FIcons from "react-icons/fi";
import *  as FAIcons from "react-icons/fa";
import *  as HIcons from "react-icons/hi";
import *  as RIcons from "react-icons/ri";
import * as CGIcons from "react-icons/cg";
import * as MDIcons from "react-icons/md";
import * as BIIcons from "react-icons/bi";
import * as AIIcons from "react-icons/ai";
import { useForm } from "react-hook-form";
import { Row, Col, Button, Modal, Form, InputGroup, FormControl, FormLabel } from 'react-bootstrap';
import Select from 'react-select';
import chroma from 'chroma-js';
import {
    BrowserRouter as Router, Switch,
    Route, Link
} from 'react-router-dom';
import { useAlert } from 'react-alert';
import AsyncSelect from 'react-select/async';

function Bio(props) {
    const [init,setInit] = useState(JSON.parse(localStorage.getItem('user')) || { logged: false });
    const alert = useAlert()
    const { handleSubmit } = useForm({});
    let id = 1;
    const [contact,setContact] = useState(props.contact)
    useEffect(() => {
        console.log('PROPS',props.contact.name);
        console.log('INIT',init);
    }, [props])
  
    function onSubmit(data){
        alert.show('Ocurrio un error inesperado en la Base de datos');
        handleClose();
    }
const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? chroma.contrast(color, 'white') > 2
          ? 'white'
          : 'black'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
};
  
    const [modal, setModal] = useState(false);
    const [modalLog, setModalLog] = useState(false);
    const [param, setParam] = useState("");
    const [subject, setSubject] = useState("");
    const [rowData, setRowData] = useState([
        { Nombre: "Email to Luis", Colegio: "Hace 2 meses", Grado: '10 min', Email: 'email@email.com' },
        { Nombre: "Email to Juan", Colegio: "Hace 1 mes", Grado: '3 min', Email: 'email@email2.com' },
        { Nombre: "Email to Alberto", Colegio: "Hace 5 meses", Grado: '8 min', Email: 'email3@email3.com' }
    ]);
    const showModal = function showModal(row) {
        setModal(true);
        setParam(row);
    };
    const showModalLog = function showModalLog(subject) {
        setModalLog(true);
        setSubject(subject + ' a ' + id);
    }
    const handleClose = function close() {
        setModal(false);
        setModalLog(false);
    }
    const colourOptions = [
        { value: init.name, label: init.name, color: '#00B8D9', isFixed: true },
        { value: 'Raul', lalbel: 'raul', color: '#0052CC',  },
      
    ];

    function changevalue(e){
    }

    return (
        <>
            <div className="mt-3 container cwml">
                <div class="card mt-3">
                    <div class="card-body">
                        <div class="row">
                            <span onClick={() => showModalLog('Llamada')} class="Inter600B">
                                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="nonzero" d="M21 16.92v-.025a.998.998 0 0 0-.85-1.014 13.845 13.845 0 0 1-3.032-.755.998.998 0 0 0-1.05.221l-1.27 1.27a1 1 0 0 1-1.202.162 17 17 0 0 1-6.375-6.375 1 1 0 0 1 .162-1.201l1.266-1.266a1 1 0 0 0 .224-1.057 13.817 13.817 0 0 1-.753-3.02A1.003 1.003 0 0 0 7.11 3h-3a1 1 0 0 0-.996 1.074 18.8 18.8 0 0 0 2.92 8.24 18.511 18.511 0 0 0 5.7 5.697 18.774 18.774 0 0 0 8.176 2.913A1 1 0 0 0 21 19.92v-3zm2 2.996a3 3 0 0 1-3.288 2.998 20.78 20.78 0 0 1-9.058-3.22 20.49 20.49 0 0 1-6.303-6.3A20.805 20.805 0 0 1 1.124 4.27 3 3 0 0 1 4.11 1H7.1a3.002 3.002 0 0 1 3.001 2.59c.117.885.334 1.754.645 2.588a3.002 3.002 0 0 1-.679 3.17l-.717.716a15 15 0 0 0 4.586 4.586l.72-.721a3 3 0 0 1 3.164-.676c.836.312 1.705.529 2.6.647A3 3 0 0 1 23 16.93v2.985z"></path></svg>
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
                                        {param.Nombre}
                                    </div>
                                </Row>
                                <Row className="mt-3">
                                    <div style={{ fontSize: '14px' }} class="col Inter600B">
                                        Atendido por :
                                    </div>
                                </Row>
                                <Row className="mt-2">
                                <span class=" sc-fAjcbJ hkWfcR styles__User-sc-103gogw-2 gBkpnV">U</span> 
                                <span style={{marginLeft:'5px'}} class="mt-2 Inter500">Usuario </span>
                                </Row>
                            </div>J
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
                                    <AsyncSelect cacheOptions 
                                        isMulti
                                        defaultValue={[colourOptions[0], colourOptions[1]]}
                                         
                                    />
                                    </Col>

                                </Row>
                                <Row className="mt-3">
                                    <Col className="col-6">
                                        <Form.Control style={{ height: '100px', width: '180px' }} autoComplete="off" name="date"
                                            className="formGray" type="date" placeholder="Ingrese su Fecha" />
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <InputGroup className="">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text className="Inter600B" style={{ backgroundColor: '#FFFFFF', borderRight: '0' }}>Motivo:</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl style={{ backgroundColor: '#FFFFFF',borderBottom:'0', borderLeft: '0' }} value={subject} id="inlineFormInputGroup" placeholder="" />
                                    </InputGroup>
                                    <InputGroup className="ml-3" style={{ borderTop:'0',width:'100%',marginTop:'0px'}}>
                                        <Form.Control as="textarea" placeholder="Escriba su mensaje..." rows={8} />
                                    </InputGroup>
                                </Row>
                                <Row>

<Col  className="mt-3 ">
    <Button
    style={{marginRight:'-15px'}}
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

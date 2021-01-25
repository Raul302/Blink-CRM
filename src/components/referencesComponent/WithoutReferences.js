import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/GlobalStyles.css';
import * as GrIcons from 'react-icons/gr';
import { Row, Col, Button, Modal, Form, FormControl, FormLabel } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import axios from 'axios';
import { constaApi } from '../../constants/constants';

function WithoutReferences(props) {

    useEffect(() => {
    }, [props])
    const [validFieldFour, setvalidFieldFour] = useState(true);
    const [extra, setExtra] = useState(false);
    const [modal3, setModal3] = useState(false);
    const [modal4, setModal4] = useState(false);
    const [validFieldThree, setvalidFieldThree] = useState(true);
    const { register: reference, handleSubmit: handleSubmitReference, errors: errorsReference, formState: formStateReference, reset:resetReference
    } = useForm({ mode: 'onChange' });
   const styles = {
       container: {
           width: "80%",
           margin: "0 auto",
       },
       input: {
           width: "100%",
       },
   };
   const [addrtype, setAddrtype] = useState(["Papa", "Mama", "Hermano/Hermana", "Otro"])
   const Add = addrtype.map(Add => Add
   )
   // function showReference (e){
   // }
   const showOtherReference = (e) => {
       if (e.target.value) {
           setvalidFieldFour(false);
       } else {
           setvalidFieldFour(true);
       }
   }
   const showReference = (e) => {
       if ((addrtype[e.target.value]) == "Otro") {
           setExtra(true);
           setvalidFieldFour(true);
       } else {
           setExtra(false);
           setvalidFieldFour(false);
       }
       if (e.target.value) {
           setvalidFieldThree(false);
       } else {
           setvalidFieldThree(true);
       }
   }
   const handleClose = function close() {
    resetReference();
    setModal3(false);
    setModal4(false);
    props.handlerUpdate();

}

async function onSubmit(data) {
    console.log('props',props);
        data.idContact = props.id;
        await axios.post(constaApi +'references',data)
        .then(function (response) {
        })
        showModal4();
        resetReference();
}
const showModal3 = function close() {
    setvalidFieldThree(true);
    setExtra(false);
    setModal4(false);
    setModal3(true);
};

const showModal4 = function close() {
    setModal3(false);
    setModal4(true);
};
function handlevalidFour(e) {
    if (e.target.value) {
        setvalidFieldFour(false);
    } else {
        setvalidFieldFour(true);
    }
}

    return (
        <>
        <div class="d-flex justify-content-end">
        <button onClick={(e) => showModal3()} class="btn btn-primary"><span style={{fontSize:'16px'}} >+</span> Referencia</button>
        </div>
            {/* MODAL */}

            
            {/* Three Modal */}
            <Modal
                show={modal3}
                dialogClassName="modal-90w"
                style={{marginTop:'50px'}}
                onHide={handleClose}
            >
                 <Modal.Header style={{height:'60px'}} closeButton>
                    <Modal.Title style={{ marginTop:'5px',fontFamily: 'Inter', fontWeight: '600', fontSize: '18px' }}>Agregar referencia</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>
                <form onSubmit={handleSubmitReference(onSubmit)}>
                        <div className="container-fluid">
                            <Row>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Tipo de referencia</Form.Label>
                                    < select
                                    ref={reference({
                                        required: true
                                    })} 
                                    name="type_ref"
                                        onChange={e => showReference(e)}
                                        className="browser-default custom-select" >
                                        {
                                            Add.map((address, key) => <option value={key}>{address}</option>)
                                        }
                                    <option disabled value= "" selected ></option>
                                    </select >

                                </Col>
                                {extra &&
                                    <Col className="col-6">
                                        <Form.Label className="formGray">Referencia</Form.Label>
                                        <Form.Control autoComplete="off"  onChange={e => showOtherReference(e)} ref={reference({
                                    })} 
                                    name="name_ref"
                                     className="formGray" type="text" placeholder="Ingrese la referencia" />
                                    </Col>

                                }
                            </Row>

                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Nombre</Form.Label>
                                    <Form.Control  ref={reference({})} name="name" onChange={e => handlevalidFour(e)} autoComplete="off" className="formGray" type="text" placeholder="Ingrese su nombre" />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Apellido Paterno</Form.Label>
                                    <Form.Control autoComplete="off" ref={reference({})} name="father_lastname" className="formGray" type="text" placeholder="Ingrese su primer apellido" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Apellido Materno</Form.Label>
                                    <Form.Control autoComplete="off" ref={reference({})} name="mother_lastname" className="formGray" type="text" placeholder="Ingrese su segundo apellido" />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Email</Form.Label>
                                    <Form.Control autoComplete="off" ref={reference({})} name="email" className="formGray" type="email" placeholder="Ingrese su email" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Telefono</Form.Label>
                                    <Form.Control autoComplete="off" ref={reference({})} name="phone" className="formGray" type="tel" placeholder="Ingrese su telefono" />
                                </Col>
                            </Row>
                        </div>
                        <Row className="mt-1">

                            <Col>
                                <Button 
                                disabled={validFieldThree || validFieldFour}
                                className="float-right mb-3 mr-2" type="submit" variant="primary">Guardar</Button>
                                <Button onClick={handleClose} style={{ fontFamily: 'Inter', fontWeight: '500' }} className="float-right mb-3 mr-2" variant="danger" >
                                    Cancelar
</Button>

                            </Col>
                        </Row>
                    </form>
                </Modal.Body>

            </Modal>



            {/* Four Modal */}
            <Modal
                show={modal4}
                dialogClassName="modalMax"
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: '18px' }}>Agregar Referencia</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>
                    <div className="row mt-5"></div>
                    <div className="row mt-5"></div>
                    <div className="row mt-5"></div>
                    <div className="container">
                        <div className="row">
                            <div className="mx-auto">
                                <h1 className="Inter600B">Referencia Guardada!</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mx-auto">
                                <span className="Inter500" > ¿Te gustaria agregar otra referencia?</span>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="mx-auto">
                            <button className="btn btn-primary Inter600" onClick={showModal3}>Agregar una referencia</button>

                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="mx-auto">
                            <a className="Inter500B" onClick={handleClose}>Terminar</a>
                        </div>
                    </div>
                    <div className="row mb-5"></div>
                    <div className="row mb-5"></div>
                    <div className="row mb-5"></div>
                </Modal.Body>

            </Modal>

        </>
    )
}

export default WithoutReferences

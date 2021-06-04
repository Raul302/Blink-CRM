import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/GlobalStyles.css';
import * as GrIcons from 'react-icons/gr';
import * as FAIcons from 'react-icons/fa';
import * as TIicons from "react-icons/ti";
import { Row, Col, Button, Modal, Form, FormControl, FormLabel,InputGroup } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import axios from 'axios';
import { constaApi } from '../../constants/constants';

function WithoutReferences(props) {

    useEffect(() => {
        consultCountries();
    }, [props])
    const [countries, setCountries] = useState([]);
    const [validFieldFour, setvalidFieldFour] = useState(true);
    const [extra, setExtra] = useState(false);
    const [modal3, setModal3] = useState(false);
    const [modal4, setModal4] = useState(false);
    const [showAddress,setShowAddress] = useState(false);
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
   const [addrtype, setAddrtype] = useState(["Papá", "Mamá", "Hermano/Hermana", "Otro"])
   const Add = addrtype.map(Add => Add
   )
   // function showReference (e){
   // }
   async function consultCountries(auth) {
    await axios.get('https://restcountries.eu/rest/v2/all', {
        // headers: {
        //     Authorization: 'Bearer ' + auth,
        //     Accept: "application/json"
        // }
    }).then(function (response) {
        console.log('response',response.data);
        setCountries(response.data);
    });
}

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
    <button onClick={(e) => showModal3()} class="btn btn-info"><span style={{fontFamily:'Montserrat,sans-serif',fontSize:'16px'}} >+</span> Referencia</button>
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
                    <Modal.Title style={{ marginTop:'5px',fontFamily: 'montse', fontWeight: '600', fontSize: '18px' }}>Agregar referencia</Modal.Title>
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
                                            Add.map((address, key) => <option key={key} value={key}>{address}</option>)
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
                        <Row>
                            <Col className="mt-3">
                                {!showAddress ?
                                <Row>
                                <Col>
                                <a onClick={(e) =>setShowAddress(!showAddress)}>
                                <FAIcons.FaArrowCircleDown color={'#3ac0d8'}/>
                                </a>
                               
                                </Col>
                                </Row>
                                :
                                <Row>
                                <Col>
                                <a onClick={(e) =>setShowAddress(!showAddress)}>
                                <FAIcons.FaArrowCircleUp color={'#3ac0d8'}/>
                                </a>
                                <Row>
                                    <Col className="col-4">
                                    <Form.Label className="montse formGray">Tipo</Form.Label>
                                    <Form.Control autoComplete="off"
                                    ref={reference({})}
                                    name="typeAddress"
                                    className="montse formGrayTwo" type="text" placeholder="Ejemplo : Trabajo,Casa,Negocio" />
                                    </Col>
                                    <Col>
                                    <Form.Label  className="montse formGray">Calle</Form.Label>
                                                <InputGroup>
                                                <Form.Control autoComplete="off"
                                                    ref={reference({})}
                                                    name="street"
                                                    style={{letterSpacing:'0.2px'}}
                                                    className="montse informGray" type="text" placeholder="Ingrese su Calle" />
                                                <InputGroup.Append>
                                                <InputGroup.Text className="informGray" ><TIicons.TiHome /></InputGroup.Text>
                                                </InputGroup.Append>
                                                </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="col-2">
                                    <Form.Label className="montse formGray">Número exterior</Form.Label>
                                            <InputGroup>
                                                <Form.Control autoComplete="off"
                                                   ref={reference({})}
                                                    name="extNum"
                                                    className="informGray" type="text" placeholder="#" />
                                                     <InputGroup.Append>
                                                <InputGroup.Text className="informGray" ><TIicons.TiHome /></InputGroup.Text>
                                                </InputGroup.Append>
                                                </InputGroup>
                                    </Col>
                                    <Col className="col-2">
                                    <Form.Label className="montse formGray">Número Interior</Form.Label>
                                            <InputGroup>
                                                <Form.Control autoComplete="off"
                                                   ref={reference({})}
                                                   name="intNum"
                                                    className="informGray" type="text" placeholder="#" />
                                                     <InputGroup.Append>
                                                <InputGroup.Text className="informGray" ><TIicons.TiHome /></InputGroup.Text>
                                                </InputGroup.Append>
                                                </InputGroup>
                                    </Col>
                                    <Col>
                                    <Form.Label  className="montse formGray">Codigo postal</Form.Label>
                                                <InputGroup>
                                                <Form.Control autoComplete="off"
                                                    ref={reference({})}
                                                    title="respeta el formato,solo numeros"
                                                    pattern="[0-9]{5}"
                                                    name="cp"
                                                    className="informGray" type="text" placeholder="Ingrese su codigo postal" />
                                                    <InputGroup.Append>
                                                <InputGroup.Text className="informGray"><TIicons.TiHome /></InputGroup.Text>
                                                </InputGroup.Append>
                                                </InputGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="col-4">
                                <Form.Label  className="montse formGray">País</Form.Label>
                                    <Form.Control  autoComplete="off"
                                                    name="country"
                                                    ref={reference({})} as="select" size="sm" custom>
                                                    <option disabled value="" selected></option>
                                                    {countries.map(countri => (
                                                        <option key={countri.name} value={countri.name}>
                                                            {countri.name}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                    </Col>
                                    <Col>
                                    <Form.Label  className="montse formGrayTwo">Estado</Form.Label>
                                                        <Form.Control
                                                        className="informGray"
                                                            autoComplete="off" name="state"
                                                            ref={reference({})} size="sm"
                                                            autoComplete="off"
                                                        />               
                                    </Col>
                                    <Col>
                                    <Form.Label  className="montse formGray">Ciudad</Form.Label>
                                                        <Form.Control
                                                        className="informGray"
                                                            autoComplete="off" name="city"
                                                            ref={reference({})} size="sm"
                                                            autoComplete="off"
                                                        />
                                    </Col>
                                </Row>
                                </Col>
                                </Row>
                                }
                            </Col>
                        </Row>
                        </div>
                        <Row className="mt-1">
                            <Col>
                                <Button 
                                disabled={validFieldThree || validFieldFour}
                                className="float-right mb-3 mr-2" type="submit" variant="info">Guardar</Button>
                                <Button onClick={handleClose}  className="montse float-right mb-3 mr-2" variant="danger" >
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
                    <Modal.Title style={{ fontFamily: 'montse', fontWeight: '600', fontSize: '18px' }}>Agregar Referencia</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>
                    <div className="row mt-5"></div>
                    <div className="row mt-5"></div>
                    <div className="row mt-5"></div>
                    <div className="container">
                        <div className="row">
                            <div className="mx-auto">
                                <h6 className="montse">Referencia Guardada!</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mx-auto">
                                <span className="montse500" > ¿Te gustaria agregar otra referencia?</span>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="mx-auto">
                            <button className="btn btn-info montse600" onClick={showModal3}>Agregar una referencia</button>

                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="mx-auto">
                            <a className="montse500B" onClick={handleClose}>Terminar</a>
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

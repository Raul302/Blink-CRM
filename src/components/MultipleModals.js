import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/GlobalStyles.css';
import * as GrIcons from 'react-icons/gr';
import { Row, Col, Button, Modal, Form, FormControl, FormLabel } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";


function MultipleModals() {

    // states
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);
    const [modal4, setModal4] = useState(false);
    const [extra, setExtra] = useState(false);

    // Register to save data
    const { register: student, handleSubmit, errors,formState  } = useForm({mode:'onChange'});
    const styles = {
        container: {
            width: "80%",
            margin: "0 auto",
        },
        input: {
            width: "100%",
        },
    };

    // function to view modals
    const showModal1 = function close() {
        setModal2(false);
        setModal3(false);
        setModal4(false);
        setModal1(true);
    };
    const showModal2 = function close() {
        setModal1(false);
        setModal2(true);
    };
    const showModal3 = function close() {
        setModal1(false);
        setModal2(false);
        setModal3(true);
    };
    const showModal4 = function close() {
        setModal1(false);
        setModal2(false);
        setModal3(false);
        setModal4(true);
    };
    const handleClose = function close() {
        setModal1(false);
        setModal2(false);
        setModal3(false);
        setModal4(false);
    }
    const handleExtra = function ekis() {
        setExtra(state => !state);
    }

    function onSubmit(data) {
        console.log('Data', data); // { username: 'test', email: 'test', password: 'test' }
    }


    return (
        <>
            <Button style={{ color: '#182739', marginRight: '10px', backgroundColor: '#FFFFFF', boxShadow: 'rgb(209, 221, 235) 0px 0px 0px 1px inset' }} className=" Inter600" variant="light">Import</Button>
            <Button style={{}} className="Inter600 " variant="primary" onClick={showModal1}>Crear contacto</Button>

            {/* FirstModal */}
            <Modal
                show={modal1}
                dialogClassName="modalMax"
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: '18px' }}>Agregar contacto </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="container-fluid">
                            <Row>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Nombre</Form.Label>
                                    <Form.Control name="name" ref={student({
                                        required: true,
                                        minLenth: 6,
                                        maxLength: 50
                                    })}
                                        autoComplete="off" className="formGray" type="text" placeholder="Ingrese su nombre"
                                        style={{ ...styles.input, borderColor: errors.name && "red" }}
                                    />
                                    <p className='errores'>{errors.name && "Nombre requerido"}</p>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Apellido Paterno</Form.Label>
                                    <Form.Control name="father_lastname" ref={student({
                                        required: true,
                                        minLenth: 6,
                                        maxLength: 50
                                    })}
                                        autoComplete="off" className="formGray" type="text" placeholder="Ingrese su primer apellido" />
                                          <p className='errores'
                                    >{errors.father_lastname && "Apellido requerido"}</p>
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Apellido Materno</Form.Label>
                                    <Form.Control autoComplete="off" name="mother_lastname" ref={student({
                                        required: true,
                                        minLenth: 6,
                                        maxLength: 50
                                    })}
                                        className="formGray" type="text" placeholder="Ingrese su segundo apellido" />
                                           <p className='errores'
                                    >{errors.mother_lastname && "Apellido requerido"}</p>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Colegio</Form.Label>
                                    <Form.Control autoComplete="off" name="school" ref={student({
                                        required: true,
                                        minLenth: 6,
                                        maxLength: 50
                                    })}
                                        className="formGray" type="text" placeholder="Ingrese su Colegio" />
                                <p className='errores'>{errors.school && "Colegio requerido"}</p>
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Grado</Form.Label>
                                    <Form.Control autoComplete="off" name="grade" ref={student({
                                        required: true,
                                        minLenth: 6,
                                        maxLength: 50
                                    })}
                                        className="formGray" type="text" placeholder="Ingrese su Grado" />
                                          <p className='errores'>{errors.grade && "Grado requerido"}</p>

                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Email</Form.Label>
                                    <Form.Control autoComplete="off" name="email" ref={student({
                                        required: true,
                                        minLenth: 6,
                                        maxLength: 50,
                                        validate: (input) => isEmail(input),
                                    })}
                                        className="formGray" type="email" placeholder="Ingrese su email" />
                                          <p className='errores'>{errors.email && "Email requerido ó invalido"}</p>

                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Telefono</Form.Label>
                                    <Form.Control autoComplete="off" name="phone" ref={student({
                                        required: true,
                                        minLenth: 6,
                                        maxLength: 50
                                    })}
                                        className="formGray" type="tel" placeholder="Ingrese su telefono" />
                                          <p className='errores'>{errors.phone && "Telefono requerido"}</p>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Estado</Form.Label>
                                    <Form.Control autoComplete="off" name="state" ref={student({
                                        required: true,
                                        minLenth: 6,
                                        maxLength: 50
                                    })}
                                        className="formGray" type="text" placeholder="Ingrese su Estado" />
                                          <p className='errores'>{errors.state && "Estado requerido"}</p>
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Ciudad</Form.Label>
                                    <Form.Control autoComplete="off" name="city" ref={student({
                                        required: true,
                                        minLenth: 6,
                                        maxLength: 50
                                    })}
                                        className="formGray" type="text" placeholder="Ingrese su Ciudad" />
                                          <p className='errores'>{errors.city && "Ciudad requerida"}</p>

                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Fecha de nacimiento</Form.Label>
                                    <Form.Control autoComplete="off" name="date" ref={student({
                                        required: true,
                                        minLenth: 6,
                                        maxLength: 50
                                    })}
                                        className="formGray" type="date" placeholder="Ingrese su Fecha" />
                                          <p className='errores'>{errors.date && "Fecha requerida"}</p>

                                </Col>

                            </Row>
                        </div>
                        <Row>

                            <Col>
                                <Button className="float-right mb-3 mr-2" type="submit" 
                                onClick={showModal2}
                                disabled={!formState.isValid}
                                variant="primary">Guardar</Button>
                                <Button onClick={handleClose} style={{ color: '#4479ff', fontFamily: 'Inter', fontWeight: '500' }} className="float-right mb-3 mr-2" variant="light" >
                                    Cancel
                </Button>

                            </Col>
                        </Row>
                    </form>
                </Modal.Body>
            </Modal>


            {/* Second Modal */}
            <Modal
            style={{height:'604px',maxHeight:'604px'}}
                show={modal2}
                dialogClassName="modalMax"
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: '18px' }}>Agregar contacto</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>
                <div class="row mt-5"></div>
                <div class="row mt-5"></div>
                <div class="row mt-5"></div>
                <div class="container">
      <div class="row">
        <div class="mx-auto">
         <h1 class="Inter600B">Contacto Guardado!</h1>
     </div>
 </div>
 <div class="row">
 <div class="mx-auto">
 <span class="Inter500" > ¿Te gustaria agregar otro contacto?</span>
</div>
</div>
</div>
<div class="row mt-2">
<div class="mx-auto">
<button style={{width:'181.13px'}} onClick={showModal1}class="btn btn-primary Inter600">Agregar un contacto</button>
</div>
</div>
<div class="row mt-2">
<div class="mx-auto">
<button class="btn btn-primary Inter600">Agregar una Referencia</button>
</div>
</div>
<div class="row mt-2">
<div class="mx-auto">
<a class="Inter500B" onClick={handleClose}>Listo!</a>
</div>
</div>
 <div class="row mb-5"></div>
 <div class="row mb-5"></div>
 <div class="row mb-5"></div>
                </Modal.Body>
            </Modal>



            {/* Three Modal */}
            <Modal
                show={modal3}
                dialogClassName="modalMax"
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: '18px' }}>Agregar mama</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>
                    <form>
                        <div className="container-fluid">
                            <Row>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Nombre</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su nombre" />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Apellido Paterno</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su primer apellido" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Apellido Materno</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su segundo apellido" />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Email</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="email" placeholder="Ingrese su email" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Telefono</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="tel" placeholder="Ingrese su telefono" />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Estado</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su email" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Ciudad</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su telefono" />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Fecha de nacimiento</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="date" placeholder="Ingrese su email" />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Estado</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Estado" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Ciudad</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Ciudad" />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Calle</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Calle" />
                                </Col>
                                <Col className="col-3">
                                    <Form.Label className="formGray">No.</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Numero" />
                                </Col>
                                <Col className="col-3">
                                    <Form.Label className="formGray">Codigo postal</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Codigo" />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Estado Civil</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Estado civil" />
                                </Col>
                            </Row>
                        </div>
                    </form>
                </Modal.Body>
                <Row>

                    <Col>
                        <Button className="float-right mb-3 mr-2" disabled variant="primary">Guardar</Button>
                        <Button onClick={showModal4} style={{ color: '#4479ff', fontFamily: 'Inter', fontWeight: '500' }} className="float-right mb-3 mr-2" variant="light" >
                            Cancel
                 </Button>

                    </Col>
                </Row>
            </Modal>



            {/* Four Modal */}
            <Modal
                show={modal4}
                dialogClassName="modalMax"
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: '18px' }}>Notificacion</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>
                    <Row className="container">Congratulations!</Row>
                </Modal.Body>
                <Row>

                    <Col>
                        <Button className="float-right mb-3 mr-2" disabled variant="primary">Guardar</Button>
                        <Button onClick={handleClose} style={{ color: '#4479ff', fontFamily: 'Inter', fontWeight: '500' }} className="float-right mb-3 mr-2" variant="light" >
                            Cancel
                 </Button>

                    </Col>
                </Row>
            </Modal>
        </>
    )
}

/* <div className="container-fluid">
                            <Row>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Nombre</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su nombre" />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Apellido Paterno</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su primer apellido" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Apellido Materno</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su segundo apellido" />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Email</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="email" placeholder="Ingrese su email" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Telefono</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="tel" placeholder="Ingrese su telefono" />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Fecha de nacimiento</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="date" placeholder="Ingrese su fecha" />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Estado</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Estado" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Ciudad</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Ciudad" />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Calle</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Calle" />
                                </Col>
                                <Col className="col-3">
                                    <Form.Label className="formGray">No.</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Numero" />
                                </Col>
                                <Col className="col-3">
                                    <Form.Label className="formGray">Codigo postal</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Codigo" />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Estado Civil</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Estado civil" />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <a onClick={handleExtra}>
                                        <GrIcons.GrAdd /> Agregar mama
                                </a>
                                </Col>
                                {extra && (
                                    <div className="container-fluid">
                                        <Row className="mt-3">
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Nombre</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su nombre" />
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Apellido Paterno</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su primer apellido" />
                                            </Col>
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Apellido Materno</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su segundo apellido" />
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Email</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="email" placeholder="Ingrese su email" />
                                            </Col>
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Telefono</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="tel" placeholder="Ingrese su telefono" />
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Estado</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su email" />
                                            </Col>
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Ciudad</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su telefono" />
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Fecha de nacimiento</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="date" placeholder="Ingrese su email" />
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Estado</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Estado" />
                                            </Col>
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Ciudad</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Ciudad" />
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Calle</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Calle" />
                                            </Col>
                                            <Col className="col-3">
                                                <Form.Label className="formGray">No.</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Numero" />
                                            </Col>
                                            <Col className="col-3">
                                                <Form.Label className="formGray">Codigo postal</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Codigo" />
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Estado Civil</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Estado civil" />
                                            </Col>
                                        </Row>
                                    </div>
                                )}
                            </Row>
                        </div>
*/

export default MultipleModals


 
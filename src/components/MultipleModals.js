import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/GlobalStyles.css';
import { Row, Col, Button, Modal, Form, FormControl, FormLabel } from 'react-bootstrap';

function MultipleModals() {
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);
    const [modal4, setModal4] = useState(false);

    const showModal1 = function close () {
        setModal1(true);
    };
    const showModal2 = function close () {
        setModal2(true);
    };
    const showModal3 = function close () {
        setModal3(true);
    };
    const showModal4 = function close () {
        setModal1(false);
        setModal2(false);
        setModal3(false);
        setModal4(true);
    };
    const handleClose = function close(){
        setModal1(false);
        setModal2(false);
        setModal3(false);
        setModal4(false);
    }


    return (
        <>
            <Button className="mr-3 Inter600" variant="primary" onClick={showModal1}>Crear contacto</Button>

            {/* FirstModal */}
            <Modal  
            show={modal1}  
            dialogClassName="modalMax"
            onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{fontFamily:'Inter',fontWeight:'600',fontSize:'18px'}}>Transicion 1 </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>
                    <form>
                        <div className="container-fluid">
                            <Row>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Company</Form.Label>
                                    <Form.Control  className="formGray" type="text" placeholder="Ingrese su nombre" />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Apellido Paterno</Form.Label>
                                    <Form.Control  className="formGray" type="text" placeholder="Ingrese su primer apellido" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Apellido Materno</Form.Label>
                                    <Form.Control  className="formGray" type="text" placeholder="Ingrese su segundo apellido" />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Email</Form.Label>
                                    <Form.Control  className="formGray" type="email" placeholder="Ingrese su email" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Telefono</Form.Label>
                                    <Form.Control  className="formGray" type="tel" placeholder="Ingrese su telefono" />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Estado</Form.Label>
                                    <Form.Control  className="formGray" type="text" placeholder="Ingrese su email" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Ciudad</Form.Label>
                                    <Form.Control  className="formGray" type="text" placeholder="Ingrese su telefono" />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Fecha de nacimiento</Form.Label>
                                    <Form.Control  className="formGray" type="date" placeholder="Ingrese su email" />
                                </Col>
                               
                            </Row>
                        </div>
                    </form>
                </Modal.Body>
                <Row>
                   
                    <Col>
                    <Button className="float-right mb-3 mr-2" disabled variant="primary">Guardar</Button>
                    <Button onClick={showModal2} style={{color:'#4479ff',fontFamily:'Inter',fontWeight:'500'}}className="float-right mb-3 mr-2" variant="light" >
                    Cancel
                 </Button>
              
                    </Col>
                </Row>
            </Modal>

            {/* Second Modal */}
            <Modal 
            show={modal2}
            dialogClassName="modalMax"
            onHide={handleClose}
            >
            <Modal.Header closeButton>
                    <Modal.Title style={{fontFamily:'Inter',fontWeight:'600',fontSize:'18px'}}>Transicion 2</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>
                    <form>
                        <div className="container-fluid">
                            <Row>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Company</Form.Label>
                                    <Form.Control  className="formGray" type="text" placeholder="Ingrese su nombre" />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Apellido Paterno</Form.Label>
                                    <Form.Control  className="formGray" type="text" placeholder="Ingrese su primer apellido" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Apellido Materno</Form.Label>
                                    <Form.Control  className="formGray" type="text" placeholder="Ingrese su segundo apellido" />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Email</Form.Label>
                                    <Form.Control  className="formGray" type="email" placeholder="Ingrese su email" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Telefono</Form.Label>
                                    <Form.Control  className="formGray" type="tel" placeholder="Ingrese su telefono" />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Estado</Form.Label>
                                    <Form.Control  className="formGray" type="text" placeholder="Ingrese su email" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Ciudad</Form.Label>
                                    <Form.Control  className="formGray" type="text" placeholder="Ingrese su telefono" />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Fecha de nacimiento</Form.Label>
                                    <Form.Control  className="formGray" type="date" placeholder="Ingrese su email" />
                                </Col>
                               
                            </Row>
                        </div>
                    </form>
                </Modal.Body>
                <Row>
                   
                    <Col>
                    <Button className="float-right mb-3 mr-2" disabled variant="primary">Guardar</Button>
                    <Button onClick={showModal3} style={{color:'#4479ff',fontFamily:'Inter',fontWeight:'500'}}className="float-right mb-3 mr-2" variant="light" >
                    Cancel
                 </Button>
              
                    </Col>
                </Row>
           </Modal>

            {/* Three Modal */}
            <Modal 
            show={modal3}
            dialogClassName="modalMax"
            onHide={handleClose}
            >
            <Modal.Header closeButton>
                    <Modal.Title style={{fontFamily:'Inter',fontWeight:'600',fontSize:'18px'}}>Transicion 3</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>
                    <form>
                        <div className="container-fluid">
                            <Row>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Company</Form.Label>
                                    <Form.Control  className="formGray" type="text" placeholder="Ingrese su nombre" />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Apellido Paterno</Form.Label>
                                    <Form.Control  className="formGray" type="text" placeholder="Ingrese su primer apellido" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Apellido Materno</Form.Label>
                                    <Form.Control  className="formGray" type="text" placeholder="Ingrese su segundo apellido" />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Email</Form.Label>
                                    <Form.Control  className="formGray" type="email" placeholder="Ingrese su email" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Telefono</Form.Label>
                                    <Form.Control  className="formGray" type="tel" placeholder="Ingrese su telefono" />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Estado</Form.Label>
                                    <Form.Control  className="formGray" type="text" placeholder="Ingrese su email" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Ciudad</Form.Label>
                                    <Form.Control  className="formGray" type="text" placeholder="Ingrese su telefono" />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Fecha de nacimiento</Form.Label>
                                    <Form.Control  className="formGray" type="date" placeholder="Ingrese su email" />
                                </Col>
                               
                            </Row>
                        </div>
                    </form>
                </Modal.Body>
                <Row>
                   
                    <Col>
                    <Button className="float-right mb-3 mr-2" disabled variant="primary">Guardar</Button>
                    <Button onClick={showModal4} style={{color:'#4479ff',fontFamily:'Inter',fontWeight:'500'}}className="float-right mb-3 mr-2" variant="light" >
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
                    <Modal.Title style={{fontFamily:'Inter',fontWeight:'600',fontSize:'18px'}}>Transicion 4 FINAL</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>
                   <Row className="container">Congratulations!</Row>
                </Modal.Body>
                <Row>
                   
                    <Col>
                    <Button className="float-right mb-3 mr-2" disabled variant="primary">Guardar</Button>
                    <Button onClick={handleClose} style={{color:'#4479ff',fontFamily:'Inter',fontWeight:'500'}}className="float-right mb-3 mr-2" variant="light" >
                    Cancel
                 </Button>
              
                    </Col>
                </Row>
           </Modal>
        </>
    )
}

export default MultipleModals

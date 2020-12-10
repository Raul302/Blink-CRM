import React, { useState, useEffect } from 'react'
import * as IOIcons from "react-icons/io";
import * as BIIcons from "react-icons/bi";
import { Row, Col, Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import axios from 'axios';
function AddOrEditCollege() {
    useEffect(() => {
        consultCountries();
    }, [])
    const [countries, setCountries] = useState();
    const [modal, setModal] = useState(false);
    const [modalTwo, setModalTwo] = useState(false);
    const [modalThree, setModalThree] = useState(false);
    const [modalFour, setModalFour] = useState(false);
    const { register, handleSubmit, errors, formState, reset } = useForm({ mode: 'onChange' });
    const types = ['Boarding School', 'School District', 'Summer Camp', 'Language School', 'University/College', 'Work&Travel'];
    const styles = {
        container: {
            width: "80%",
            margin: "0 auto",
        },
        input: {
            width: "100%",
        },
    };
    async function consultCountries() {
        await axios.get('https://restcountries.eu/rest/v2/all', {
        }).then(function (response) {
            setCountries(response.data);
        });
    }
    function handleShow() {
        setModal(!modal);
    }

    function handleClose() {
        setModal(!modal);

    }
    function onSubmit(data) {
        console.log('data', data);
    }
    return (
        <>
            <button class="btn btn-primary"
                onClick={(e) => handleShow()}>
                <BIIcons.BiPlus /><IOIcons.IoIosSchool /></button>

            {/* FirstModal */}
            <Modal
                show={modal}
                dialogClassName="modalMax"
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: '18px' }}>Agregar colegio </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="container-fluid">
                            <Row>
                                <Col className="col-4">
                                    <Form.Label className="formGray">Nombre</Form.Label>
                                    <Form.Control
                                        name="name"
                                        autoComplete="off" className="formGray" type="text" placeholder="Ingrese su nombre"
                                        ref={register({
                                            required: true
                                        })}
                                        style={{ ...styles.input, borderColor: errors.name && "red" }}
                                    />
                                    <p className='errores'>{errors.name && "Nombre requerido"}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label className="formGray">Tipo</Form.Label>
                                    <Form.Control
                                        name="type"
                                        autoComplete="off" className="formGray" type="text" placeholder="Seleccione el tipo"
                                        ref={register({
                                            required: true
                                        })} as="select" size="sm" custom>
                                        <option disabled value="" selected></option>
                                        {types.map(typ => (
                                            <option key={typ} value={typ}>
                                                {typ}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <p className='errores'>{errors.type && "Tipo requerido"}</p>
                                </Col>
                                <Col>
                                    <Form.Label className="formGray">País</Form.Label>
                                    {countries
                                        ? <>
                                            <Form.Control
                                                name="country"
                                                autoComplete="off" className="formGray" type="text" placeholder="Seleccione el país"
                                                ref={register({
                                                    required: true
                                                })} as="select" size="sm" custom>
                                                <option disabled value="" selected></option>
                                                {countries.map(countr => (
                                                    <option key={countr.name} value={countr.name}>
                                                        [{countr.alpha2Code}] {countr.name}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                            <p className='errores'>{errors.country && "País requerido"}</p>
                                        </>
                                        : ''
                                    }
                                </Col>
                            </Row>
                            <Row>
                                <Col class="col-12">
                                    <Form.Label className="formGray">Sitio web</Form.Label>
                                    <InputGroup style={{ marginLeft: '-15px' }}>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text >https://:</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl name="website"
                                            ref={register({
                                                required: true
                                            })}
                                            id="inlineFormInputGroup" placeholder="Ingrese su sitio web" />
                                    </InputGroup>
                                    <p className='errores'>{errors.website && "Sitio web requerido"}</p>
                                </Col>
                            </Row>
                        </div>
                        <Row className="mt-3">
                            <Col>
                                <Button
                                    className="float-right mb-3 mr-2" type="submit"
                                    disabled={!formState.isValid}
                                    onSubmit={handleSubmit(onSubmit)}
                                    variant="primary">Guardar</Button>
                                <Button onClick={handleClose} style={{ color: '#4479ff', fontFamily: 'Inter', fontWeight: '500' }} className="float-right mb-3 mr-2" variant="light" >
                                    Cancelar
                                </Button>
                            </Col>
                        </Row>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddOrEditCollege

import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import axios from 'axios';
import * as BSicons from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { finishLoading, startLoading } from '../../actions/ui';
import Skeleton from 'react-loading-skeleton';
import { useAlert } from 'react-alert'

function Docs() {
    const { loading } = useSelector(state => state.ui);
    useEffect(() => {
        getFiles();
    }, [])
    const alert = useAlert()

    const dispatch = useDispatch();
    const pathFiles = 'http://api.boardingschools.mx/storage/';
    const { active } = useSelector(state => state.colleges);
    const [picture, setPicture] = useState('');
    const [displays, setDisplays] = useState('');
    const [pictureTwo, setPictureTwo] = useState('');
    const [modal, setModal] = useState(false);
    const [fileOne, setFileOne] = useState(true);
    const [fileTwo, setFileTwo] = useState(true);
    const { register, handleSubmit, errors, reset } = useForm({});

    const getFiles = () => {
        dispatch(startLoading());
        axios.post('http://api.boardingschools.mx/api/files/index', { id: active.id })
            .then(function (response) {
                const { data } = response;
                if (data[0]) {
                    setDisplays(data[0]);
                    dispatch(finishLoading());
                }
            }).catch(error => {
                dispatch(finishLoading());
            });
    }
    const onChangePicture = (e) => {
        setPicture(URL.createObjectURL(e.target.files[0]))
    };
    const onChangePictureTwo = (e) => {
        setPictureTwo(URL.createObjectURL(e.target.files[0]))
    };
    const handleShow = (e) => {
        setModal(!modal);
    }
    const handleClose = (e) => {
        setModal(!modal);
    }
    const handlefileOne = (e) => {
        setFileOne(false);
    }
    const handlefileTwo = (e) => {
        setFileTwo(false);
    }
    function onSubmit(data) {
        let formData = new FormData();
        formData.append("calendar", data.fileCalendar[0] ? data.fileCalendar[0] : null);
        formData.append("calendar_date", data.calendar ? data.calendar : null);
        formData.append("cuote", data.fileCuota[0] ? data.fileCuota[0] : null);
        formData.append("cuote_cicly", data.cicly ? data.cicly : null);
        formData.append("idCollege", active.id);
        if (displays.id) {
            formData.append('id', displays.id);
        }
        axios({
            method: 'post',
            url: 'http://api.boardingschools.mx/api/files/upload',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(function (response) {
                alert.show(response.data, {
                    timeout: 2000, // custom timeout just for this one alert
                    type: 'success'
                })
                handleClose();
                getFiles();
            })
    }
    return (
        <>
        <div className="content">
        
        </div>
            {/* FirstModal */}
            <Modal
                show={modal}
                dialogClassName="modalMax"
                onHide={handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontFamily: 'Inter', fontWeight: '600', fontSize: '18px' }}>Subir archivos </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="container-fluid">
                            <Row>
                                <Col className="col-6" >
                                    <Form.Label className="formGray">Ciclo escolar</Form.Label>
                                    <Form.Control ref={register} onChange={(e) => handlefileOne(e)} autoComplete="off" name="cicly" as="select" size="sm" custom>
                                        <option disabled value="" selected></option>
                                        <option value="2015-2016">2015 - 2016</option>
                                        <option>2016 - 2017</option>
                                        <option>2017 - 2018</option>
                                        <option>2018 - 2019</option>
                                        <option>2019 - 2020</option>
                                        <option>2020 - 2021</option>
                                        <option>2021 - 2022</option>
                                        <option>2022 - 2023</option>
                                        <option>2023 - 2024</option>
                                        <option>2024 - 2025</option>
                                        <option>2025 - 2026</option>
                                        <option>2026 - 2027</option>
                                        <option>2027 - 2028</option>
                                        <option>2028 - 2029</option>
                                        <option>2029 - 2030</option>
                                        <option>2030 - 2031</option>
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <img style={{ height: '70px', width: '70px' }} className="playerProfilePic_home_tile" src={picture}></img>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label className="formGray"><h5>Cuota</h5></Form.Label>
                                    <Form.Control
                                        disabled={fileOne}
                                        id="profilePic" ref={register} name="fileCuota" type="file" onChange={onChangePicture} />
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col className="col-6" >
                                    <Form.Label className="formGray">Calendario</Form.Label>
                                    <Form.Control ref={register} onChange={(e) => handlefileTwo(e)} autoComplete="off" name="calendar" as="select" size="sm" custom>
                                        <option disabled value="" selected></option>
                                        <option value="2015-2016">2015 - 2016</option>
                                        <option>2016 - 2017</option>
                                        <option>2017 - 2018</option>
                                        <option>2018 - 2019</option>
                                        <option>2019 - 2020</option>
                                        <option>2020 - 2021</option>
                                        <option>2021 - 2022</option>
                                        <option>2022 - 2023</option>
                                        <option>2023 - 2024</option>
                                        <option>2024 - 2025</option>
                                        <option>2025 - 2026</option>
                                        <option>2026 - 2027</option>
                                        <option>2027 - 2028</option>
                                        <option>2028 - 2029</option>
                                        <option>2029 - 2030</option>
                                        <option>2030 - 2031</option>
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <img style={{ height: '70px', width: '70px' }} className="playerProfilePic_home_tile" src={pictureTwo}></img>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label className="formGray"><h5>Calendario</h5></Form.Label>
                                    <Form.Control
                                        disabled={fileTwo}
                                        id="profilePic" type="file" onChange={onChangePictureTwo} name="fileCalendar" ref={register} />
                                </Col>
                            </Row>
                        </div>
                        <Row>
                            <Col>
                                <Button
                                    className="float-right mb-3 mr-2" type="submit"
                                    disabled={fileTwo || fileOne}
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

export default Docs

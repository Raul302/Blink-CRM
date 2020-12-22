import React, { useState, useEffect,useRef } from 'react'
import * as IOIcons from "react-icons/io";
import * as BIIcons from "react-icons/bi";
import { Row, Col, Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import axios from 'axios';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { newCollege } from '../../actions/colleges';
import {starLoadingColleges} from '../../actions/colleges';
import NotificationAlert from "react-notification-alert";

function AddOrEditCollege() {
    useEffect(() => {
        consultCountries();
        consultStates();
    }, [])
    const notificationAlert = useRef();
    const dispatch = useDispatch();
    const [sport,setSports] = useState();
    const [art,setArts] = useState();
    const [special_c,setSpecial_C] = useState();
    const [json,setJson] = useState();
    const [countries, setCountries] = useState();
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [auth, setAth] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalTwo, setModalTwo] = useState(false);
    const [modalThree, setModalThree] = useState(false);
    const [modalFour, setModalFour] = useState(false);
    const { register, handleSubmit, errors, formState, reset } = useForm({ mode: 'onChange' });
    const types = ['Boarding School', 'School District', 'Summer Camp', 'Language School', 'University/College', 'Work&Travel'];
    const numbers = [1,2,3,4,5,6,7,8,9,10,11,12];
    const sports = [
        { value: 'Football', label: 'Football' },{ value: 'Basketball', label: 'Basketball' },{ value: 'Volleyball', label: 'Volleyball' },
        { value: 'Soccer', label: 'Soccer' }, { value: 'Tennis', label: 'Tennis' },{ value: 'Golf', label: 'Golf' },{ value:'Ski', label:' Ski'},
        { value: 'Snowboard', label: 'Snowboard' },{value:'Cross', label:'Cross'},{ value:'Country', label: 'Country'},
        { value:'Ice Hockey', label: 'Ice Hockey'},{ value:'Field Hockey', label: 'Field Hockey'},{ value:'Alpine Skiing', label: 'Alpine Skiing'},{ value:'Indoor track', label: 'Indoor track'},
        { value:'Nordic skiing', label: 'Nordic skiing'},{ value:'Wrestling', label: 'Wrestling'},{ value:'Gymnastics', label: 'Gymnastics'},{ value:'Baseball', label: 'Baseball'},
        { value:'Lacrosse', label: 'Lacrosse'},{ value:'Softball', label: 'Softball'},{ value:'Track and field', label: 'Track and field'},{ value:'Ultimate', label: 'Ultimate'},
        { value:'Swimming', label: 'Swimming'},{ value:'Figure skating', label: 'Figure skating'}
    ];
    const arts = [
        { value:'Drawing and Painting', label:'Drawing and Painting'},
        { value:'Photography', label:'Photography'},{ value:'Fashion design', label: 'Fashion design'},{value:'Filmaking',label:'Filmaking'},
        { value: 'Digital Design', label: 'Digital Design'},{ value:'Acting Ballet', label: 'Acting Ballet'},{ value: 'Modern Dance', label:'Modern Dance'},
        { value: 'Popular Dance',label: 'Popular Dance'},{value : 'Music',label:'Music'}
    ];
    const special_clinic = [{value:' Soccer',label:'Soccer'},
    {value:'Golf',label:'Golf'},{value:'Tennis',label:'Teniis'},{value:'Swimming',label:'Swimming'},
    {value:'Figure Skating',label:'Figure Skating'},{value:'Basketball',label:'Basketball'},{value:'Dance',label:'Dance'}];
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
    function changeCities(e) {
        let val = e.target.value;
        axios.get('https://www.universal-tutorial.com/api/cities/' + val, {
            headers: {
                Authorization: 'Bearer ' + auth,
                Accept: "application/json"
            }
        }).then(function (response) {
            setCities(response.data);
        });
    }
    // Api to states
    async function consultStates() {
        //    info : L6HkSxDySdCLf8NsKYB64pLX5rE4XJVQvG0ROvYXBwYXZ7e0kRlU7gwVgo49xcFX6FI
        let x = null;
        await axios.get('https://www.universal-tutorial.com/api/getaccesstoken', {
            headers: {
                "Accept": "application/json",
                "user-email": "18090130@gmail.com",
                "api-token": "L6HkSxDySdCLf8NsKYB64pLX5rE4XJVQvG0ROvYXBwYXZ7e0kRlU7gwVgo49xcFX6FI"
            }
        }).then(function (response) {
        x = response.data.auth_token;
        });
        axios.get('https://www.universal-tutorial.com/api/states/Mexico', {
            headers: {
                Authorization: 'Bearer ' + x,
                Accept: "application/json"
            }
        }).then(function (response) {
            setStates(response.data);
            setAth(x);
        });
    }
    function handleSports(e){
        if(e){
        setSports(e.map(ex => {
            return ex.value;
        }));
        }
    }
    function handleSpecial(e){
        if(e){
            setSpecial_C(e.map(ex => {
                return ex.value;
            }));
            }
    }
    function handleArts(e){
        if(e){
            setArts(e.map(ex => {
                return ex.value;
            }));
            }
    }
    function handleShow() {
        setModalTwo(false);
        setModalThree(false);
        setModalFour(false);
        setModal(!modal);
    }
    const showModalTwo = function close() {
        setModal(false);
        setModalThree(false);
        setModalFour(false);
        setModalTwo(true);
    }
    const showModalFour = function close(){
        setModal(false);
        setModalTwo(false);
        setModalThree(false);
        setModalFour(true);
    }
    const showModalThree = function close() {
        setModal(false);
        setModalTwo(false);
        setModalFour(false);
        setModalThree(true);
    }
    function handleClose() {
        setModal(!modal);
    }
    function close() {
        setModal(false);
        setModalTwo(false);
        setModalThree(false);
        setModalFour(false);
        reset();
    }
    function onSubmit(data) {
        if(modal){
            setJson(data);
            if(data.type === 'Boarding School'){
                showModalTwo();
            }else {
                showModalFour();
            }
        }
        if(modalTwo){
            let obj =  Object.assign(json,data);
            setJson({...obj});
            showModalThree();
        }
        if(modalThree){
            showModalFour();

        }
        if(modalFour){
            let obj =  Object.assign(json,data);
            setJson({...obj});
            obj = {};
            obj.sports = sport;
            obj.arts = art;
            obj.special_c = special_c;
            setJson({...obj});
            dispatch( newCollege(json) );
            close();
        }
    }
    return (
        <>
            <button class="btn btn-primary"
                onClick={(e) => handleShow()}>
                <BIIcons.BiPlus /><IOIcons.IoIosSchool /></button>

            {/* FirstModal */}
            <Modal
                show={modal}
                style={{marginTop:'50px'}}
                dialogClassName="modal-90w"
            >
                 <Modal.Header style={{height:'60px'}} closeButton>
                    <Modal.Title style={{ fontFamily: 'Inter', marginTop:'5px', fontWeight: '600', fontSize: '18px' }}>Agregar colegio </Modal.Title>
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
                                                        {countr.name}
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
                                <Col className="col-12">
                                    <Form.Label className="formGray">Sitio web</Form.Label>
                                    <InputGroup style={{ marginLeft: '-15px' }}>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text >https://</InputGroup.Text>
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
                                    variant="primary">Siguiente</Button>
                                <Button onClick={handleClose} style={{ fontFamily: 'Inter', fontWeight: '500' }} className="float-right mb-3 mr-2" variant="danger" >
                                    Cancelar
                                </Button>
                            </Col>
                        </Row>
                    </form>
                </Modal.Body>
            </Modal>


            {/* Second Modal */}
             <Modal
                show={modalTwo}
                style={{marginTop:'50px'}}
                dialogClassName="modal-90w"
            >
                 <Modal.Header style={{height:'60px'}} closeButton>
                    <Modal.Title style={{ fontFamily: 'Inter', marginTop:'5px', fontWeight: '600', fontSize: '18px' }}>Facts & Figures </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="container-fluid">
                            <Row>
                                <Col className="col-12">
                                    <Form.Label className="formGray">Descripcion</Form.Label>
                                    <InputGroup  style={{ borderTop:'0',width:'100%',marginTop:'0px'}}>
                                        <Form.Control name="description"  ref={register({
                                                maxLength: 400,
                                            })}
                                            as="textarea" placeholder="Escriba su mensaje..."cols={12} rows={4} />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Form.Label className="mt-2 formGray">Boarding Grades</Form.Label>
                            <Row>
                                <Col className="col-4">
                                    <Form.Label className="formGray">Inicio</Form.Label>
                                    <Form.Control
                                                name="start_boarding_grade"
                                                autoComplete="off" className="formGray" type="text" placeholder="Seleccione el país"
                                                ref={register({
                                                })} as="select" size="sm" custom>
                                                <option disabled value="" selected></option>
                                                {numbers.map(numb => (
                                                    <option key={numb} value={numb}>
                                                    {numb}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                </Col>
                                <Col className="col-4">
                                    <Form.Label className="formGray">Termino</Form.Label>
                                    <Form.Control
                                                name="end_boarding_grade"
                                                autoComplete="off" className="formGray" type="text" placeholder="Seleccione el país"
                                                ref={register({
                                                })} as="select" size="sm" custom>
                                                <option disabled value="" selected></option>
                                                {numbers.map(numb => (
                                                    <option key={numb} value={numb}>
                                                    {numb}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                </Col>
                            </Row>

                            <Form.Label className="mt-3 formGray">Day Grades</Form.Label>
                            <Row>
                                <Col className="col-4">
                                    <Form.Label className="formGray">Inicio</Form.Label>
                                    <Form.Control
                                                name="start_day_grade"
                                                autoComplete="off" className="formGray" type="text" placeholder="Seleccione el país"
                                                ref={register({
                                                })} as="select" size="sm" custom>
                                                <option disabled value="" selected></option>
                                                {numbers.map(numb => (
                                                    <option key={numb} value={numb}>
                                                    {numb}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                </Col>
                                <Col className="col-4">
                                    <Form.Label className="formGray">Termino</Form.Label>
                                    <Form.Control
                                                name="end_day_grade"
                                                autoComplete="off" className="formGray" type="text" placeholder="Seleccione el país"
                                                ref={register({
                                                })} as="select" size="sm" custom>
                                                <option disabled value="" selected></option>
                                                {numbers.map(numb => (
                                                    <option key={numb} value={numb}>
                                                    {numb}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col className="col-4">
                                    <Form.Label className="formGray">Total boarding students</Form.Label>
                                    <Form.Control name="total_boarding_grade" ref={register({
                                            })}
                                            className="form-control" type="number" min="0"  >
                                    </Form.Control>
                                </Col>
                                <Col className="col-4">
                                    <Form.Label className="formGray">Total international students</Form.Label>
                                    <Form.Control name="total_international_grade" ref={register({
                                            })}
                                            className="form-control" type="number" min="0"  >
                                    </Form.Control>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-4">
                                    <Form.Label className="formGray">Total day students</Form.Label>
                                    <Form.Control name="total_day_students" ref={register({
                                            })}
                                            className="form-control" type="number" min="0"  >
                                    </Form.Control>
                                </Col>
                                <Col className="col-4">
                                    <Form.Label className="formGray">Total students in school</Form.Label>
                                    <Form.Control name="total_students_in_school" ref={register({
                                            })}
                                            className="form-control" type="number" min="0"  >
                                    </Form.Control>
                                </Col>
                            </Row>
                            

                        </div>
                        <Row className="mt-3">
                            <Col>
                                <Button
                                    className="float-right mb-3 mr-2" type="submit"
                                    onSubmit={(e)=> handleShow()}
                                    variant="primary">Siguiente</Button>
                                     <Button onClick={(e)=>handleShow()} style={{ fontFamily: 'Inter', fontWeight: '500' }} className="float-right mb-3 mr-2" variant="danger" >
                                    Atras
                                </Button>
                            </Col>
                        </Row>
                    </form>
                </Modal.Body>
            </Modal>


            {/* Three Modal */}
             {/* Second Modal */}
             <Modal
                show={modalThree}
                style={{marginTop:'50px'}}
                dialogClassName="modal-90w"
            >
                 <Modal.Header style={{height:'60px'}} closeButton>
                    <Modal.Title style={{ fontFamily: 'Inter', marginTop:'5px', fontWeight: '600', fontSize: '18px' }}> </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>

                    <form  onSubmit={handleSubmit(onSubmit)}>
                        <div class="container-fluid">
                            <Row>
                                <Col className="col-8">
                                    <Form.Label className="formGray">Sports</Form.Label>
                                    <Select
                                    onChange={(e)=>handleSports(e)}
                                    isMulti
                                    name="sports"
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    options={sports}
                                    />
                                </Col>
                            </Row>
                            <Row>
                            <Col className="col-8">
                                    <Form.Label className="formGray">Arts</Form.Label>
                                    <Select
                                    name="arts"
                                    onChange={(e)=>handleArts(e)}
                                    isMulti
                                    options={arts}
                                    />
                                </Col>
                            </Row>
                            <Row>
                            <Col className="col-8">
                                    <Form.Label className="formGray">Special Clinics</Form.Label>
                                    <Select 
                                    isMulti
                                    onChange={(e)=>handleSpecial(e)}
                                    name="special_clinics"
                                    options={special_clinic}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <Row className="mt-3">
                            <Col>
                                <Button
                                    className="float-right mb-3 mr-2" type="submit"
                                    onSubmit={handleSubmit(onSubmit)}
                                    variant="primary">Siguiente</Button>
                            </Col>
                        </Row>
                    </form>
                </Modal.Body>
            </Modal>


            {/* Four modal */}
            <Modal
                show={modalFour}
                style={{marginTop:'50px'}}
                dialogClassName="modal-90w"
            >
                 <Modal.Header style={{height:'60px'}} closeButton>
                    <Modal.Title style={{ fontFamily: 'Inter', marginTop:'5px', fontWeight: '600', fontSize: '18px' }}>Location </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="container-fluid">
                        <Row>
                                <Col>
                                <Form.Label className="formGray">Calle</Form.Label>
                                <Form.Control
                                        name="street"
                                        autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Calle"
                                        ref={register({
                                        })}
                                    />
                                </Col>
                                <Col>
                                <Form.Label className="formGray">Numero</Form.Label>
                                <Form.Control
                                        name="number"
                                        autoComplete="off" className="formGray" type="text" placeholder="Ejem: 710"
                                        ref={register({
                                        })}
                                    />
                                    </Col>
                                <Col>
                                <Form.Label className="formGray">Codigo postal</Form.Label>
                                <Form.Control
                                        name="cp"
                                        autoComplete="off" className="formGray" type="text" placeholder="Ingrese su CP"
                                        ref={register({
                                        })}
                                    />
                                </Col>
                            </Row>
                        <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Estado</Form.Label>
                                    <Form.Control onChange={e => changeCities(e)} autoComplete="off" name="state" ref={register} as="select" size="sm" custom>
                                        <option disabled value="" selected></option>
                                        {states.map(state => (
                                            <option key={state.state_name} value={state.state_name}>
                                                {state.state_name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <p className='errores'>{errors.state && "Estado requerido"}</p>
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Ciudad</Form.Label>
                                    <Form.Control autoComplete="off" name="city" ref={register} as="select" size="sm" custom>
                                    <option disabled value="" selected></option>
                                        {cities.map(state => (
                                            <option key={state.city_name} value={state.city_name}>
                                                {state.city_name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <p className='errores'>{errors.state && "Estado requerido"}</p>
                                </Col>
                            </Row>
                        </div>
                        <Row className="mt-2">
                            <Col>
                                <Button
                                    className="float-right mb-3 mr-2" type="submit"
                                    onSubmit={handleSubmit(onSubmit)}
                                    variant="primary">Guardar</Button>
                            </Col>
                        </Row>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AddOrEditCollege

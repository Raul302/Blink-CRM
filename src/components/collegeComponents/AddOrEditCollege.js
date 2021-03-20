import React, { useState, useEffect, useRef } from 'react'
import * as IOIcons from "react-icons/io";
import * as BIIcons from "react-icons/bi";
import { Row, Col, Button, Modal, Form, InputGroup, FormControl } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import isEmail from "validator/lib/isEmail";
import axios from 'axios';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { starLoadingColleges,newCollege } from '../../actions/colleges/colleges';
import NotificationAlert from "react-notification-alert"; 
import  '../../styles/RBCheckboxFormStyles.css';
export const Checkbox = function Checkbox(props) {
    function changeCheck(e) {
        props.changeCheck(e);
    }
    return (
        <div key={props.key}>
            <input onClick={(e) => changeCheck(e)}
                key={props.value}
                value={props.value}
                checked={props.isChecked}
                class={props.isChecked ? "isChecked" : "noChecked"}
                id={"checkbox" + props.id + props.value} type="checkbox" />
            <label
                for={"checkbox" + props.id + props.value}>{props.label}</label>
        </div>
    )
}
function AddOrEditCollege() {
    useEffect(() => {
        consultCountries();
        consultStates();
        return () => {
            setState({}); // This worked for me
          };
    }, [])
    const [state, setState] = useState({});

    const [obj, setObj] = useState({ name: "", tipo: "", pais: "", website: "" });
    const notificationAlert = useRef();
    const dispatch = useDispatch();
    const [sport, setSports] = useState();
    const [selectSport, setSelectSport] = useState();
    const [art, setArts] = useState();
    const [selectArt, setSelectArt] = useState();
    const [special_c, setSpecial_C] = useState();
    const [selectSpecial, setSelectSpecial] = useState();
    const [json, setJson] = useState();
    const [countries, setCountries] = useState();
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [auth, setAth] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalTwo, setModalTwo] = useState(false);
    const [modalThree, setModalThree] = useState(false);
    const [modalFour, setModalFour] = useState(false);
    const { register, handleSubmit, errors, formState, reset } = useForm({ mode: 'onChange' });
//     Boarding School
// School District
// Summer Camp
// Language School
// University/College
// Work & Travel
    const types = ['Boarding School', 'School District', 'Summer Camp', 'Language School', 'University/College', 'Work & Travel'];
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const [sports, setArrSport] = useState([
        { id: 'sport', value: 'Football', isChecked: false, label: 'Football' }, { id: 'sport', value: 'Basketball', isChecked: false, label: 'Basketball' }, { id: 'sport', value: 'Volleyball', isChecked: false, label: 'Volleyball' },
        { id: 'sport', value: 'Soccer', isChecked: false, label: 'Soccer' }, { id: 'sport', value: 'Tennis', isChecked: false, label: 'Tennis' }, { id: 'sport', value: 'Golf', isChecked: false, label: 'Golf' }, { id: 'sport', value: 'Ski', isChecked: false, label: ' Ski' },
        { id: 'sport', value: 'Snowboard', isChecked: false, label: 'Snowboard' }, { value: 'Cross', isChecked: false, label: 'Cross' }, { id: 'sport', value: 'Country', isChecked: false, label: 'Country' },
        { id: 'sport', value: 'Ice Hockey', isChecked: false, label: 'Ice Hockey' }, { id: 'sport', value: 'Field Hockey', isChecked: false, label: 'Field Hockey' }, { id: 'sport', value: 'Alpine Skiing', isChecked: false, label: 'Alpine Skiing' }, { id: 'sport', value: 'Indoor track', isChecked: false, label: 'Indoor track' },
        { id: 'sport', value: 'Nordic skiing', isChecked: false, label: 'Nordic skiing' }, { id: 'sport', value: 'Wrestling', isChecked: false, label: 'Wrestling' }, { id: 'sport', value: 'Gymnastics', isChecked: false, label: 'Gymnastics' }, { id: 'sport', value: 'Baseball', isChecked: false, label: 'Baseball' },
        { id: 'sport', value: 'Lacrosse', isChecked: false, label: 'Lacrosse' }, { id: 'sport', value: 'Softball', isChecked: false, label: 'Softball' }, { id: 'sport', value: 'Track and field', isChecked: false, label: 'Track and field' }, { id: 'sport', value: 'Ultimate', isChecked: false, label: 'Ultimate' },
        { id: 'sport', value: 'Swimming', isChecked: false, label: 'Swimming' }, { id: 'sport', value: 'Figure skating', isChecked: false, label: 'Figure skating' }
    ]);
    
    const [arts, setArrArts] = useState([
        { id: 'art', value: 'Drawing and Painting', isChecked: false, label: 'Drawing and Painting' },
        { id: 'art', value: 'Photography', isChecked: false, label: 'Photography' }, { id: 'art', value: 'Fashion design', isChecked: false, label: 'Fashion design' }, { id: 'art', value: 'Filmaking', isChecked: false, label: 'Filmaking' },
        { id: 'art', value: 'Digital Design', isChecked: false, label: 'Digital Design' }, { id: 'art', value: 'Acting Ballet', isChecked: false, label: 'Acting Ballet' }, { id: 'art', value: 'Modern Dance', isChecked: false, label: 'Modern Dance' },
        { id: 'art', value: 'Popular Dance', isChecked: false, label: 'Popular Dance' }, { id: 'art', value: 'Music', isChecked: false, label: 'Music' }
    ]);
    const [special_clinic, setArrSpecial] = useState([{ id: 'special', value: ' Soccer', isChecked: false, label: 'Soccer' },
    { id: 'special', value: 'Golf', isChecked: false, label: 'Golf' }, { id: 'special', value: 'Tennis', isChecked: false, label: 'Teniis' }, { id: 'special', value: 'Swimming', isChecked: false, label: 'Swimming' },
    { id: 'special', value: 'Figure Skating', isChecked: false, label: 'Figure Skating' }, { id: 'special', value: 'Basketball', isChecked: false, label: 'Basketball' }, { id: 'special', value: 'Dance', isChecked: false, label: 'Dance' }]);
    const styles = {
        container: {
            width: "80%",
            margin: "0 auto",
        },
        input: {
            width: "100%",
        },
    };
    function resetDefaultArrays() {
      sports.map(sp => {
           sp.isChecked = false;
           return sp;
       });
       arts.map(art => {
        art.isChecked = false;
        return art;
    });
    special_clinic.map(spc => {
        spc.isChecked = false;
        return spc;
    })
    }
    async function consultCountries() {
        await axios.get('https://restcountries.eu/rest/v2/all', {
        }).then(function (response) {
            setCountries(response.data);
        });
    }
    function changeCities(e) {
        let val = e.target.value;
        if (e) {
            changeObj(e);
        }
        // axios.get('https://www.universal-tutorial.com/api/cities/' + val, {
        //     headers: {
        //         Authorization: 'Bearer ' + auth,
        //         Accept: "application/json"
        //     }
        // }).then(function (response) {
        //     setCities(response.data);
        // });
    }
    // Api to states
    async function consultStates() {
        //    info : L6HkSxDySdCLf8NsKYB64pLX5rE4XJVQvG0ROvYXBwYXZ7e0kRlU7gwVgo49xcFX6FI
        let x = null;
        // await axios.get('https://www.universal-tutorial.com/api/getaccesstoken', {
        //     headers: {
        //         "Accept": "application/json",
        //         "user-email": "blink.interlageducativo@gmail.com",
        //         "api-token": "RjWHZOlhuvyH-x1rkLxxrp0hlbNSSXnSoa7DcnV-OIvJoZigJDOXcg71IyMIQp5fynU"
        //     }
        // }).then(function (response) {
        //     x = response.data.auth_token;
        // });
        // axios.get('https://www.universal-tutorial.com/api/states/Mexico', {
        //     headers: {
        //         Authorization: 'Bearer ' + x,
        //         Accept: "application/json"
        //     }
        // }).then(function (response) {
        //     setStates(response.data);
        //     setAth(x);
        // });
    }
    function handleSports(e) {
        if (e) {
            setSelectSport(e);
        }

    }
    function handleSpecial(e) {
        if (e) {
            setSelectSpecial(e);
        }
    }
    function handleArts(e) {
        if (e) {
            setSelectArt(e);
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
    const changeCheckSport = (e) => {
        let sportsx = sports;
        sportsx.forEach(sport => {
            if (sport.value === e.target.value) {
                sport.isChecked = e.target.checked
            }
        });
        let array = sportsx.filter(sport => sport.isChecked === true);
        setSelectSport([...array]);
        setArrSport([...sportsx]);
    }
    const changeCheckArts = (e) => {
        let artsx = arts;
        arts.forEach(art => {
            if (art.value === e.target.value) {
                art.isChecked = e.target.checked
            }
        });
        let array = arts.filter(art => art.isChecked === true);
        setSelectArt([...array]);
        setArrArts([...artsx]);
    }
    const changeCheckSpecial = (e) => {
        let specialx = special_clinic;
        specialx.forEach(spe => {
            if (spe.value === e.target.value) {
                spe.isChecked = e.target.checked
            }
        });
        let array = specialx.filter(special => special.isChecked === true);
        setSelectSpecial([...array]);
        setArrSpecial([...specialx]);
    }
    const showModalFour = function close() {
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
    function changeObj(e) {
        const { name, value } = e.target;
        const list = { ...obj };
        list[name] = value;
        setObj(list);
    }
    function close() {
        resetDefaultArrays();
        setModal(false);
        setModalTwo(false);
        setModalThree(false);
        setModalFour(false);
        reset();
    }
    function onSubmit(data) {
        if (modal) {
            setJson(obj);
            if (obj.type === 'Boarding Schools') {
                showModalTwo();
            } else {
                showModalFour();
            }
        }
        if (modalTwo) {
            let obj = Object.assign(json, data);
            setJson({ ...obj });
            showModalThree();
        }
        if (modalThree) {
            showModalFour();

        }
        if (modalFour) {
            let objx = obj;
            objx.sports = selectSport;
            objx.arts = selectArt;
            objx.special_c = selectSpecial;
            dispatch(newCollege(objx));
            close();
            setObj({});
            setSelectArt();
            setSelectSport();
            setSelectSpecial();
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
                style={{ marginTop: '50px' }}
                dialogClassName="modal-90w"
                onHide={handleClose}

            >
                <Modal.Header style={{ height: '60px' }} closeButton>
                    <Modal.Title style={{ fontFamily: 'Inter', marginTop: '5px', fontWeight: '600', fontSize: '18px' }}>Agregar colegio </Modal.Title>
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
                                        onChange={(e) => changeObj(e)}
                                        value={obj.name}
                                    // style={{ ...styles.input, borderColor: errors.name && "red" }}
                                    />
                                    {/* <p className='errores'>{errors.name && "Nombre requerido"}</p> */}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label className="formGray">Tipo</Form.Label>
                                    <Form.Control
                                        name="type"
                                        autoComplete="off" className="formGray" type="text" placeholder="Seleccione el tipo"
                                        onChange={(e) => changeObj(e)}
                                        value={obj.type}
                                        as="select" size="sm" custom>
                                        <option disabled value="" selected></option>
                                        {types.map(typ => (
                                            <option key={typ} value={typ}>
                                                {typ}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label className="formGray">País</Form.Label>
                                    {countries
                                        ? <>
                                            <Form.Control
                                                name="country"
                                                autoComplete="off" className="formGray" type="text" placeholder="Seleccione el país"
                                                onChange={(e) => changeObj(e)}
                                                value={obj.country}
                                                as="select" size="sm" custom>
                                                <option disabled value="" selected></option>
                                                {countries.map(countr => (
                                                    <option key={countr.name} value={countr.name}>
                                                        {countr.name}
                                                    </option>
                                                ))}
                                            </Form.Control>
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
                                            onChange={(e) => changeObj(e)}
                                            value={obj.website}
                                            id="inlineFormInputGroup" placeholder="Ingrese su sitio web" />
                                    </InputGroup>
                                </Col>
                            </Row>
                        </div>
                        <Row className="mt-3">
                            <Col>
                                <Button
                                    disabled={!obj.name || !obj.type || !obj.country || !obj.website}
                                    className="float-right mb-3 mr-2" type="submit"
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
                style={{ marginTop: '50px' }}
                dialogClassName="modal-90w"
            >
                <Modal.Header style={{ height: '60px' }} closeButton>
                    <Modal.Title style={{ fontFamily: 'Inter', marginTop: '5px', fontWeight: '600', fontSize: '18px' }}>Facts & Figures </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="container-fluid">
                            <Row>
                                <Col className="col-12">
                                    <Form.Label className="formGray">Descripcion</Form.Label>
                                    <InputGroup style={{ borderTop: '0', width: '100%', marginTop: '0px' }}>
                                        <Form.Control name="description"
                                            onChange={(e) => changeObj(e)}
                                            value={obj.description}
                                            as="textarea" placeholder="Escriba su mensaje..." cols={12} rows={4} />
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
                                        onChange={(e) => changeObj(e)}
                                        value={obj.start_boarding_grade}
                                        as="select" size="sm" custom>
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
                                        onChange={(e) => changeObj(e)}
                                        value={obj.end_boarding_grade}
                                        as="select" size="sm" custom>
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
                                        onChange={(e) => changeObj(e)}
                                        value={obj.start_day_grade}
                                        as="select" size="sm" custom>
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
                                        onChange={(e) => changeObj(e)}
                                        value={obj.end_day_grade}
                                        as="select" size="sm" custom>
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
                                    <Form.Control name="total_boarding_grade"
                                        onChange={(e) => changeObj(e)}
                                        value={obj.total_boarding_grade}
                                        className="form-control" type="number" min="0"  >
                                    </Form.Control>
                                </Col>
                                <Col className="col-4">
                                    <Form.Label className="formGray">Total international students</Form.Label>
                                    <Form.Control name="total_international_grade"
                                        onChange={(e) => changeObj(e)}
                                        value={obj.total_international_grade}
                                        className="form-control" type="number" min="0"  >
                                    </Form.Control>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-4">
                                    <Form.Label className="formGray">Total day students</Form.Label>
                                    <Form.Control name="total_day_students"
                                        onChange={(e) => changeObj(e)}
                                        value={obj.total_day_students}
                                        className="form-control" type="number" min="0"  >
                                    </Form.Control>
                                </Col>
                                <Col className="col-4">
                                    <Form.Label className="formGray">Total students in school</Form.Label>
                                    <Form.Control name="total_students_in_school"
                                        onChange={(e) => changeObj(e)}
                                        value={obj.total_students_in_school}
                                        className="form-control" type="number" min="0"  >
                                    </Form.Control>
                                </Col>
                            </Row>


                        </div>
                        <Row className="mt-3">
                            <Col>
                                <Button
                                    className="float-right mb-3 mr-2" type="submit"
                                    onSubmit={(e) => handleShow()}
                                    variant="primary">Siguiente</Button>
                                <Button onClick={(e) => handleShow()} style={{ fontFamily: 'Inter', fontWeight: '500' }} className="float-right mb-3 mr-2" variant="danger" >
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
                style={{ marginTop: '50px' }}
                dialogClassName="modal-90w"
            >
                <Modal.Header style={{ height: '60px' }} closeButton>
                    <Modal.Title style={{ fontFamily: 'Inter', marginTop: '5px', fontWeight: '600', fontSize: '18px' }}> </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>



                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="container-fluid">
                            <Row>
                                <Col className="col">
                                    <Row>
                                        <Form.Label className="formGray">SportsX</Form.Label>
                                    </Row>
                                    <div class="col-xs-12 col-md-12 input-group input-group-sm">
                                        {sports.map((sport, index) => {
                                            return (
                                                <Checkbox  {...sport} changeCheck={changeCheckSport} index={index} />
                                            )
                                        })}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col">
                                    <Row>
                                        <Form.Label className="formGray">Arts</Form.Label>
                                    </Row>
                                    <div class="col-xs-12 col-md-12 input-group input-group-sm">
                                        {arts.map((art, index) => {
                                            return (
                                                <Checkbox  {...art} changeCheck={changeCheckArts} index={index} />
                                            )
                                        })}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-8">
                                    <Row>
                                        <Form.Label className="formGray">Special Clinics</Form.Label>
                                    </Row>
                                    <div class="col-xs-12 col-md-12 input-group input-group-sm">
                                        {special_clinic.map((spe, index) => {
                                            return (
                                                <Checkbox  {...spe} changeCheck={changeCheckSpecial} index={index} />
                                            )
                                        })}
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <Row className="mt-3">
                            <Col>
                                <Button
                                    className="float-right mb-3 mr-2" type="submit"
                                    onSubmit={handleSubmit(onSubmit)}
                                    variant="primary">Siguiente</Button>
                                <Button onClick={(e) => showModalTwo()} style={{ fontFamily: 'Inter', fontWeight: '500' }} className="float-right mb-3 mr-2" variant="danger" >
                                    Atras
                                </Button>
                            </Col>
                        </Row>
                    </form>
                </Modal.Body>
            </Modal>





            {/* Four modal */}
            <Modal
                show={modalFour}
                style={{ marginTop: '50px' }}
                dialogClassName="modal-90w"
            >
                <Modal.Header style={{ height: '60px' }} closeButton>
                    <Modal.Title style={{ fontFamily: 'Inter', marginTop: '5px', fontWeight: '600', fontSize: '18px' }}>Location </Modal.Title>
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
                                        onChange={(e) => changeObj(e)}
                                        value={obj.street}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label className="formGray">Numero</Form.Label>
                                    <Form.Control
                                        name="number"
                                        autoComplete="off" className="formGray" type="text" placeholder="Ejem: 710"
                                        onChange={(e) => changeObj(e)}
                                        value={obj.number}
                                    />
                                </Col>
                                <Col>
                                    <Form.Label className="formGray">Codigo postal</Form.Label>
                                    <Form.Control
                                        name="cp"
                                        autoComplete="off" className="formGray" type="text" placeholder="Ingrese su CP"
                                        onChange={(e) => changeObj(e)}
                                        value={obj.cp}
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Estado</Form.Label>
                                    <Form.Control onChange={e => changeCities(e)} autoComplete="off" name="state"
                                        value={obj.state}
                                        as="select" size="sm" custom>
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
                                    <Form.Control autoComplete="off" name="city"
                                        onChange={(e) => changeObj(e)}
                                        value={obj.city}
                                        as="select" size="sm" custom>
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
                                <Button onClick={
                                    obj.type === 'Boarding School' ?
                                        (e) => showModalThree()
                                        :
                                        (e) => handleShow()
                                } style={{ fontFamily: 'Inter', fontWeight: '500' }} className="float-right mb-3 mr-2" variant="danger" >
                                    Atras
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

import React, { useEffect, useState, useRef } from 'react';
import * as FIIcons from "react-icons/fi";
import * as TIicons from "react-icons/ti";
import { Row, Col, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import axios from 'axios';
import "../../styles/RBCheckboxFormStyles.css";
import NotificationAlert from "react-notification-alert";
import { constaApi, constzipCodeApi } from '../../constants/constants';
import *  as FAIcons from "react-icons/fa";
import { loadColleges } from 'helpers/collegesHelpers/loadColleges';
import { loadLocalColleges } from 'helpers/collegesHelpers/loadColleges';
import { states as jsonState } from 'MyJson\'s/statesJson';
import { municipios } from 'MyJson\'s/municipiosJson';



function PersonalData(props) {
    useEffect(() => {
        setFilterValues(props.contact);
        consultStates();
        consultCountries();
        Promise.all([loadLocalColleges()])
        .then(function (result){
            if(result){
                setLocalColleges(result[0]);
            }
        })
        let other  = municipios[0];
        let aux = [];
        if(props.contact.state){
            Object.keys(other).map((name,i)=>{
                if(name === props.contact.state){
                    aux = other[name];
                }
            })
            setCities(aux);
            setCity(props.contact.city);
        }
    }, [props]);
    const [flagCountry, setFlagCoutnry] = useState({
        value: 'Pais',
        isChecked: false,
        label: 'Pais'
    });
    const [optionscols, setCols] = useState([{ colonia: "" }]);
    const [muns, setMuns] = useState([]);
    const notificationAlert = useRef();
    const [directions, setDirections] = useState(props.contact.contacts_direction);
    const [phones, setPhones] = useState(props.contact.contacts_phones);
    const [emails, setEmails] = useState(props.contact.contacts_emails);
    const [inputList, setInputList] = useState([{ street: "", number: "", cp: "", city: "", state: "", typeAddress: "", country: "Mexico", otherDirection: "" }]);
    const [inputPhone, setInputPhone] = useState([{ phone: "", typePhone: "", otherPhone: "" }]);
    const [inputEmail, setInputEmail] = useState([{ email: "", typeEmail: "", otherEmail: "" }]);
    const [editInfo, setEditInfo] = useState(false);
    const [editAcademicProfile, setAcademicProfile] = useState(false);
    const [editDetails, setEditDetails] = useState(false);
    const [editDirection, setEditDirection] = useState(false);
    const [birthday, setBirthday] = useState();
    const [city, setCity] = useState();
    const [email, setEmail] = useState();
    const [fName, setFname] = useState();
    const [mName, setMname] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [schoool, setSchoool] = useState();
    const [other_School, setotherScho] = useState();
    const [grade, setGrade] = useState();
    const [cicly, setCicly] = useState();
    const [state, setState] = useState();
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState();
    const [localColleges, setLocalColleges] = useState([]);
    const [nameRecom,setnameRecom] = useState();
    const [fatherRecom,setFatherRecom] = useState();
    const [motherRecom,setMotherRecom] = useState();
    const [modalRecomd,setModalRecomd] = useState(false);
    // Methods
    const tagMun = (mun) => {
        let tag = '';
        return tag = <span><strong class="montse">Municipio: </strong>{mun}</span>;
    }
    const tagCOL = (col) => {
        let tag = '';
        return tag = <span><strong class="montse">Colonia: </strong>{col}     </span>;
    }
    const tagSpan = (num) => {
        let tag = '';
        return tag = <span><strong class="montse">montseior: </strong>{num}</span>;
    }
    const callCP = async (index, val) => {
        await await axios.get(constzipCodeApi + val, {
        }).then(function (response) {
            let { data } = response;
            if (data) {
                let colx = [];
                let resp = data.map(d => {
                    return d.response;
                })
                const list = [...inputList];
                list[index]['state'] = resp[0].estado === "Coahuila de Zaragoza" ? "Coahuila" : resp[0].estado;
                list[index]['city'] = resp[0].municipio;
                list[index]['col'] = resp[0].asentamiento;
                list[index]['mun'] = resp[0].municipio;
                setInputList(list);
                colx = resp.map(re => {
                    return { colonia: re.asentamiento };
                });
                setCols(colx);
            }
        });
    }
    const handleInputChangeEmail = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputEmail];
        list[index][name] = value;
        setInputEmail(list);
    };
    const handleInputTypeEmail = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputEmail];
        list[index][name] = value;
        setInputEmail(list);
    }
    const editRecomenBy = () => {
        setModalRecomd(!modalRecomd);
    }
    // handle click event of the Remove button
    const handleRemoveClickEmail = index => {
        let list = [...inputEmail];
        if(index === 0){
            list = [{ email: "", typeEmail: "", otherEmail: "" }];
        } else {
            list.splice(index, 1);
        }
        setInputEmail(list);
    };

    // handle click event of the Add button
    const handleAddClickEmail = () => {
        setInputEmail([...inputEmail, { email: "" }]);
    };

    // ----------------------------------------------------------    
    const handleInputChangePhone = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputPhone];
        list[index][name] = value;
        setInputPhone(list);
    };

    // handle click event of the Remove button
    const handleRemoveClickPhone = index => {
        let list = [...inputPhone];
        if(index === 0){
            list = [{ phone: "", typePhone: "", otherPhone: "" }];
        } else {
            list.splice(index, 1);
        }
        setInputPhone(list);
    };

    // handle click event of the Add button
    const handleAddClickPhone = () => {
        setInputPhone([...inputPhone, { phone: "" }]);
    };
    // ---------------------------------------------------------
    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        if (name === "cp" && value.length === 5) {
            callCP(index, value);
        }
        const list = [...inputList];
        if (name === "country") {
            list[index]['col'] = "";
            list[index]['mun'] = "";
        }
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        let list = [...inputList];
        if(index === 0){
            list = [{ street: "", number: "", cp: "", city: "", state: "", typeAddress: "", country: "Mexico", otherDirection: "" }];
        } else {
            list.splice(index, 1);
        }
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { street: "", country: "Mexico", number: "", cp: "" }]);
    };
    function changeCiti(e) {
        setCity(e.target.value);
    }
    function changeChecked() {
        let check = flagCountry.isChecked;
        check = check ? false : true;
        setFlagCoutnry({ ...flagCountry, isChecked: check });
    }
    // Api to cities
    async function changeCities(e, i = 0) {
        let val = e.target.value;
        if (val === undefined) {
            val = props.contact.state;
            if (val === undefined && inputList[i].state != null) {
                val = inputList[i].state;
            }
        } else {
            val = e.target.value;
        }
        if (e.target) {
            let val = e.target.value;
            let other  = municipios[0];
            let aux = [];
            Object.keys(other).map((name,i)=>{
                if(name === e.target.value){
                    aux = other[name];
                }
            })
            setCities(aux);
            setState(e.target.value);
            if (e.target.name) {
                handleInputChange(e, i);
            }
        }
        // await axios.get('https://www.universal-tutorial.com/api/cities/' + val, {
        //     headers: {
        //         Authorization: 'Bearer ' + props.token,
        //         Accept: "application/json"
        //     }
        // }).then(function (response) {
        //     setCities(response.data);
        // });

    }
    // Api to states
    async function consultStates() {
        setStates(jsonState);
        // await axios.get('https://www.universal-tutorial.com/api/states/Mexico', {
        //     headers: {
        //         Authorization: 'Bearer ' + props.token,
        //         Accept: "application/json"
        //     }
        // }).then(function (response) {
        //     setStates(response.data);
        //     let obj = {
        //         target: {
        //             value: state
        //         }
        //     };
        //     changeCities(obj);
        // });
    }
    async function consultCountries() {
        await axios.get('https://restcountries.eu/rest/v2/all', {
            // headers: {
            //     Authorization: 'Bearer ' + auth,
            //     Accept: "application/json"
            // }
        }).then(function (response) {
            setCountries(response.data);
        });
    }
    function setFilterValues(props) {
        setBirthday(props.birthday);
        setEmail(props.email);
        setFname(props.father_lastname);
        setMname(props.mother_lastname);
        setName(props.name);
        setPhone(props.phone);
        setSchoool(props.schoool);
        setState(props.state);
        setGrade(props.grade);
        setCicly(props.cicly);
        setCountry(props.country);
        setotherScho(props.other_School);
        setnameRecom(props.name_recom);
        setFatherRecom(props.father_recom);
        setMotherRecom(props.mother_recom);
        if (directions.length > 0) {
            setInputList(directions);
        }
        if (phones.length > 0) {
            setInputPhone(phones);
        }
        if (emails.length > 0) {
            setInputEmail(emails);
        }
    }
    const { handleSubmit } = useForm({});

    function changeGrade(e) {
        setGrade(e.target.value);
    }
    function changeCicly(e) {
        setCicly(e.target.value);
    }
    function changeSchool(e) {
        setSchoool(e.target.value);
    }
    function changeOtherSchool(e) {
        setotherScho(e.target.value);
    }
    function changeName(e) {
        setName(e.target.value);
    }
    function changeFname(e) {
        setFname(e.target.value);
    }
    function changeMName(e) {
        setMname(e.target.value);
    }
    function changeEmail(e) {
        setEmail(e.target.value)
    }
    function changePhone(e) {
        setPhone(e.target.value)
    }
    function changeCountries(e, i) {
        setCountry(e.target.value);
    }
    async function onSubmit(data) {
        let datax = {
            id: props.contact.id,
            father_lastname: fName,
            name: name,
            email: inputEmail,
            mother_lastname: mName,
            birthday: birthday,
            // city: city,
            phone: inputPhone,
            schoool: schoool,
            // state: state,
            cicly: cicly,
            grade: grade,
            state: state,
            city: city,
            country: country,
            direction: inputList,
            other_School : schoool != 'Otro' ? null : other_School,
            name_recom : nameRecom,
            father_recom : fatherRecom,
            mother_recom : motherRecom
        };
        await axios.post(constaApi + 'contact/update', datax)
            .then(function (response) {
                if (response.status === 200) {
                    notification('info', 'Datos actualizados correctamente');
                } else {
                    notification('danger', 'Ocurrio un error,por favor contacta a soporte');
                }
            });
        if (editInfo) {
            edit();
        } else {
            editCDetails();
        }
        props.handleUpdate();
    }
    function changeBirtday(e) {
        setBirthday(e.target.value);
    }
    function edit() {
        setEditInfo(!editInfo);
    }
    function editCDetails() {
        setEditDetails(!editDetails);
    }
    function editD() {
        if (inputList) {
            callCP(0, inputList[0].cp)
        }
        setEditDirection(!editDirection);
    }
    function changeNameRecom(e){
        setnameRecom(e.target.value);
    }
    function changeFatherRecom(e){
        setFatherRecom(e.target.value);
    }
    function changeMotherRecom(e){
        setMotherRecom(e.target.value);
    }
    function editAcademicP() {
        setAcademicProfile(!editAcademicProfile);
    }
    const notification = (type, message) => {
        let place = "tc";
        var options = {};
        options = {
            place: place,
            message: (
                <div>
                    <div>
                        {message}
                    </div>
                </div>
            ),
            type: type,
            icon: "nc-icon nc-bell-55",
            autoDismiss: 7,
        }
        notificationAlert.current.notificationAlert(options);
    }
    return (
        <>
            <NotificationAlert ref={notificationAlert} />
            {!editInfo ?
                <div style={{boxShadow:'none',borderColor:'#717d95'}}class="border mt-5 card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-11">
                                <h5 style={{ fontWeight: '600',fontSize:'20px' }} class="montse card-title">Información</h5>
                            </div>
                            <div style={{ marginRight: '-200px' }} class="col-1 d-flex justify-content-end">
                                <a>
                                    <FIIcons.FiEdit onClick={(e) => edit()} size={18} style={{ color: '#386CEF' }} />
                                </a>
                            </div>
                        </div>
                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6  class="montse card-subtitle mb-2 formGrayTwo">Nombre</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="montse card-subtitle mb-2 ">
                                    {props.contact.name}
                                </h6>
                            </div>
                        </div>
                        <div class="row mt-3 ">
                            <div class="col-3">
                                <h6 class="montse card-subtitle mb-2 formGrayTwo">Apellido paterno</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="montse card-subtitle mb-2 ">
                                    {props.contact.father_lastname}
                                </h6>
                            </div>
                        </div>
                        <div class="row mt-3 ">
                            <div class="col-3">
                                <h6 class="montse card-subtitle mb-2 formGrayTwo">Apellido materno</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="montse card-subtitle mb-2 ">
                                    {props.contact.mother_lastname}
                                </h6>
                            </div>
                        </div>

                        <div class="row mt-3 ">
                            <div class="col-3">
                                <h6 class="montse card-subtitle mb-2 formGrayTwo">Fecha</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '##243243', fontWeight: '600' }}
                                    class="montse card-subtitle mb-2">
                                    {props.contact.birthday}
                                </h6>
                            </div>
                        </div>
                        <div class="row mt-3 ">
                            <div class="col-3">
                                <h6 class="montse card-subtitle mb-2 formGrayTwo">Dirección</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '##243243', fontWeight: '600' }}
                                    class="montse card-subtitle mb-2">
                                    {props.contact.country ? props.contact.country : ''}
                                    {props.contact.state ? ',' + props.contact.state : ''}
                                    {props.contact.city ? ',' + props.contact.city : ''}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div style={{boxShadow:'none',borderColor:'#717d95'}}class="border mt-5 card">
                    <div class="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="row">
                                <div class="col-11">
                                    <h5 style={{ fontWeight: '600',fontSize:'20px' }} class="montse card-title">Información</h5>
                                </div>
                                <div style={{ marginRight: '-200px' }} class="col-1 d-flex justify-content-end">
                                    <button onClick={(e) => edit()} type="button" class="montse btn btn-danger">Cancelar</button>
                                    <button onSubmit={handleSubmit(onSubmit)}
                                        type="submit" class="montse ml-1 btn btn-info">Guardar</button>
                                </div>
                            </div>
                            <div class="row mt-3 ">
                                <div class="col-3">
                                    <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Nombre</Form.Label>
                                </div>
                                <div class="col">
                                    <Form.Control autoComplete="off"
                                        onChange={(e) => changeName(e)} value={name}
                                        name="name"
                                        className="formGray" type="text" placeholder="Ingrese su nombre" />
                                </div>
                            </div>
                            <div class="row mt-3 ">
                                <div class="col-3">
                                    <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Apellido paterno</Form.Label>
                                </div>
                                <div class="col">
                                    <Form.Control autoComplete="off"
                                        onChange={(e) => changeFname(e)} value={fName}
                                        name="father_lastname"
                                        className="formGray" type="text" placeholder="Ingrese su email" />
                                </div>
                            </div>
                            <div class="row mt-3 ">
                                <div class="col-3">
                                    <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Apellido materno</Form.Label>
                                </div>
                                <div class="col">
                                    <Form.Control autoComplete="off"
                                        onChange={(e) => changeMName(e)} value={mName}
                                        name="mother_lastname"
                                        className="formGray" type="text" placeholder="Ingrese su email" />
                                </div>
                            </div>

                            <div class="row mt-3 ">
                                <div class="col-3">
                                    <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Fecha</Form.Label>
                                </div>
                                <div class="col">
                                    <Form.Control autoComplete="off"
                                        onChange={(e) => changeBirtday(e)} value={birthday}
                                        name="birthday"
                                        className="formGray" type="date" placeholder="Ingrese su email" />
                                </div>
                            </div>
                            <div class="row mt-3 ">
                                <div class="col-3">
                                    <Form.Label style={{ fontSize: '16px' }} className="formGray">Pais</Form.Label>
                                </div>
                                <div class="col">
                                    <Form.Control autoComplete="off"
                                        name="country"
                                        onChange={e => changeCountries(e)}
                                        value={country} as="select" size="sm" custom>
                                        <option disabled value="" selected></option>
                                        {countries.map(countri => (
                                                        <option key={countri.name} value={countri.name}>
                                                            {countri.name}
                                                        </option>
                                                    ))}
                                    </Form.Control>
                                </div>
                            </div>
                            <div class="row mt-3 ">
                                <div class="col-3">
                                    <Form.Label style={{ fontSize: '16px' }} className="formGray">Estado</Form.Label>
                                </div>
                                <div class="col">
                                    <Form.Control autoComplete="off"
                                        name="state"
                                        onChange={e => changeCities(e, 0)}
                                        value={state} as="select" size="sm" custom>
                                        <option disabled value="" selected></option>
                                        {states.map(state => (
                                            <option key={state.clave} value={state.nombre}>
                                                {state.nombre}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </div>
                            </div>
                            <div class="row mt-3 ">
                                <div class="col-3">
                                    <Form.Label style={{ fontSize: '16px' }} className="formGray">Ciudad</Form.Label>
                                </div>
                                <div class="col">
                                    <Form.Control autoComplete="off"
                                        name="city"
                                        onChange={e => changeCiti(e)}
                                        value={city} as="select" size="sm" custom>
                                        <option disabled value="" selected></option>
                                        {cities.map(city => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </div>
                            </div>
                            <div class="row mt-3 ">
                                <div class="col-3">
                                    <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Nombre de el Recomendado</Form.Label>
                                </div>
                                <div class="col">
                                    <Form.Control autoComplete="off"
                                        onChange={(e) => changeNameRecom(e)} value={nameRecom}
                                        name="name"
                                        className="formGray" type="text" placeholder="Ingrese su nombre" />
                                </div>
                            </div>
                            <div class="row mt-3 ">
                                <div class="col-3">
                                    <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Apellido P. de el Recomendado</Form.Label>
                                </div>
                                <div class="col">
                                    <Form.Control autoComplete="off"
                                        onChange={(e) => changeFatherRecom(e)} value={fatherRecom}
                                        name="name"
                                        className="formGray" type="text" placeholder="Ingrese su nombre" />
                                </div>
                            </div>
                            <div class="row mt-3 ">
                                <div class="col-3">
                                    <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Apellido M de el Recomendado</Form.Label>
                                </div>
                                <div class="col">
                                    <Form.Control autoComplete="off"
                                        onChange={(e) => changeMotherRecom(e)} value={motherRecom}
                                        name="name"
                                        className="formGray" type="text" placeholder="Ingrese su nombre" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }

            {!modalRecomd ?
                <div  style={{boxShadow:'none',borderColor:'#717d95'}}class="border mt-3 card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <h5 style={{ fontWeight: '600',fontSize:'20px' }} class="montse card-title">Recomendado por : </h5>
                            </div>
                            <div class="col-1 d-flex justify-content-end">
                                <a>
                                    <FIIcons.FiEdit onClick={(e) => editRecomenBy()} size={18} style={{ color: '#386CEF' }} />
                                </a>
                            </div>
                        </div>
                        <div class="row mt-3 ">
                            <div class="col-3">
                                <h6 class="montse card-subtitle mb-2 formGrayTwo">Nombre</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="montse card-subtitle mb-2 ">
                                    {props.contact.name_recom ?? ""} {props.contact.father_recom ?? ""} {props.contact.mother_recom ?? ""}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div  style={{boxShadow:'none',borderColor:'#717d95'}}class="border mt-3 card">
                <div class="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="row">
                        <div class="col">
                            <h5 style={{ fontWeight: '600',fontSize:'20px' }} class="montse card-title">Recomendado por : </h5>
                        </div>
                        <div  class="col-1 d-flex justify-content-end">
                                    <button onClick={(e) => editRecomenBy()} type="button" class="montse btn btn-danger">Cancelar</button>
                                    <button onSubmit={handleSubmit(onSubmit)}
                                        type="submit" class="montse ml-1 btn btn-info">Guardar</button>
                                </div>
                    </div>
                    <div class="row mt-3 ">
                                <div class="col-3">
                                    <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Nombre de el Recomendado</Form.Label>
                                </div>
                                <div class="col">
                                    <Form.Control autoComplete="off"
                                        onChange={(e) => changeNameRecom(e)} value={nameRecom}
                                        name="name"
                                        className="formGray" type="text" placeholder="Ingrese su nombre" />
                                </div>
                            </div>
                            <div class="row mt-3 ">
                                <div class="col-3">
                                    <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Apellido P. de el Recomendado</Form.Label>
                                </div>
                                <div class="col">
                                    <Form.Control autoComplete="off"
                                        onChange={(e) => changeFatherRecom(e)} value={fatherRecom}
                                        name="name"
                                        className="formGray" type="text" placeholder="Ingrese su nombre" />
                                </div>
                            </div>
                            <div class="row mt-3 ">
                                <div class="col-3">
                                    <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Apellido M de el Recomendado</Form.Label>
                                </div>
                                <div class="col">
                                    <Form.Control autoComplete="off"
                                        onChange={(e) => changeMotherRecom(e)} value={motherRecom}
                                        name="name"
                                        className="formGray" type="text" placeholder="Ingrese su nombre" />
                                </div>
                            </div>
                    </form>
                </div>
            </div>
                }

{!editAcademicProfile ?
                <div  style={{boxShadow:'none',borderColor:'#717d95'}} class="border card mt-3">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-11">
                                <h5 style={{ fontWeight: '600',fontSize:'20px' }} class="montse card-title">Perfil académico</h5>
                            </div>
                            <div style={{ marginRight: '-200px' }} class="col-1 d-flex justify-content-end">
                                <a>
                                    <FIIcons.FiEdit onClick={(e) => editAcademicP()} size={18} style={{ color: '#386CEF' }} />
                                </a>
                            </div>
                        </div>
                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="montse card-subtitle mb-2 formGrayTwo">Grado</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="montse card-subtitle mb-2 ">
                                    {props.contact.grade}
                                </h6>
                            </div>
                        </div>
                        <div class="row mt-3 ">
                            <div class="col-3">
                                <h6 class="montse card-subtitle mb-2 formGrayTwo">Ciclo escolar</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="montse card-subtitle mb-2 ">
                                    {props.contact.cicly}
                                </h6>
                            </div>
                        </div>
                        <div class="row mt-3 ">
                            <div class="col-3">
                                <h6 class="montse card-subtitle mb-2 formGrayTwo">Colegio</h6>
                                {props.contact.schoool == 'Otro' && 
                                <h6 class="mt-4 montse card-subtitle mb-2 formGrayTwo">Nombre</h6>
                                }
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="montse card-subtitle mb-2 ">
                                    {props.contact.schoool}
                                </h6>
                                {props.contact.schoool == 'Otro' && 
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                class="mt-4 montse card-subtitle mb-2 ">
                                {props.contact.other_School}
                                </h6>                    
                                 }
                            </div>
                        </div>

                    </div>
                </div>
                :
                <div class="card">
                    <div  style={{boxShadow:'none',borderColor:'#717d95'}}class="border card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="row">
                                <div class="col-11">
                                    <h5 style={{ fontWeight: '600',fontSize:'20px' }} class="montse card-title">Perfil académico</h5>
                                </div>
                                <div style={{ marginRight: '-200px' }} class="col-1 d-flex justify-content-end">
                                    <button onClick={(e) => editAcademicP()} type="button" class="montse btn btn-danger">Cancelar</button>
                                    <button onSubmit={handleSubmit(onSubmit)}
                                        type="submit" class="montse ml-1 btn btn-info">Guardar</button>
                                </div>
                            </div>
                            <div class="row mt-3 ">
                                <div class="col-3">
                                    <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Grado</Form.Label>
                                </div>
                                <div class="col">
                                    <Form.Control
                                        onChange={(e) => changeGrade(e)} value={grade}
                                        autoComplete="off" name="grade" as="select" size="sm" custom>
                                        <option disabled value="" selected></option>
                                        <option value="Grado 1">Grado 1</option>
                                        <option>Grado 2</option>
                                        <option>Grado 3</option>
                                        <option>Grado 4</option>
                                        <option>Grado 5</option>
                                        <option>Grado 6</option>
                                        <option>Grado 7</option>
                                        <option>Grado 8</option>
                                        <option>Grado 9</option>
                                        <option>Grado 10</option>
                                        <option>Grado 11</option>
                                        <option>Grado 12</option>
                                    </Form.Control>
                                </div>
                            </div>
                            <div class="row mt-3 ">
                                <div class="col-3">
                                    <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Ciclo escolar</Form.Label>
                                </div>
                                <div class="col">
                                    <Form.Control
                                        onChange={(e) => changeCicly(e)} value={cicly}
                                        autoComplete="off" name="cicly" as="select" size="sm" custom>
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
                                </div>
                            </div>
                            <div class="row mt-3 ">
                                <div class="col-3">
                                    <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Colegio</Form.Label>
                                </div>
                                <div class="col">
                                <Form.Control
                                                    onChange={(e) => changeSchool(e)} value={schoool}
                                                    autoComplete="off"
                                                    name="Colegio"
                                                    className="formGray"
                                                    as="select" size="sm" custom>
                                                        {localColleges &&
                                                        [localColleges.map(colL => {
                                                            return(
                                                                <option key={colL.id} value={colL.name}>
                                                                {colL.name}
                                                                  </option>
                                                             )
                                                            })]  
                                                        }
                                                        <option key="Otro" value="Otro">Otro</option>     
                                </Form.Control>
                               <div class="mt-3 row">
                                   {schoool == 'Otro' &&
                                  <div class="col">
                                  <Form.Control autoComplete="off"
                                      onChange={(e) => changeOtherSchool(e)} value={other_School}
                                      name="Otro nombre"
                                      className="formGray" type="text" placeholder="Ingrese el nombre de su colegio" />
                              </div>
                              }
                              </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }

            {!editDetails ?
                <div  style={{boxShadow:'none',borderColor:'#717d95'}}class="border mt-3 card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <h5 style={{ fontWeight: '600',fontSize:'20px' }} class="montse card-title">Detalles de contacto</h5>
                            </div>
                            <div class="col-1 d-flex justify-content-end">
                                <a>
                                    <FIIcons.FiEdit onClick={(e) => editCDetails()} size={18} style={{ color: '#386CEF' }} />
                                </a>
                            </div>
                        </div>
                        {inputEmail.map((x, i) => {
                            return (
                                <div class="row mt-2 ">
                                    <div class="col-3">
                                        <h6 class="montse card-subtitle mb-2 formGrayTwo">Email {x.typeEmail}</h6>
                                    </div>
                                    <div class="col">
                                        <h6 style={{ color: '#243243', fontWeight: '600' }}
                                            class="montse card-subtitle mb-2 ">
                                            {x.email}
                                        </h6>
                                    </div>
                                </div>
                            );
                        })}
                        {inputPhone.map((x, i) => {
                            return (
                                <div class="row mt-3 ">
                                    <div class="col-3">
                                        <h6 class="montse card-subtitle mb-2 formGrayTwo">Teléfono {x.typePhone}</h6>
                                    </div>
                                    <div class="col">
                                        <h6 style={{ color: '#243243', fontWeight: '600' }}
                                            class="montse card-subtitle mb-2 ">
                                            {x.phone}
                                        </h6>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                :
                <div style={{boxShadow:'none',borderColor:'#717d95'}}class="border mt-3 card">
                    <div class="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="row">
                                <div class="col">
                                    <h5 style={{ fontWeight: '600',fontSize:'20px' }} class="montse card-title">Detalles de contacto</h5>
                                </div>
                                <div class="col-1 d-flex justify-content-end">
                                    <button onClick={(e) => editCDetails()} type="button" class="montse btn btn-danger">Cancelar</button>
                                    <button onSubmit={handleSubmit(onSubmit)}
                                        type="submit" class="montse ml-1 btn btn-info">Guardar</button>
                                </div>
                            </div>
                            <div class="d-flex justify-content-left">
                                <h6 >
                                    Email
                            </h6>
                            </div>
                            {inputEmail.map((x, i) => {
                                return (
                                    <div className="box">
                                        <div class="row mt-3 ">
                                            <div class="col-3">
                                                <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Tipo</Form.Label>
                                            </div>
                                            <div class="col">
                                                <Form.Control
                                                    onChange={e => handleInputChangeEmail(e, i)}
                                                    value={x.typeEmail}
                                                    autoComplete="off"
                                                    name="typeEmail"
                                                    className="formGray"
                                                    as="select" size="sm" custom>
                                                    <option disabled value="" selected></option>
                                                    <option>Personal</option>
                                                    <option>Trabajo</option>
                                                    <option>Estudiantil</option>
                                                    <option>Otro</option>
                                                </Form.Control>
                                            </div>
                                            {x.typeEmail === 'Otro' &&
                                                <div class="col">
                                                    <Form.Control autoComplete="off"
                                                        onChange={e => handleInputChangeEmail(e, i)}
                                                        value={x.otherEmail}
                                                        name="otherEmail"
                                                        className="formGray" type="text" placeholder="Ingrese su tipo de email" />
                                                </div>
                                            }
                                        </div>
                                        <div class="row mt-3 ">
                                            <div class="col-3">
                                                <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Email</Form.Label>
                                            </div>
                                            <div class="col">
                                                <Form.Control autoComplete="off"
                                                    onChange={e => handleInputChangeEmail(e, i)}
                                                    value={x.email}
                                                    name="email"
                                                    className="formGray" type="text" placeholder="Ingrese su Email" />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4 ">
                                                {inputEmail.length !== 0 &&
                                                 <button type="button" onClick={() => handleRemoveClickEmail(i)} class="montse ml-1 btn btn-danger btn-sm">
                                                     <FAIcons.FaTrashAlt  style={{ color: 'white' }} size={18} />
                                                </button>
                                                }
                                                {inputEmail.length - 1 === i && <button onClick={handleAddClickEmail}
                                                    type="submit" class="montse ml-1 btn btn-info btn-sm"><span style={{ fontSize: '16px' }} class="montse">+</span></button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <Row>
                                <Col>
                                    <hr></hr>
                                    <h6 >
                                        Teléfono
                            </h6>
                                </Col>
                            </Row>
                            {inputPhone.map((x, i) => {
                                return (
                                    <div className="box mt-1">

                                        <div class="row mt-3">
                                            <div class="col-3">
                                                <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Tipo</Form.Label>
                                            </div>
                                            <div class="col">
                                                <Form.Control
                                                    autoComplete="off"
                                                    onChange={e => handleInputChangePhone(e, i)}
                                                    value={x.typePhone}
                                                    name="typePhone"
                                                    className="formGray" type="text"
                                                    as="select" size="sm" custom>
                                                    <option disabled value="" selected></option>
                                                    <option>Móvil</option>
                                                    <option>Personal</option>
                                                    <option>Trabajo</option>
                                                    <option>Otro</option>
                                                </Form.Control>
                                            </div>
                                            {x.typePhone === 'Otro' &&
                                                <div class="col">
                                                    <Form.Control autoComplete="off"
                                                        onChange={e => handleInputChangePhone(e, i)}
                                                        value={x.otherPhone}
                                                        name="otherPhone"
                                                        className="formGray" type="text" placeholder="Ingrese su tipo de teléfono" />
                                                </div>
                                            }
                                        </div>
                                        <div class="row mt-3 ">
                                            <div class="col-3">
                                                <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Teléfono</Form.Label>
                                            </div>
                                            <div class="col">
                                                <Form.Control autoComplete="off"
                                                    onChange={e => handleInputChangePhone(e, i)}
                                                    value={x.phone}
                                                    name="phone"
                                                    className="formGray" type="text" placeholder="Ingrese su numero" />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4 ">
                                                {inputPhone.length !== 0 &&
                                                  <button type="button" onClick={() => handleRemoveClickPhone(i)} class="montse ml-1 btn btn-danger btn-sm">
                                                  <FAIcons.FaTrashAlt  style={{ color: 'white' }} size={18} />
                                             </button>
                                                }
                                                {inputPhone.length - 1 === i && <button onClick={handleAddClickPhone}
                                                    type="submit" class="montse ml-1 btn btn-info btn-sm"><span style={{ fontSize: '16px' }} class="montse">+</span></button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </form>
                    </div>
                </div>
            }
            {!editDirection ?
                <div  style={{boxShadow:'none',borderColor:'#717d95'}}class="border mt-3 card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <h5 style={{ fontWeight: '600',fontSize:'20px' }} class="montse card-title">Dirección</h5>
                            </div>
                            <div class="col-1 d-flex justify-content-end">
                                <a>
                                    <FIIcons.FiEdit onClick={(e) => editD()} size={18} style={{ color: '#386CEF' }} />
                                </a>
                            </div>
                        </div>
                        {inputList.map((x, i) => {
                            return (
                                <>
                                    <div class="row mt-3 ">
                                        <div class="col-3">
                                            <h6 class="montse card-subtitle mb-2 formGrayTwo">Dirección {x.typeAddress}</h6>
                                        </div>
                                        <h6 style={{ color: '#243243', fontWeight: '600' }}
                                            class="montse card-subtitle mb-2 ">
                                            {x.street} &nbsp;&nbsp;
                                            {x.intNum &&
                                                tagSpan(x.intNum)
                                            }
                                        </h6>
                                    </div>
                                    <div class="row mr-5">
                                        <div class="col-3">

                                        </div>
                                        <div class="col">
                                            <h6 class="mt-2" style={{ color: '#243243', fontWeight: '600' }}
                                                class="montse card-subtitle mb-2 ">
                                                {x.col &&
                                                    tagCOL(x.col)
                                                }
                                                {x.mun &&
                                                    tagMun(x.mun)
                                                }
                                            </h6>
                                        </div>
                                    </div>
                                    <div class="row mr-5">
                                        <div class="col-3">

                                        </div>
                                        <div class="col">
                                            <h6 class="mt-2" style={{ color: '#243243', fontWeight: '600' }}
                                                class="montse card-subtitle mb-2 ">
                                                    {/* {props.contact.country ? props.contact.country : ''}
                                    {props.contact.state ? ',' + props.contact.state : ''}
                                    {props.contact.state ? ',' + props.contact.city : ''} */}
                                                {x.city ? x.city :' '} {x.state ? ', ' + x.state + ', ' : ' '}
                                                {x.country ? x.country : ' '}
                                            </h6>
                                        </div>
                                    </div>
                                    <div class="row mr-5">
                                        <div class="col-3">

                                        </div>
                                        <div class="col">
                                            <h6 class="mt-2" style={{ color: '#243243', fontWeight: '600' }}
                                                class="montse card-subtitle mb-2 ">
                                                {x.cp}
                                            </h6>
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                </div>
                :
                <div  style={{boxShadow:'none',borderColor:'#717d95'}}class="border mt-3 card">
                    <div class="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="row">
                                <div class="col">
                                    <h5 style={{ fontWeight: '600',fontSize:'20px' }} class="montse card-title">Dirección</h5>
                                </div>
                                <div class="col-1 d-flex justify-content-end">
                                    <button onClick={(e) => editD()} type="button" class="montse btn btn-danger">Cancelar</button>
                                    <button onSubmit={handleSubmit(onSubmit)}
                                        type="submit" class="montse ml-1 btn btn-info">Guardar</button>
                                </div>
                            </div>
                            {inputList.map((x, i) => {
                                return (
                                    <div className="box">
                                        <div class="row mt-3">
                                            <div class="col-3">
                                                <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Tipo</Form.Label>
                                            </div>
                                            <div class="col">
                                                <Form.Control autoComplete="off"
                                                    onChange={e => handleInputChange(e, i)}
                                                    value={x.typeAddress}
                                                    name="typeAddress"
                                                    className="informGray"
                                                    as="select" size="sm" custom>
                                                    <option disabled value="" selected></option>
                                                    <option>Trabajo</option>
                                                    <option>Casa</option>
                                                    <option>Negocio</option>
                                                    <option>Otro</option>
                                                </Form.Control>
                                            </div>

                                            {x.typeAddress === 'Otro' &&
                                                <div class="col">
                                                    <Form.Control autoComplete="off"
                                                        onChange={e => handleInputChange(e, i)}
                                                        value={x.otherDirection}
                                                        name="otherDirection"
                                                        className="informGray" type="text" placeholder="Ingrese su tipo de dirección" />
                                                </div>
                                            }
                                        </div>
                                        <div class="row mt-3 ">
                                            <div class="col-8">
                                                <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Calle</Form.Label>
                                                <InputGroup>
                                                    <Form.Control autoComplete="off"
                                                        onChange={e => handleInputChange(e, i)}
                                                        value={x.street}
                                                        name="street"
                                                        className="informGray" type="text" placeholder="Ingrese su Calle" />
                                                    <InputGroup.Append>
                                                        <InputGroup.Text className="informGray" ><TIicons.TiHome /></InputGroup.Text>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                            </div>
                                            <div class="col-2">
                                                <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Numero exterior</Form.Label>
                                                <InputGroup>
                                                    <Form.Control autoComplete="off"
                                                        onChange={e => handleInputChange(e, i)}
                                                        value={x.extNum}
                                                        name="extNum"
                                                        className="informGray" type="text" placeholder="#" />
                                                    <InputGroup.Append>
                                                        <InputGroup.Text className="informGray" ><TIicons.TiHome /></InputGroup.Text>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                            </div>
                                            <div class="col-2">
                                                <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Numero montseior</Form.Label>
                                                <InputGroup>
                                                    <Form.Control autoComplete="off"
                                                        onChange={e => handleInputChange(e, i)}
                                                        value={x.intNum}
                                                        name="intNum"
                                                        className="informGray" type="text" placeholder="#" />
                                                    <InputGroup.Append>
                                                        <InputGroup.Text className="informGray"><TIicons.TiHome /></InputGroup.Text>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                            </div>
                                        </div>
                                        <div class="row mt-3">
                                            <div class="col">
                                                <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Codigo postal</Form.Label>
                                                <InputGroup>
                                                    <Form.Control autoComplete="off"
                                                        onChange={e => handleInputChange(e, i)}
                                                        value={x.cp}
                                                        title="respeta el formato,solo numeros"
                                                        pattern="[0-9]{5}"
                                                        name="cp"
                                                        className="informGray" type="text" placeholder="Ingrese su codigo postal" />
                                                    <InputGroup.Append>
                                                        <InputGroup.Text className="informGray"><TIicons.TiHome /></InputGroup.Text>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                            </div>
                                            {x.country === "Mexico" &&
                                                <>
                                                    <div class="col">
                                                        <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Colonia</Form.Label>
                                                        <InputGroup>
                                                            <Form.Control onChange={e => handleInputChange(e, i)} autoComplete="off"
                                                                name="col"
                                                                value={x.col} as="select" size="sm" custom>
                                                                {optionscols.map(opcol => (
                                                                    <option key={opcol.opcolonia} value={opcol.colonia}>
                                                                        {opcol.colonia}
                                                                    </option>
                                                                ))}
                                                            </Form.Control>
                                                            <InputGroup.Append>
                                                            </InputGroup.Append>
                                                        </InputGroup>
                                                    </div>
                                                    <div class="col">
                                                        <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Delegacion o Municipio</Form.Label>
                                                        <InputGroup>
                                                            <Form.Control autoComplete="off"
                                                                onChange={e => handleInputChange(e, i)}
                                                                value={x.mun}
                                                                name="mun"
                                                                disabled
                                                                className="informGray" type="text" placeholder="Ingrese su Municipio" />
                                                            <InputGroup.Append>
                                                                <InputGroup.Text className="informGray"><TIicons.TiHome /></InputGroup.Text>
                                                            </InputGroup.Append>
                                                        </InputGroup>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                        {x.country === 'Mexico' ?
                                            <>
                                                <div class="row mt-3 ">
                                                    <div class="col">
                                                        <Form.Label style={{ fontSize: '16px' }} className="formGray">Estado</Form.Label>
                                                        <Form.Control
                                                            className="informGray"
                                                            onChange={e => handleInputChange(e, i)}
                                                            autoComplete="off" name="city"
                                                            value={x.state} size="sm"
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                    <div class="col">
                                                        <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Ciudad</Form.Label>
                                                        <Form.Control
                                                            className="informGray"
                                                            onChange={e => handleInputChange(e, i)}
                                                            autoComplete="off" name="city"
                                                            value={x.city} size="sm"
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            // Manual 
                                            <>
                                                <div class="row mt-3 ">
                                                    <div class="col">
                                                        <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Ciudad</Form.Label>
                                                        <InputGroup>
                                                            <Form.Control
                                                                className="informGray"
                                                                onChange={e => handleInputChange(e, i)}
                                                                autoComplete="off" name="city"
                                                                value={x.city} size="sm"
                                                                autoComplete="off"
                                                            />
                                                            <InputGroup.Append>
                                                                <InputGroup.Text className="informGray"><TIicons.TiHome /></InputGroup.Text>
                                                            </InputGroup.Append>
                                                        </InputGroup>
                                                    </div>
                                                    <div class="col">
                                                        <Form.Label style={{ fontSize: '16px' }} className="formGray">Estado</Form.Label>
                                                        <InputGroup>
                                                            <Form.Control autoComplete="off"
                                                                onChange={e => handleInputChange(e, i)}
                                                                value={x.state}
                                                                name="state"
                                                                className="informGray" type="text" placeholder="Ingrese su Estado" />
                                                            <InputGroup.Append>
                                                                <InputGroup.Text className="informGray"><TIicons.TiHome /></InputGroup.Text>
                                                            </InputGroup.Append>
                                                        </InputGroup>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                        <Row className="mt-3">
                                            <Col>
                                                <label class="custom-radio-checkbox">
                                                    <input class="custom-radio-checkbox__input"
                                                        value={flagCountry}
                                                        checked={flagCountry.isChecked} type="checkbox" onClick={(e) => changeChecked(e)} />
                                                    <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                                                    <span class="custom-radio-checkbox__text">Cambiar país</span>
                                                </label>
                                            </Col>
                                        </Row>
                                        {flagCountry.isChecked &&
                                            <div class="row mt-3 ">
                                                <div class="col-3">
                                                    <Form.Label style={{ fontSize: '16px' }} className="formGray">Pais</Form.Label>
                                                </div>
                                                <div class="col">
                                                    <Form.Control onChange={e => handleInputChange(e, i)} autoComplete="off"
                                                        name="country"
                                                        value={x.country} as="select" size="sm" custom>
                                                        <option disabled value="" selected></option>
                                                        {countries.map(countri => (
                                                            <option key={countri.country_name} value={countri.country_name}>
                                                                {countri.country_name}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </div>
                                            </div>
                                        }
                                        <div class="row">
                                            <div class="col-4 ">
                                                {inputList.length !== 0 &&
                                                  <button type="button" onClick={() => handleRemoveClick(i)} class="montse ml-1 btn btn-danger btn-sm">
                                                  <FAIcons.FaTrashAlt  style={{ color: 'white' }} size={18} />
                                             </button>
                                                }
                                                {inputList.length - 1 === i && <button onClick={handleAddClick}
                                                    type="submit" class="montse ml-1 btn btn-info btn-sm"><span style={{ fontSize: '16px' }} class="montse">+</span></button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default PersonalData

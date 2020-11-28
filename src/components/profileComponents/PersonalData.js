import React, { useEffect, useState } from 'react';
import * as FIIcons from "react-icons/fi";
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useAlert } from 'react-alert'



function PersonalData(props) {
    useEffect(() => {
        setFilterValues(props.contact);
        consultStates();
    }, [props]);
    const [editInfo, setEditInfo] = useState(false);
    const [editDetails, setEditDetails] = useState(false);
    const [birthday, setBirthday] = useState();
    const [city, setCity] = useState();
    const [email, setEmail] = useState();
    const [fName, setFname] = useState();
    const [mName, setMname] = useState();
    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [schoool, setSchoool] = useState();
    const [state, setState] = useState();
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const alert = useAlert()


    function changeCiti(e){
        setCity(e.target.value);
    }
    function changeCities(e) {
        let val = e.target.value;
        if(val === undefined){
            val = props.contact.state;
        } else {
            val = e.target.value;
        }
        if(e.target){
            setState(e.target.value);
        }
        axios.get('https://www.universal-tutorial.com/api/cities/' + val, {
            headers: {
                Authorization: 'Bearer ' + props.token,
                Accept: "application/json"
            }
        }).then(function (response) {
            setCities(response.data);
        });
    }
    // Api to states
    async function consultStates() {
        await axios.get('https://www.universal-tutorial.com/api/states/Mexico', {
            headers: {
                Authorization: 'Bearer ' + props.token,
                Accept: "application/json"
            }
        }).then(function (response) {
            setStates(response.data);
            let obj = {
                target: {
                    value: state
                }
            };
            changeCities(obj);
        });

    }
    function setFilterValues(props) {
        setBirthday(props.birthday);
        setCity(props.city);
        setEmail(props.email);
        setFname(props.father_lastname);
        setMname(props.mother_lastname);
        setName(props.name);
        setPhone(props.phone);
        setSchoool(props.schoool);
        setState(props.state);
    }
    const { handleSubmit } = useForm({});

    function changeName(e) {
        setName(e.target.value);
    }
    function changeFname(e) {
        setFname(e.target.value);
    }
    function changeMName(e) {
        setMname(e.target.value);
    }
    function changeEmail(e){
        setEmail(e.target.value)
    }
    function changePhone(e){
        setPhone(e.target.value)
    }
    async function onSubmit(data) {
        let datax = {
            id: props.contact.id, 
            father_lastname:fName,
            name:name,
            email:email,
            mother_lastname:mName,
            birthday:birthday,
            city:city,
            phone:phone,
            schoool:schoool,
            state:state,

            };
            await axios.post('http://api.boardingschools.mx/api/contact/update',datax)
            .then(function (response) {
                if(response.status === 200){
                    alert.show('Datos actualizados correctamente', {
                        timeout: 2000, // custom timeout just for this one alert
                        type: 'success'
                    })
                } else {
                    alert.show('Ocurrio un error por favor intentar mas tarde');
                }
            });
            if(editInfo){
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
    return (
        <>
            {!editInfo ?
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-11">
                                <h5 style={{ fontWeight: '600' }} class="Inter card-title">Informacion</h5>
                            </div>
                            <div style={{ marginRight: '-200px' }} class="col-1 d-flex justify-content-end">
                                <a>
                                    <FIIcons.FiEdit onClick={(e) => edit()} size={18} style={{ color: '#386CEF' }} />
                                </a>
                            </div>
                        </div>
                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Nombre</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {props.contact.name}
                                </h6>
                            </div>
                        </div>
                        <div class="row mt-3 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Apellido paterno</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {props.contact.father_lastname}
                                </h6>
                            </div>
                        </div>
                        <div class="row mt-3 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Apellido materno</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {props.contact.mother_lastname}
                                </h6>
                            </div>
                        </div>

                        <div class="row mt-3 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Fecha</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '##243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2">
                                    {props.contact.birthday}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div class="card">
                    <div class="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="row">
                                <div class="col-11">
                                    <h5 style={{ fontWeight: '600' }} class="Inter card-title">Informacion</h5>
                                </div>
                                <div style={{ marginRight: '-200px' }} class="col-1 d-flex justify-content-end">
                                    <button onClick={(e) => edit()} type="button" class="Inter btn btn-outline-dark">Cancelar</button>
                                    <button onSubmit={handleSubmit(onSubmit)}
                                        type="submit" class="Inter ml-1 btn btn-success">Guardar</button>
                                </div>
                            </div>
                            <div class="row mt-3 ">
                                <div class="col-3">
                                    <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Nombre</Form.Label>
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
                                    <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Apellido paterno</Form.Label>
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
                                    <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Apellido materno</Form.Label>
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
                                    <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Fecha</Form.Label>
                                </div>
                                <div class="col">
                                    <Form.Control autoComplete="off"
                                        onChange={(e) => changeBirtday(e)} value={birthday}
                                        name="birthday"
                                        className="formGray" type="date" placeholder="Ingrese su email" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }

            {!editDetails ?
                <div class="mt-3 card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <h5 style={{ fontWeight: '600' }} class="Inter card-title">Detalles de contacto</h5>
                            </div>
                            <div class="col-1 d-flex justify-content-end">
                                <a>
                                    <FIIcons.FiEdit onClick={(e) => editCDetails()} size={18} style={{ color: '#386CEF' }} />
                                </a>
                            </div>
                        </div>
                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Email</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {props.contact.email}
                                </h6>
                            </div>
                        </div>
                        <div class="row mt-3 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Telefono</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {props.contact.phone}
                                </h6>
                            </div>
                        </div>
                        <div class="row mt-3 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Estado</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {props.contact.state}
                                </h6>
                            </div>
                        </div>
                        <div class="row mt-3 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Ciudad</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {props.contact.city}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div class="mt-3 card">
                    <div class="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div class="row">
                            <div class="col">
                                <h5 style={{ fontWeight: '600' }} class="Inter card-title">Detalles de contacto</h5>
                            </div>
                            <div  class="col-1 d-flex justify-content-end">
                                    <button onClick={(e) => editCDetails()} type="button" class="Inter btn btn-outline-dark">Cancelar</button>
                                    <button onSubmit={handleSubmit(onSubmit)}
                                        type="submit" class="Inter ml-1 btn btn-success">Guardar</button>
                                </div>
                        </div>
                        <div class="row mt-3 ">
                            <div class="col-3">
                                <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Email</Form.Label>
                            </div>
                            <div class="col">
                                <Form.Control autoComplete="off"
                                    onChange={(e) => changeEmail(e)} value={email}
                                    name="email"
                                    className="formGray" type="email" placeholder="Ingrese su email" />
                            </div>
                        </div>
                        <div class="row mt-3 ">
                            <div class="col-3">
                                <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Telefono</Form.Label>
                            </div>
                            <div class="col">
                                <Form.Control autoComplete="off"
                                    onChange={(e) => changePhone(e)} value={phone}
                                    name="phone"
                                    className="formGray" type="text" placeholder="Ingrese su Telefono" />
                            </div>
                        </div>
                        <div class="row mt-3 ">
                            <div class="col-3">
                                <Form.Label className="formGray">Estado</Form.Label>
                            </div>
                            <div class="col">
                                <Form.Control onChange={e => changeCities(e)} autoComplete="off" name="state" value={state} as="select" size="sm" custom>
                                    <option disabled value="" selected></option>
                                    {states.map(state => (
                                        <option key={state.state_name} value={state.state_name}>
                                            {state.state_name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </div>
                        </div>
                        <div class="row mt-3 ">
                            <div class="col-3">
                                <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Ciudad</Form.Label>
                            </div>
                            <div class="col">
                                <Form.Control
                                    onChange={e => changeCiti(e)}
                                    autoComplete="off" name="city" value={city} as="select" size="sm" custom>
                                    <option key={"1"} defaultValue={city}  ></option>
                                    {cities.map(city => (
                                        <option key={city.city_name} value={city.city_name}>
                                            {city.city_name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default PersonalData

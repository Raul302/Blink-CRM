import React, { useEffect, useState } from 'react';
import * as FIIcons from "react-icons/fi";
import * as AIIcons from "react-icons/ai";
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux';   
function DetailsData(props) {
    // vars
    let {active} = useSelector( state => state.colleges);
    if(!active){
        active =  JSON.parse(localStorage.getItem('collegeActive'));
    }
    const [editInfo,setEditInfo] = useState(false);
    const [editFacts,setEditFacts] = useState(false);
    const [editAddress,setEditAddress] = useState(false);

    // methods
    function edit() {
        setEditInfo(!editInfo);
    }
    function changeName(e){}
    function changeType(e){}
    function changeCountry(e){}
    function changeWebSite(e){}
    function changeDayGrade(e){}
    function changeBoardingGrade(e){}
    function changeDayStudents(e){}
    function changeInternationalGrade(e){}
    function changeStudentsInSchool(e){}
    function changeCity(e){}
    function changeStreet(e){}
    function changeCP(e){}
    function changeNumber(e){}
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
                                    {active.name}
                                </h6>
                            </div>
                        </div>
                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Tipo</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {active.type}
                                </h6>
                            </div>
                        </div>
                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Pais</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {active.country}
                                </h6>
                            </div>
                        </div>
                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Sitio web</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {active.website}
                                </h6>
                            </div>
                        </div>
                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Nombre</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {active.name}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            :
            <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-11">
                                <h5 style={{ fontWeight: '600' }} class="Inter card-title">Editar Informacion</h5>
                            </div>
                            <div style={{ marginRight: '-200px' }} class="col-1 d-flex justify-content-end">
                            <a>
                            <FIIcons.FiEdit onClick={(e) => edit()} size={18} style={{ color: '#386CEF' }} />
                            </a>
                            </div>
                        </div>
                        <div class="row mt-3 ">
                                <div class="col-3">
                                    <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Nombre</Form.Label>
                                </div>
                                <div class="col">
                                    <Form.Control autoComplete="off"
                                        onChange={(e) => changeName(e)} value={active.name}
                                        name="name"
                                        className="formGray" type="text" placeholder="Ingrese su nombre" />
                                </div>
                            </div>
                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Tipo</h6>
                            </div>
                            <div class="col">
                                    <Form.Control autoComplete="off"
                                        name="city"
                                        onChange={e => changeType(e)}
                                        value={active.type} as="select" size="sm" custom>
                                        <option disabled value="" selected></option>
                                        {/* {cities.map(city => (
                                            <option key={city.city_name} value={city.city_name}>
                                                {city.city_name}
                                            </option>
                                        ))} */}
                                    </Form.Control>
                                </div>
                        </div>
                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Pais</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {active.country}
                                </h6>
                            </div>
                        </div>
                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Sitio web</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {active.website}
                                </h6>
                            </div>
                        </div>
                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Nombre</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {active.name}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>    
            }
                {/* FACTS & FIGURES */}
                <div class="mt-3 card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-11">
                                <h5 style={{ fontWeight: '600' }} class="Inter card-title">Facts & Figures</h5>
                            </div>
                            <div style={{ marginRight: '-200px' }} class="col-1 d-flex justify-content-end">
                                {/* <a>
                                    <FIIcons.FiEdit  size={18} style={{ color: '#386CEF' }} />
                                </a> */}
                            </div>
                        </div>
                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Inicio day Grade</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {active.start_day_grade}
                                </h6>
                            </div>
                        </div>
                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Total boarding grade</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {active.total_boarding_grade}
                                </h6>
                            </div>
                        </div>
                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Total day students</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {active.total_day_students}
                                </h6>
                            </div>
                        </div>
                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Total international grade</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {active.total_international_grade}
                                </h6>
                            </div>
                        </div>
                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">total students in school</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {active.total_students_in_school}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="mt-3 card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-11">
                                <h5 style={{ fontWeight: '600' }} class="Inter card-title">Direccion</h5>
                            </div>
                            <div style={{ marginRight: '-200px' }} class="col-1 d-flex justify-content-end">
                                {/* <a>
                                    <FIIcons.FiEdit  size={18} style={{ color: '#386CEF' }} />
                                </a> */}
                            </div>
                        </div>
                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Ciudad</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {active.city}
                                </h6>
                            </div>
                        </div>
                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Estado</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {active.state}
                                </h6>
                            </div>
                        </div>
                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Calle</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {active.street}
                                </h6>
                            </div>
                        </div>
                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Codigo postal</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {active.cp}
                                </h6>
                            </div>
                        </div>
                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Numero</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {active.number}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}

export default DetailsData

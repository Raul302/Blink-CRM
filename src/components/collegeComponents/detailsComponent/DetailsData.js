import React, { useEffect, useState } from 'react';
import * as FIIcons from "react-icons/fi";
import * as AIIcons from "react-icons/ai";
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux';   
import { setColleges } from 'actions/colleges/colleges';
import {apiCountries} from '../../../constants/constants';
function DetailsData(props) {
    // vars
    let {active} = useSelector( state => state.colleges);
    if(!active){
        active =  JSON.parse(localStorage.getItem('collegeActive'));
    }
    const [editInfo,setEditInfo] = useState(false);
    const [editFacts,setEditFacts] = useState(false);
    const [editAddress,setEditAddress] = useState(false);
    const [college,setCollege] = useState(false);
    const [countries, setCountries] = useState([]);
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const types = ['Boarding School', 'School District', 'Summer Camp', 'Language School', 'University/College', 'Work & Travel'];

    useEffect(() => {
        if(active){
            setCollege({...active});
        }
         axios.get(apiCountries)
            .then(function (response) {
                setCountries(response.data);
            });
    },[])
    // methods
    function edit() {
        setEditInfo(!editInfo);
    }
    function editFact(){
        setEditFacts(!editFacts);
    }
    function editAdd(){
        setEditAddress(!editAddress);
    }
    function changeName(e){
        setCollege({...college,name:e.target.value});
    }
    function changeType(e){
        setCollege({...college,type:e.target.value});
        // switch (e.target.value) {
        //     case 'Boarding School':
        //         setCountries(countriesBoardingSchools)
        //         break;
        //     case 'School District':
        //         setCountries(countriesSchoolD)
        //         break;
        //     case 'Summer Camp':
        //         setCountries(countriesSummer);
        //         break;
        //     default:
        //         setCountries(countriesBoardingSchools)
        //         break;
        // }
    }
    function changeCountry(e){
        setCollege({...college,country:e.target.value});

    }
    function changeWebSite(e){
        setCollege({...college,website:e.target.value});
    }
    function changeDayGrade(e){
        setCollege({...college,start_day_grade:e.target.value});
    }
    function changeBoardingGrade(e){
        setCollege({...college,total_boarding_grade:e.target.value});

    }
    function changeDayStudents(e){
        setCollege({...college,total_day_students:e.target.value});

    }
    function changeInternationalGrade(e){
        setCollege({...college,total_international_grade:e.target.value});

    }
    function changeStudentsInSchool(e){
        setCollege({...college,total_students_in_school:e.target.value});

    }
    function changeCity(e){
        setCollege({...college,city:e.target.value});

    }
    function changeStreet(e){
        setCollege({...college,street:e.target.value});

    }
    function changeCP(e){
        setCollege({...college,cp:e.target.value});

    }
    function changeNumber(e){
        setCollege({...college,number:e.target.value});

    }
    return (
        <>
        {!editInfo ?
                <div class="mt-n5 card">
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
            <div class="mt-n5 card">
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
                                    <Form.Label style={{ fontSize: '16px' }} className="montse formGray">Nombre</Form.Label>
                                </div>
                                <div class="col">
                                    <Form.Control autoComplete="off"
                                        onChange={(e) => changeName(e)} value={college.name}
                                        name="name"
                                        className="formGray" type="text" placeholder="Ingrese su nombre" />
                                </div>
                            </div>
                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="montse card-subtitle mb-2 text-muted">Tipo</h6>
                            </div>
                            <div class="col">
                                    <Form.Control autoComplete="off"
                                        name="city"
                                        onChange={e => changeType(e)}
                                        value={college.type} as="select" size="sm" custom>
                                        <option disabled value="" selected></option>
                                        {types.map(typ => (
                                            <option key={typ} value={typ}>
                                                {typ}
                                            </option>
                                        ))}
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
                                    <Form.Control autoComplete="off"
                                        name="city"
                                        onChange={e => changeCountry(e)}
                                        value={college.country} as="select" size="sm" custom>
                                        <option disabled value="" selected></option>
                                        {countries &&
                                        [countries.map(countr => (
                                            <option key={countr.name} value={countr.name}>
                                            {countr.name}
                                        </option>
                                        ))]
                                    }
                                    </Form.Control>
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
                                       <Form.Control autoComplete="off"
                                        onChange={(e) => changeWebSite(e)} value={college.website}
                                        name="name"
                                        className="formGray" type="text" placeholder="Ingrese su website" />
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>    
            }
                {!editFacts ?
                // {/* FACTS & FIGURES */}
                <div class="mt-3 card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-11">
                                <h5 style={{ fontWeight: '600' }} class="Inter card-title">Facts & Figures</h5>
                            </div>
                            <div style={{ marginRight: '-200px' }} class="col-1 d-flex justify-content-end">
                            <a>
                            <FIIcons.FiEdit onClick={(e) => editFact()} size={18} style={{ color: '#386CEF' }} />
                            </a>
                            </div>
                        </div>
                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Inicio day Grade</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                   <Form.Control
                                        name="start_boarding_grade"
                                        autoComplete="off" className="formGray" type="text" placeholder="Seleccione el grado"
                                        onChange={(e) => changeDayGrade(e)}
                                        value={college.start_day_grade}
                                        as="select" size="sm" custom>
                                        <option disabled value="" selected></option>
                                        {numbers.map(numb => (
                                            <option key={numb} value={numb}>
                                                {numb}
                                            </option>
                                        ))}
                                    </Form.Control>
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
                                        <Form.Control
                                        name="start_boarding_grade"
                                        autoComplete="off" className="formGray" type="text" placeholder="Seleccione el grado"
                                        onChange={(e) => changeBoardingGrade(e)}
                                        value={college.total_boarding_grade}
                                        as="select" size="sm" custom>
                                        <option disabled value="" selected></option>
                                        {numbers.map(numb => (
                                            <option key={numb} value={numb}>
                                                {numb}
                                            </option>
                                        ))}
                                    </Form.Control>
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
                :

                //  {/* FACTS & FIGURES EDIT */}
                 <div class="mt-3 card">
                 <div class="card-body">
                     <div class="row">
                         <div class="col-11">
                             <h5 style={{ fontWeight: '600' }} class="Inter card-title">Facts & Figures</h5>
                         </div>
                         <div style={{ marginRight: '-200px' }} class="col-1 d-flex justify-content-end">
                         <a>
                         <FIIcons.FiEdit onClick={(e) => editFact()} size={18} style={{ color: '#386CEF' }} />
                         </a>
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
             
                }


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

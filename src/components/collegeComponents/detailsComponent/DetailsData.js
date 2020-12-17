import React, { useEffect, useState } from 'react';
import * as FIIcons from "react-icons/fi";
import * as AIIcons from "react-icons/ai";
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux';   
function DetailsData(props) {
    const {active} = useSelector( state => state.colleges);
console.log(active);

    return (
        <>
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-11">
                                <h5 style={{ fontWeight: '600' }} class="Inter card-title">Informacion</h5>
                            </div>
                            <div style={{ marginRight: '-200px' }} class="col-1 d-flex justify-content-end">
                                {/* <a>
                                    <FIIcons.FiEdit  size={18} style={{ color: '#386CEF' }} />
                                </a> */}
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

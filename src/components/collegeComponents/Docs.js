import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import axios from 'axios';
import * as BSicons from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { finishLoading, startLoading } from '../../actions/ui';
import Skeleton from 'react-loading-skeleton';
import { useAlert } from 'react-alert'
import CollegeCuote from './CollegeCuote';
import { constaApi , constPathFiles } from 'constants/constants';

function Docs() {
    const { loading } = useSelector(state => state.ui);
    useEffect(() => {
        getFiles();
    }, [])
    const alert = useAlert()

    const dispatch = useDispatch();
    const pathFiles = constPathFiles;
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
        axios.post(constaApi+'files/index', { id: active.id })
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
            url: constaApi+'files/upload',
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
        <div className="content">
            <Row className="mt-3">
                <Col>
                <CollegeCuote/>
                </Col>
            </Row>
        </div>  
    )
}

export default Docs

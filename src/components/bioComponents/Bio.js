
import { useSelector } from 'react-redux';
import React, { useState,useRef, useEffect } from 'react'
import *  as FIcons from "react-icons/fi";
import *  as FAIcons from "react-icons/fa";
import *  as HIcons from "react-icons/hi";
import *  as Ioicons from "react-icons/io";
import * as MDIcons from "react-icons/md";
import { useForm } from "react-hook-form";
import { Button, Modal, Form, InputGroup, Popover, OverlayTrigger, FormControl } from 'react-bootstrap';
import Select from 'react-select';
import moment from 'moment'
import swal from 'sweetalert';
import { useParams, } from "react-router";
import 'moment/locale/es'  // without this line it didn't work
import {
    Table,
    Row,
    Col,
  } from "reactstrap";

import { useAlert } from 'react-alert'
import axios from 'axios';
import NotificationAlert from "react-notification-alert";
import { constaApi } from '../../constants/constants';
import TableBio from './TableBio';
import AddEditBio from './AddEditBio';

function Bio(props) {
    const [show,setShow] = useState(false);
    const [row,setRow] = useState();
    const [allUsers,setAllU] = useState([]);
    useEffect(() => {
     
    },[])
    function method(obj){
        setRow(obj);
        setShow(!show);
    }
    function setFlag(){
        setShow(!show);
    }
    function getChild(obj){
        setAllU(obj);
    }
    return (
        <>
        <div class="mt-n2 content">
        <AddEditBio getAllUsers={(e) =>getChild(e)} {...props} activeApplications={props.applications ?? null} activeProspect={props.activeProspect ?? null} noBar={ props.noBar ? true :false} setFlag={setFlag} row={row} flag={show}/>
        <TableBio allUsers={allUsers} {...props} extern={props.activeProspect ? true : props.activeApplication  ? true : false} bridge={(e) => method(e)}/>
        </div>
        </>
    )
}
export default Bio

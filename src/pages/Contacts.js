import React,{ useState,useEffect } from 'react'
import  'bootstrap/dist/css/bootstrap.min.css';
import '../styles/GlobalStyles.css';
import { Row, Col, Button, FormControl,Form  } from 'react-bootstrap';
import MultipleModals from '../components/MultipleModals';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import *  as RIcons from "react-icons/ri";
import { BrowserRouter as Router, Switch, 
    Route, Link } from 'react-router-dom';
import axios from 'axios';
import TableContacts from '../components/contactComponents/TableContacts';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { constaApi } from '../constants/constants';
import SearchBar from 'components/GeneralComponents/SearchBar';

const goRouter = function (param){
}
function Contacts() {
    const [rowData, setRowData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [param,setParam] = useState(null);
    useEffect(() => {
        // consultRow();
    }, []);
    const consult = (e) => {
        e.target.value === "" ?  setParam('keyWordSeccret302') :  setParam(e.target.value);
    }
    async function consultRow(){
        setLoading(true);
        await axios.get(constaApi+'contacts', {
            headers: {
                "Accept": "application/json"
            }
        }).then(function (response) {
            setRowData(response.data);
            setLoading(false);
        }).catch(error =>{
            setLoading(false);
        });
    }
    return (
        <div style={{backgroundColor:'#f9fafb'}}className="content animate__animated animate__fadeIn">
        <div class="row">
            <div class="col-12">
            <div class="col d-flex justify-content-end">
            <MultipleModals consult={consultRow}/>
            </div>
            <SearchBar consult={(e) => consult(e)}/>
              <TableContacts param={param} rowData={rowData} />
            </div>
        </div>
        </div>
    )
}

export default Contacts

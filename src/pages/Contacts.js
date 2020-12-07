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

const goRouter = function (param){
    console.log('Hola este es el param',param);
}
function Contacts() {
    const [rowData, setRowData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        consultRow();
    }, []);

    async function consultRow(){
        setLoading(true);
        console.log('Consulte');
        await axios.get('http://api.boardingschools.mx/api/contacts', {
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
        <>
        <div className="mt-3 container cwml animate__animated animate__fadeIn">
            <div class=" row mt-5">
                <div class="col-9 container">
                <h1 className="Inter400">Contactos</h1>
                </div>
                <div class="col-3">
            <MultipleModals consult={consultRow}/>
                </div>
            </div>
            <div class="row">
                {loading == false ?
                <TableContacts rowData={rowData} />
                :
                <h4>Cargando...</h4>
                }
            </div>
        </div>
        </> 
    )
}

export default Contacts

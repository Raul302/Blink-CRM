import React,{ useState } from 'react'
import  'bootstrap/dist/css/bootstrap.min.css';
import '../styles/GlobalStyles.css';
import { Row, Col, Button, FormControl,Form  } from 'react-bootstrap';
import MultipleModals from '../components/MultipleModals';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import *  as RIcons from "react-icons/ri";
import { BrowserRouter as Router, Switch, 
    Route, Link } from 'react-router-dom';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const goRouter = function (param){
    console.log('Hola este es el param',param);
}
function Contacts() {
    const [rowData, setRowData] = useState([
        {Nombre: "Luis Antonio", Colegio: "Celica", Grado: 35000, Email: 'email@email.com'},
        {Nombre: "Juan Dominguez", Colegio: "Mondeo", Grado: 32000, Email: 'email@email2.com'},
        {Nombre: "Alberto Lopez", Colegio: "Boxter", Grado: 72000, Email: 'email3@email3.com'}
    ]);

    return (
        <>
        <div className="mt-3 container cwml">
            <h1 className="Inter400">Contactos</h1>
            <MultipleModals />
            <div class="row">
            <Form.Control className="mt-1"  autoComplete="off" name="search" placeholder="Search..."></Form.Control>
            <div className="ag-theme-alpine twml " style={{width:'100%',height: '300px'}}>
            <table class="table">
            <thead style={{backgroundColor:'#F8F8F8'}} >
                <tr>
                <th >Nombre</th>
                <th >Colegio</th>
                <th >Grado</th>
                <th >Grado</th>
                </tr>
            </thead>
            <tbody>
            {rowData.map(row => (
                <tr>
                    <td><RIcons.RiUser3Fill size={32}/>
                    <Link to={"contacts/"+ (row.Nombre) + "/tabOne"} > {row.Nombre} </Link></td>
                    <td>{row.Colegio}</td>
                    <td>{row.Grado}</td>
                    <td>{row.Email}</td>
                </tr>
                ))}
            </tbody>
            </table>        </div>  
            </div>
        </div>
        </>
        
    )
}

export default Contacts

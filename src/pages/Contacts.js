import React,{ useState,useEffect,Suspense } from 'react'
import  'bootstrap/dist/css/bootstrap.min.css';
import '../styles/GlobalStyles.css';
import { Row, Col, Button, FormControl,Form  } from 'react-bootstrap';
import MultipleModals from '../components/MultipleModals';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import *  as RIcons from "react-icons/ri";
import { BrowserRouter as Router, Switch, 
    Route, Link } from 'react-router-dom';
import axios from 'axios';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
const TableContacts = React.lazy(() => import('../components/contactComponents/TableContacts'));


const goRouter = function (param){
    console.log('Hola este es el param',param);
}
function Contacts() {
    const [rowData, setRowData] = useState([]);

    useEffect(() => {
        consultRow();
    }, []);

    async function consultRow(){
        await axios.get('http://api.boardingschools.mx/api/contacts', {
            headers: {
                "Accept": "application/json"
            }
        }).then(function (response) {
            setRowData(response.data);
        });
    }
    return (
        <>
        <div className="mt-3 container cwml">
            <h1 className="Inter400">Contactos</h1>
            {/* <MultipleModals /> */}
            <div className="row">
            <Suspense fallback={<div>Loading...</div>}>
                <TableContacts rowData={rowData} />
                </Suspense >
            </div>
        </div>
        </>
        
    )
}

export default Contacts

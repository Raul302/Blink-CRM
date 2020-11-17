import React,{ useState } from 'react'
import  'bootstrap/dist/css/bootstrap.min.css';
import '../styles/GlobalStyles.css';
import { Row, Col, Button  } from 'react-bootstrap';
import MultipleModals from '../components/MultipleModals';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function Contacts() {

    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const [rowData, setRowData] = useState([
        {Nombre: "Toyota", Colegio: "Celica", Grado: 35000, Email: 'email@email.com'},
        {Nombre: "Ford", Colegio: "Mondeo", Grado: 32000, Email: 'email@email2.com'},
        {Nombre: "Porsche", Colegio: "Boxter", Grado: 72000, Email: 'email3@email3.com'}
    ]);


    return (
        <>
        
        <div style={{marginLeft:'200px',width:'1500px',position:'fixed'}} className="mt-3 container">
       
            <h1 className="Inter400">Contactos</h1>
            
            
            <MultipleModals />


            
            {/* <Row>
            <div class="col-1 col-md-8">
            <h1 className="Inter400">Contactos</h1>
            </div>
            <div class="col-2 col-md-4"><MultipleModals /></div>
            </Row> */}
            <div stlye={{ border:'1px solid'}} className="table mr-5 row">
            Boton Search

            <div className="ag-theme-alpine" style={ { height: 450, width: 1500 } }>
            <AgGridReact
                rowData={rowData}>
                <AgGridColumn field="Nombre"></AgGridColumn>
                <AgGridColumn field="Colegio"></AgGridColumn>
                <AgGridColumn field="Grado"></AgGridColumn>
                <AgGridColumn field="Email"></AgGridColumn>
            </AgGridReact>
        </div>
            </div>
        </div>
        </>
        
    )
}

export default Contacts

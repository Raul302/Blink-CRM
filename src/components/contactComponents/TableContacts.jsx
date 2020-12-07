import React,{ useState,useEffect } from 'react'
import  'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/GlobalStyles.css';
import { Row, Col, Button, FormControl,Form  } from 'react-bootstrap';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import *  as RIcons from "react-icons/ri";
import { BrowserRouter as Router, Switch, 
    Route, Link } from 'react-router-dom';
import axios from 'axios';

function TableContacts(props) {
    const [rowData,setRowData] = useState(props.rowData);

    useEffect(() => {
        consultRow();

    },[props]);
    async function consultRow(){
        await axios.get('http://api.boardingschools.mx/api/contacts', {
            headers: {
                "Accept": "application/json"
            }
        }).then(function (response) {
            console.log('Reseponse',response);
            setRowData(response.data);
        });
    }
    return (
        <>
        <Form.Control className="mt-1"  autoComplete="off" name="search" placeholder="Search..."></Form.Control>
            <div className="ag-theme-alpine twml " style={{width:'100%',height: '300px'}}>
            <table class="table">
            <thead style={{backgroundColor:'#F8F8F8'}} >
                <tr>
                <th >Nombre</th>
                <th >Origen</th>
                <th >Programa</th>
                <th >Referencia</th>
                </tr>
            </thead>
            <tbody>
            {rowData.map(row => (
                <tr>
                    <td><RIcons.RiUser3Fill size={32}/>
                    <Link to={"contacts/"+ (row.id) + "/bio"} > {row.name} {row.father_lastname} {row.mother_lastname} </Link></td>
                    <td>{row.city},{row.state}</td>
                    <td>{row.id_program}</td>
                    <td>{row.contacts_references.length > 0 ?
                    [ (row.contacts_references.map((contacts,i) => (
                    (i == 0 ?
                            (contacts.name +' ' +  contacts.father_lastname)
                            :
                            ''
                            )
                    //   (contacts.father_lastname)
                    )))
                    ] 
                    : <h8>Sin referencias</h8>
                }</td>
                </tr>
                ))}
            </tbody>
            </table>        
            </div>  
        </>
    )
}

export default TableContacts

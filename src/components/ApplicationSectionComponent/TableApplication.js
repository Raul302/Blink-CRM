import React, { useState, useEffect } from 'react';
import {
    GroupingState,
    IntegratedGrouping,
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    TableGroupRow,
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import axios from 'axios';
import { constaApi } from '../../constants/constants';
import SearchBar from 'components/GeneralComponents/SearchBar';

export default function TableApplication() {
    const [columns] = useState([
        { name: 'name', title: 'Nombre' },
        { name: 'father_lastname', title: 'Prospeccion' },
        { name: 'prospections', title: 'Prospeccion ' }
    ]);
    const [rows, setRows] = useState([]);
    const [rowsAux,setRowsAux] = useState([]);
    const [colors] = useState([
        'red', 'blue', 'green', 'gray', 'white'
    ]);
    useEffect(() => {
        setRowsAux([...rows]);
        axios.post(constaApi + 'applicationSection')
            .then(function (response) {
                setRows(response.data);
            }).catch(error => {
            });
    }, [])
    const circleName = (name) => {
        let n = name ? name.substr(0,2).toUpperCase() : " ";
        return n;
      }
    const consult = (e) => {
        let newRow= [...rows];
        let aux ;
        aux = newRow.filter(r => r.name == e.target.value);
        setRows(aux);
    }
    return (
        <div class="mt-5">
            <div class="mb-n5">
            <SearchBar consult={(e) => consult(e)}/>
            </div>
            <table class="mb-n5 table">
             <thead style={{backgroundColor:'#F9FAFB'}}>
                    <tr>
                        <th>
                        <span style={{textTransform:'none'}}>Nombre</span>
                        <span style={{textTransform:'none', paddingLeft:'18%'}}>Prospeccion</span>
                        <span style={{textTransform:'none',paddingLeft:'8%'}}>Colegio</span>
                        <span style={{textTransform:'none',paddingLeft:'8%'}}>Pais</span>
                        <span style={{textTransform:'none',paddingLeft:'12%'}}>Status</span>
                         </th>   
                    </tr>
                </thead>
                </table>
            <table style={{backgroundColor:'#F9FAFB'}} class="table">
                <tbody>
                    {rows.map((r, index) => {
                        return (
                            <tr style={{height:'40px'}}>
                                <td class="montse" style={{fontSize:'13px', height:'38px' ,paddingTop:'0px',paddingBottom:'0px', backgroundColor: index % 2 == 0 ? '#F1F2F3' : '#F8F8F8' }} ><span class="mt-1 mr-2 sc-caSCKo fXbvQO styles__Company-sc-103gogw-0 jdbeFR">{circleName(r.name)}</span>{r.name}</td>
                                {r.prospections.map(p => {
                                    return (
                                        <tr style={{height:'38px'}}>
                                            <td class="montse" style={{fontSize:'13px',lineHeight:'38px', height:'38px',paddingTop:'0px',paddingBottom:'0px', backgroundColor: index % 2 == 0 ? '#F1F2F3' : '#F8F8F8' }} >
                                                {p.name_prospection}
                                                </td>
                                            <tbody>
                                                {p.applications.map(ap => {
                                                    return (
                                                        <tr class="Inside" >
                                                            <td class="montse" style={{fontSize:'13px',lineHeight:'38px',height:'38px',paddingTop:'0px',paddingBottom:'0px', width:'200px',backgroundColor: index % 2 == 0 ? '#F1F2F3' : '#F8F8F8' }} >{ap.name}</td>
                                                            <td class="montse" style={{fontSize:'13px',lineHeight:'38px',height:'38px',paddingTop:'0px',paddingBottom:'0px',textAlign:'left',width:'200px', backgroundColor: index % 2 == 0 ? '#F1F2F3' : '#F8F8F8' }} >{ap.country}</td>
                                                            <td class="montse" style={{fontSize:'13px',rlineHeight:'38px',height:'38px',paddingTop:'0px',paddingBottom:'0px',minWidth:'200px',width:'50px',maxWidth:'100px', paddingLeft:'100px', backgroundColor: index % 2 == 0 ? '#F1F2F3' : '#F8F8F8' }} >{ap.status}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>


                                        </tr>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

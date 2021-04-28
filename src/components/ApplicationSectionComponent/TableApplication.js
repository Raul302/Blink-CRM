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

export default function TableApplication() {
    useEffect(() => {
        axios.post(constaApi + 'applicationSection')
            .then(function (response) {
                console.log('axios post prospections', response.data);
                setRows(response.data);
            }).catch(error => {

            });
    }, [])
    const [columns] = useState([
        { name: 'name', title: 'Nombre' },
        { name: 'father_lastname', title: 'Prospeccion' },
        { name: 'prospections', title: 'Prospeccion ' }
    ]);
    const [rows, setRows] = useState([]);
    const [colors] = useState([
        'red', 'blue', 'green', 'gray', 'white'
    ]);

    console.log('Rows', rows);
    return (
        <div class="mt-5">
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th >Nombre</th>
                        <th >Prospeccion</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((r, index) => {
                        return (
                            <tr>
                                <td style={{ backgroundColor: index % 2 == 0 ? '#F1F2F3' : '#F8F8F8' }} >{r.name}</td>
                                {r.prospections.map(p => {
                                    return (
                                        <tr>
                                            <td style={{ backgroundColor: index % 2 == 0 ? '#F1F2F3' : '#F8F8F8' }} >{p.name_prospection}</td>
                                            {/* <thead  class="thead-dark">
                                                 <tr >
                                                    <th >Colegio</th>
                                                    <th>Pais</th>
                                                    <th>Status</th>
                                                </tr> 
                                            </thead> */}
                                            <tbody>
                                                {p.applications.map(ap => {
                                                    return (
                                                        <tr class="Inside" >
                                                            <td style={{paddingLeft:'100px', width:'400px',backgroundColor: index % 2 == 0 ? '#F1F2F3' : '#F8F8F8' }} >{ap.name}</td>
                                                            <td style={{textAlign:'left',width:'200px', backgroundColor: index % 2 == 0 ? '#F1F2F3' : '#F8F8F8' }} >{ap.country}</td>
                                                            <td style={{backgroundColor: index % 2 == 0 ? '#F1F2F3' : '#F8F8F8' }} >{ap.status}</td>
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

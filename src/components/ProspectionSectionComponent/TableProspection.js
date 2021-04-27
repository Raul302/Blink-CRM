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
import '../../resources/images/icons/favicon.ico';
import '../../resources/vendor/bootstrap/css/bootstrap.min.css';
import '../../resources/vendor/animate/animate.css';
import '../../resources/vendor/select2/select2.min.css';
import '../../resources/vendor/perfect-scrollbar/perfect-scrollbar.css';
import '../../resources/css/util.css';
import '../../resources/css/main.css';

export default function TableProspection() {
  useEffect(() => {
    axios.post(constaApi + 'prospectionSection')
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
    'red','blue','green','gray','white'
  ]);
  
  console.log('Rows',rows);
  return (
    <div class="mt-5">
      <div class="limiter">
        <div class="container-table70">
          <div class="wrap-table70">
            <div class="table100 ver1 m-b-110">
              <div class="table100-head">
                <table>
                  <thead>
                    {/* Encabezados */}
                    <tr class="row100 head">
                      <th class="cell50 column1">Nombre</th>
                      <th class="cell50 column2">Prospeccion</th>
                      <th class="cell100 column3">Status</th>
                   
                    </tr>
                  </thead>
                </table>
              </div>
              <div class="table100-body js-pscroll">
                <table>
                  <tbody>
                    {rows.map((r,index) => {
                      return(
                      <tr class="row100 body">
                      <td  style={{backgroundColor: index % 2 == 0 ?  '#F1F2F3' : '#F8F8F8' }} class="cell100 column1">{r.name}</td>
                      {r.prospections.map(p => {
                        return(
                          [p.name_prospection ?
                            <tr>
                            <td style={{backgroundColor: index % 2 == 0 ?  '#F1F2F3' : '#F8F8F8' }} class="cell100 column1">{p.name_prospection}</td>
                            <td style={{backgroundColor: index % 2 == 0 ?  '#F1F2F3' : '#F8F8F8' }} class="cell100 column3">{p.status}</td>
                            </tr>
                            :
                            <tr>
                            <td style={{backgroundColor: index % 2 == 0 ?  '#F1F2F3' : '#F8F8F8' }} class="cell100 column1"></td>
                            <td style={{backgroundColor: index % 2 == 0 ?  '#F1F2F3' : '#F8F8F8' }} class="cell100 column3">{p.status}</td>
                            </tr>
                          ]
                            )
                      })}
                    </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

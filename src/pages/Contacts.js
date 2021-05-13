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
    const [ref,setRef] = useState({
        name:'ref',
        value:'ref',
        isChecked:false
    });
    useEffect(() => {
        // consultRow();
    }, []);
    const consult = (e) => {
        e.target.value === "" ?  setParam('keyWordSeccret302') :  setParam(e.target.value);
    }
    const changeChecked = () => {
        setRef({...ref,isChecked:!ref.isChecked});
    }
    async function consultRow(obj){
        setLoading(true);
        await axios.get(constaApi+'search/contact/'+obj.target.value+'/'+true, {
            headers: {
                "Accept": "application/json"
            }
        }).then(function (response) {
            console.log('response,data',response);
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
                <div class="col">
            <SearchBar consult={(e) => ref.isChecked ? consultRow(e) : consult(e)}/>
            <div class="col">

                        <span class="custom-radio-checkbox__text montseInter">Ref.</span>
                        <label class="custom-radio-checkbox">
                          <input class="custom-radio-checkbox__input"
                            name={ref.name}
                            value={ref.value}
                            checked={ref.isChecked} type="checkbox"
                            onChange={(e) => changeChecked(e)}
                            />
                          <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                        </label>
                </div>
                            </div>
              <TableContacts noexecute={ref.isChecked} param={param} rowData={rowData} />
            </div>
        </div>
        </div>
    )
}

export default Contacts

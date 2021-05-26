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
    const [reload,setReload] = useState(false);
    const [ref,setRef] = useState({
        name:'ref',
        value:'ref',
        isChecked:false
    });
    useEffect(() => {
    }, [param]);
    const consult = (e) => {
        e.target.value === "" ?  setParam('keyWordSeccret302') :  setParam(e.target.value);
    }
    const changeChecked = () => {
        setRef({...ref,isChecked:!ref.isChecked});
    }
    const consultRow = (e) => {
        // console.log()
        if(e){
            if(e.target.value == ""){
                setParam('keyWordSeccret302');
            }
        } else{
           setReload(!reload);
        }
    }
    return (
        <div style={{backgroundColor:'#f9fafb'}}className="content animate__animated animate__fadeIn">
        <div class="row">
            <div class="col-12">
            <div class="col d-flex justify-content-end">
            <MultipleModals consult={consultRow}/>
            </div>
                <div class="col ml-n3">
            <SearchBar consult={(e) => consult(e)}/>
            {/* <div class="col">

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
                </div> */}
                            </div>
              <TableContacts reloadTable={reload} noexecute={ref.isChecked} param={param} refe={ref} />
            </div>
        </div>
        </div>
    )
}

export default Contacts

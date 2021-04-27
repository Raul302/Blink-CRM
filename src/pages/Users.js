import React, { useState, useEffect, Suspense } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/GlobalStyles.css';
import *  as FAIcons from "react-icons/fa";
import axios from 'axios';
import { constaApi } from '../constants/constants';
import SearchBar from 'components/GeneralComponents/SearchBar';
const AddEdit = React.lazy(() => import('../components/userComponents/AddEdit'));
const TableUsers = React.lazy(() => import('../components/userComponents/TableUsers'));



function Users() {
    const [init] = useState(JSON.parse(localStorage.getItem('user')) || { logged: false });
    const [modalEdit,setModalEdit] = useState(false);
    const [object,setObject] = useState({});
    const [rowData, setRowData] = useState();
    const [modal, setModal] = useState(false);
    const [param,setParam] = useState(null);

    useEffect(() => {
        consultRow();
    }, []);


    async function consultRow() {
        setModalEdit(false);
        setModal(false);
         const headers = {
             "Accept": "application/json"
         };
         let data = { type: init.type };
        await axios.post(constaApi+'users',data,{
        }).then(function (response) {
            let array = [];
             Object.keys(response.data).map(item => {
                 array.push(response.data[item]);
             });
             setRowData(array);
        });
    }

    const handleClose = function close() {
        setModal(false);
        setModalEdit(false);
    }
    function showModal() {
        setModal(true);
    }
    function showModalEdit(row) {
        setObject(row);
        setModalEdit(!modalEdit);

    }    
    const consult = (e) => {
        e.target.value === "" ?  setParam('keyWordSeccret302') :  setParam(e.target.value);
    }
    return (
        <div className="content">
        <div class="row">
            <div class="col-12">
            <div class="col d-flex justify-content-end">
            <button class="btn btn-info" onClick={showModal}><FAIcons.FaUserPlus />  Usuario</button>
        </div>
        {/* Tabla */}
        <Suspense fallback={<div>Loading...</div>}>
                <SearchBar consult={(e) => consult(e)}/>
            <TableUsers param={param} handleupdateTable= {consultRow} clickHandler={showModalEdit} rowData={rowData}/>
            <AddEdit  handleupdateTable= {consultRow} handlerClose= {handleClose} userToEdit={object} editUser={modalEdit} newUser={modal} />
        </Suspense>
            </div>
        </div>    
       </div>
        
    )
}

export default Users;

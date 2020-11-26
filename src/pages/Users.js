import React, { useState, useEffect, lazy, Suspense } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/GlobalStyles.css';
import *  as FAIcons from "react-icons/fa";
import axios from 'axios';
import AddEdit from '../components/userComponents/AddEdit';
import TableUsers from '../components/userComponents/TableUsers';


function Users() {
    const [init] = useState(JSON.parse(localStorage.getItem('user')) || { logged: false });
    const [modalEdit,setModalEdit] = useState(false);
    const [object,setObject] = useState({});
    const [rowData, setRowData] = useState([]);
    const [modal, setModal] = useState(false);

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
        await axios.post('http://api.boardingschools.mx/api/users',data,{
            headers: headers
        }).then(function (response) {
            setRowData(response.data);
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
    return (
        <> 
            <div className="mt-3 container cwml">
           <Suspense fallback={<div>Loading...</div>}>
            <h1 className="Inter400">Usuarios</h1>
            <div class="col d-flex justify-content-end">
                <button class="btn btn-primary" onClick={showModal}><FAIcons.FaUserPlus />  Usuario</button>
            </div>
            {/* Tabla */}
                <TableUsers handleupdateTable= {consultRow} clickHandler={showModalEdit} rowData={rowData}/>
                <AddEdit  handleupdateTable= {consultRow} handlerClose= {handleClose} userToEdit={object} editUser={modalEdit} newUser={modal} />
            </Suspense>
            </div>


        </>
    )
}

export default Users;

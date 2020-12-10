import React, { useState, useEffect, Suspense } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/GlobalStyles.css';
import *  as FAIcons from "react-icons/fa";
import axios from 'axios';
const AddEdit = React.lazy(() => import('../components/userComponents/AddEdit'));
const TableUsers = React.lazy(() => import('../components/userComponents/TableUsers'));



function Users() {
    const [init] = useState(JSON.parse(localStorage.getItem('user')) || { logged: false });
    const [modalEdit,setModalEdit] = useState(false);
    const [object,setObject] = useState({});
    const [rowData, setRowData] = useState();
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
    return (
        <> 
            <div className="mt-5 container cwml animate__animated animate__fadeIn">
            <h1 className="Inter400">Usuarios</h1>
            <div class="col d-flex justify-content-end">
                <button class="btn btn-primary" onClick={showModal}><FAIcons.FaUserPlus />  Usuario</button>
            </div>
            {/* Tabla */}
            <Suspense fallback={<div>Loading...</div>}>
                <TableUsers handleupdateTable= {consultRow} clickHandler={showModalEdit} rowData={rowData}/>
                <AddEdit  handleupdateTable= {consultRow} handlerClose= {handleClose} userToEdit={object} editUser={modalEdit} newUser={modal} />
            </Suspense>
            </div>


        </>
    )
}

export default Users;

import React, { useState, useEffect, Suspense } from 'react'
import *  as FAIcons from "react-icons/fa";
import axios from 'axios';
import { useAlert } from 'react-alert'


function TableUsers(props) {
    const [user,setUser] = useState([]);
    const [init] = useState(JSON.parse(localStorage.getItem('user')) || { logged: false });
    const alert = useAlert();
    useEffect(() => {
        setUser(props.rowData);
    }, [props]);  
    
    async function deleteUser(id){
        if(init.id === id){
            alert.show('Accion no permitida', {
                timeout: 2000, 
               //  custom timeout just for this one alert
                type: 'error',
                onOpen: () => {
                    console.log('hey')
                },  
               //  callback that will be executed after this alert open
                onClose: () => {
                    console.log('closed')
                }  
               //  callback that will be executed after this alert is removed
            })
        } else {
            let datax = {id:id};
            await axios.post('http://api.boardingschools.mx/api/users/delete',datax)
            .then(function (response) {
                if(response.status === 200){
                     alert.show('Contacto Eliminado correctamente', {
                         timeout: 2000, 
                        //  custom timeout just for this one alert
                         type: 'success',
                         onOpen: () => {
                             console.log('hey')
                         },  
                        //  callback that will be executed after this alert open
                         onClose: () => {
                             console.log('closed')
                         }  
                        //  callback that will be executed after this alert is removed
                     })
                    }
                });
                   props.handleupdateTable();
        }
    }
    return (
        <>
        <Suspense fallback={<div>Loading...</div>}>

        {user.length  > 1 &&
         <div className="ag-theme-alpine twml mt-3" style={{ width: '100%', height: '300px' }}>
                    <table class="table">
                        <thead style={{ backgroundColor: '#F8F8F8' }} >
                            <tr>
                                <th >ID</th>
                                <th >Nombre</th>
                                <th >Tipo</th>
                                <th >Email</th>
                                <th >Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                             {user.map(row => (
                                <tr>
                                    <td>{row.id}</td>
                                    <td>{row.name}</td>
                                    <td>{row.email}</td>
                                    <td>{row.type}</td>
                                    <td>
                                    <a href="!#"><FAIcons.FaRegEdit size={18} 
                                    onClick={e => props.clickHandler(row)}/> </a>                                    
                                   <a href="!#" ><FAIcons.FaTrashAlt style={{color:'red'}} size={18}onClick={() => deleteUser(row.id)} /> </a>
                                  </td>
                                </tr>
                            ))} 
                        </tbody>
                    </table>      
                      </div>
                      }
          
        </Suspense>
        </>
    )
}

export default TableUsers

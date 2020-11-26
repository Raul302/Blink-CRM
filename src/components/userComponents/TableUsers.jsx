import React, { useState, useEffect, Suspense } from 'react'
import *  as FAIcons from "react-icons/fa";
import axios from 'axios';
import { useAlert } from 'react-alert'
import swal from 'sweetalert';

function TableUsers(props) {
    
    // Manage of States
    const [user,setUser] = useState();
    const [init] = useState(JSON.parse(localStorage.getItem('user')) || { logged: false });
    const alert = useAlert();

    // ComponenDidMount && ComponentDidUpdate
    useEffect(() => {
        setUser(props.rowData);
        console.log('props',props.rowData);
        console.log('users',user);
    }, [props]);  


    // functions
    function alertCustom(message,type){
        alert.show(message ,{
            timeout: 2000, 
            type: type,
        });

    }
     function deleteUser(id){
        swal({
            title: "Estas seguro?",
            text: "Una vez eliminado,no podras recuperar este usuario!",
            icon: "warning",
            dangerMode: true,
            buttons: ["No","Si"],
          })
          .then((willDelete) => {
            if (willDelete) {
                if(init.id === id){
                    alertCustom('Accion no permitida','error');
                } else {
                    let datax = {id:id};
                     axios.post('http://api.boardingschools.mx/api/users/delete',datax)
                   .then(function (response) {
                       if(response.status === 200){
                           alertCustom('Contacto Eliminado correctamente','success');
                           props.handleupdateTable();
                           }
                       });
               }
            } else {
              swal("Operacion cancelada!");
            }
          });

        }

    return (
        <>
        {user ?
        <div className="ag-theme-alpine twml mt-3" style={{ width: '100%', height: '300px' }}>
                    <table class="table">
                        <thead style={{ backgroundColor: '#F8F8F8' }} >
                            <tr>
                                <th >ID</th>
                                <th >Nombre</th>
                                <th >Usuario</th>
                                <th >Tipo</th>
                                <th >Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.map(row => (
                                <tr>
                                <td>{row.id}</td>
                                    <td>{row.name} {row.father_lastname}  {row.mother_lastname}</td>
                                    <td>{row.email}</td>
                                    <td>{row.type}</td>
                                    <td> 
                                    <a><FAIcons.FaRegEdit size={18} 
                                    onClick={e => props.clickHandler(row)}/> </a>   
                                    {init.type === 'Administrador' 
                                    ?
                                    <>                                 
                                    <a ><FAIcons.FaTrashAlt style={{color:'red'}} size={18}onClick={() => deleteUser(row.id)} /> </a>
                                    </>
                                    :
                                    <>
                                    <FAIcons.FaTrashAlt disabled style={{color:'gray'}} size={18} /> 
                                    </>
                                    }
                                    </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>      
                    </div> 
                    :
                    ''
                    }
                    
        </>
    )
}

export default TableUsers

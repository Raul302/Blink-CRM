import React, { useState, useEffect, Suspense,useRef } from 'react'
import *  as FAIcons from "react-icons/fa";
import axios from 'axios';
import { useAlert } from 'react-alert'
import swal from 'sweetalert';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
  } from "reactstrap";
  import NotificationAlert from "react-notification-alert";


function TableUsers(props) {
    
    // Manage of States
    const [user,setUser] = useState();
    const [init] = useState(JSON.parse(localStorage.getItem('user')) || { logged: false });
    const notificationAlert = useRef();


    // ComponenDidMount && ComponentDidUpdate
    useEffect(() => {
        setUser(props.rowData);
    }, [props]);  


    // functions
    function alertCustom(message,type){
        alert.show(message ,{
            timeout: 2000, 
            type: type,
        });

    }
    const notification =  (type,message) => {
      let place = "tc";
      var options = {};
      options = {
        place: place,
        message: (
          <div>
            <div>
              {message}
            </div>
          </div>
        ),
        type: type,
        icon: "nc-icon nc-bell-55",
        autoDismiss: 7,
        }
      notificationAlert.current.notificationAlert(options);
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
                         notification('success','Contacto eliminado correctamente');
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
         <div className="content">
         <NotificationAlert ref={notificationAlert} />
         <Row>
           <Col md="12">
             <Card>
               <CardHeader>
                 {/* <CardTitle tag="h4">Usuarios</CardTitle> */}
               </CardHeader>
               <CardBody>
                 <Table responsive>
                   <thead className="text-primary">
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
                                    style={{color:'#34B5B8'}}
                                    onClick={e => props.clickHandler(row)}/> </a>   
                                    {init.type === 'Administrador' 
                                    ?
                                    <>                                 
                                    <a ><FAIcons.FaTrashAlt style={{color:'#DC3545'}} size={18}onClick={() => deleteUser(row.id)} /> </a>
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
                 </Table>
               </CardBody>
             </Card>
           </Col>
           </Row>
           </div>
                    :
                    ''
                    }
                    
        </>
    )
}

export default TableUsers

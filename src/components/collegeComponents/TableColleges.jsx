import React,{ useEffect,useRef } from 'react'
import *  as FAIcons from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
// import { loadColleges } from '../../helpers/loadColleges'; 
import { useHistory } from 'react-router-dom';
import {activeCollege,deleteCollege} from '../../actions/colleges';
import Skeleton from 'react-loading-skeleton';
import { finishLoading } from '../../actions/ui';
import swal from 'sweetalert';

import {
    Card,
    CardHeader,
    CardBody,
    Table,
    Row,
    Col,
  } from "reactstrap";
  import NotificationAlert from "react-notification-alert";
function TableColleges() {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch( finishLoading());
    },[dispatch])
    const notificationAlert = useRef();
    const {colleges} = useSelector( state => state.colleges);
    const { loading } = useSelector(state => state.ui);
    const history = useHistory();
    function handleGoto(obj){
        dispatch( activeCollege( obj.id,obj) );
        history.replace("colleges/"+ obj.id + "/bio");
    }
    const dropCollege =  (id) => {
      swal({
        title: "Estas seguro?",
        text: "Una vez eliminado,no podras recuperar este Colegio!",
        icon: "warning",
        dangerMode: true,
        buttons: ["No","Si"],
      })
      .then((willDelete) => {
        if (willDelete) {
          dispatch( deleteCollege(id));
          notification('success','Colegio eliminado Correctamente');
        } else {
          swal("Operacion cancelada!");
        }
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
    return (
        <> {loading ?
            <div class="row mt-2">
                       <NotificationAlert ref={notificationAlert} />
                <Skeleton width="60rem"  height={30} count={10} />
            </div>

        :
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
                     <th >Colegios</th>
                     <th >Tipo</th>
                     <th >País</th>
                     <th ># Prospecciones</th>
                     <th ># Aplicaciones</th>
                     <th >Acciones</th>
                     </tr>
                   </thead>
                   <tbody>
                   {colleges.map((row,index) => (
                                <tr key={index}>
                                <td><a onClick={(e)=>handleGoto(row)}>
                                    {row.name}
                                    </a>
                                    </td>
                                    <td>{row.type}</td>
                                    <td>{row.country}</td>
                                    <td> #</td>
                                    <td> # </td>
                                    <td>
                                    <a ><FAIcons.FaTrashAlt style={{color:'#DC3545'}} size={18}onClick={(e) => dropCollege(row.id)} /> </a>
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
           
        }
        </>
    )
}

export default TableColleges

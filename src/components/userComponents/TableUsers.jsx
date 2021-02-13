import React, { useState, useEffect, Suspense,useRef } from 'react'
import *  as FAIcons from "react-icons/fa";
import axios from 'axios';
import { useAlert } from 'react-alert'
import swal from 'sweetalert';
import moment from 'moment';
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
import { constaApi } from '../../constants/constants';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';

// Component SLotName
export const SlotName = function SlotName(props) {
  const showName = (id = null, fullname = "") => {
  //     const click = () => {
  //     dispatch( activeContact(props.data) );
  // }
      let n = fullname ? fullname.split(" ") : " ";
      let tag = '';
      n = n ? n[0].charAt(0) + n[1].charAt(0) : null;
      tag = <>
              <span class="mt-1 mr-1 sc-caSCKo fXbvQO styles__Company-sc-103gogw-0 jdbeFR">{n}</span>
              <span>{fullname} </span>
      </>;
      return tag;
  }
  return (
      <>
          <span>{showName(props.data.id, props.data.fullname)}</span>
      </>
  )
}

// -----------------------------End component SLotName

// Component SLotActions
export const SlotActions = function SlotActions(props) {
  function dropStaff (id){
    props.context.deleteUser(id);
  }
  function editStaff(obj){
    props.context.edit(obj);
  }
  return (
      <>
       <a ><FAIcons.FaTrashAlt style={{color:'#DC3545'}} size={18}onClick={(e) => dropStaff(props.data.id)} /> </a>
       <a><FAIcons.FaRegEdit size={18} style={{color:'#34B5B8'}} onClick={e => editStaff(props.data)}/> </a>    
      </>
  )
}

// ----------------------------------------End component SlotACtions

// Component SlotCreated
export const SlotCreated = function SlotActions(props) {
  moment.locale('es-mx')

  const dateToMoment = (date) => {
    return moment(date).locale('es-mx').format("ddd D MMMM, YYYY HH:mm ");
  }
  return (
      <>
      <span>{dateToMoment(props.data.created_at)}</span>
      </>
  )
}

// ----------------------------------------End component SlotCreated

function TableUsers(props) {
    // Manage of States
    const [user,setUser] = useState();
    const [init] = useState(JSON.parse(localStorage.getItem('user')) || { logged: false });
    const notificationAlert = useRef();
    const [frameworkComponents, setFramwrokw] = useState({ slotName: SlotName, slotActions: SlotActions,slotCreated:SlotCreated});
    const [gridApi, setGridApi] = useState();
    const [columnApi, setColumnApi] = useState();

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
                     axios.post(constaApi+'users/delete',datax)
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
        const onGridReady = (params) => {
          setGridApi(params);
          setColumnApi(params);
      }
      
      const autoSizeAll = (skipHeader) => {
        var allColumnIds = [];
        columnApi.columnApi.getAllColumns().forEach(function (column) {
          allColumnIds.push(column.colId);
        });
        columnApi.columnApi.autoSizeColumns(allColumnIds, skipHeader);
      };
      const onFirstDataRendered = (event) => {
        autoSizeAll(false);
      };
      const edit = (obj) => {
        props.clickHandler(obj);
      }

    return (
        <>
        {user ?
         <div className="content">
         <NotificationAlert ref={notificationAlert} />
         <div
                    className="ag-theme-alpine"
                    style={{ height: '100%', width: '100%' }}
                >
                    <AgGridReact
                         context={{
                          deleteUser,
                          edit
                            }}
                        defaultColDef={{ resizable: true }}
                        rowData={user}
                        rowHeight={40}
                        domLayout="autoHeight"
                        onGridReady={onGridReady}
                        onFirstDataRendered={onFirstDataRendered}
                        frameworkComponents={frameworkComponents}
                        pagination={true}
                        paginationPageSize={10}
                        paginationNumberFormatter={function (params) {
                            return '[' + params.value.toLocaleString() + ']';
                        }}
                        rowSelection="multiple"
                    >
                       <AgGridColumn
                            headerName="ID" field="id" width="100" />
                        <AgGridColumn
                            cellRenderer="slotName"
                            headerName="Nombre" field="fullname" width="100" />
                        <AgGridColumn headerName="Email" field="email" width="200" cellRenderer="slotOrigin" />
                        <AgGridColumn headerName="Tipo" field="type" width="200" cellRenderer="slotProgram" />
                        <AgGridColumn headerName="Fecha creación" field="created_at" width="200" cellRenderer="slotCreated" />
                        {init.type === 'Administrador' 
                                    ?
                                    <AgGridColumn
                            headerName="Acciones"
                            width={250}
                            cellRenderer="slotActions"
                        />
                                    :
                                   <></>
                                    }
                       
                        
                    </AgGridReact>
                </div>
        
           </div>
                    :
                    ''
                    }
                    
        </>
    )
}

export default TableUsers

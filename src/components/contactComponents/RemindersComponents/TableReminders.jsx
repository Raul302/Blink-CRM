import React, { useEffect, useState, useRef } from 'react';
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import {
    Card,
    CardHeader,
    CardBody,
    Table,
    Row,
    Col,
} from "reactstrap";
import { Popover, OverlayTrigger, } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import NotificationAlert from "react-notification-alert";
import axios from 'axios';
import * as FIIcons from "react-icons/fi";
import * as FAIcons from "react-icons/fa";
import * as Imicons from "react-icons/im";
import * as AIcons from "react-icons/ai";
import { constaApi } from '../../../constants/constants';
import moment from 'moment';
import {removeMessage} from 'actions/uiNotificactions/ui';
import { activeReminderC, deleteReminderC, updatedReminderC } from 'actions/contacts/remindersContacts/remindersContact';
import swal from 'sweetalert';
import AddEditBio from 'components/bioComponents/AddEditBio';
import { useParams, } from "react-router";

// Slots

export const SlotActions = function (props) {
    function completeReminder(row){
        props.context.completeReminder(row);
    }
    function editReminder(row){
        props.context.editReminder(row);
    }
    function deleteReminder(id){
        props.context.deleteReminder(id);
    }
    return (
        <>
         <td>
         {props.data.status === 'pendiente' ?
         <a >
          <AIcons.AiFillCheckCircle
          onClick={(e) => completeReminder(props.data)}
          title="Completar"
          style={{ color: '#0054a3' }}
          size={20} />
           </a>
          :
          <a disabled>
           <AIcons.AiFillCheckCircle
            disabled
            title="Completado"
           style={{ color: 'gray' }}
           size={20} />
             </a>
            }
            <a class="ml-1">
            <FIIcons.FiEdit  title="Editar" onClick={(e) => editReminder(props.data)} size={18} style={{ color: '#386CEF' }} />
            </a>
            <a className="ml-1">
            <FAIcons.FaTrashAlt title="Eliminar" style={{ color: '#FE0000' }} size={18} onClick={(e) => { deleteReminder(props.data.id) }} />
             </a>
            </td>
        </>
    )
}
export const SlotUsers = function (props) {
  const {allUsers } = props.context;

    function showEmailsTO(obj) {
      let n = obj.name_user ? obj.name_user.split(" ") : " ";
      let tag = '';
      if (n.length >= 3) {
          n = n[0].charAt(0) + n[1].charAt(0) + n[2].charAt(0);
      } else if(n.length >= 2) {
        n = n[0].charAt(0) + n[1].charAt(0) ;
      } else {
        n = n[0].charAt(0);
      }
    switch (obj.type_user) {
        case 'user':
          allUsers.map(al => {
            if(obj.name_user == (al.name + " " + al.father_lastname + " " + al.mother_lastname)){
              switch (al.type) {
                case 'Administrador':
                  tag = <span  class="mr-n1 sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnV bgBlue">{n}</span>;
                  break;
                case 'Supervisor':
                  tag = <span  class="mr-n1 sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnV bgPurple">{n}</span>;
                break;
                case 'Colaborador ':
                  console.log('Colaborador'); 
                default:
                  tag = <span  class="mr-n1 sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnV bgGreen">{n}</span>;

                  break;
              }
            }
          })
        break;
        case 'contactos':
        tag = <span  class=" sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnP bgTurquesa">{n}</span>;
            break;
        case 'colegio':
          tag = <span  class="sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnP bgPink">{n}</span>;
            break;
        default:
            tag = <span  class=" sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnP bgPink">{n}</span>;
        break;
    }
    return tag;
      }
    return (
      <>
        {props.data.emails_to.map(em => {
            return(showEmailsTO(em));
        })}
      </>
    );
  };

export const SlotUrgent = function (props) {
  return (
    <>
      {props.data.urgent == 1 && (
        <Imicons.ImNotification style={{ color: "red" }} />
      )}
    </>
  );
};

export const SlotDate = function (props) {
  function showDate(dateBD, time) {
    let datef = moment(dateBD).locale("es-mx").format("ddd D MMMM, YYYY ");
    let timef = moment(dateBD).locale("es-mx").format("h:mm A");
    datef = datef[0] + datef.slice(1);
    datef = datef.replace(".", "");
    let tag = (
      <p class="Inter">
        {datef}
        {timef}
      </p>
    );
    return dateBD ? tag : "";
  }
  return <>{showDate(props.data.dateReminder)}</>;
};

export const SlotDateCreated = function (props) {
  function showDate(dateBD, time) {
    let datef = moment(dateBD).locale("es-mx").format("ddd D MMMM, YYYY ");
    let timef = moment(dateBD).locale("es-mx").format("h:mm A");
    datef = datef[0] + datef.slice(1);
    datef = datef.replace(".", "");
    let tag = (
      <p class="Inter">
        {datef}
        {timef}
      </p>
    );
    return dateBD ? tag : "";
  }
  return <>{showDate(props.data.created_at)}</>;
};
export const SlotDescription = function (props) {
    const PopoverComponent = (text) => {
        return (
          <Popover id="popover-basic">
            <Popover.Content>
              <strong>{text}</strong>
            </Popover.Content>
          </Popover>
        );
      };  
    return (
    <>
      <OverlayTrigger
        trigger={["hover", "hover"]}
        placement="top"
        overlay={PopoverComponent(props.data.notes)}
      >
        <a class="ml-4" >
          <svg
          
            width="16"
            height="16"
            viewBox="0 0 16 16"
            style={{ color: "rgb(192, 203, 227)" }}
          >
            <path
              fill="currentColor"
              d="M9.944 0a.72.72 0 0 1 .511.213l4.333 4.364A.73.73 0 0 1 15 5.09v8.727C15 15.023 14.03 16 12.833 16H4.167A2.174 2.174 0 0 1 2 13.818V2.182C2 .977 2.97 0 4.167 0h5.777zm-.299 1.455H4.167a.725.725 0 0 0-.723.727v11.636c0 .402.324.727.723.727h8.666a.725.725 0 0 0 .723-.727V5.392l-3.91-3.937z"
            ></path>
            <path
              fill="currentColor"
              d="M10.667 4.364h3.61c.4 0 .723.325.723.727a.725.725 0 0 1-.722.727H9.944a.725.725 0 0 1-.722-.727V.727c0-.401.324-.727.722-.727.4 0 .723.326.723.727v3.637zM11.389 8c.399 0 .722.326.722.727a.725.725 0 0 1-.722.728H5.61a.725.725 0 0 1-.722-.728c0-.401.323-.727.722-.727h5.778zM11.389 10.91c.399 0 .722.325.722.726a.725.725 0 0 1-.722.728H5.61a.725.725 0 0 1-.722-.728c0-.401.323-.727.722-.727h5.778zM7.056 5.09c.398 0 .722.327.722.728a.725.725 0 0 1-.722.727H5.61a.725.725 0 0 1-.722-.727c0-.401.323-.727.722-.727h1.445z"
            ></path>
          </svg>
        </a>
      </OverlayTrigger>
    </>
  );
};

// End Slots




export default function TableReminders(props) {
    // vars
    const { users } = useSelector(state => state.users);
    let { id:id_Contact } = useParams();
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const notificationAlert = useRef();
    const { remindersC: reminders } = useSelector(state => state.remindersC);
    const { loading,msgError } = useSelector(state => state.ui);
    const { contact } = props;
    const { activeProspect:activeP} = props;
    const [objAux,setAux] = useState(null);
    const [frameworkComponents, setFramwrokw] = useState({
        slotUrgent: SlotUrgent,
        slotDate: SlotDate,
        slotDescription: SlotDescription,
        slotUsers:SlotUsers,
        slotActions:SlotActions,
        slotCreated:SlotDateCreated
      });
      const [gridApi, setGridApi] = useState();
      const [columnApi, setColumnApi] = useState();
    useEffect(() => {
      if(props.param){
        quickSearch(props.param);
    }
    }, [props]);
    // methods
    const quickSearch = (value) =>{
      let objx = gridApi;
        value === 'keyWordSeccret302' ? objx.api.setQuickFilter("") : objx.api.setQuickFilter(value);
        setGridApi(objx);
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

    const completeReminder = (obj) => {
        swal({
            title: "¿Desea marcar como completado este recordatorio?",
            icon: "info",
            dangerMode: false,
            buttons: ["No", "Si"],
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    // other swal
                    swal({
                        title: "¿Que deseas hacer?",
                        icon: "info",
                        dangerMode: true,
                        buttons: ["Crear entrada en la bitacora", "Borrarlo"],
                    })
                        .then(async (willDelete) => {
                            if (willDelete) {
                                deleteReminder(obj.id,id_Contact);
                            } else {
                                let obx = { ...obj, emailTo: obj.emails_to, status: 'completado' };
                                setAux(obx);
                                // await dispatch(updatedReminderC(obx));
                                setShow(true);
                            }
                        });


                } else {
                    swal("Operacion cancelada!");
                }
            });
    }

    const fromBio = () =>{
      if(objAux){
        if(objAux.id){
          dispatch(deleteReminderC(objAux.id, contact ? contact.id : props.activeProspect.id));
        } else {

        }
      }
    }
    const PopoverComponent = (text) => {
        return (<Popover id="popover-basic">
            <Popover.Content>
                <strong>{text}</strong>
            </Popover.Content>
        </Popover>)
    }
    function showEmailsTO(obj) {
      let n = obj.name_user ? obj.name_user.split(" ") : " ";
      let tag = '';
      if (n.length >= 3) {
          n = n[0].charAt(0) + n[1].charAt(0) + n[2].charAt(0);
      } else if(n.length >= 2) {
        n = n[0].charAt(0) + n[1].charAt(0) ;
      } else {
        n = n[0].charAt(0);
      }
        switch (obj.type_user) {
            case 'user':
                tag = <span key={obj.id} class=" sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnV">{n}</span>;
                break;
            case 'contactos':
              tag = <span key={obj.id} class=" sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnV">{n}</span>;
              break;
            case 'referencias':
              tag = <span key={obj.id} class=" sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnV">{n}</span>;
              break;
            default:
              tag = <span key={obj.id} class=" sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnV">{n}</span>;
              break;
        }

        return tag;
    }
    function editReminder(obj) { 
        dispatch(activeReminderC(obj.id, obj));
    }
    function deleteReminder(id) {
        swal({
            title: "Estas seguro?",
            text: "Una vez eliminado,no podras recuperar este registro!",
            icon: "warning",
            dangerMode: true,
            buttons: ["No", "Si"],
        })
            .then(async (willDelete) => {
                if (willDelete) {
                  console.log('HOLIS',contact);
                    id_Contact ? 
                    await dispatch(deleteReminderC(id,id_Contact))
                    :
                    await dispatch(deleteReminderC(id,null));
                    ;
                } else {
                    swal("Operacion cancelada!");
                }
            });
    }
    function showDate(dateBD, time) {
        let datef = moment(dateBD).locale('es-mx').format("ddd D MMMM, YYYY ");
        let timef = moment(dateBD).locale('es-mx').format("h:mm A");
        datef = datef[0] + datef.slice(1);
        datef = datef.replace(".", "");
        let tag = <span class="Inter">{datef}{timef}</span>
        return dateBD ? tag : '';
    }
    function closeAll() {
        setShow(false);
    }
    const onGridReady = (params) => {
        setGridApi(params);
        setColumnApi(params);
      };
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
    return (
        <>
            <div className="content">
                <NotificationAlert ref={notificationAlert} />
                {!loading ?
                    <Row>
                        <AddEditBio extraPetition={true} activeProspect={props.activeProspect ?? null} fromBio={fromBio} noBar={true} closeAll={closeAll} flagTwo={show} />
                        {/* <AddEditBio setFlag={setFlag} row={row} flag={show}/> */}
                        <div
              className="ag-theme-alpine"
              style={{ height: "100%", width: "100%" }}
            >
              <AgGridReact
                 context={{
                    completeReminder,
                    editReminder,
                    deleteReminder,
                    activeP,
                    allUsers : users
                 }}
                rowData={reminders}
                rowHeight={40}
                domLayout="autoHeight"
                onGridReady={onGridReady}
                onFirstDataRendered={onFirstDataRendered}
                frameworkComponents={frameworkComponents}
                pagination={true}
                paginationPageSize={10}
                paginationNumberFormatter={function (params) {
                  return  params.value.toLocaleString();
                }}
                rowSelection="multiple"
              >
                <AgGridColumn
                  headerName=""
                  cellRenderer="slotUrgent"
                  field="urgent"
                  width="50"
                ></AgGridColumn>
                <AgGridColumn
                headerName="Contacto"
                field="fullname"
                width="250"
                hide={props.fromRemindersSection ? false : true}
                >
                </AgGridColumn>
                <AgGridColumn
                  headerName="Asunto"
                  field="subject"
                  width="200"
                />
                 {/* <AgGridColumn
                  headerName="Fecha creación"
                  field="created_at"
                  width="250"
                  cellRenderer="slotCreated"
                  hide={activeP ? false : true}
                /> */}
                <AgGridColumn
                  headerName="Fecha"
                  field="ciy"
                  width="250"
                  cellRenderer="slotDate"
                />
                <AgGridColumn
                  headerName="Descripción"
                  field="notes"
                  width="200"
                  cellRenderer="slotDescription"
                />
                <AgGridColumn
                  headerName="Usuarios"
                  cellRenderer="slotUsers"
                  width="300"
                />
                <AgGridColumn headerName="Departamento" field="departament"width={220} />
                <AgGridColumn headerName="Acciones" cellRenderer="slotActions" width={220} />
              </AgGridReact>
            </div>
                    </Row>
                    :
                    <div class="row mt-2">
                        <NotificationAlert ref={notificationAlert} />
                        <Skeleton width="60rem" height={30} count={10} />
                    </div>
                }

            </div>

        </>
    )
}


import React, { useEffect, useState, useRef } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Card, CardHeader, CardBody, Table, Row, Col } from "reactstrap";
import { Popover, OverlayTrigger } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import * as FIIcons from "react-icons/fi";
import * as FAIcons from "react-icons/fa";
import * as Imicons from "react-icons/im";
import * as AIcons from "react-icons/ai";
import { constaApi } from "../../../constants/constants";
import moment from "moment";
import {
  activeReminderC,
  deleteReminderC,
  updatedReminderC,
} from "actions/contacts/remindersContacts/remindersContact";
import swal from "sweetalert";
import AddEditBio from "components/bioComponents/AddEditBio";
import { deleteReminderCollege } from "actions/colleges/remindersColleges/remindersColleges";
import Bio from "../Bio";
import { activeReminderColleges } from "actions/colleges/remindersColleges/remindersColleges";

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
         {props.data.status === 'pendiente' ?
         <a >
          <AIcons.AiFillCheckCircle
          onClick={(e) => completeReminder(props.data)}
          title="Completar"
          style={{ color: 'green' }}
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
            <a>
            <FIIcons.FiEdit title="Editar" onClick={(e) => editReminder(props.data)} size={18} style={{ color: '#386CEF' }} />
            </a>
            <a className="ml-1">
            <FAIcons.FaTrashAlt title="Eliminar" style={{ color: '#DC3545' }} size={18} onClick={(e) => { deleteReminder(props.data.id) }} />
             </a>
        </>
    )
}
export const SlotUsers = function (props) {
    function showEmailsTO(obj) {
      let n = obj.name_user ? obj.name_user.split(" ") : " ";
      let tag = '';
      if (n.length >= 3) {
          n = n[0].charAt(0).toUpperCase() + n[1].charAt(0).toUpperCase() + n[2].charAt(0).toUpperCase();
      } else if(n.length >= 2) {
        n = n[0].charAt(0).toUpperCase() + n[1].charAt(0).toUpperCase() ;
      } else {
        n = n[0].charAt(0).toUpperCase();
      }
        switch (obj.type_user) {
          case "user":
            tag = (
              <span
                key={obj.id}
                class=" sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnV"
              >
                {n}
              </span>
            );
            break;
          case "contactos":
            tag = (
              <span
                key={obj.id}
                class=" sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnP"
              >
                {n}
              </span>
            );
            break;
          case "referencias":
            tag = (
              <span
                key={obj.id}
                class=" sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnP"
              >
                {n}
              </span>
            );
            break;
          default:
            tag = (
              <span
                key={obj.id}
                class=" sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnZ"
              >
                {n}
              </span>
            );
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
    datef = datef[0].toUpperCase() + datef.slice(1);
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
  let noActions = props.noaction ? true : false;
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [frameworkComponents, setFramwrokw] = useState({
    slotUrgent: SlotUrgent,
    slotDate: SlotDate,
    slotDescription: SlotDescription,
    slotUsers:SlotUsers,
    slotActions:SlotActions
  });
  const [gridApi, setGridApi] = useState();
  const [columnApi, setColumnApi] = useState();
  const notificationAlert = useRef();
  const { remindersCollege: reminders } = useSelector(
    (state) => state.remindersColleges
  );
  const { loading } = useSelector((state) => state.ui);
  let { active: college } = useSelector((state) => state.colleges);
  if (!college) {
    college = JSON.parse(localStorage.getItem("collegeActive"));
  }
  const [objAux, setAux] = useState(null);
  useEffect(() => {}, []);
  // methods
  const completeReminder = (obj) => {
    swal({
      title: "¿Desea marcar como completado este recordatorio?",
      icon: "info",
      dangerMode: false,
      buttons: ["No", "Si"],
    }).then(async (willDelete) => {
      if (willDelete) {
        // other swal
        swal({
          title: "¿Que deseas hacer?",
          icon: "info",
          dangerMode: true,
          buttons: ["Crear entrada en la bitacora", "Borrarlo"],
        }).then(async (willDelete) => {
          if (willDelete) {
            college
              ? await dispatch(deleteReminderCollege(obj.id, college.id))
              : await dispatch(deleteReminderCollege(obj.id, null));
          } else {
            let obx = { ...obj, emailTo: obj.emails_to, status: "completado" };
            setAux(obx);
            // await dispatch(updatedReminderC(obx));
            setShow(true);
          }
        });
      } else {
        swal("Operacion cancelada!");
      }
    });
  };

  const fromBio = () => {
    dispatch(deleteReminderCollege(objAux.id, college.id));
  };
  const PopoverComponent = (text) => {
    return (
      <Popover id="popover-basic">
        <Popover.Content>
          <strong>{text}</strong>
        </Popover.Content>
      </Popover>
    );
  };
  
  function editReminder(obj) {
    dispatch(activeReminderColleges(obj.id, obj));
  }
  function deleteReminder(id) {
    swal({
      title: "Estas seguro?",
      text: "Una vez eliminado,no podras recuperar este registro!",
      icon: "warning",
      dangerMode: true,
      buttons: ["No", "Si"],
    }).then(async (willDelete) => {
      if (willDelete) {
        await dispatch(deleteReminderCollege(id, college.id));
      } else {
        swal("Operacion cancelada!");
      }
    });
  }
  function showDate(dateBD, time) {
    let datef = moment(dateBD).locale("es-mx").format("ddd D MMMM, YYYY ");
    let timef = moment(dateBD).locale("es-mx").format("h:mm A");
    datef = datef[0].toUpperCase() + datef.slice(1);
    datef = datef.replace(".", "");
    let tag = (
      <span class="Inter">
        {datef}
        {timef}
      </span>
    );
    return dateBD ? tag : "";
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
        {!loading ? (
          <Row>
            <Bio
              fromBio={fromBio}
              noBar={true}
              closeAll={closeAll}
              flagTwo={show}
            />
            {/* <AddEditBio setFlag={setFlag} row={row} flag={show}/> */}
            <div
              className="ag-theme-alpine"
              style={{ height: "100%", width: "100%" }}
            >
              <AgGridReact
                 context={{
                    completeReminder,
                    editReminder,
                    deleteReminder
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
                headerName="Colegio"
                field="colName"
                width="250"
                hide={props.fromRemindersSection ? false : true}
                ></AgGridColumn>
                <AgGridColumn
                  headerName="Asunto"
                  field="subject"
                  width="200"
                />
                <AgGridColumn
                  headerName="Fecha"
                  field="ciy"
                  width="200"
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
                  width="200"
                />
                <AgGridColumn headerName="departamento" field="departament"width={220} />
                <AgGridColumn headerName="Acciones" cellRenderer="slotActions" width={220} />
              </AgGridReact>
            </div>
          </Row>
        ) : (
          <div class="row mt-2">
            <NotificationAlert ref={notificationAlert} />
            <Skeleton width="60rem" height={30} count={10} />
          </div>
        )}
      </div>
    </>
  );
}

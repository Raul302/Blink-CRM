import { useDispatch, useSelector } from "react-redux";
import React, { useState, useRef, useEffect } from "react";
import * as FIcons from "react-icons/fi";
import * as FAIcons from "react-icons/fa";
import * as HIcons from "react-icons/hi";
import * as Ioicons from "react-icons/io";
import * as MDIcons from "react-icons/md";
import * as BIicons from "react-icons/bi";
import { useForm } from "react-hook-form";

import {
  Button,
  Modal,
  Form,
  InputGroup,
  Popover,
  OverlayTrigger,
  FormControl,
} from "react-bootstrap";
import Select from "react-select";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import moment from "moment";
import swal from "sweetalert";

import "moment/locale/es"; // without this line it didn't work
import { Table, Row, Col } from "reactstrap";

import { useAlert } from "react-alert";
import axios from "axios";
import NotificationAlert from "react-notification-alert";
import { constaApi } from "../../constants/constants";

// Component SLotName
export const slotType = function SlotName(props) {
  const showModal = (obj) => {
    props.context.showModal(obj);
  };
  const showSubject = (type = "", subject) => {
    let tag = "";
    if (!type || type === "" || type === null) {
      tag = <span class="Inter600B">{subject}</span>;
    } else {
      if (type.includes("Llamada")) {
        tag = (
          <span onClick={(e) => showModal(props.data)} class="Inter600B">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                fill="#3B83BD"
                fillRule="nonzero"
                d="M21 16.92v-.025a.998.998 0 0 0-.85-1.014 13.845 13.845 0 0 1-3.032-.755.998.998 0 0 0-1.05.221l-1.27 1.27a1 1 0 0 1-1.202.162 17 17 0 0 1-6.375-6.375 1 1 0 0 1 .162-1.201l1.266-1.266a1 1 0 0 0 .224-1.057 13.817 13.817 0 0 1-.753-3.02A1.003 1.003 0 0 0 7.11 3h-3a1 1 0 0 0-.996 1.074 18.8 18.8 0 0 0 2.92 8.24 18.511 18.511 0 0 0 5.7 5.697 18.774 18.774 0 0 0 8.176 2.913A1 1 0 0 0 21 19.92v-3zm2 2.996a3 3 0 0 1-3.288 2.998 20.78 20.78 0 0 1-9.058-3.22 20.49 20.49 0 0 1-6.303-6.3A20.805 20.805 0 0 1 1.124 4.27 3 3 0 0 1 4.11 1H7.1a3.002 3.002 0 0 1 3.001 2.59c.117.885.334 1.754.645 2.588a3.002 3.002 0 0 1-.679 3.17l-.717.716a15 15 0 0 0 4.586 4.586l.72-.721a3 3 0 0 1 3.164-.676c.836.312 1.705.529 2.6.647A3 3 0 0 1 23 16.93v2.985z"
              ></path>
            </svg>
            &nbsp;&nbsp;{subject}
          </span>
        );
      } else if (type.includes("Whatssap")) {
        tag = (
          <span onClick={(e) => showModal(props.data)} class="Inter600B">
            <FAIcons.FaWhatsapp color={"#3B83BD"} />
            &nbsp; &nbsp;{subject}
          </span>
        );
      } else if (type.includes("Cita")) {
        tag = (
          <span onClick={(e) => showModal(props.data)} class="Inter600B">
            <FIcons.FiCalendar color={"#3B83BD"} />
            &nbsp;&nbsp;
            {subject}
          </span>
        );
      } else if (type.includes("Email")) {
        tag = (
          <span onClick={(e) => showModal(props.data)} class=" Inter600B">
            <HIcons.HiOutlineMail color={"#3B83BD"} size={16} />
            &nbsp;&nbsp;
            {subject}
          </span>
        );
      } else {
        tag = (
          <span class=" Inter600B">
            <BIicons.BiMessageDetail color={"#3B83BD"} size={16} />
            &nbsp; &nbsp;
            {subject}
          </span>
        );
      }
      return tag;
    }
  };
  return (
    <>
      <span>{showSubject(props.data.type, props.data.subject)}</span>
    </>
  );
};
// -----------------------------End component SLotName

// Component SLotActions
export const SlotParticipants = function SlotParticipants(props) {
  const { participants } = props.data;
  const showModal = (obj) => {
    props.context.showModal(obj);
  };
  const showParticipant = (type = "user", name) => {
    let n = name ? name : " ";
    let tag = "";
    if (n) {
      n = n.charAt(0) + n.charAt(1);
    }
    switch (type) {
      case "user":
        tag = (
          <span
            onClick={(e) => showModal(props.data)}
            class="mr-n1 sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnV"
          >
            {n}
          </span>
        );
        break;
      case "contactos":
        tag = (
          <span
            onClick={(e) => showModal(props.data)}
            class=" sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnP"
          >
            {n}
          </span>
        );
        break;
      case "colegio":
        tag = (
          <span
            onClick={(e) => showModal(props.data)}
            class="sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnZ"
          >
            {n}
          </span>
        );

        break;
      default:
        tag = (
          <span
            onClick={(e) => showModal(props.data)}
            class=" sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnZ"
          >
            {n}
          </span>
        );
        break;
    }
    return tag;
  };
  return (
    <>
      <div>
        {participants.map((part) => {
          return (
            <span key={part.id}>{showParticipant(part.type, part.name)}</span>
          );
        })}
      </div>
    </>
  );
};

// ----------------------------------------End component SlotACtions

// Component SlotCreated
export const SlotDate = function SlotDate(props) {
  moment.locale("es-mx");
  const showModal = (obj) => {
    props.context.showModal(obj);
  };
  const showDate = (dateBD, timeBio) => {
    let datef = moment(dateBD).locale("es-mx").format("ddd D MMMM, YYYY ");
    let timef = moment(dateBD).locale("es-mx").format("h:mm A");
    datef = datef[0].toUpperCase() + datef.slice(1);
    datef = datef.replace(".", "");
    let tag = (
      <span class="Inter">
        {datef} <Ioicons.IoMdTime /> {timef}
      </span>
    );
    return tag;
  };
  return (
    <>
      <span onClick={(e) => showModal(props.data)}>
        {showDate(props.data.date, props.data.timeBio)}
      </span>
    </>
  );
};

// ----------------------------------------End component SlotCreated

export const SlotDetalle = function SlotDetalle(props) {
  const { text } = props.data;
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
        overlay={PopoverComponent(text)}
      >
        <a>
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

export const slotApplicaciones = function slotApplicaciones(props) {
  return (
    <>
      <span>#</span>
    </>
  );
};

function Bio(props) {
  // Set moment spanish
  moment.locale("es-mx");
  const alert = useAlert();
  const { id: IDX } = useSelector((state) => state.auth);
  let { active } = useSelector((state) => state.colleges);
  if (!active) {
    active = JSON.parse(localStorage.getItem("collegeActive"));
  }
  const notificationAlert = useRef();
  useEffect(() => {
    consult();
    // getBioRecords();
    if (props.flagTwo) {
      showModalLog("Recordatorio");
    }
    if (props.flag) {
      showModal(props.row);
    }
  }, [props]);
  const [prefixSubject, setPrefix] = useState();
  const [editing, setEditing] = useState(false);
  const [twopart, setTwoPart] = useState(false);
  const [bioRecords, setBioRecords] = useState([]);
  const { handleSubmit } = useForm({});
  const [modal, setModal] = useState(false);
  const [modalLog, setModalLog] = useState(false);
  const [param, setParam] = useState("");
  const [tempParam, setTempParam] = useState("");
  const [tempsubject, setTemp] = useState();
  const [subject, setSubject] = useState("");
  const [selectValue, setSelectValue] = useState();
  const [dateBio, setDateBio] = useState();
  const [timeBio, setTimeBio] = useState();
  const [textBio, setTextBio] = useState();
  const [frameworkComponents, setFramwrokw] = useState({
    slotType: slotType,
    slotDate: SlotDate,
    slotParticipants: SlotParticipants,
    slotDetalle: SlotDetalle,
  });
  const [gridApi, setGridApi] = useState();
  const [columnApi, setColumnApi] = useState();

  const getBioRecords = async () => {
    let obj = {
      id: active ? active.id : null,
    };
    await axios
      .post(constaApi + "bio/colleges", obj, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(function (response) {
        setBioRecords(response.data);
      });
  };
  const consult = async () => {
    let data = {
      id: active ? active.id : null,
      idx: IDX,
    };
    await axios
      .post(constaApi + "defaultCollegeBio", data)
      .then(function (response) {
        let { college, user, staff, users, contacts } = response.data;
        let result = null;
        if(user){
          result = user.map((col) => {
           return {
             value: col.name,
             label:
               col.name + " " + col.father_lastname + " " + col.mother_lastname,
             fullname:
               col.name + " " + col.father_lastname + " " + col.mother_lastname,
             type: "user",
           };
         });
        }
        if(college){
          college.map((u) => {
            result.push({
              value: u.name,
              label: u.name,
              fullname: u.name,
              type: "colegio",
            });
          });
        }
        users.forEach((us) => {
          if (result[0]) {
            if (us.name === result[0].value) {
            } else {
              result.push({
                value: us.name,
                label:
                  us.name + " " + us.father_lastname + " " + us.mother_lastname,
                fullname:
                  us.name + " " + us.father_lastname + " " + us.mother_lastname,
                type: "user",
              });
            }
          }
        });
        if(staff){
          staff.map((s) => {
            result.push({
              value: s.name,
              label: s.name + " " + s.fname + " " + s.mname,
              fullname: s.name + " " + s.fname + " " + s.mname,
              type: "staff",
            });
          });
        }
        // contacts.map(c => {
        //     result.push(
        //         {
        //             value: c.name,
        //             label: c.name +' ' + c.father_lastname + ' ' +  c.mother_lastname,
        //             fullname: c.name +' ' + c.father_lastname + ' ' +  c.mother_lastname,
        //             type:'contactos'
        //         }
        //     )
        // })
        setValues(result);
      });
  };
  const [values, setValues] = useState([{}]);
  const showModal = function showModal(row) {
    setModal(true);
    setParam(row);
    setTempParam(row.text);
  };
  const handleChange = (e) => {
    if (e != null) {
      setSubject(
        e[1] ? tempsubject + " a " + e[1].value : tempsubject + " a " + ""
      );
      setSelectValue(e);
    } else {
      notification("danger", "Este campo no puede estar vacio");
    }
  };
  const showModalLog = function showModalLog(subject) {
    setPrefix(subject);
    setTextBio("");
    setModalLog(true);
    setTemp(subject.split(" ", 1));
    setSubject(
      values[1] ? subject + " a " + values[1].value : subject + " a " + ""
    );
  };
  const handleClose = function close() {
    setDateBio();
    setTimeBio();
    setSelectValue([values[0], values[1]]);
    setEditing(false);
    setModal(false);
    setModalLog(false);
  };
  async function onSubmit(data) {
    if (editing) {
      let datex = dateBio + " " + timeBio;
      let datax = {
        id: param.id,
        id_college: active.id,
        subject: subject,
        values: selectValue ? selectValue : [values[0], values[1]],
        date: dateBio ? datex : null,
        text: textBio ? textBio : null,
        type: prefixSubject,
      };
      await axios
        .post(constaApi + "bio/update", datax, {
          headers: {
            Accept: "application/json",
          },
        })
        .then(async function (response) {
          notification("info", "Actualizado correctamente");
          setParam(response.data);
          getBioRecords();
          handleEdit();
        });
    } else {
      let datex = dateBio + " " + timeBio;
      let datax = {
        id_college: active.id,
        subject: subject,
        values: selectValue ? selectValue : [values[0], values[1]],
        date: dateBio ? datex : null,
        text: textBio ? textBio : null,
        type: prefixSubject,
      };
      await axios
        .post(constaApi + "bio/save", datax)
        .then(async function (response) {
          notification("success", "Creado correctamente");
          getBioRecords();
        });
      if (props.fromBio) {
        props.fromBio();
      }
      if (props.noBar) {
        props.closeAll();
      }
      // alert.show('Ocurrio un error inesperado en la Base de datos');
    }
    handleClose();
    consult();
  }

  function changeDate(e) {
    setDateBio(e.target.value);
  }
  function changeTime(e) {
    setTimeBio(e.target.value);
  }
  function changeText(e) {
    setTextBio(e.target.value);
  }
  // const showText = (text) =>{
  // }
  const handleEdit = (e) => {
    setTempParam(param.text);
    setTwoPart(!twopart);
  };
  const showDate = (dateBD, timeBio) => {
    let datef = moment(dateBD).locale("es-mx").format("ddd D MMMM, YYYY ");
    let timef = moment(dateBD).locale("es-mx").format("h:mm A");
    datef = datef[0].toUpperCase() + datef.slice(1);
    datef = datef.replace(".", "");
    let tag = (
      <span class="Inter">
        {datef} <Ioicons.IoMdTime /> {timef}
      </span>
    );
    return tag;
  };

  const showParticipant = (type = "use", name) => {
    let n = name ? name : " ";
    let tag = "";
    if (n) {
      n = n.charAt(0) + n.charAt(1);
    }
    switch (type) {
      case "user":
        tag = (
          <span class=" sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnV">
            {n}
          </span>
        );
        break;
      case "contactos":
        tag = (
          <span class=" sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnP">
            {n}
          </span>
        );
        break;
      case "colegio":
        tag = <Ioicons.IoMdSchool size={32} />;
        break;
      default:
        tag = (
          <span class=" sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnZ">
            {n}
          </span>
        );
        break;
    }

    return tag;
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

  const changeBio = async (e) => {
    setTempParam(e.target.value);
    let name = "";
    name = await e.target.value;
  };
  const deleteComment = async (id) => {
    swal({
      title: "Estas seguro?",
      text: "Una vez eliminado,no podras recuperar este registro!",
      icon: "warning",
      dangerMode: true,
      buttons: ["No", "Si"],
    }).then(async (willDelete) => {
      if (willDelete) {
        await axios
          .post(
            constaApi + "bio/delete",
            { id: id },
            {
              headers: {
                Accept: "application/json",
              },
            }
          )
          .then(async function (response) {
            notification("success", "Borrado correctamente");
            handleClose();
            getBioRecords();
          });
      } else {
        swal("Operacion cancelada!");
      }
    });
  };
  const handleChangeSubject = (e) => {
    setSubject(e.target.value);
  };
  const edit = () => {
    let array = [];
    param.participants.forEach((element, index) => {
      values.forEach((el) => {
        if (element.name === el.value) {
          array[index] = el;
        }
      });
    });
    let datex = moment(param.date).format("YYYY-MM-DD");
    let timex = moment(param.date).format("HH:MM:ss");
    setSelectValue(array);
    setEditing(true);
    showModalLog(param.type);
    setSubject(param.subject);
    setTextBio(param.text);
    setDateBio(datex);
    setTimeBio(timex);
  };
  function notification(type, message) {
    let place = "tc";
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>{message}</div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7,
    };
    notificationAlert.current.notificationAlert(options);
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
      <div class="mt-n2 content">
        <NotificationAlert ref={notificationAlert} />
        {!props.noBar && (
          <div style={{ borderRadius: "0px" }} class="card">
            <div class="card-body">
              <div class="row">
                <span onClick={() => showModalLog("Llamada")} class="Inter600B">
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      fillRule="nonzero"
                      d="M21 16.92v-.025a.998.998 0 0 0-.85-1.014 13.845 13.845 0 0 1-3.032-.755.998.998 0 0 0-1.05.221l-1.27 1.27a1 1 0 0 1-1.202.162 17 17 0 0 1-6.375-6.375 1 1 0 0 1 .162-1.201l1.266-1.266a1 1 0 0 0 .224-1.057 13.817 13.817 0 0 1-.753-3.02A1.003 1.003 0 0 0 7.11 3h-3a1 1 0 0 0-.996 1.074 18.8 18.8 0 0 0 2.92 8.24 18.511 18.511 0 0 0 5.7 5.697 18.774 18.774 0 0 0 8.176 2.913A1 1 0 0 0 21 19.92v-3zm2 2.996a3 3 0 0 1-3.288 2.998 20.78 20.78 0 0 1-9.058-3.22 20.49 20.49 0 0 1-6.303-6.3A20.805 20.805 0 0 1 1.124 4.27 3 3 0 0 1 4.11 1H7.1a3.002 3.002 0 0 1 3.001 2.59c.117.885.334 1.754.645 2.588a3.002 3.002 0 0 1-.679 3.17l-.717.716a15 15 0 0 0 4.586 4.586l.72-.721a3 3 0 0 1 3.164-.676c.836.312 1.705.529 2.6.647A3 3 0 0 1 23 16.93v2.985z"
                    ></path>
                  </svg>
                  &nbsp;LLamada
                </span>
                <span
                  onClick={() => showModalLog("Whatssap")}
                  class="ml-4 Inter600B"
                >
                  <FAIcons.FaWhatsapp />
                  &nbsp; Whatssap
                </span>
                <span
                  onClick={() => showModalLog("Cita")}
                  class="ml-4 Inter600B"
                >
                  <FIcons.FiCalendar />
                  &nbsp; Cita
                </span>
                <span
                  onClick={() => showModalLog("Email")}
                  class="ml-4 Inter600B"
                >
                  <HIcons.HiOutlineMail size={16} />
                  Email
                </span>
              </div>
            </div>
          </div>
        )}
        {!props.noBar && [
          bioRecords ? (
            <div
              className="ag-theme-alpine"
              style={{ height: "100%", width: "100%" }}
            >
              <AgGridReact
                context={{
                  showModal,
                }}
                defaultColDef={{ resizable: true }}
                rowData={bioRecords}
                rowHeight={40}
                domLayout="autoHeight"
                onGridReady={onGridReady}
                // onFirstDataRendered={onFirstDataRendered}
                frameworkComponents={frameworkComponents}
                pagination={true}
                paginationPageSize={10}
                paginationNumberFormatter={function (params) {
                  return params.value.toLocaleString();
                }}
                rowSelection="multiple"
              >
                <AgGridColumn
                  cellRenderer="slotType"
                  headerName="Tipo"
                  field="name"
                  width="300"
                />
                <AgGridColumn
                  headerName="Fecha"
                  field="type"
                  width="300"
                  cellRenderer="slotDate"
                />
                <AgGridColumn
                  headerName="Detalle"
                  field="text"
                  width="200"
                  cellRenderer="slotDetalle"
                />
                <AgGridColumn
                  headerName="Participantes"
                  width="300"
                  cellRenderer="slotParticipants"
                />
              </AgGridReact>
            </div>
          ) : (
            ""
          ),
        ]}

        {/* FirstModal */}
        <Modal
          show={modal}
          dialogClassName="modal-90w"
          onHide={handleClose}
          style={{ marginTop: "50px" }}
        >
          <Modal.Body style={{ background: "#F4F5F6", border: "1px" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div class="container">
                <Row>
                  <div style={{ fontSize: "18px" }} class="col Inter600B">
                    {param.subject}
                  </div>
                  <div class="justify-content-end">
                    <a>
                      <FIcons.FiEdit
                        onClick={(e) => edit()}
                        size={18}
                        style={{ color: "#386CEF" }}
                      />
                    </a>
                    <FAIcons.FaTrashAlt
                      style={{ color: "#DC3545" }}
                      size={18}
                      onClick={(e) => {
                        deleteComment(param.id);
                      }}
                    />
                  </div>
                </Row>
                <Row className="mt-2">
                  <div style={{ fontSize: "14px" }} class="col Inter">
                    <svg
                      width="18"
                      height="20"
                      viewBox="0 0 18 20"
                      style={{
                        color: "rgb(66, 82, 110)",
                        height: "16px",
                        width: "14px",
                      }}
                    >
                      <g fill="none" fillRule="evenodd">
                        <path
                          fill="currentColor"
                          fillRule="nonzero"
                          d="M14 11H9v5h5v-5zM13 0v2H5V0H3v2H2C.89 2 .01 2.9.01 4L0 18a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2h-1V0h-2zm3 18H2V7h14v11z"
                        ></path>
                        <path d="M-3-1h24v24H-3z"></path>
                      </g>
                    </svg>{" "}
                    {showDate(param.date, param.timeBio)}
                  </div>
                </Row>
                {param.participants && (
                  <Row className="mt-3">
                    <div style={{ fontSize: "14px" }} class="col Inter600B">
                      Participantes :
                      {param.participants.map((part) => (
                        <Row className="mt-2">
                          {showParticipant(part.type, part.name)}
                          <span>{part.name}</span>
                        </Row>
                      ))}
                    </div>
                  </Row>
                )}
                <Row>
                  <div
                    onClick={(e) => handleEdit(e)}
                    style={{ backgroundColor: "white" }}
                    class="ml-3 mt-3 container"
                  >
                    <p style={{ color: "#7A859C" }}> {param.text}</p>
                  </div>
                </Row>
              </div>
            </form>
          </Modal.Body>
        </Modal>

        <Modal
          show={modalLog}
          style={{ marginTop: "50px" }}
          dialogClassName="modal-90w"
          onHide={handleClose}
        >
          {/* <NotificationAlert ref={notificationAlert} /> */}
          <Modal.Body style={{ background: "#F4F5F6", border: "1px" }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="container-fluid">
                {props.noBar && (
                  <Row>
                    <Col className="col-12">
                      <div style={{ borderRadius: "0px" }} class="card">
                        <div class="card-body">
                          <div class="row">
                            <span
                              onClick={() => showModalLog("Llamada")}
                              class="Inter600B"
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24">
                                <path
                                  fill="currentColor"
                                  fillRule="nonzero"
                                  d="M21 16.92v-.025a.998.998 0 0 0-.85-1.014 13.845 13.845 0 0 1-3.032-.755.998.998 0 0 0-1.05.221l-1.27 1.27a1 1 0 0 1-1.202.162 17 17 0 0 1-6.375-6.375 1 1 0 0 1 .162-1.201l1.266-1.266a1 1 0 0 0 .224-1.057 13.817 13.817 0 0 1-.753-3.02A1.003 1.003 0 0 0 7.11 3h-3a1 1 0 0 0-.996 1.074 18.8 18.8 0 0 0 2.92 8.24 18.511 18.511 0 0 0 5.7 5.697 18.774 18.774 0 0 0 8.176 2.913A1 1 0 0 0 21 19.92v-3zm2 2.996a3 3 0 0 1-3.288 2.998 20.78 20.78 0 0 1-9.058-3.22 20.49 20.49 0 0 1-6.303-6.3A20.805 20.805 0 0 1 1.124 4.27 3 3 0 0 1 4.11 1H7.1a3.002 3.002 0 0 1 3.001 2.59c.117.885.334 1.754.645 2.588a3.002 3.002 0 0 1-.679 3.17l-.717.716a15 15 0 0 0 4.586 4.586l.72-.721a3 3 0 0 1 3.164-.676c.836.312 1.705.529 2.6.647A3 3 0 0 1 23 16.93v2.985z"
                                ></path>
                              </svg>
                              &nbsp;LLamada
                            </span>
                            <span
                              onClick={() => showModalLog("Whatssap")}
                              class="ml-4 Inter600B"
                            >
                              <FAIcons.FaWhatsapp />
                              &nbsp; Whatssap
                            </span>
                            <span
                              onClick={() => showModalLog("Cita")}
                              class="ml-4 Inter600B"
                            >
                              <FIcons.FiCalendar />
                              &nbsp; Cita
                            </span>
                            <span
                              onClick={() => showModalLog("Email")}
                              class="ml-4 Inter600B"
                            >
                              <HIcons.HiOutlineMail size={16} />
                              Email
                            </span>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                )}
                <Row>
                  <Col className="col-2">Participantes:</Col>
                  <Col className="col-1">
                    <MDIcons.MdGroup />
                  </Col>
                  <Col style={{ marginLeft: "-30px" }} className="col">
                    {values && (
                      <Select
                        isMulti
                        name="values"
                        value={selectValue}
                        onChange={(e) => handleChange(e)}
                        defaultValue={[values[0], values[1]]}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        options={values}
                      />
                    )}
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col className="col-4">
                    <Form.Control
                      style={{ height: "100px", width: "180px" }}
                      onChange={(e) => changeDate(e)}
                      value={dateBio}
                      autoComplete="off"
                      name="date"
                      className="formGray"
                      type="date"
                      placeholder="Ingrese su Fecha"
                    />
                  </Col>
                  <Col className="mt-4">
                    <Form.Control
                      style={{ height: "30px", width: "120px" }}
                      onChange={(e) => changeTime(e)}
                      value={timeBio}
                      autoComplete="off"
                      name="date"
                      className="formGray"
                      type="time"
                      placeholder="Ingrese su Fecha"
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <InputGroup className="">
                    <InputGroup.Prepend>
                      <InputGroup.Text
                        className="ml-3 Inter600B"
                        style={{
                          backgroundColor: "#FFFFFF",
                          borderRight: "0",
                        }}
                      >
                        Asunto:
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      style={{
                        backgroundColor: "#FFFFFF",
                        borderBottom: "0",
                        borderLeft: "0",
                      }}
                      onChange={(e) => handleChangeSubject(e)}
                      value={subject}
                      id="inlineFormInputGroup"
                      placeholder=""
                    />
                  </InputGroup>
                  <InputGroup
                    className="ml-3"
                    style={{
                      borderTop: "0",
                      width: "100%",
                      marginTop: "0px",
                    }}
                  >
                    <Form.Control
                      onChange={(e) => changeText(e)}
                      value={textBio}
                      as="textarea"
                      placeholder="Escriba su mensaje..."
                      rows={8}
                    />
                  </InputGroup>
                </Row>
                <Row>
                  <Col className="mt-3 ">
                    <Button
                      disabled={!dateBio ? true : !timeBio ? true : false}
                      style={{ marginRight: "-15px" }}
                      onSubmit={handleSubmit(onSubmit)}
                      className="float-right"
                      type="submit"
                      variant="info"
                    >
                      Guardar
                    </Button>
                    <Button
                      onClick={handleClose}
                      style={{ fontFamily: "Inter", fontWeight: "500" }}
                      className="float-right mb-3 mr-2"
                      variant="danger"
                    >
                      Cancelar
                    </Button>
                  </Col>
                </Row>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
export default Bio;

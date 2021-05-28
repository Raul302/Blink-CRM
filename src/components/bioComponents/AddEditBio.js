import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useForm } from "react-hook-form";
import axios from "axios";
import { constaApi } from "../../constants/constants";
import * as FIcons from "react-icons/fi";
import * as FAIcons from "react-icons/fa";
import * as HIcons from "react-icons/hi";
import * as Ioicons from "react-icons/io";
import * as MDIcons from "react-icons/md";
import * as VsIcons from "react-icons/vsc";
import {
  Button,
  Modal,
  Form,
  InputGroup,
  Popover,
  OverlayTrigger,
  FormControl,
} from "react-bootstrap";
import swal from "sweetalert";
import NotificationAlert from "react-notification-alert";
import { Row, Col } from "reactstrap";
import Select from "react-select";
import { newBioC } from "actions/contacts/bioContact/bioContact";
import { updatedBioC } from "actions/contacts/bioContact/bioContact";
import { deleteBioC } from "actions/contacts/bioContact/bioContact";
import { starLoadingProspect } from "actions/contacts/bioContact/bioContact";
import { starLoadingApplications } from "actions/contacts/bioContact/bioContact";

export default function AddEditBio(props) {
  let contador = 0;
  const [values, setValues] = useState();
  const { flag } = props;
  const { id: IDX } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [timeBio, setTimeBio] = useState();
  const [editing, setEditing] = useState(false);
  let { id } = useParams();
  // Set moment spanish
  moment.locale("es-mx");
  const notificationAlert = useRef();
  const { username: email } = useSelector((state) => state.auth);
  useEffect(() => {
      consult();
    if (props.flagTwo) {
      showModalLog("Recordatorio");
    }
    if (props.flag) {
      showModal(props.row);
    }
  }, [props]);
  const [prefixSubject, setPrefix] = useState();
  const [twopart, setTwoPart] = useState(false);
  const { handleSubmit } = useForm({});
  const [modal, setModal] = useState(false);
  const [modalLog, setModalLog] = useState(false);
  const [param, setParam] = useState("");
  const [tempParam, setTempParam] = useState("");
  const [tempsubject, setTemp] = useState();
  const [subject, setSubject] = useState("");
  const [selectValue, setSelectValue] = useState();
  const [dateBio, setDateBio] = useState();
  const [textBio, setTextBio] = useState();

  function changeTime(e) {
    setTimeBio(e.target.value);
  }
  const handleChangeSubject = (e) => {
    setSubject(e.target.value);
  };
  const consult = async () => {
    let data = {
      id: id,
      idx: IDX,
    };
    await axios
      .post(constaApi + "defaultSelectBio", data)
      .then(function (response) {
        let { contact, contacts, references, user, users } = response.data;
        let result = user.map((col) => {
          return {
            value: col.name,
            label:
              col.name + " " + col.father_lastname + " " + col.mother_lastname,
            fullname:
              col.name + " " + col.father_lastname + " " + col.mother_lastname,
            type: "user",
          };
        });
        contact.map((u) => {
          result.push({
            value: u.name,
            label: u.name + " " + u.father_lastname + " " + u.mother_lastname,
            fullname:
              u.name + " " + u.father_lastname + " " + u.mother_lastname,
            type: "contactos",
          });
        });

        if (Object.keys(references).length != 0) {
          references.map((u) => {
            result.push({
              value: u.name,
              label: u.name + " " + u.father_lastname + " " + u.mother_lastname,
              fullname:
                u.name + " " + u.father_lastname + " " + u.mother_lastname,
              type: "referencias",
            });
          });
        } else {
          // nothing selection
        }
        users.forEach((us) => {
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
        });

        setValues(result);
      });
  };
  const showModal = function showModal(row) {
    setModal(true);
    setParam(row);
    setTempParam(row.text);
  };
  const handleChange = (e) => {
    if (e != null) {
      setSelectValue(e);
    } else {
      notification("danger", "Este campo no puede estar vacio");
    }
  };
  const showModalLog = function showModalLog(subject) {
    setPrefix(subject);
    setTextBio("");
    setModalLog(true);
    setTemp(subject);
    setSubject(
      values[1] ? subject + " a " + values[1].value : subject + " a " + ""
    );
  };
  const handleClose = function close() {
    setSelectValue([values[0], values[1]]);
    setDateBio("");
    setTimeBio("");
    setModal(false);
    setModalLog(false);
    if (modal) {
      if (props.setFlag());
    }
  };
  async function onSubmit(data) {
    console.log('SelectValue',selectValue);
    let datex = dateBio + " " + timeBio;
    if (editing) {
      let datax = {
        id: param.id,
        id_contact: id,
        subject: subject,
        values: selectValue ? selectValue : [values[0], values[1]],
        date: dateBio ? datex : null,
        text: textBio ? textBio : null,
        id_college: null,
        type: prefixSubject,
        type_prospection: props.activeProspect  ? 'Prospeccion' : props.activeApplications ? 'aplicacion' : 'General',
        id_type_prospection : props.activeProspect ? props.activeProspect.id : props.activeApplication ? props.activeApplication.id : 0
      };
      dispatch(updatedBioC(datax));
      if(props.activeProspect){
        dispatch(starLoadingProspect(id,props.activeProspect.id));

      } else if(props.activeApplication){
        dispatch( starLoadingApplications(id,props.activeApplication.id));
      }
    } else {
      let datax = {
        id_contact: id,
        id_college: null,
        subject: subject ? subject : null,
        values: selectValue ? selectValue : [values[0], values[1]],
        date: dateBio ? datex : null,
        text: textBio ? textBio : null,
        type: prefixSubject,
        type_prospection: props.activeProspect  ? 'Prospeccion' : props.activeApplications ? 'aplicacion' : 'General',
        id_type_prospection : props.activeProspect ? props.activeProspect.id : props.activeApplication ? props.activeApplication.id : 0
      };
      let indicator = props.activeProspect ? 1 : props.activeApplication ? 2 : 0;
      let params = indicator == 1 ? {id:id,id_type_prospection:props.activeProspect.id} : indicator == 2 ? 
      {id:id,id_type_prospection:props.activeApplication.id} : null;
      dispatch(newBioC(datax,indicator,params));

      // PENDIENTE CAMBIAR CUANDO SE ACTUALIZE UNA ENTRADA DE BITACORA
      // if(props.activeProspect){
      //   dispatch(starLoadingProspect(id,props.activeProspect.id));

      // } else if(props.activeApplication){
      //   dispatch( starLoadingApplications(id,props.activeApplication.id));

      // }
      if (props.fromBio) {
        props.fromBio();
      }
    }
    if (props.noBar) {
      props.closeAll();
    }
    handleClose();
    consult();
  }

  function changeDate(e) {
    setDateBio(e.target.value);
  }
  function changeText(e) {
    setTextBio(e.target.value);
  }
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
      <span class="montse">
        {datef} <Ioicons.IoMdTime /> {timef}
      </span>
    );
    return tag;
  };
  const showSubject = (type, subject) => {
    let tag = "";
    if (type.includes("Llamada")) {
      tag = (
        <span class="montse">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              fillRule="nonzero"
              d="M21 16.92v-.025a.998.998 0 0 0-.85-1.014 13.845 13.845 0 0 1-3.032-.755.998.998 0 0 0-1.05.221l-1.27 1.27a1 1 0 0 1-1.202.162 17 17 0 0 1-6.375-6.375 1 1 0 0 1 .162-1.201l1.266-1.266a1 1 0 0 0 .224-1.057 13.817 13.817 0 0 1-.753-3.02A1.003 1.003 0 0 0 7.11 3h-3a1 1 0 0 0-.996 1.074 18.8 18.8 0 0 0 2.92 8.24 18.511 18.511 0 0 0 5.7 5.697 18.774 18.774 0 0 0 8.176 2.913A1 1 0 0 0 21 19.92v-3zm2 2.996a3 3 0 0 1-3.288 2.998 20.78 20.78 0 0 1-9.058-3.22 20.49 20.49 0 0 1-6.303-6.3A20.805 20.805 0 0 1 1.124 4.27 3 3 0 0 1 4.11 1H7.1a3.002 3.002 0 0 1 3.001 2.59c.117.885.334 1.754.645 2.588a3.002 3.002 0 0 1-.679 3.17l-.717.716a15 15 0 0 0 4.586 4.586l.72-.721a3 3 0 0 1 3.164-.676c.836.312 1.705.529 2.6.647A3 3 0 0 1 23 16.93v2.985z"
            ></path>
          </svg>
          &nbsp;{subject}
        </span>
      );
    }
    if (type.includes("Whatsapp")) {
      tag = (
        <span class="montse">
          <FAIcons.FaWhatsapp />
          &nbsp; {subject}
        </span>
      );
    }
    if (type.includes("Cita")) {
      tag = (
        <span class="montse">
          <FIcons.FiCalendar />
          &nbsp;
          {subject}
        </span>
      );
    }
    if (type.includes("Email")) {
      tag = (
        <span class=" montse">
          <HIcons.HiOutlineMail size={16} />
          &nbsp;
          {subject}
        </span>
      );
    }
    if(type.includes('Video llamada')){
      tag = (
        <span class=" montse">
      <VsIcons.VscDeviceCameraVideo size={16} />
          &nbsp;
          {subject}
        </span>
      );

    }
    return tag;
  };
  const showParticipant = (type = "use", name, fullname = "") => {
    let n = name ? name : " ";
    let tag = "";
    if (n) {
      n = n.charAt(0) + n.charAt(1);
    }
    switch (type) {
      case "user":
        tag = (
          <span class="ml-3 sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnV">
            {n}
          </span>
        );
        break;
      case "contactos":
        tag = (
          <span class="ml-3 sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnP">
            {n}
          </span>
        );
        break;
      case "referencias":
        tag = (
          <span class="ml-3 sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnP">
            {n}
          </span>
        );
        break;
      default:
        tag = (
          <span class="ml-3 sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnZ">
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
  const changeBio = async (e) => {
    setTempParam(e.target.value);
    let name = "";
    name = await e.target.value;
  };
  const deleteComment = async (ide) => {
    swal({
      title: "Estas seguro?",
      text: "Una vez eliminado,no podras recuperar este registro!",
      icon: "warning",
      dangerMode: true,
      buttons: ["No", "Si"],
    }).then(async (willDelete) => {
      if (willDelete) {
        dispatch(deleteBioC(ide, id));
      } else {
        swal("Operacion cancelada!");
      }
    });
    handleClose();
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

  return (
    <>
      <div className=" mt-1 content">
        <NotificationAlert ref={notificationAlert} />
        {props.noBar ? (
          ""
        ) : (
          <div style={{ borderRadius: "0px" }} class="card">
            <div class="card-body">
              <div class="row">
                <span 
                onClick={() => props.blocked ? true:showModalLog("Llamada") } class="ml-2 montse">
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
                  onClick={() => props.blocked ? true:showModalLog("Whatsapp")}
                  class="ml-4 montse"
                >
                  <FAIcons.FaWhatsapp />
                  &nbsp;Whatsapp
                </span>
                <span
                  onClick={() => props.blocked ? true:showModalLog("Cita")}
                  class="ml-4 montse"
                >
                  <FIcons.FiCalendar />
                  &nbsp;Cita
                </span>
                <span
                  onClick={() => props.blocked ? true:showModalLog("Email")}
                  class="ml-4 montse"
                >
                  <HIcons.HiOutlineMail size={16} />
                  &nbsp;Email
                </span>

                <span
                  onClick={() => props.blocked ? true:showModalLog("Video llamada")}
                  class="ml-4 montse"
                >
                  <VsIcons.VscDeviceCameraVideo size={16} />
                  &nbsp;Videollamada
                </span>
              </div>
            </div>
          </div>
        )}
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
                  <div style={{ fontSize: "18px" }} class="col montse">
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
                      class="ml-1"
                      style={{ color: "#DC3545" }}
                      size={18}
                      onClick={(e) => {
                        deleteComment(param.id);
                      }}
                    />
                  </div>
                </Row>
                <Row className="mt-2">
                  <div style={{ fontSize: "14px" }} class="col montse ">
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
                    <div style={{ fontSize: "14px" }} class="col montse">
                      Participantes:
                      {param.participants.map((part) => (
                        <Row key={part.id} className="mt-2">
                          {showParticipant(part.type, part.name, part.fullname)}
                          <span class="ml-2 mt-1">{part.fullname}</span>
                        </Row>
                      ))}
                    </div>
                  </Row>
                )}
                <Row>
                  <div
                    onClick={(e) => handleEdit(e)}
                    style={{ width:'100%' ,backgroundColor: "white" }}
                    class="ml-3 mt-3 "
                    >
                    <p style={{ color: "#7A859C" }}>{param.text}</p>
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
                              class="montse"
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
                              onClick={() => showModalLog("Whatsapp")}
                              class="ml-4 montse"
                            >
                              <FAIcons.FaWhatsapp />
                              &nbsp;Whatsapp
                            </span>
                            <span
                              onClick={() => showModalLog("Cita")}
                              class="ml-4 montse"
                            >
                              <FIcons.FiCalendar />
                              &nbsp;Cita
                            </span>
                            <span
                              onClick={() => showModalLog("Email")}
                              class="ml-4 montse"
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
                        value={selectValue ?? [values[0], values[1]]}
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
                      style={{textTransform:'capitalize',  width: "180px" }}
                      onChange={(e) => changeDate(e)}
                      value={dateBio}
                      autoComplete="off"
                      name="date"
                      className="montse formGray"
                      type="date"
                      placeholder="Ingrese su Fecha"
                    />
                  </Col>
                  <Col >
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
                        className="ml-3 montse"
                        style={{ backgroundColor: "#FFFFFF", borderRight: "0" }}
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
                    style={{ borderTop: "0", width: "100%", marginTop: "0px" }}
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

import React, { useState,useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { constaApi } from "constants/constants";
import * as FIIcons from "react-icons/fi";
import {
  Button,
  Modal,
  Row,
  Col,
  Form,
  InputGroup,
  Popover,
  OverlayTrigger,
  FormControl,
  Tabs,
  Tab,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import Skeleton from 'react-loading-skeleton';
import Reminders from '../../contactComponents/RemindersComponents/Reminders';
import { starLoadingProspectRemindersC } from "actions/contacts/remindersContacts/remindersContact";
import { setRemindersC } from "actions/contacts/remindersContacts/remindersContact";
import Bio from "components/bioComponents/Bio";
import { starLoadingProspect } from "actions/contacts/bioContact/bioContact";
import { activeContact } from "actions/contacts/contacts/contacts";
import Proposals from "components/proposals/Proposals";
import moment from 'moment';
import { starLoadingCollegesByProspeccion } from "actions/colleges/colleges";
import { setColleges } from "actions/colleges/colleges";
import {
  SelectionState,
  GroupingState,
  IntegratedGrouping,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
  TableSelection,
} from '@devexpress/dx-react-grid-bootstrap4';
import { select } from "d3-selection";
import NotificationAlert from "react-notification-alert";

var _ = require('lodash');

export  function CustomComponent(props){
  const {obj} = props;
  const [columns] = useState([
    { name: 'name', title: 'Nombre' },
  ]);
  const [selection, setSelection] = useState([]);

  function changeSelection(e){
    setSelection(e); 
    let aux = obj[e];
    props.theSelection(aux);
  }
  return(
    <div>
       <Grid
              style={{marginTop:'30px'}}
              rows={obj}
              columns={columns}
            >
              <SelectionState
                selection={selection}
                onSelectionChange={(e) => {changeSelection(e)}}
              />
              <Table />
              <TableSelection /> 
            </Grid>
    </div>
  );
}

export default function Prospection(props) {
  const notificationAlert = useRef();
  const [modalAdvisor,setModalAdvisor] = useState(false);
  const dispatch = useDispatch();
  const [aux, setAux] = useState({ id: "", story: "", status: "Evaluación", name_prospection: "", last_modification: "" });
  const [activeProspect, setActiveProspect] = useState({ id: "", story: "", status: "Evaluación", name_prospection: "", last_modification: "" });
  const [load, setLoad] = useState(false);
  const [prospections, SetProspections] = useState(null);
  const [selection, SetSelection] = useState(0);
  let { active } = useSelector((state) => state.contacts);
  const [modalProspection, setModalProspection] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [modalStory, setModalStory] = useState(false);
  const [program, SetProgram] = useState();
  const [objAux, setObjAux] = useState({ program: "", year: "" });
  const [modalGrouped, setModalGrouped] = useState(false);
  const {colleges} = useSelector( state => state.colleges);
  const [filterColleges,setFilterColleges] = useState();
  const [auxobj,setAuxObj] = useState();
  const [users,setUsers] = useState([]);
  const [theUser,setTheUser] = useState();
  const programs = [
    "Boarding School",
    "School District",
    "Summer Camp",
    "Language School",
    "University/College",
    "Work & Travel"
  ];
  const status = [
    "Contacto Previo",
    "Contacto Formal",
    "Presentación",
    "Aclaración de dudas",
    "Decisión",
    "Aplicar",
    "Cancelar",
  ];
  const years = [
    2019,
    2020,
    2021,
    2022,
    2023,
    2024,
    2025,
    2026,
    2027,
    2028,
    2029,
    2030,
  ];
  const [year, SetYear] = useState();
  const {
    register: student,
    handleSubmit,
    errors,
    formState,
    reset: reset,
  } = useForm({});
  
  if (!active) {
    active = JSON.parse(localStorage.getItem('ActiveContact'));
  } 
  useEffect(() => {
    const result = _.groupBy(colleges,"country")
    setFilterColleges(result);
  },[colleges]);
  useEffect(() => {
      consultAllProspections(active.id);
    if (active) {
      localStorage.setItem('ActiveContact', JSON.stringify(active));
      if (activeProspect) {
        dispatch(starLoadingProspect(active.id, activeProspect.id));
      }
    }
  }, []);

  const theSelection = (obj) => {
    setAuxObj(obj);
  }
  const consultAllProspections = async (id) => {
    changeLoad(true);
    await axios
      .get(constaApi + "getProspection/" + id, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(function (response) {
        if (response.data[0]) {
          dispatch(setColleges([]));
          let newcadena = response.data[0].name_prospection.replace(/\d/g, "");
          dispatch(starLoadingCollegesByProspeccion(newcadena));
          firstTime(response.data[0]);
          SetProspections(response.data);
        } else {
          SetProspections(null);
          // dispatch( starLoadingProspectRemindersC(active.id,0,'Prospeccion'));

        }
        changeLoad(false);
      });
  };

  const firstTime = (data) => {
    setActiveProspect(data);
    SetSelection(data.id);
    dispatch(starLoadingProspectRemindersC(active.id, data.id, 'Prospeccion'));
    dispatch(starLoadingProspect(active.id, data.id));
  }
  const changeButton = async (id) => {
    dispatch(setRemindersC([]));
    dispatch(setColleges([]));
    changeLoad(true);
    await axios.post(constaApi + "showProspection", { id: id })
      .then(function (response) {
        let newcadena = response.data.name_prospection.replace(/\d/g, "");
        dispatch(starLoadingCollegesByProspeccion(newcadena));
        SetSelection(id);
        setActiveProspect(response.data);
        dispatch(starLoadingProspectRemindersC(active.id, response.data.id, 'Prospeccion'));
        dispatch(starLoadingProspect(active.id, response.data.id));
        changeLoad(false);
      });
    // SetSelection(id);
    // let auxxx = prospections.filter(prospect => prospect.id === id );
    //  setActiveProspect(auxxx);
    // changeLoad(false);

  };
  const changeLoad = (val) => {
    setLoad(val);
  }
  const changeModal = () => {
    setModalProspection(!modalProspection);
  };

  const changeModalStatus = () => {
    setAux({ ...activeProspect });
    setModalStatus(!modalStatus);
  }

  const changeModalStory = () => {
    setAux({ ...activeProspect });
    setModalStory(!modalStory);
  }
  const closeModal = async () => {
    setActiveProspect({ ...aux });
    setModalProspection(false);
    setModalStory(false);
    setModalStatus(false);
    setModalGrouped(false);
    setModalAdvisor(false);
  };
  const changeStatus = (e) => {
    setActiveProspect({ ...activeProspect, status: e.target.value });
    if (e.target.value == 'Aplicar') {
      setModalGrouped(true);
    }
  }
  const changeModalAdvisor = () => {
    axios.post(constaApi + "allUsers")
    .then(function (response) {
      setUsers(response.data);
      setModalAdvisor(!modalAdvisor);
    });
    setTheUser(active.id_advisor);
  }
  const changeAdvisor = (e) => {
    setTheUser(e.target.value);
  }
  const updatedContact = () => {
    let obj = users.filter(us => us.id == theUser);
    obj = {
      name_advisor: obj[0].name + " " + obj[0].father_lastname + " " + obj[0].mother_lastname,
      id_advisor : obj[0].id,
      id: active.id
    };
     axios.post(constaApi + 'contact/update', obj)
    .then(function (response) {
        if (response.status === 200) {
          dispatch(activeContact(response.data));
          setTheUser(null);
          closeModal();
            // notification('info', 'Datos actualizados correctamente');
        } else {
            // notification('danger', 'Ocurrio un error,por favor contacta a soporte');
        }
    });
  }
  const changeStory = (e) => {
    setActiveProspect({ ...activeProspect, story: e.target.value });

  }
  const deleteProspection = () => {
    changeLoad(true);
    axios.get(constaApi + "deleteProspection/" + activeProspect.id)
      .then(function (response) {
        consultAllProspections(active.id);
        changeLoad(false);
      });
  }

  const saveChanges = () => {
    changeLoad(true);
    moment.locale("es-mx");
    let newObj = {
      id: activeProspect.id,
      name_prospection: activeProspect.name_prospection,
      status: activeProspect.status,
      story: activeProspect.story,
      last_modification: moment().format("YYYY-MM-DD HH:mm"),
      id_last_contact: active.id,
      last_contact: active.name,
      name: auxobj ? auxobj.name : null,
      id_application : auxobj ? auxobj.id : null
    };
    axios.post(constaApi + "updatedProspection", newObj)
      .then(function (response) {
        consultAllProspections(active.id);
        closeModal();
        changeLoad(false);
      });
  }
  const formatDate = (date) => {
    moment.locale('es-mx')
    let datef = '';
    if (date) {
      datef = moment(date).locale('es-mx').format("DD/MMM/YYYY ");
    } else {
      datef = '';
    }
    return datef;
  }
  const updateReminders = () => {
    dispatch(starLoadingProspectRemindersC(active.id, activeProspect.id, 'Prospeccion'));
  }
  const onSubmit = (data) => {
    moment.locale("es-mx");
    let newObj = {
      name_prospection: objAux.program + " " + objAux.year,
      status: 'Evaluación',
      story: null,
      last_modification: moment().format("YYYY-MM-DD HH:mm"),
      id_last_contact: active.id,
      last_contact: active.name,
    };
    let flag = false;
    prospections.map(pro =>{
      if(pro.name_prospection == (objAux.program + " " + objAux.year)){
        flag = true;
      } else {
        console.log('No repetida');
      }
    })
    if(!flag){
      axios.post(constaApi + "saveProspection", newObj)
        .then(function (response) {
          changeButton(response.data.id);
          consultAllProspections(active.id);
          closeModal();
        });
    } else {
      notification('warning', 'Prospeccion Repetida');
      flag = false;
    }
  };
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
  const checkButton = (obj) => {
    let params = "";
    if(obj.id == selection && obj.status != "Aplicar" && obj.status != 'Cancelar'){
      params = "mr-1 btn btn-sm btn-info";
    } else if (obj.id != selection && obj.status != "Aplicar" && obj.status != 'Cancelar'){
      params = "mr-1 btn btn-sm btn-infoDisabled";
    } else if (obj.status == "Aplicar" && obj.id == selection){
      params = "mr-1 btn btn-sm btn-yellow";
    } else if(obj.status == "Aplicar" && obj.id != select){
      params = "mr-1 btn btn-sm btn-yellowDisabled";
    } else if(obj.status == "Cancelar" && obj.id == selection) {
      params = "mr-1 btn btn-sm btn-disabled";
    } else if(obj.status == "Cancelar" && obj.id != selection){
      params = "mr-1 btn btn-sm btn-disabledForce";

    }

    return params;
  }
  return (
    <div class="content">
      <div class="row mt-n5">
      <div class="col-10">
      {prospections && [
        prospections.map((pros) => {
          return (
            <button
            onClick={(e) => changeButton(pros.id)}
            key={pros.id}
            // active={{backgroundColor:'#FF0000'}}
            class={checkButton(pros)}
            // style={{
              //   backgroundColor:[selection === pros.id ?  '#0062cc' : '#51cbce']
              // }}
              >
              {pros.name_prospection}
            </button>
          );
        }),
      ]}
      <button
        onClick={(e) => changeModal()}
        type="button"
        class="montse ml-1 btn btn-success btn-sm"
        >
        +
      </button>
      </div>
      <div class="col">
      {prospections &&
        <button
        onClick={(e) => deleteProspection()}
        type="button"
        class="float-right Inter btn btn-danger btn-sm"
        >
          Eliminar Prospeccion
      </button>
      }
      </div>
      </div>
      {load === true ?
        <Skeleton width="60rem" height={30} count={10} />

        :
        <>
          <div class="row">
            <div class="content col-4">
              <Form.Label className="formGray">Status</Form.Label>
              <Form.Control name="status"
                disabled
                style={{letterSpacing:'0.2px'}}
                autoComplete="off" className="montse formGray" type="text"
                value={activeProspect.status}
              />
              <button
                class=" mt-1 float-right Inter btn-info  btn-sm"
                onClick={(e) => changeModalStatus()}><FIIcons.FiEdit size={16} style={{ color: 'white' }} /> </button>
            </div>
            <div class="content col-4">
              <Form.Label className="formGray">Story</Form.Label>
              <Form.Control
                onChange={(e) => changeStory(e)}
                disabled
                value={activeProspect.story}
                as="textarea"
                placeholder="Escriba sus notas..."
                rows={8}
                cols={20}
                style={{letterSpacing:'0.2px' , paddingLeft: '10px' }}
              />

              <button
                class=" mt-1 float-right Inter btn-info  btn-sm"
                onClick={(e) => changeModalStory()}><FIIcons.FiEdit size={16} style={{ color: 'white' }} /> </button>
            </div>
            <div class="col-3">
              <Form.Label className="formGray">Advisor</Form.Label>
              <Form.Control name="last_modification"
                disabled
                autoComplete="off" className="formGray" type="text"
                placeholder="Ultima fecha"
                style={{letterSpacing:'0.2px'}}
                value={active.name_advisor}
              />
              <button
                class=" mt-1 float-right Inter btn-info  btn-sm"
                onClick={(e) => changeModalAdvisor()}><FIIcons.FiEdit size={16} style={{ color: 'white' }} /> </button>
            </div>
          </div>
          <div class="mt-n5 row">
            <div class="content col-4">
              <Form.Label className="formGray">Ultimo contacto</Form.Label>
              <Form.Control name="last_modification"
                disabled
                autoComplete="off" className="formGray" type="text"
                placeholder="Ultima fecha"
                style={{letterSpacing:'0.2px'}}
                value={formatDate(activeProspect.last_modification)}
              />
            </div>
          </div>
          <div class="row">
            <div class="mb-4 col-12">
              <Proposals
                blocked={activeProspect.status == "Aplicar" ? true : activeProspect.status == "Cancelar" ? true : false}
                updateReminders={updateReminders} activeProspect={activeProspect} />
            </div>
          </div>
          <div class="mt-5 row">
            <h6>Recordatorios</h6>
            <div class="mt-5 col-12">
              <Reminders
                blocked={activeProspect.status == "Aplicar" ? true : activeProspect.status == "Cancelar" ? true : false}
                activeProspect={activeProspect} prospection={true} />
            </div>
          </div>
          <div class="mt-5 row">
            <h6>Bitácora</h6>
            <div class="ml-n4 mt-5 col-12">
              <Bio
                extern={true}
                blocked={activeProspect.status == "Aplicar" ? true : activeProspect.status == "Cancelar" ? true : false}
                activeProspect={activeProspect} />
            </div>
          </div>
        </>
      }



      {/* Modal prospeccion */}
      <Modal
        show={modalProspection}
        dialogClassName="modalMax"
        onHide={closeModal}
        dialogClassName="modal-90w"
      >
        <Modal.Header style={{ height: "60px" }} closeButton>
          <Modal.Title
            style={{
              fontFamily: "Inter",
              marginTop: "5px",
              fontWeight: "600",
              fontSize: "18px",
            }}
          >
            Agregar prospeccion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#F4F5F6", border: "0px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fluid">
              <Row>
              <NotificationAlert ref={notificationAlert} />
                <Col className="col-4">
                  <Form.Label className="formGray">Programa</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setObjAux({ ...objAux, program: e.target.value })
                    }
                    autoComplete="off"
                    name="program"
                    ref={student({
                      required: true,
                    })}
                    as="select"
                    size="sm"
                    custom
                  >
                    <option disabled value="" selected></option>
                    {programs.map((pro) => (
                      <option key={pro} value={pro}>
                        {pro}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col className="col-2">
                  <Form.Label className="formGray">Año</Form.Label>
                  <Form.Control
                    onChange={(e) =>
                      setObjAux({ ...objAux, year: e.target.value })
                    }
                    autoComplete="off"
                    name="year"
                    ref={student({
                      required: true,
                    })}
                    as="select"
                    size="sm"
                    custom
                  >
                    <option disabled value="" selected></option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Row>
            </div>
            <Row>
              <Col>
                <Button
                  className="float-right mb-3 mr-2"
                  type="submit"
                  onSubmit={handleSubmit(onSubmit)}
                  variant="info"
                >
                  Guardar
                </Button>
                <Button
                  onClick={closeModal}
                  className="float-right mb-3 mr-2 montse btnBee"
                  >
                  Cancelar
                </Button>
              </Col>
            </Row>
          </form>
        </Modal.Body>
      </Modal>

      {/* End Modal prospection*/}



      {/* Modal Status */}
      <Modal
        show={modalStatus}
        dialogClassName="modalMax"
        onHide={closeModal}
        dialogClassName="modal-90w"
      >
        <Modal.Header style={{ height: "60px" }} closeButton>
          <Modal.Title
            style={{
              fontFamily: "Inter",
              marginTop: "5px",
              fontWeight: "600",
              fontSize: "18px",
            }}
          >
            Modificar Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#F4F5F6", border: "0px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fluid">
              <Row>
                <Col className="col-4">
                  <Form.Control
                    onChange={(e) => changeStatus(e)}
                    autoComplete="off"
                    name="year"
                    value={activeProspect.status}
                    as="select"
                    size="sm"
                    custom
                  >
                    <option value="Evaluacion" selected>
                      Evaluacion
                </option>
                    {status.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Row>
            </div>
            <Row>
              <Col>
                <Button
                  className="float-right mb-3 mr-2 montse"
                  type="button"
                  onClick={(e) => saveChanges()}
                  variant="info"
                >
                  Guardar
                </Button>
                <Button
                  onClick={closeModal}
                  className="float-right mb-3 mr-2 montse btnBee"
                >
                  Cancelar
                </Button>
              </Col>
            </Row>
          </form>
        </Modal.Body>
      </Modal>

      {/* End modal Status */}

      {/* Modal Grouped */}
      <Modal
        show={modalGrouped}
        dialogClassName="modalMax"
        onHide={closeModal}
        dialogClassName="modal-90w"
      >
        <Modal.Header style={{ height: "60px" }} closeButton>
          <Modal.Title
            style={{
              fontFamily: "Inter",
              marginTop: "5px",
              fontWeight: "600",
              fontSize: "18px",
            }}
          >
            Seleccionar Colegio
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#F4F5F6", border: "0px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fluid">
              <Row>
                <Col className="tabpanel col-12">
                  <Tabs >
                    {filterColleges &&
                    [ Object.keys(filterColleges).map((oneKey,i)=>{
                      return(
                      <Tab eventKey={oneKey} title={oneKey}>
                      <CustomComponent theSelection={theSelection} obj={filterColleges[oneKey]} />
                    </Tab>
                      )
                    })]}
                  </Tabs>
                </Col>
              </Row>
            </div>
            <Row>
              <Col>
                <Button
                  className="float-right mb-3 mr-2"
                  type="button"
                  onClick={(e) => saveChanges()}
                  variant="info"
                >
                  Crear
                </Button>
                <Button
                  onClick={closeModal}
                  className="float-right mb-3 mr-2 montse btnBee"
                >
                  Cancelar
                </Button>
              </Col>
            </Row>
          </form>
        </Modal.Body>
      </Modal>

      {/* End modal modalGrouped */}


      {/* Modal Status */}
      <Modal
        show={modalStory}
        dialogClassName="modalMax"
        onHide={closeModal}
        dialogClassName="modal-90w"
      >
        <Modal.Header style={{ height: "60px" }} closeButton>
          <Modal.Title
            style={{
              fontFamily: "Inter",
              marginTop: "5px",
              fontWeight: "600",
              fontSize: "18px",
            }}
          >
            Modificar Story
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#F4F5F6", border: "0px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fluid">
              <Row>
                <Col className="col-8">
                  <Form.Label className="formGray">Story</Form.Label>
                  <Form.Control
                    onChange={(e) => changeStory(e)}
                    value={activeProspect.story}
                    as="textarea"
                    placeholder="Escriba sus notas..."
                    style={{letterSpacing:'0.2px' , paddingLeft: '10px' }}
                    rows={12}
                    cols={12}
                  />
                </Col>
              </Row>
            </div>
            <Row>
              <Col>
                <Button
                  className="float-right mb-3 mr-2"
                  type="button"
                  onClick={(e) => saveChanges()}
                  variant="info"
                >
                  Guardar
                </Button>
                <Button
                  onClick={closeModal}
                  className="float-right mb-3 mr-2 montse btnBee"
                >
                  Cancelar
                </Button>
              </Col>
            </Row>
          </form>
        </Modal.Body>
      </Modal>
      {/* End modal Story */}


      {/* Modal Advisor */}
      <Modal
        show={modalAdvisor}
        dialogClassName="modalMax"
        onHide={closeModal}
        dialogClassName="modal-90w"
      >
        <Modal.Header style={{ height: "60px" }} closeButton>
          <Modal.Title
            style={{
              fontFamily: "Inter",
              marginTop: "5px",
              fontWeight: "600",
              fontSize: "18px",
            }}
          >
            Cambiar Advisor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#F4F5F6", border: "0px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container-fluid">
              <Row>
                <Col className="col-6">
              <Form.Label className="formGray">Usuario</Form.Label>
                  <Form.Control
                    onChange={(e) =>changeAdvisor(e)}
                    autoComplete="off"
                    name="advisor"
                    value={theUser}
                    as="select"
                    size="sm"
                    custom
                  >
                    <option disabled value="" selected></option>
                    {users.map((pro) => (
                      <option key={pro.id} value={pro.id}>
                        {pro.name} {pro.father_lastname} {pro.mother_lastname}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Row>
            </div>
            <Row>
              <Col>
                <Button
                  className="float-right mb-3 mr-2"
                  type="button"
                  onClick={(e) => updatedContact()}
                  variant="info"
                >
                  Guardar
                </Button>
                <Button
                  onClick={closeModal}
                  className="float-right mb-3 mr-2 montse btnBee"
                  >
                  Cancelar
                </Button>
              </Col>
            </Row>
          </form>
        </Modal.Body>
      </Modal>
      {/* End modal Advisor */}

    </div>
  );
}

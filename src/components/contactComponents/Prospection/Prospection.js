import React, { useState, useEffect } from "react";
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

export default function Prospection() {
  const dispatch = useDispatch();
  const [aux, setAux] = useState({ id: "", story: "", status: "Evaluacion", name_prospection: "", last_modification: "" });
  const [activeProspect, setActiveProspect] = useState({ id: "", story: "", status: "Evaluacion", name_prospection: "", last_modification: "" });
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
    "Presentacion",
    "Aclaración de dudas",
    "Decision",
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
  };
  const changeStatus = (e) => {
    setActiveProspect({ ...activeProspect, status: e.target.value });
    if (e.target.value == 'Aplicar') {
      setModalGrouped(true);
    }
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
      status: 'Evaluacion',
      story: null,
      last_modification: moment().format("YYYY-MM-DD HH:mm"),
      id_last_contact: active.id,
      last_contact: active.name,
    };
    axios.post(constaApi + "saveProspection", newObj)
      .then(function (response) {
        changeButton(response.data.id);
        consultAllProspections(active.id);
        closeModal();

      });
  };
  return (
    <div class="content">
      {prospections && [
        prospections.map((pros) => {
          return (
            <button
              onClick={(e) => changeButton(pros.id)}
              key={pros.id}
              // active={{backgroundColor:'#FF0000'}}
              class={[
               pros.status === "Aplicar" ? 
               "mt-n5 mr-1 btn btn-sm btn-light"
               : selection === pros.id
                  ? "mt-n5 mr-1 btn btn-sm btn-info"
                  : "mt-n5 mr-1 btn btn-sm btn-primary",
              ]}
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
        class="mt-n5  Inter ml-1 btn btn-success btn-sm"
      >
        +
      </button>
      {/* <button
        onClick={(e) => saveChanges()}
        type="button"
        class="mt-n5 float-right Inter btn btn-success btn-sm"
      >
        Guardar cambios
      </button> */}
      {prospections &&
        <button
          onClick={(e) => deleteProspection()}
          type="button"
          class="mt-n5 float-right Inter btn btn-danger btn-sm"
        >
          Eliminar Prospeccion
      </button>
      }
      {load === true ?
        <Skeleton width="60rem" height={30} count={10} />

        :
        <>
          <div class="row">
            <div class="content col-4">
              <Form.Label className="formGray">Status</Form.Label>
              <Form.Control name="status"
                disabled
                autoComplete="off" className="formGray" type="text"
                value={activeProspect.status}
              />
              <button
                class=" mt-1 float-right Inter btn-primary  btn-sm"
                onClick={(e) => changeModalStatus()}><FIIcons.FiEdit size={16} style={{ color: 'white' }} /> </button>
              {/* <Form.Control
    onChange={(e) => changeStatus(e)}
    autoComplete="off"
    name="year"
    value={activeProspect.status}
    // as="select"
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
  </Form.Control> */}
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
              />
              <button
                class=" mt-1 float-right Inter btn-primary  btn-sm"
                onClick={(e) => changeModalStory()}><FIIcons.FiEdit size={16} style={{ color: 'white' }} /> </button>
            </div>
            <div>
              <Form.Label className="formGray">Ultimo contacto</Form.Label>
              <Form.Control name="last_modification"
                disabled
                autoComplete="off" className="formGray" type="text"
                placeholder="Ultima fecha"
                value={formatDate(activeProspect.last_modification)}
              />
            </div>
          </div>
          <div class="row">
            <div class="mr-5 mb-4 col-12">
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
            <h6>Bitacora</h6>
            <div class="mr-5 mt-5 col-12">
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
                  variant="primary"
                >
                  Guardar
                </Button>
                <Button
                  onClick={closeModal}
                  style={{ fontFamily: "Inter", fontWeight: "500" }}
                  className="float-right mb-3 mr-2"
                  variant="danger"
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
                  className="float-right mb-3 mr-2"
                  type="button"
                  onClick={(e) => saveChanges()}
                  variant="primary"
                >
                  Guardar
                </Button>
                <Button
                  onClick={closeModal}
                  style={{ fontFamily: "Inter", fontWeight: "500" }}
                  className="float-right mb-3 mr-2"
                  variant="danger"
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
                  variant="primary"
                >
                  Crear
                </Button>
                <Button
                  onClick={closeModal}
                  style={{ fontFamily: "Inter", fontWeight: "500" }}
                  className="float-right mb-3 mr-2"
                  variant="danger"
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
                  variant="primary"
                >
                  Guardar
                </Button>
                <Button
                  onClick={closeModal}
                  style={{ fontFamily: "Inter", fontWeight: "500" }}
                  className="float-right mb-3 mr-2"
                  variant="danger"
                >
                  Cancelar
                </Button>
              </Col>
            </Row>
          </form>
        </Modal.Body>
      </Modal>

      {/* End modal Story */}

    </div>
  );
}

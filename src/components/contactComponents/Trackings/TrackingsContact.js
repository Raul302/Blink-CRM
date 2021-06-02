import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { constaApi } from "constants/constants";
import * as FIIcons from "react-icons/fi";
import * as AIicons from "react-icons/ai";
import * as MDICONS from "react-icons/md";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
  TableSelection,
} from '@devexpress/dx-react-grid-bootstrap4';

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
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import Skeleton from 'react-loading-skeleton';
import Reminders from '../../contactComponents/RemindersComponents/Reminders';
import { starLoadingTrackingsRemindersC } from "actions/contacts/remindersContacts/remindersContact";
import { setRemindersC } from "actions/contacts/remindersContacts/remindersContact";
import Bio from "components/bioComponents/Bio";
import { starLoadingApplications } from "actions/contacts/bioContact/bioContact";
import Proposals from "components/proposals/Proposals";
import moment from 'moment';
import { starLoadingCollegesByProspeccion } from "actions/colleges/colleges";
import { setColleges } from "actions/colleges/colleges";
import NotificationAlert from "react-notification-alert";
import {
  SelectionState,
  GroupingState,
  IntegratedGrouping,
} from '@devexpress/dx-react-grid';
import Colleges from "pages/Colleges";
import Subjects from "./Subjects/Subjects";
var _ = require('lodash');


export default function TrackingsContact() {
  const { loading } = useSelector(state => state.ui);
  const notificationAlert = useRef();
  const { colleges } = useSelector(state => state.colleges);
  const [collegesFiltering, setCollegesFiltering] = useState([]);
  const [columns] = useState([
    { name: 'name', title: 'Nombre' },
    { name: 'country', title: 'Pais' },
  ]);
  const [exist,setExist] = useState(false);
  const dispatch = useDispatch();
  const [aux, setAux] = useState({ id: "", story: "", status: "Evaluacion", name_prospection: "", last_modification: "" });
  const [activeTracking, setactiveTracking] = useState({ id: "", story: "", status: "Evaluacion", name_prospection: "", last_modification: "" });
  const [load, setLoad] = useState(false);
  const [applications, Setapplications] = useState(null);
  const [selection, SetSelection] = useState([]);
  const [selectionTwo, SetSelectionTwo] = useState(0);
  const [auxSelection, SetAuxSelection] = useState([0]);
  const [auxSelectionTwo, SetAuxSelectionTwo] = useState([]);
  const [prospectionSelected, setProspectionSelected] = useState(0);
  let { active } = useSelector((state) => state.contacts);
  const [modalProspection, setModalProspection] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [modalStory, setModalStory] = useState(false);
  const [program, SetProgram] = useState();
  const [objAux, setObjAux] = useState({ program: "", year: "" });
  const [modal, setModal] = useState(false);
  const [id_prospection, set_ID_Prospection] = useState(0);
  const programs = [
    "Boarding School",
    "School District",
    "Summer Camp",
    "Language School",
    "University/College",
    "Work & Travel"
  ];
  const array = ['btn-info', 'btn-secondary', 'btn-success', 'btn-danger', 'btn-warning', 'btn-info', 'btn-light', 'btn-dark', 'btn-white'];
  const status = [
    "Activo",
    "Materias",
    "Fall Check Point",
    "Diciembre",
    "Enero",
    "Spring Check Point",
    "Fin de curso",
    "Revalidación",
    "Recomendacion",
    "Termino"
  ];
  /*
  Activo > Materias > Fall Check Point > Diciembre > Enero > Spring Check Point > Fin de curso > revalidación > recomendación > Termino
  */
  const [results, setResults] = useState();
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
    if (colleges && selection) {
      convertSel(selection);
    }
  }, [selection])
  useEffect(() => {
    dispatch(setRemindersC([]));
    dispatch(setColleges([]));
    consultAllTrackings(active.id);
    if (active) {
      localStorage.setItem('ActiveContact', JSON.stringify(active));
      if (activeTracking) {
        dispatch(starLoadingApplications(active.id, activeTracking.id));
      }
    }
  }, []);
  const convertSel = (seleccion) => {
    let col = []
    if (selection) {
      col = selection.map(se => {
        return collegesFiltering[se];
      })
    }
    SetAuxSelectionTwo(col);
  }
  const consultAllTrackings = async (id) => {
    changeLoad(true);
    await axios
      .get(constaApi + "getTracking/" + id, {
        headers: {
          Accept: "application/json",
        },
      })
      .then(function (response) {
        if (response.data[0]) {
          setExist(true);
          dispatch(setColleges([]));
          firstTime(response.data[0]);
          Setapplications(response.data);
          const result = _.groupBy(response.data, "name_prospection")
          Object.keys(result).map((oneKey, i) => {
            if (i === 0) {
              setProspectionSelected(oneKey);
              let id = response.data.filter(s => s.name_prospection == oneKey);
              set_ID_Prospection(id[0]);
              SetAuxSelection(result[oneKey]);
            }
          })
          setResults(result);
        } else {
          setExist(false);
          Setapplications(null);
          setResults([]);
          SetAuxSelection([])
          // dispatch( starLoadingTrackingsRemindersC(active.id,0,'Prospeccion'));

        }
        changeLoad(false);
      });
  };

  const firstTime = (data) => {
    setactiveTracking(data);
    SetSelectionTwo(data.id);
    dispatch(starLoadingTrackingsRemindersC(active.id, data.id, 'Tracking'));
    dispatch(starLoadingApplications(active.id, data.id));
    let newcadena = data.name_prospection.replace(/\d/g, "");
    dispatch(starLoadingCollegesByProspeccion(newcadena));
  }
  const changeButton = async (id) => {
    dispatch(setRemindersC([]));
    dispatch(setColleges([]));
    changeLoad(true);
    await axios.post(constaApi + "showTracking", { id: id })
      .then(function (response) {
        // let newcadena = response.data.name_prospection.replace(/\d/g,"");
        // dispatch(starLoadingCollegesByProspeccion(newcadena)); 
        SetSelectionTwo(id);
        setactiveTracking(response.data);
        set_ID_Prospection(response.data.id_prospection ?? 0);
        dispatch(starLoadingTrackingsRemindersC(active.id, response.data.id, 'Tracking'));
        dispatch(starLoadingApplications(active.id, response.data.id));
        console.log('response',response);
        let newcadena = response.data.name_prospection.replace(/\d/g, "");
        dispatch(starLoadingCollegesByProspeccion(newcadena));
        changeLoad(false);
      });
    // SetSelection(id);
    // let auxxx = applications.filter(prospect => prospect.id === id );
    //  setactiveTracking(auxxx);
    // changeLoad(false);

  };
  const changeLoad = (val) => {
    setLoad(val);
  }
  const changeModal = () => {
    setModalProspection(!modalProspection);
  };

  const changeModalStatus = () => {
    setAux({ ...activeTracking });
    setModalStatus(!modalStatus);
  }

  const changeModalStory = () => {
    setAux({ ...activeTracking });
    setModalStory(!modalStory);
  }
  const closeModal = async () => {
    setactiveTracking({ ...aux });
    setModalProspection(false);
    setModalStory(false);
    setModalStatus(false);
    setModal(false);
    SetAuxSelectionTwo([]);
  };
  const changeStatus = (e) => {
    setactiveTracking({ ...activeTracking, status: e.target.value });
  }
  const changeStory = (e) => {
    setactiveTracking({ ...activeTracking, story: e.target.value });
  }
  const saveChanges = () => {
    let resp = auxSelection.filter(aux => aux.id === selectionTwo);
    changeLoad(true);
    moment.locale("es-mx");
    let newObj = {
      id: activeTracking.id,
      name_prospection: activeTracking.name_prospection,
      status: activeTracking.status,
      story: activeTracking.story,
      last_modification: moment().format("YYYY-MM-DD HH:mm"),
      id_last_contact: active.id,
      last_contact: active.name,
    };
    axios.post(constaApi + "updatedTracking", newObj)
      .then(function (response) {
        consultAllTrackings(active.id);
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
    dispatch(starLoadingTrackingsRemindersC(active.id, activeTracking.id, 'Prospeccion'));
  }
  function deleteCollege(id) {
    changeLoad(true);
    axios.get(constaApi + "deleteTrackings/" + id)
      .then(function (response) {
        consultAllTrackings(active.id);
        changeLoad(false);
      });
  }
  const onSubmit = (data) => {
    moment.locale("es-mx");
    let val = auxSelectionTwo[0];
    let newObj = {
      name_prospection: prospectionSelected,
      status: 'Aplicación',
      story: null,
      name: val.name,
      id_application: val.id,
      last_modification: moment().format("YYYY-MM-DD HH:mm"),
      id_last_contact: active.id,
      last_contact: active.name,
      id_prospection: id_prospection.id_prospection
    };

    axios.post(constaApi + "saveTracking", newObj)
      .then(function (response) {
        changeButton(response.data.id);
        consultAllTrackings(active.id);
        closeModal();

      });
  };
  async function randomColor(i) {
    const array = ['btn-info', 'btn-secondary', 'btn-success', 'btn-danger', 'btn-warning', 'btn-info', 'btn-light', 'btn-dark', 'btn-white'];
    const number = Math.floor(Math.random() * 9);
    return await array[i];
  }
  function changeProspection(name, obj) {
    Object.keys(obj).map((oneKey, i) => {
      if (i === 0) {
        changeButton(obj[oneKey].id)
        // setProspectionSelected(oneKey);
        // SetAuxSelection(result[oneKey]);
      }
    })
    setProspectionSelected(name);
    let id = applications.filter(s => s.name_prospection == name);
    set_ID_Prospection(id[0]);
    SetAuxSelection(obj);
  }
  function openModalProp() {
    let auxColleges = [...colleges];
    let exist = [];
    auxColleges.forEach((element, index) => {
      auxSelection.forEach((el, i) => {
        if (element.name == el.name) {
          auxColleges[index] = null;
        }
      })
    });
    auxColleges.forEach(aux => {
      if (aux != null) {
        exist.push(aux);
      }
    })
    setCollegesFiltering([...exist]);

    setModal(true);
  }
  function showApplications(obj) {
    let tag = obj.map(o => {
      return (
        <button
          onClick={(e) => changeButton(o.id)}
          key={objAux.id}
          // active={{backgroundColor:'#FF0000'}}
          class={[
            selectionTwo === o.id
              ? "btn btn-sm btn-info"
              : "btn btn-sm btn-primary",
          ]}
        // style={{
        //   backgroundColor:[selection === pros.id ?  '#0062cc' : '#51cbce']
        // }}
        >
          {o.name}
        </button>
      )
    })

    return tag;
  }
  const checkButton = (obj) => {
    let params = "";
    if (obj.id == selectionTwo && obj.status != 'Cancelado' && obj.status != 'Llegada') {
      params = "btn btn-sm btn-yellow"
    } else if (obj.status == "Cancelado") {
      params = "btn btn-sm btn-disabled"
    } else if (obj.status == "Llegada") {
      params = "btn btn-sm btn-success"
    } else {
      params = "btn btn-sm btn-yellow"
    }

    return params;
  }
  return (
    <div class="content">
      <div class="mt-n5 d-flex justify-content-end">
        <span>
          {/* <AIicons.AiFillQuestionCircle color={'#34B5B8'} size={18} /> */}
        </span>
      </div>
      {results &&
        [Object.keys(results).map((oneKey, i) => {
          return (
            <>
              <button onClick={(e) => changeProspection(oneKey, results[oneKey])} eventKey={oneKey} title={oneKey}
                class={"ml-1 mt-n5 btn btn-sm btn-yellow"}
                style={{ marginBottom: '20px', border: [oneKey == prospectionSelected ? '0.1px inset purple' : '0px'], opacity: [oneKey == prospectionSelected ? '2' : '0.5'] }}
              >
                {oneKey}
              </button>
            </>
          )

        })
        ]}
      <div>
        {auxSelection &&
          [Object.keys(auxSelection).map((oneKey, i) => {
            return (
              <button
                onClick={(e) => changeButton(auxSelection[oneKey].id)}
                eventKey={oneKey} title={oneKey}
                class={[i > 0 ? "ml-1" : "ml-0"
                ]}
                style={{ opacity: [auxSelection[oneKey].id == selectionTwo ? '2' : '0.5'], border: [auxSelection[oneKey].id == selectionTwo ? '1px inset purple' : '0px'] }}
                class={checkButton(auxSelection[oneKey])}
              >
                {auxSelection[oneKey].name}
              </button>
            )
          })]}
        <button
          onClick={(e) => openModalProp()}
          type="button"
          class="ml-1 btn btn-secondary btn-sm"
        >
          +
          </button>
      </div>
      {exist &&
      <div class="mt-n5 d-flex justify-content-end">
        <button onClick={(e) => deleteCollege(selectionTwo)} class="mt-1 btn btn-danger btn-sm">Borrar Colegio</button>
      </div>
      }
      {load === true ?
        <Skeleton width="60rem" height={30} count={10} />
        :
        [exist ?
          <>
          <div class="mt-2 row">
            <div class="content col-4">
              <Form.Label className="formGray montseInter">Status</Form.Label>
              <Form.Control name="status"
                disabled
                autoComplete="off" className="formGray" type="text"
                value={activeTracking.status}
                />
              <button
                class=" mt-1 float-right Inter btn-info  btn-sm"
                onClick={(e) => changeModalStatus()}><FIIcons.FiEdit size={16} style={{ color: 'white' }} /> </button>
            </div>
            <div class="content col-4">
              <Form.Label className="formGray montseInter">Story</Form.Label>
              <Form.Control
                onChange={(e) => changeStory(e)}
                value={activeTracking.story}
                as="textarea"
                style={{ paddingLeft: '10px' }}
                placeholder="Escriba sus notas..."
                rows={10}
                disabled
                cols={20}
                />
              <button
                class="mt-1 float-right montseInter btn-info  btn-sm"
                onClick={(e) => changeModalStory()}><FIIcons.FiEdit size={16} style={{ color: 'white' }} /> </button>
            </div>
            <div>
              <Form.Label className="formGray montseInter">Ultimo contacto</Form.Label>
              <Form.Control name="last_modification"
                disabled
                autoComplete="off" className="formGray" type="text"
                placeholder="Ultima fecha"
                value={formatDate(activeTracking.last_modification)}
                />
            </div>
          </div>
          <div class="mt-5 row">
            <div class="mt-5 col-12">
            <h6>Materias</h6>
              <Subjects
                //   blocked={activeTracking.status == "Aplicar" ? true : activeTracking.status == "Cancelar" ? true : false}
                activeTracking={activeTracking} trackings={true} prospection={false} />
            </div>
          </div>
          <div class="mt-5 row">
            <h6>Recordatorios</h6>
            <div class="mt-5 col-12">
              <Reminders
                //   blocked={activeTracking.status == "Aplicar" ? true : activeTracking.status == "Cancelar" ? true : false}
                activeTracking={activeTracking} trackings={true} prospection={false} />
            </div>
          </div>
          <div class="mt-5 row">
            <h6>Bitácora</h6>
            <div class="ml-n4 mt-1 col-12">
              {activeTracking &&
                <Bio
                extern={true}
                trackings={true}
                activeTracking={activeTracking} />
              }
            </div>
          </div>
        </>
    :
    <center>
      <h5 >No hay ningun programa</h5>
    </center>
    ]}
      
      
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
                  variant="info"
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
                    value={activeTracking.status}
                    as="select"
                    size="sm"
                    custom
                  >
                    <option value="Aplicación" selected>
                      Aplicación
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
                  variant="info"
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
                    value={activeTracking.story}
                    as="textarea"
                    style={{ paddingLeft: '10px' }}
                    placeholder="Escriba sus notas..."
                    rows={10}
                    cols={20}
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


      {/* Modal prospeccion */}
      <Modal
        show={modal}
        dialogClassName="modalMax"
        onHide={closeModal}
        dialogClassName="modal-60w"
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
            Agregar Colegio
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#F4F5F6", border: "0px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {auxSelectionTwo.length > 0 &&
              auxSelectionTwo.map(sel => {
                return (
                  <button disabled className="btn btn-success btn-sm">{sel.name ?? " "}</button>
                );
              })}
            <>
              {loading ?
                <div class="row mt-2">
                  <NotificationAlert ref={notificationAlert} />
                  <Skeleton style={{ backgroundColor: '#888C8D' }} width="10rem" height={10} count={10} />
                </div>
                :
                <div>
                  <Grid
                    style={{ marginTop: '30px' }}
                    rows={collegesFiltering}
                    columns={columns}
                  >
                    <GroupingState
                      grouping={[{ columnName: 'country' }]}
                    />
                    <SelectionState
                      selection={selection}
                      onSelectionChange={SetSelection}
                    />
                    <IntegratedGrouping />
                    <Table />
                    <TableHeaderRow />
                    <TableSelection />
                    <TableGroupRow />
                  </Grid>
                  {/* <Col className="col-7">
                  <Form.Label className="formGray">Colegios</Form.Label>
                  <Form.Control
                  onChange ={(e) => changeProposal(e)}
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
                     {colleges.map((col) => (
                      <option key={col.id} value={col.id}>
                        {col.name}
                      </option>
                    ))}
                  </Form.Control>
                </Col> */}
                </div>
              }
            </>
            <Row>
              <Col>
                <Button
                  className="float-right mb-3 mr-2"
                  type="submit"
                  onSubmit={handleSubmit(onSubmit)}
                  variant="info"
                >
                  Agregar
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
      {/* End modal Proposal */}
    </div>
  );
}







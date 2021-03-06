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
import { starLoadingApplicationRemindersC } from "actions/contacts/remindersContacts/remindersContact";
import { setRemindersC } from "actions/contacts/remindersContacts/remindersContact";
import Bio from "components/bioComponents/Bio";
import { starLoadingApplications } from "actions/contacts/bioContact/bioContact";
import Proposals from "components/proposals/Proposals";
import moment from 'moment';
import { starLoadingCollegesByProspeccion } from "actions/colleges/colleges";
import { setColleges } from "actions/colleges/colleges";
import PieHooks from "./PieHooks";
import * as d3 from "d3";
import NotificationAlert from "react-notification-alert";
import {
  SelectionState,
  GroupingState,
  IntegratedGrouping,
} from '@devexpress/dx-react-grid';
import Colleges from "pages/Colleges";
var _ = require('lodash');


export default function Aplications() {
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
  const [activeApplication, setactiveApplication] = useState({ id: "", story: "", status: "Evaluacion", name_prospection: "", last_modification: "" });
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

  const [data, setData] = useState([{ date: 9 + '/' + 9, value: 0 },
  { date: 0 + '/' + 9, value: 100 },
  ]
  );
  const changeData = () => {
    // setData(generateData());
  };


  const [valuesOfchecklist, setValueOfChecklist] = useState([
    { name: "Formas de aplicacion", isChecked: false, value: 1, identifier: "FA", position: 1, realPosition: 0 },
    { name: "", isChecked: false, value: -1, identifier: "NFA", position: 0, realPosition: 1 },
    { name: "Calificaciones", isChecked: false, value: 1, identifier: "CAL", position: 3, realPosition: 2 },
    { name: "", isChecked: false, value: -1, identifier: "NCAL", position: 2, realPosition: 3 },
    { name: "Referencias Acade", isChecked: false, value: 1, identifier: "RA", position: 5, realPosition: 4 },
    { name: "", isChecked: false, value: -1, identifier: "NRA", position: 4, realPosition: 5 },
    { name: "Pasaporte", isChecked: false, value: 1, identifier: "PAS", position: 7, realPosition: 6 },
    { name: "", isChecked: false, value: -1, identifier: "NPAS", position: 6, realPosition: 7 },
    { name: "Pasaporte papas", isChecked: false, value: 1, identifier: "PASP", position: 9, realPosition: 8 },
    { name: "", isChecked: false, value: -1, identifier: "NPASP", position: 8, realPosition: 9 },
    { name: "Acta de nacimiento", isChecked: false, value: 1, identifier: "ACN", position: 11, realPosition: 10 },
    { name: "", isChecked: false, value: -1, identifier: "NACN", position: 10, realPosition: 11 },
    { name: "Fotografia", isChecked: false, value: 1, identifier: "FOT", position: 13, realPosition: 12 },
    { name: "", isChecked: false, value: -1, identifier: "NFOT", position: 12, realPosition: 13 },
    { name: "Entrevista", isChecked: false, value: 1, identifier: "ENT", position: 15, realPosition: 14 },
    { name: "", isChecked: false, value: -1, identifier: "NENT", position: 14, realPosition: 15 },
    { name: "Pago de aplicacion", isChecked: false, value: 1, identifier: "PAG", position: 17, realPosition: 16 },
    { name: "", isChecked: false, value: -1, identifier: "NPAG", position: 16, realPosition: 17 },
  ]);
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
    "Admisión",
    "Trámites",
    "Espera",
    "Activo",
    "Cancelado",
  ];
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
    consultAllApplications(active.id);
    if (active) {
      localStorage.setItem('ActiveContact', JSON.stringify(active));
      if (activeApplication) {
        dispatch(starLoadingApplications(active.id, activeApplication.id));
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
  const consultAllApplications = async (id) => {
    changeLoad(true);
    await axios
      .get(constaApi + "getApplication/" + id, {
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
          // dispatch( starLoadingApplicationRemindersC(active.id,0,'Prospeccion'));

        }
        changeLoad(false);
      });
  };

  const firstTime = (data) => {
    setactiveApplication(data);
    SetSelectionTwo(data.id);
    dispatch(starLoadingApplicationRemindersC(active.id, data.id, 'Prospeccion'));
    dispatch(starLoadingApplications(active.id, data.id));
    let newcadena = data.name_prospection.replace(/\d/g, "");
    dispatch(starLoadingCollegesByProspeccion(newcadena));
    if (data.checklist) {
      fillCheckList(data.checklist);
    }
  }
  const resetCheckList = () => {
    let result = valuesOfchecklist.map(val => {
      return { ...val, isChecked: false }
    });
    // let resultTwo = twoPartValuesofChecklist.map(val => {
    //   return {...val,isChecked:false}
    // })
    setValueOfChecklist([...result]);
    // setTwoPartValuesofCheckList([...resultTwo]);
    setData([{ date: 9 + '/' + 9, value: 0 },
    { date: 0 + '/' + 9, value: 100 },
    ]);
  }
  const changeButton = async (id) => {
    dispatch(setRemindersC([]));
    dispatch(setColleges([]));
    changeLoad(true);
    await axios.post(constaApi + "showApplication", { id: id })
      .then(function (response) {
        // let newcadena = response.data.name_prospection.replace(/\d/g,"");
        // dispatch(starLoadingCollegesByProspeccion(newcadena)); 
        SetSelectionTwo(id);
        setactiveApplication(response.data);
        set_ID_Prospection(response.data.id_prospection ?? 0);
        if (response.data.checklist) {
          fillCheckList(response.data.checklist);
        } else {
          resetCheckList();
        }
        dispatch(starLoadingApplicationRemindersC(active.id, response.data.id, 'Prospeccion'));
        dispatch(starLoadingApplications(active.id, response.data.id));
        let newcadena = response.data.name_prospection.replace(/\d/g, "");
        dispatch(starLoadingCollegesByProspeccion(newcadena));
        changeLoad(false);
      });
    // SetSelection(id);
    // let auxxx = applications.filter(prospect => prospect.id === id );
    //  setactiveApplication(auxxx);
    // changeLoad(false);

  };
  const changeLoad = (val) => {
    setLoad(val);
  }
  const changeModal = () => {
    setModalProspection(!modalProspection);
  };

  const changeModalStatus = () => {
    setAux({ ...activeApplication });
    setModalStatus(!modalStatus);
  }

  const changeModalStory = () => {
    setAux({ ...activeApplication });
    setModalStory(!modalStory);
  }
  const closeModal = async () => {
    setactiveApplication({ ...aux });
    setModalProspection(false);
    setModalStory(false);
    setModalStatus(false);
    setModal(false);
    SetAuxSelectionTwo([]);
  };
  const changeStatus = (e) => {
    setactiveApplication({ ...activeApplication, status: e.target.value });
  }
  const changeStory = (e) => {
    setactiveApplication({ ...activeApplication, story: e.target.value });
  }
  const deleteProspection = () => {
    changeLoad(true);
    axios.get(constaApi + "deleteProspection/" + activeApplication.id)
      .then(function (response) {
        consultAllApplications(active.id);
        changeLoad(false);
      });
  }

  const saveChanges = () => {
    let resp = auxSelection.filter(aux => aux.id === selectionTwo);
    changeLoad(true);
    moment.locale("es-mx");
    let newObj = {
      id: activeApplication.id,
      name_prospection: activeApplication.name_prospection,
      status: activeApplication.status,
      story: activeApplication.story,
      last_modification: moment().format("YYYY-MM-DD HH:mm"),
      id_last_contact: active.id,
      last_contact: active.name,
      id_prospection: activeApplication ? activeApplication.id_prospection : 0,
      name : activeApplication ? activeApplication.name : " ",
      id_application : activeApplication ? activeApplication.id_application : 0,

    };
    axios.post(constaApi + "updateApplication", newObj)
      .then(function (response) {
        consultAllApplications(active.id);
        closeModal();
        changeLoad(false);
      });
  }

  // {name:"Formas de aplicacion",isChecked:false,value:1,identifier:"FA"},
  //   {name:"",isChecked:false,value:-1,identifier:"NFA"},
  //   {name:"Calificaciones",isChecked:false,value:1,identifier:"CAL"},
  //   {name:"",isChecked:false,value:-1,identifier:"NCAL"},
  //   {name:"Referencias Acade.",isChecked:false,value:1,identifier:"RA"},
  //   {name:"",isChecked:false,value:-1,identifier:"NRA"},
  //   {name:"Pasaporte",isChecked:false,value:1,identifier:"PAS"},
  //   {name:"",isChecked:false,value:-1,identifier:"NPAS"},
  //   {name:"Pasaporte papas",isChecked:false,value:1,identifier:"PASP"},
  //   {name:"",isChecked:false,value:-1,identifier:"NPASP"},
  //   {name:"Acta de nacimiento",isChecked:false,value:1,identifier:"ACN"},
  //   {name:"",isChecked:false,value:-1,identifier:"NACN"},
  //   {name:"Fotografia",isChecked:false,value:1,identifier:"FOT"},
  //   {name:"",isChecked:false,value:-1,identifier:"NFOT"},
  //   {name:"Entrevista",isChecked:false,value:1,identifier:"ENT"},
  //   {name:"",isChecked:false,value:-1,identifier:"NENT"},
  //   {name:"Pago de aplicacion",isChecked:false,value:1,identifier:"PAG"},
  //   {name:"",isChecked:false,value:-1,identifier:"NPAG"},


   function changeChecked(e) {
    let resultOne =  valuesOfchecklist.map((val, index) => {
      if (val.identifier === e.target.name) {
        return { ...val, isChecked: !val.isChecked}
      } else {
        return val;
      }
    })
    let totales = 0;
    let seleccionados = 0;
    let deshabilitados = 0;
    resultOne.map(r => {
     if(r.value === -1 && r.isChecked == true){
        deshabilitados++;
      } else if(r.value == 1){
        totales++;
        if(r.isChecked == true){
          seleccionados++;
        }
      }
    })
     setData(
       [
         { date: parseInt((seleccionados * 100) / (totales-deshabilitados)) +  '%', value: ((seleccionados * 100) / (totales-deshabilitados)) },
         { date: (100 - parseInt(((seleccionados * 100) / (totales-deshabilitados)))) + '%', value: (100 - ((seleccionados * 100) / (totales-deshabilitados))) }
       ]
     )
    let specificSearch = resultOne.filter(res => res.identifier === e.target.name);
    if (specificSearch[0].isChecked) {
      let position = specificSearch[0].position;
      let realPosition = specificSearch[0].realPosition;
      resultOne[position] = {
        ...resultOne[realPosition],
        name: resultOne[position].name,
        identifier: resultOne[position].identifier,
        value: resultOne[position].value,
        isChecked: false,
        position: resultOne[realPosition].realPosition,
        realPosition: resultOne[realPosition].position
      }
    }
    setValueOfChecklist([...resultOne]);


    resultOne[resultOne.length] = { identifier: "id_application", isChecked: activeApplication.id };
    let newArray = resultOne;
    axios.post(constaApi + "saveOrUpdateChecklist", newArray)
      .then(function (response) {

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
    dispatch(starLoadingApplicationRemindersC(active.id, activeApplication.id, 'Prospeccion'));
  }
  function deleteCollege(id) {
    changeLoad(true);
    axios.get(constaApi + "deleteApplications/" + id)
      .then(function (response) {
        consultAllApplications(active.id);
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

    axios.post(constaApi + "saveApplication", newObj)
      .then(function (response) {
        changeButton(response.data.id);
        consultAllApplications(active.id);
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
  function fillCheckList(data) {
    let array = [];
    let vale = null;
    Object.keys(data).map((oneKey, i) => {
      valuesOfchecklist.map((val, index) => {
        if (oneKey === val.identifier) {
          let res = { ...val, isChecked: (data[oneKey] == "1" ? true : false) };
          array.push(res);
        }
      })
    })
    setValueOfChecklist(array);
    let totales = 0;
    let seleccionados = 0;
    let deshabilitados = 0;
    valuesOfchecklist.map(r => {
     if(r.value === -1 && r.isChecked == true){
        deshabilitados++;
      } else if(r.value == 1){
        totales++;
        if(r.isChecked == true){
          seleccionados++;
        }
      }
    })
     setData(
       [
         { date: parseInt((seleccionados * 100) / (totales-deshabilitados)) +  '%', value: ((seleccionados * 100) / (totales-deshabilitados)) },
         { date: (100 - parseInt(((seleccionados * 100) / (totales-deshabilitados)))) + '%', value: (100 - ((seleccionados * 100) / (totales-deshabilitados))) }
       ]
     )
  }
  const checkButton = (obj) => {
    let params = "";
    if (obj.id == selectionTwo && obj.status != 'Cancelado' && obj.status != 'Activo') {
      params = "btn btn-sm btn-yellow"
    } else if (obj.status == "Cancelado") {
      params = "btn btn-sm btn-disabled"
    } else if (obj.status == "Activo") {
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
                style={{ marginBottom: '20px',
                // //  border: [oneKey == prospectionSelected ? '0.1px inset purple' : '0px'],
                  opacity: [oneKey == prospectionSelected ? '2' : '0.5'] }}
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
                style={{ opacity: [auxSelection[oneKey].id == selectionTwo ? '2' : '0.5'],
                //  border: [auxSelection[oneKey].id == selectionTwo ? '1px inset purple' : '0px']
                 }}
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
                value={activeApplication.status}
                />
              <button
                class=" mt-1 float-right Inter btn-info  btn-sm"
                onClick={(e) => changeModalStatus()}><FIIcons.FiEdit size={16} style={{ color: 'white' }} /> </button>
            </div>
            <div class="content col-4">
              <Form.Label className="formGray montseInter">Story</Form.Label>
              <Form.Control
                onChange={(e) => changeStory(e)}
                value={activeApplication.story}
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
                value={formatDate(activeApplication.last_modification)}
                />
            </div>
          </div>
          <div class="mt-5 row"
            style={{ padding: '5px', border: '1px solid #BABFC7' }}>
            <div class="col-6">
              <div class="container">
                <div class="row">
                  <div class="col-8">
                    <div class="row">
                      <div class="col-6">
                      </div>
                      <div class="col">
                        ✓
        </div>
                      <div class="col">
                        N/A
        </div>
                    </div>
                    {/* END 0 */}
                    <div class="row">
                      <div class="col-6">
                        <span class="custom-radio-checkbox__text montseInter">{valuesOfchecklist[0].name}</span>
                      </div>
                      <div class="col">
                        <label class="custom-radio-checkbox">
                          <input class="custom-radio-checkbox__input"
                            name={valuesOfchecklist[0].identifier}
                            value={valuesOfchecklist[0].isChecked}
                            checked={valuesOfchecklist[0].isChecked} type="checkbox"
                            onChange={(e) => changeChecked(e)}
                            />
                          <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                        </label>
                      </div>
                      <div class="col">
                        <label class="custom-radio-checkbox">
                          <input class="custom-radio-checkbox__input"
                            name={valuesOfchecklist[1].identifier}
                            value={valuesOfchecklist[1].isChecked}
                            checked={valuesOfchecklist[1].isChecked} type="checkbox"
                            onChange={(e) => changeChecked(e)}
                            />
                          <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                        </label>
                      </div>
                    </div>
                    {/* End 1 */}
                    <div class="row">
                      <div class="col-6">
                        <span class="custom-radio-checkbox__text">{valuesOfchecklist[2].name}</span>
                      </div>
                      <div class="col">
                        <label class="custom-radio-checkbox">
                          <input class="custom-radio-checkbox__input"
                            name={valuesOfchecklist[2].identifier}
                            value={valuesOfchecklist[2].isChecked}
                            checked={valuesOfchecklist[2].isChecked} type="checkbox"
                            onChange={(e) => changeChecked(e)}
                            />
                          <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                        </label>
                      </div>
                      <div class="col">
                        <label class="custom-radio-checkbox">
                          <input class="custom-radio-checkbox__input"
                            name={valuesOfchecklist[3].identifier}
                            value={valuesOfchecklist[3].isChecked}
                            checked={valuesOfchecklist[3].isChecked} type="checkbox"
                            onChange={(e) => changeChecked(e)}
                            />
                          <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                        </label>
                      </div>
                    </div>

                    {/* END 2 */}
                    <div class="row">
                      <div class="col-6">
                        <span class="custom-radio-checkbox__text">{valuesOfchecklist[4].name}</span>
                      </div>
                      <div class="col">
                        <label class="custom-radio-checkbox">
                          <input class="custom-radio-checkbox__input"
                            name={valuesOfchecklist[4].identifier}
                            value={valuesOfchecklist[4].isChecked}
                            checked={valuesOfchecklist[4].isChecked} type="checkbox"
                            onChange={(e) => changeChecked(e)}
                            />
                          <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                        </label>
                      </div>
                      <div class="col">
                        <label class="custom-radio-checkbox">
                          <input class="custom-radio-checkbox__input"
                            name={valuesOfchecklist[5].identifier}
                            value={valuesOfchecklist[5].isChecked}
                            checked={valuesOfchecklist[5].isChecked} type="checkbox"
                            onChange={(e) => changeChecked(e)}
                            />
                          <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                        </label>
                      </div>
                    </div>

                    {/* END 3 */}
                    <div class="row">
                      <div class="col-6">
                        <span class="custom-radio-checkbox__text">{valuesOfchecklist[6].name}</span>
                      </div>
                      <div class="col">
                        <label class="custom-radio-checkbox">
                          <input class="custom-radio-checkbox__input"
                            name={valuesOfchecklist[6].identifier}
                            value={valuesOfchecklist[6].isChecked}
                            checked={valuesOfchecklist[6].isChecked} type="checkbox"
                            onChange={(e) => changeChecked(e)}
                            />
                          <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                        </label>
                      </div>
                      <div class="col">
                        <label class="custom-radio-checkbox">
                          <input class="custom-radio-checkbox__input"
                            name={valuesOfchecklist[7].identifier}
                            value={valuesOfchecklist[7].isChecked}
                            checked={valuesOfchecklist[7].isChecked} type="checkbox"
                            onChange={(e) => changeChecked(e)}
                            />
                          <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                        </label>
                      </div>
                    </div>


                    {/* END 4 */}
                    <div class="row">
                      <div class="col-6">
                        <span class="custom-radio-checkbox__text">{valuesOfchecklist[8].name}</span>
                      </div>
                      <div class="col">
                        <label class="custom-radio-checkbox">
                          <input class="custom-radio-checkbox__input"
                            name={valuesOfchecklist[8].identifier}
                            value={valuesOfchecklist[8].isChecked}
                            checked={valuesOfchecklist[8].isChecked} type="checkbox"
                            onChange={(e) => changeChecked(e)}
                            />
                          <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                        </label>
                      </div>
                      <div class="col">
                        <label class="custom-radio-checkbox">
                          <input class="custom-radio-checkbox__input"
                            name={valuesOfchecklist[9].identifier}
                            value={valuesOfchecklist[9].isChecked}
                            checked={valuesOfchecklist[9].isChecked} type="checkbox"
                            onChange={(e) => changeChecked(e)}
                            />
                          <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                        </label>
                      </div>
                    </div>


                    {/* END 3 */}
                    <div class="row">
                      <div class="col-6">
                        <span class="custom-radio-checkbox__text">{valuesOfchecklist[10].name}</span>
                      </div>
                      <div class="col">
                        <label class="custom-radio-checkbox">
                          <input class="custom-radio-checkbox__input"
                            name={valuesOfchecklist[10].identifier}
                            value={valuesOfchecklist[10].isChecked}
                            checked={valuesOfchecklist[10].isChecked} type="checkbox"
                            onChange={(e) => changeChecked(e)}
                            />
                          <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                        </label>
                      </div>
                      <div class="col">
                        <label class="custom-radio-checkbox">
                          <input class="custom-radio-checkbox__input"
                            name={valuesOfchecklist[11].identifier}
                            value={valuesOfchecklist[11].isChecked}
                            checked={valuesOfchecklist[11].isChecked} type="checkbox"
                            onChange={(e) => changeChecked(e)}
                            />
                          <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                        </label>
                      </div>
                    </div>


                    {/* END 3 */}
                    <div class="row">
                      <div class="col-6">
                        <span class="custom-radio-checkbox__text">{valuesOfchecklist[12].name}</span>
                      </div>
                      <div class="col">
                        <label class="custom-radio-checkbox">
                          <input class="custom-radio-checkbox__input"
                            name={valuesOfchecklist[12].identifier}
                            value={valuesOfchecklist[12].isChecked}
                            checked={valuesOfchecklist[12].isChecked} type="checkbox"
                            onChange={(e) => changeChecked(e)}
                            />
                          <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                        </label>
                      </div>
                      <div class="col">
                        <label class="custom-radio-checkbox">
                          <input class="custom-radio-checkbox__input"
                            name={valuesOfchecklist[13].identifier}
                            value={valuesOfchecklist[13].isChecked}
                            checked={valuesOfchecklist[13].isChecked} type="checkbox"
                            onChange={(e) => changeChecked(e)}
                            />
                          <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                        </label>
                      </div>
                    </div>


                    {/* END 3 */}
                    <div class="row">
                      <div class="col-6">
                        <span class="custom-radio-checkbox__text">{valuesOfchecklist[14].name}</span>
                      </div>
                      <div class="col">
                        <label class="custom-radio-checkbox">
                          <input class="custom-radio-checkbox__input"
                            name={valuesOfchecklist[14].identifier}
                            value={valuesOfchecklist[14].isChecked}
                            checked={valuesOfchecklist[14].isChecked} type="checkbox"
                            onChange={(e) => changeChecked(e)}
                            />
                          <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                        </label>
                      </div>
                      <div class="col">
                        <label class="custom-radio-checkbox">
                          <input class="custom-radio-checkbox__input"
                            name={valuesOfchecklist[15].identifier}
                            value={valuesOfchecklist[15].isChecked}
                            checked={valuesOfchecklist[15].isChecked} type="checkbox"
                            onChange={(e) => changeChecked(e)}
                            />
                          <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                        </label>
                      </div>
                    </div>



                    {/* END 3 */}
                    <div class="row">
                      <div class="col-6">
                        <span class="custom-radio-checkbox__text">{valuesOfchecklist[16].name}</span>
                      </div>
                      <div class="col">
                        <label class="custom-radio-checkbox">
                          <input class="custom-radio-checkbox__input"
                            name={valuesOfchecklist[16].identifier}
                            value={valuesOfchecklist[16].isChecked}
                            checked={valuesOfchecklist[16].isChecked} type="checkbox"
                            onChange={(e) => changeChecked(e)}
                            />
                          <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                        </label>
                      </div>
                      <div class="col">
                        <label class="custom-radio-checkbox">
                          <input class="custom-radio-checkbox__input"
                            name={valuesOfchecklist[17].identifier}
                            value={valuesOfchecklist[17].isChecked}
                            checked={valuesOfchecklist[17].isChecked} type="checkbox"
                            onChange={(e) => changeChecked(e)}
                            />
                          <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
                        </label>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
            <div class="mt-4 col-6">
              <PieHooks
                data={data}
                width={200}
                height={200}
                innerRadius={60}
                outerRadius={100}
                />
            </div>
          </div>
          <div class="mt-5 row">
            <h6>Recordatorios</h6>
            <div class="mt-5 col-12">
              <Reminders
              route={'Aplicaciones'}
                 blocked={activeApplication.status == "Activo" ? true : activeApplication.status == "Cancelar" ? true : false}
                activeApplication={activeApplication} applications={true} prospection={false} />
            </div>
          </div>
          <div class="mt-5 row">
            <h6>Bitácora</h6>
            <div class="ml-n4  col-12">
              {activeApplication &&
                <Bio
                route={'General'}
                extern={true}
                blocked={activeApplication.status == "Activo" ? true : activeApplication.status == "Cancelar" ? true : false}
                applications={true}
                activeApplication={activeApplication} />
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
                    value={activeApplication.status}
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
                    value={activeApplication.story}
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
                  className="float-right mb-3 mr-2 montse btnBee"
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









      // // {/* ? "mt-n5 mr-1 btn btn-sm btn-info"
      // //             : "mt-n5 mr-1 btn btn-sm btn-primary", */}
      // // {/* console.log('PROSP',prospectionSelected);
      // //           console.log('Auxselection',auxSelection); */}
      // // {/* {applications && [
      // //     applications.map((pros) => {
      // //       return (
      // //         <button
      // //           onClick={(e) => changeButton(pros.id)}
      // //           key={pros.id}
      // //           // active={{backgroundColor:'#FF0000'}}
      // //           class={[
      // //             selection === pros.id
      // //               ? "mt-n5 mr-1 btn btn-sm btn-info"
      // //               : "mt-n5 mr-1 btn btn-sm btn-primary",
      // //           ]}
      // //           // style={{
      // //           //   backgroundColor:[selection === pros.id ?  '#0062cc' : '#51cbce']
      // //           // }}
      // //         >
      // //           {pros.name}
      // //         </button>
      // //       );
      // //     }),
      // //   ]} */}
      // // {/* <button
      // //     onClick={(e) => changeModal()}
      // //     type="button"
      // //     class="mt-n5  Inter ml-1 btn btn-success btn-sm"
      // //   >
      // //     +
      // //   </button> */}
      // // {/* <button
      // //     onClick={(e) => saveChanges()}
      // //     type="button"
      // //     class="mt-n5 float-right Inter btn btn-success btn-sm"
      // //   >
      // //     Guardar cambios
      // //   </button> */}
      // // {/* {applications &&
      // //   <button
      // //     onClick={(e) => deleteProspection()}
      // //     type="button"
      // //     class="mt-n5 float-right Inter btn btn-danger btn-sm"
      // //   >
      // //     Eliminar Prospeccion
      // //   </button>
      // //   } */}
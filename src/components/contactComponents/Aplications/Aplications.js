import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { constaApi } from "constants/constants";
import * as FIIcons from "react-icons/fi";
import * as AIicons from "react-icons/ai";


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
var _ = require('lodash');


export default function Aplications() {
    const dispatch = useDispatch();
    const [aux,setAux] = useState({id:"",story:"",status:"Evaluacion",name_prospection:"",last_modification:""});
    const [activeApplication,setactiveApplication] = useState({id:"",story:"",status:"Evaluacion",name_prospection:"",last_modification:""});
    const [load,setLoad] = useState(false);
    const [applications, Setapplications] = useState(null);
    const [selection, SetSelection] = useState(0);
    const [auxSelection, SetAuxSelection] = useState(0);
    const [prospectionSelected, setProspectionSelected] = useState(0);
    let { active } = useSelector((state) => state.contacts);
    const [modalProspection, setModalProspection] = useState(false);
    const [modalStatus, setModalStatus] = useState(false);
    const [modalStory, setModalStory] = useState(false);
    const [program, SetProgram] = useState();
    const [objAux, setObjAux] = useState({ program: "", year: "" });
    // const generateData = (value, length = 2) =>
    //     d3.range(length).map((item, index) => ({
    //       date: index,
    //       value: value === null || value === undefined ? Math.random() * 10 : value
    //     }));

      const [data, setData] = useState([{date:18+'/'+18,value:0},
          {date:0+'/'+0,value:100},
        ]
      );
      const changeData = () => {
        // setData(generateData());
      };

  
    const [valuesOfchecklist,setValueOfChecklist] = useState([
      {name:"Formas de aplicacion",isChecked:false,value:1},
      {name:"N/A Formas de Apl.",isChecked:false,value:-1},
      {name:"Calificaciones",isChecked:false,value:1},
      {name:"N/A Calif.",isChecked:false,value:-1},
      {name:"Referencias Acade.",isChecked:false,value:1},
      {name:"N/A Ref. Acade.",isChecked:false,value:-1},
      {name:"Pasaporte",isChecked:false,value:1},
      {name:"N/A Pasaporte",isChecked:false,value:-1},
      {name:"Pasaporte papas",isChecked:false,value:1},
      {name:"N/A Pasaporte papas",isChecked:false,value:-1},
    ]);
    const [twoPartValuesofChecklist,setTwoPartValuesofCheckList] = useState([
    
      {name:"Acta de nacimiento",isChecked:false,value:1},
      {name:"N/A Acta",isChecked:false,value:-1},
      {name:"Fotografia",isChecked:false,value:1},
      {name:"N/A Fotog.",isChecked:false,value:-1},
      {name:"Entrevista",isChecked:false,value:1},
      {name:"N/A Entrev.",isChecked:false,value:-1},
      {name:"Pago de aplicacion",isChecked:false,value:1},
      {name:"N/A Pago.",isChecked:false,value:-1},
    ]);
    // console.log('valuesOfchecklist',valuesOfchecklist);
    const programs = [
      "Boarding School",
      "School District",
      "Summer Camp",
      "Language School",
      "University/College",
      "Work & Travel"
    ];
    const array = ['btn-primary','btn-secondary','btn-success','btn-danger','btn-warning','btn-info','btn-light','btn-dark','btn-white'];
    const status = [
      "Contacto Previo",
      "Contacto Formal",
      "Presentacion",
      "Aclaración de dudas",
      "Decision",
      "Aplicado",
      "Cancelar",
    ];
    const [results,setResults] = useState();
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
    if(!active){
      active = JSON.parse(localStorage.getItem('ActiveContact'));
    }
  
    useEffect(() => { 
        consultAllApplications(active.id);
        // console.log('APLICATIONS',applications);
     
      if(active){
        localStorage.setItem('ActiveContact', JSON.stringify(active));
        if(activeApplication){
          dispatch( starLoadingApplications(active.id,activeApplication.id));
        }
      }
    }, []);
    
    const consultAllApplications = async (id) => {
      changeLoad(true);
      await axios
        .get(constaApi + "getApplication/" + id, {
          headers: {
            Accept: "application/json",
          },
        })
        .then(function (response) {
            if(response.data[0]){
              dispatch ( setColleges([]) );   
                firstTime(response.data[0]);
                Setapplications(response.data);
                const result = _.groupBy(response.data,"name_prospection")
                Object.keys(result).map((oneKey,i) => {
                  if(i === 0){
                    setProspectionSelected(oneKey);
                    console.log('EPA',result[oneKey]);
                    SetAuxSelection(result[oneKey]);
                  }
                })
                setResults(result);
                console.log('PROSP',prospectionSelected);
                console.log('Auxselection',auxSelection);
            } else {
              Setapplications(null);
              // dispatch( starLoadingApplicationRemindersC(active.id,0,'Prospeccion'));
  
            }
            changeLoad(false);
        });
    };
    
    const firstTime = (data) => {
      setactiveApplication(data);
      SetSelection(data.id);
      dispatch( starLoadingApplicationRemindersC(active.id,data.id,'Prospeccion'));
      dispatch( starLoadingApplications(active.id,data.id));
    }
    const resetCheckList = () => {
     let result =  valuesOfchecklist.map(val => {
        return {...val,isChecked:false}
      });
      let resultTwo = twoPartValuesofChecklist.map(val => {
        return {...val,isChecked:false}
      })
      setValueOfChecklist([...result]);
      setTwoPartValuesofCheckList([...resultTwo]);
      setData([{date:18+'/'+18,value:0},
      {date:0+'/'+0,value:100},
    ]);
    }
    const changeButton = async(id) => {
      dispatch (setRemindersC([]));
      dispatch ( setColleges([]) );   
        changeLoad(true);
      await axios.post(constaApi + "showApplication",{id:id})
      .then(function (response) {
      // let newcadena = response.data.name_prospection.replace(/\d/g,"");
      // dispatch(starLoadingCollegesByProspeccion(newcadena)); 
          SetSelection(id);
          setactiveApplication(response.data);
          resetCheckList();
          dispatch( starLoadingApplicationRemindersC(active.id,response.data.id,'Prospeccion'));
          dispatch( starLoadingApplications(active.id,response.data.id));
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
      setAux({...activeApplication});
      setModalStatus(!modalStatus);
    }
    
    const changeModalStory = () => {
      setAux({...activeApplication});
      setModalStory(!modalStory);
    }
    const closeModal = async () => {
      setactiveApplication({...aux});
      setModalProspection(false);
      setModalStory(false);
      setModalStatus(false);
  
  
    };
    const changeStatus = (e) => {
      setactiveApplication({...activeApplication,status:e.target.value});
    }
    const changeStory = (e) => {
      setactiveApplication({...activeApplication,story:e.target.value});
  
    }
    const deleteProspection = () => {
      changeLoad(true);
       axios.get(constaApi + "deleteProspection/"+activeApplication.id)
      .then(function (response) {
        consultAllApplications(active.id);
        changeLoad(false);
      });
    }
  
    const saveChanges = () => {
      changeLoad(true);
      moment.locale("es-mx");
      let newObj ={
          id:activeApplication.id,
          name_prospection: activeApplication.name_prospection,
          status: activeApplication.status,
          story: activeApplication.story,
          last_modification : moment().format("YYYY-MM-DD HH:mm")          ,
          id_last_contact : active.id,
          last_contact : active.name,
      };
       axios.post(constaApi + "updatedProspection",newObj)
      .then(function (response) {
        consultAllApplications(active.id);
        closeModal();
        changeLoad(false);
      });
    }
    function changeChecked(e){
      let resultOne = valuesOfchecklist.map(val => {
        if(val.name === e.target.name){
          return {...val,isChecked:!val.isChecked}
        } else {
          return val;
        }
      })
     setValueOfChecklist([...resultOne]);
      let resultTwo = twoPartValuesofChecklist.map(val => {
      if(val.name === e.target.name){
        return {...val,isChecked:!val.isChecked}
      } else {
        return val;
      }
    })
   setTwoPartValuesofCheckList([...resultTwo]);
   let sumPos = 0;
   let sumNeg = 0;
   let sumNo = 0;
     resultOne.map(r => {
     if(r.value === 1 && r.isChecked === true){
      sumPos = sumPos + 1;
     } else if(r.value === -1 && r.isChecked === true) {
      sumNeg = sumNeg + 1;
     } else if(r.value === 1 && r.isChecked === false){
       sumNo = sumNo + 1 ;
     }
   })
   resultTwo.map(re => {
     if(re.value ===1 && re.isChecked === true){
      sumPos = sumPos +1 ;
     } else if(re.value === -1 && re.isChecked === true) {
      sumNeg = sumNeg + 1;
    } else if(re.value === 1 && re.isChecked === false){
      sumNo = sumNo + 1 ;
    }
   })
   console.log('SumPos',sumPos);
   console.log('SumNeg',sumNeg);
   setData(
     [
       {date:"SI  " +  (sumPos-sumNeg)+'/'+(sumPos+sumNo -sumNeg),value:((sumPos-sumNeg + 1)*10)},
       {date:sumPos + sumNeg != 9 ? "NO  " + (sumNo)+'/'+(sumPos+sumNo -sumNeg): "",value:(100-((sumPos-sumNeg + 1)*10))}
      ]
   )
//    setData()
//    const [data, setData] = useState([{date:18+'/'+18,value:0},
//    {date:0+'/'+0,value:100},
//  ]
// );

    }
    const formatDate = (date) => {
      moment.locale('es-mx')
      let datef = '';
      if(date){
      datef = moment(date).locale('es-mx').format("DD/MMM/YYYY ");
      }else {
        datef = '';
      }
      return datef;
    }
    const updateReminders = () =>{
      dispatch( starLoadingApplicationRemindersC(active.id,activeApplication.id,'Prospeccion'));
    }
    const onSubmit = (data) => {
      moment.locale("es-mx");
        let newObj ={
            name_prospection: objAux.program + " " + objAux.year,
            status: 'Evaluacion',
            story: null,
            last_modification : moment().format("YYYY-MM-DD HH:mm")          ,
            id_last_contact : active.id,
            last_contact : active.name,
        };
         axios.post(constaApi + "saveProspection",newObj)
        .then(function (response) {
          changeButton(response.data.id);
          consultAllApplications(active.id);
          closeModal();
         
        });
    };
    async function randomColor(i) {
      const array = ['btn-primary','btn-secondary','btn-success','btn-danger','btn-warning','btn-info','btn-light','btn-dark','btn-white'];
      const number = Math.floor(Math.random() * 9);
      console.log('array',array[number]);
      return await array[i];
    }
    function changeProspection(name,obj){
      console.log('NAME',name,'OBJ,',obj);
      Object.keys(obj).map((oneKey,i) => {
        if(i === 0){
          changeButton(obj[oneKey].id)
          console.log('ERRRE',applications.filter(fil => fil.id === obj[oneKey].id));
          console.log('Selection',selection);
          // setProspectionSelected(oneKey);
          // console.log('EPA',result[oneKey]);
          // SetAuxSelection(result[oneKey]);
        }
      })
      setProspectionSelected(name);
      SetAuxSelection(obj);
    }
    function showApplications(obj){
      let tag = obj.map(o => {
        return (
          <button
                onClick={(e) => changeButton(o.id)}
                key={objAux.id}
                // active={{backgroundColor:'#FF0000'}}
                class={[
                  selection === o.id
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
    return (
      <div class="content">
        <div class="mt-n5 d-flex justify-content-end">
        <span>
          <AIicons.AiFillQuestionCircle color={'#34B5B8'} size={18}/>
          </span>
        </div>
          {results &&
                    [Object.keys(results).map((oneKey,i)=>{
                      return(
                        <button onClick={(e) => changeProspection(oneKey,results[oneKey])}eventKey={oneKey} title={oneKey}
                      class={[ i> 0 ?  "ml-1 mt-n5 btn btn-sm btn-success" : "opacity-2 ml-1 mt-n5 btn btn-sm btn-success" 
                      ]}
                      >
                        {oneKey}
                    </button>
                      )
                    })]}
          <div>
          {auxSelection &&
           [Object.keys(auxSelection).map((oneKey,i)=>{
            return(
              <button                 onClick={(e) => changeButton(auxSelection[oneKey].id)}
              eventKey={oneKey} title={oneKey}
            class={[ i > 0 ? "ml-1" : "ml-0" 
            ]}
            class={[selection === auxSelection[oneKey].id  ?"btn btn-sm btn-info" : "btn btn-sm btn-primary" ]}
            >
              {auxSelection[oneKey].name}
          </button>
            )
          })]}
          </div>

          {/* ? "mt-n5 mr-1 btn btn-sm btn-info"
                  : "mt-n5 mr-1 btn btn-sm btn-primary", */}
                       {/* console.log('PROSP',prospectionSelected);
                console.log('Auxselection',auxSelection); */}
        {/* {applications && [
          applications.map((pros) => {
            return (
              <button
                onClick={(e) => changeButton(pros.id)}
                key={pros.id}
                // active={{backgroundColor:'#FF0000'}}
                class={[
                  selection === pros.id
                    ? "mt-n5 mr-1 btn btn-sm btn-info"
                    : "mt-n5 mr-1 btn btn-sm btn-primary",
                ]}
                // style={{
                //   backgroundColor:[selection === pros.id ?  '#0062cc' : '#51cbce']
                // }}
              >
                {pros.name}
              </button>
            );
          }),
        ]} */}
        {/* <button
          onClick={(e) => changeModal()}
          type="button"
          class="mt-n5  Inter ml-1 btn btn-success btn-sm"
        >
          +
        </button> */}
        {/* <button
          onClick={(e) => saveChanges()}
          type="button"
          class="mt-n5 float-right Inter btn btn-success btn-sm"
        >
          Guardar cambios
        </button> */}
        {/* {applications &&
        <button
          onClick={(e) => deleteProspection()}
          type="button"
          class="mt-n5 float-right Inter btn btn-danger btn-sm"
        >
          Eliminar Prospeccion
        </button>
        } */}
        {load === true ?
                        <Skeleton width="60rem"  height={30} count={10} />
  
      :
      <>
      <div class="row">
      <div class="content col-4">
    <Form.Label className="formGray">Status</Form.Label>
    <Form.Control  name="status"
    disabled
   autoComplete="off" className="formGray" type="text"
   value={activeApplication.status}
   />
   <button
   disabled
   class=" mt-1 float-right Inter btn-primary  btn-sm"
   onClick={(e) => changeModalStatus()}><FIIcons.FiEdit size={16} style={{ color: 'white' }} /> </button>
    {/* <Form.Control
      onChange={(e) => changeStatus(e)}
      autoComplete="off"
      name="year"
      value={activeApplication.status}
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
    value={activeApplication.story}
    as="textarea"
    placeholder="Escriba sus notas..."
    rows={8}
   />
   <button
   disabled
   class=" mt-1 float-right Inter btn-primary  btn-sm"
   onClick={(e) => changeModalStory()}><FIIcons.FiEdit size={16} style={{ color: 'white' }} /> </button>
  </div>
  <div>
  <Form.Label className="formGray">Ultimo contacto</Form.Label>
  <Form.Control  name="last_modification"
  disabled
   autoComplete="off" className="formGray" type="text"
   placeholder="Ultima fecha"
   value={formatDate(activeApplication.last_modification)}
   />
  </div>
  </div>
   <div class="mt-3 row">
  <div class="col-6">
  <div class="container">
    <div class="row">
      <div class="col">
      {valuesOfchecklist.map(val => {
       return(
         <>
       <Row>
        <Col className="col-12">
        <label class="custom-radio-checkbox">
       <input class="custom-radio-checkbox__input" 
       name={val.name}
       value={val.isChecked}
       checked={val.isChecked} type="checkbox"
        onChange={(e) => changeChecked(e)} 
        />
       <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
       <span class="custom-radio-checkbox__text">{val.name}</span>
      </label>
      </Col>
      </Row>
      </>
       )
      })}
      </div>
      <div class="col">
      {twoPartValuesofChecklist.map(val => {
           return(
            <>
          <Row>
           <Col className="col-12">
           <label class="custom-radio-checkbox">
          <input class="custom-radio-checkbox__input" 
          name={val.name}
          value={val.isChecked}
          checked={val.isChecked} type="checkbox"
          onChange={(e) => changeChecked(e)} 
           />
          <span class="custom-radio-checkbox__show custom-radio-checkbox__show--checkbox"></span>
          <span class="custom-radio-checkbox__text">{val.name}</span>
         </label>
         </Col>
         </Row>
         </>
          )
        })}
      </div>
    </div>
  </div>
   
  </div>
  <div class="col-6">
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
    //   blocked={activeApplication.status == "Aplicar" ? true : activeApplication.status == "Cancelar" ? true : false}
      activeApplication={activeApplication} applications={true} prospection={false}/>
  </div>
  </div>
  <div class="mt-5 row">
  <h6>Bitacora</h6>
  <div class="mr-5 mt-5 col-12">
     {activeApplication &&
      <Bio
      extern={true}
      applications={true}
      activeApplication={activeApplication}/>
    }
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
                  value={activeApplication.status}
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
  
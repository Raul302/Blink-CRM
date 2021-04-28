import React, { useState, useEffect,useRef } from "react";
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import {
  SelectionState,
  GroupingState,
  IntegratedGrouping,
} from '@devexpress/dx-react-grid';
import NotificationAlert from "react-notification-alert";

import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
  TableSelection,
} from '@devexpress/dx-react-grid-bootstrap4';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useDispatch, useSelector } from 'react-redux';
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
import { constaApi } from "constants/constants";
import axios from "axios";
import { starLoadingProspect } from "actions/contacts/bioContact/bioContact";
import * as FAIcons from "react-icons/fa";
import swal from "sweetalert";
import moment from 'moment'
import 'moment/locale/es'  // without this line it didn't work
import *  as Ioicons from "react-icons/io";
import * as IOIcons from "react-icons/io";
import { starLoadingCollegesByProspeccion } from "actions/colleges/colleges";
import Skeleton from 'react-loading-skeleton';

// Slots
export const SlotCollege = function SlotCollege(props){
  const {data} = props;
  const showSeconModal = (proposal) => {
    // props.context.openSecondModal(proposal);
  }
  const PopoverComponent = (proposals) => {
    const showProposals = (proposal) => {
      let aux = '';
      let auxTwo = null;
      if(proposals.length){
        var hash = {};
        auxTwo = proposals.filter(function(current) {
        var exists = !hash[current.name];
        hash[current.name] = true;
        return exists;
      });
        auxTwo.map(pro => {
          aux += pro.name + ',';
        })
      } else {
        for (let prop in proposal){
          aux += proposal[prop].name + ',';
        }
  
      }
      return aux;
    }
    return (<Popover id="popover-basic">
        <Popover.Content>
            <strong>{showProposals(proposals)}</strong>
        </Popover.Content>
    </Popover>)
  }
    return (
      <>
      {data.proposal &&
       <OverlayTrigger trigger={["hover", "hover"]} placement="top"
       overlay={PopoverComponent(data.proposal)}>
       <a onClick={(e) => showSeconModal(data.proposal)}>
       <IOIcons.IoIosSchool />
       </a>
   </OverlayTrigger>
    }
      </>
      )
  }
  
export const SlotCountry = function SlotCountry(props){
  const {data} = props;
  const [rows,setRows] = useState([]);
  useEffect(() => {
    let auxTwo = null;
    var hash = {};
    auxTwo = data.proposal.filter(function(current) {
    var exists = !hash[current.country];
    hash[current.country] = true;
    return exists;
  });
  setRows(auxTwo);
  }, [])
  const PopoverComponent = (proposals,data) => {
  const showProposals = (proposal,data) => {
    let auxTwo = [];
    let auxFirst = '';
    let aux =  data.filter(d => d.country == proposal.country);
    aux.map(pro => {
      auxFirst += pro.name + ',';
    })
    return auxFirst;
  }
  return (<Popover id="popover-basic">
      <Popover.Content>
          <strong>{showProposals(proposals,data)}</strong>
      </Popover.Content>
  </Popover>)
}
  return (
    <>
    {data.proposal &&
     [rows.map(d => {
       return (
         <>
      <OverlayTrigger trigger={["hover", "hover"]} placement="top"
       overlay={PopoverComponent(d,data.proposal)}>
       <span>{d.country + ' '}</span>
       </OverlayTrigger>
       </>
       )
     })]
  }
    </>
    )
}

export const SlotDates = function SlotDates(props){
  const {data} = props;
  const showDate = (dateBD) => {
    let datef = moment(dateBD).locale('es-mx').format("ddd D MMMM, YYYY ");
    let timef = moment(dateBD).locale('es-mx').format("h:mm A");
    datef = datef[0].toUpperCase() + datef.slice(1);
    datef = datef.replace(".","");
    let tag = <span class="Inter">{datef}{timef} <Ioicons.IoMdTime /></span>
    return tag;
}
  return (
    <>
    <>
      {showDate(data.created_at)}
    </>
    </>  
    )
}
export const SlotActions = function SlotActions(props){
  const {data} = props;
  const deleteReminder = (obj) => {
    swal({
      title: "Estas seguro?",
      text: "Una vez eliminado,no podras recuperar este registro!",
      icon: "warning",
      dangerMode: true,
      buttons: ["No", "Si"],
    }).then(async (willDelete) => {
      if (willDelete) {
        await axios.get(constaApi + "removeProposal/"+obj.id)
        .then(function (response) {
            props.context.loadProposals(response.data.message,'success');
        }).catch(error => {
          props.context.loadProposals('Ocurrio un error','danger');
        });
      } else {
        swal("Operacion cancelada!");
      }
    });
  }
  return (
  <>
  <span>
  <FAIcons.FaTrashAlt title="Eliminar" style={{ color: '#DC3545' }} size={18} onClick={(e) => { deleteReminder(data) }} />
  </span>
  </>  
  )
}
export default function Proposals(props) {
  const { loading } = useSelector(state => state.ui);

  const [nowTime, setNowTime] = useState();
  const [theProposal,setTheProposal] = useState();
  const notificationAlert = useRef();
  const dispatch = useDispatch();
  const [columns] = useState([
    { name: 'name', title: 'Nombre' },
    { name: 'country', title: 'Pais' },
  ]);
  const [selection, setSelection] = useState([]);
 
  const [rowsTwo] = useState();
    let { active } = useSelector((state) => state.contacts);
    if(!active){
        active = JSON.parse(localStorage.getItem('ActiveContact'));
      }
  const {colleges} = useSelector( state => state.colleges);
  const [secondModal,setSecondModal] = useState(false);
  const [auxSelection,setAuxSelection] = useState([0]);
  const auth = useSelector(state => state.auth);
  const [records, setRecords] = useState();
  const [gridApi, setGridApi] = useState();
  const [columnApi, setColumnApi] = useState();
  const [frameworkComponents, setFramwrokw] = useState({slotActions:SlotActions,slotDates:SlotDates,slotCountry:SlotCountry,slotCollege:SlotCollege});
  const [modal,setModal] = useState(false);
  const [obj,setObj] = useState({})
  const {
    register: student,
    handleSubmit,
    errors,
    formState,
    reset: reset,
  } = useForm({});

  useEffect (() => {
    setRecords([]);
    loadProposals();
    setNowTime(moment().format("YYYY-MM-DD HH:mm"));
  },[props.activeProspect])
  useEffect(() => {
    setRecords([]);
    if(colleges && selection){
      convertSel(selection);
    }
  }, [selection])
  const loadProposals = async (message=null,type=null) => {
    if(message && type){
      notification(type,message);
    }
      let idx = active.id;
      let idxTwo = props.activeProspect.id ?? 0;
    await axios.get(constaApi + "getProposal/"+idx+"/separate/"+idxTwo ?? 1)
    .then(function (response) {
        setRecords(response.data);
    });
  }
  const onSubmit = async(data)=> {
    let col = []
    if(selection){
      col = selection.map(se => {
        return  colleges[se];
      })
    }
    // let aux =  await colleges.filter(col => col.id == e.target.value);
    let aux2 = await {
         created_at: nowTime,
         contact:active.name,
         id_contact:active.id,
          // type:aux[0].type,
          // name:aux[0].name,
          // country:aux[0].country,
         email: auth.email,
         name_user : auth.name,
         type_user : auth.type,
         id_user : auth.id,
         id_type : props.activeProspect ? props.activeProspect.id : 0,
    };
     aux2 = {...aux2,selection:col}
    // setObj({...aux2,selection:col});
      axios.post(constaApi + "saveProposal",aux2)
       .then(function (response) {
         loadProposals();
         if(props.activeProspect){
          dispatch( starLoadingProspect(active.id,props.activeProspect.id));
         }
         notification('success',response.data.message);
         props.updateReminders();
         closeModal();
         setSelection([]);
       }).catch(function( error) {
        notification('danger',error.response.data.message);
        closeModal();
        props.updateReminders();
       });
  }
 
  const onChangeSelection = (selection) => {
  }
  const onGridReady = (params) => {
    setGridApi(params);
    setColumnApi(params);
  };
  const closeTwoModal = () => {
    setSecondModal(false);
  }
  const closeModal = () => {
    setModal(!modal)
    setAuxSelection([]);
  }
  const updatedUpLevel = () => {
    props.updateReminders();
  }
  const convertSel = (seleccion) => {
    let col = []
    if(selection){
      col = selection.map(se => {
        return  colleges[se];
      })
    }
    setAuxSelection(col);
  }
  const changeProposal = async (e) => {
    let aux =  await colleges.filter(col => col.id == e.target.value);
    let aux2 = {
        contact:active.name,
        id_contact:active.id,
        type:aux[0].type,
        name:aux[0].name,
        country:aux[0].country,
        email: auth.email,
        name_user : auth.name,
        type_user : auth.type,
        id_user : auth.id,
        id_type : props.activeProspect ? props.activeProspect.id : 0,
    };
  setObj({...aux2});
  }
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
  function openSecondModal(proposal){
    setTheProposal(proposal);
    setSecondModal(!secondModal);
  }
  return (
    <div className="ml-n3 content" style={{ width: "100%", height: "100%" }}>
      <NotificationAlert ref={notificationAlert} />
      {loading ?
                  <Skeleton width="60rem" height={30} count={10} />
      :
      <>
        <div class="col d-flex justify-content-end">
             <button  
             disabled={props.blocked ? true:false}
             onClick={(e) => setModal(!modal)}className="btn btn-info">
                <span className="Inter"
                    style={{ fontSize: "18px" }}>+</span> Propuesta</button>
        </div>
      <div
        className="ag-theme-alpine"
        style={{height: "100%", width: "100%" }}
      >
        <AgGridReact
           context={{
             loadProposals,
             openSecondModal,
           }}
          defaultColDef={{ resizable: true }}
          rowData={records}
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
                      cellRenderer="slotDates"
                      headerName="Fecha" field="created_at" width="280" />
          <AgGridColumn
            headerName="Paises"
            field="country"
            width="230"
            cellRenderer="slotCountry"
          />
          {/* <AgGridColumn cellRenderer="slotCollege" headerName="Colegio" field="name" width="150" /> */}
          
           <AgGridColumn
            headerName="Acciones"
            width="230"
            cellRenderer="slotActions"
          />
        </AgGridReact>


        {/* Second Modal  */}
        <Modal
        show={secondModal}
        dialogClassName="modalMax"
        onHide={closeTwoModal}
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
            Detalle
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#F4F5F6", border: "0px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              Eu
            </Col>
          </Row>
            </form>
        </Modal.Body>
      </Modal>
      
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
            Agregar Propuesta
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#F4F5F6", border: "0px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
         {auxSelection.length > 0 &&
          auxSelection.map(sel => {
           return(
           <button disabled className="btn btn-success btn-sm">{sel.name ?? " "}</button>
           );
          })}
          <>
          {loading ?
            <div class="row mt-2">
                       <NotificationAlert ref={notificationAlert} />
                <Skeleton  style={{backgroundColor:'#888C8D'}}width="10rem"  height={10} count={10} />
            </div>
            :
            <div>
            <Grid
              style={{marginTop:'30px'}}
              rows={colleges}
              columns={columns}
            >
               <GroupingState
                grouping={[{ columnName: 'country' }]}
              />
              <SelectionState
                selection={selection}
                onSelectionChange={setSelection}
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

      </div>
      </>
      }
    </div>
  );
}

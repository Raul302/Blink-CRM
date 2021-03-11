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
  // console.log('SET',selection);
  //  console.log('colleges',colleges);
  const auth = useSelector(state => state.auth);
  const [records, setRecords] = useState();
  const [gridApi, setGridApi] = useState();
  const [columnApi, setColumnApi] = useState();
  const [frameworkComponents, setFramwrokw] = useState({slotActions:SlotActions});
  const [modal,setModal] = useState(false);
  const [obj,setObj] = useState({})
  const {
    register: student,
    handleSubmit,
    errors,
    formState,
    reset: reset,
  } = useForm({});

  useEffect(() => {
    loadProposals();
  }, [])
  const loadProposals = async (message=null,type=null) => {
    if(message && type){
      notification(type,message);
    }
      let idx = active.id;
    await axios.get(constaApi + "getProposal/"+idx)
    .then(function (response) {
        setRecords(response.data);
    });
  }
  const onSubmit = async(data)=> {
    let col = []
    console.log('selection',selection);
    if(selection){
      col = selection.map(se => {
        return  colleges[se];
      })
    }
    // let aux =  await colleges.filter(col => col.id == e.target.value);
    let aux2 = await {
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
    console.log('OBJ',aux2);
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
    console.log('selection',selection);
  }
  const onGridReady = (params) => {
    setGridApi(params);
    setColumnApi(params);
  };
  const closeModal = () => {
    setModal(!modal)
  }
  const updatedUpLevel = () => {
    props.updateReminders();
  }
  const changeProposal = async (e) => {
    console.log('auth',auth);
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
    console.log(aux2);
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
  return (
    <div className="content" style={{ width: "100%", height: "100%" }}>
      <NotificationAlert ref={notificationAlert} />

        <div class="col d-flex justify-content-end">
             <button  onClick={(e) => setModal(!modal)}className="btn btn-primary">
                <span className="Inter"
                    style={{ fontSize: "18px" }}>+</span> Propuesta</button>
        </div>
      <div
        className="ag-theme-alpine"
        style={{ marginLeft:'31%' ,height: "100%", width: "70%" }}
      >
        <AgGridReact
           context={{
             loadProposals,
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
          <AgGridColumn headerName="Colegio" field="name" width="150" />
          <AgGridColumn headerName="Tipo" field="type" width="200" />
          <AgGridColumn
            headerName="País"
            field="country"
            width="230"
            cellRenderer="stotProspection"
          />
           <AgGridColumn
            headerName="Acciones"
            width="230"
            cellRenderer="slotActions"
          />
        </AgGridReact>

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
            <div>
            <Grid
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
            <Row>
              <Col>
                <Button
                  className="float-right mb-3 mr-2"
                  type="submit"
                  onSubmit={handleSubmit(onSubmit)}
                  variant="primary"
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
    </div>
  );
}

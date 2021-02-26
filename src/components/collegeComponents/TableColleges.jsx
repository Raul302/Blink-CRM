import React,{ useState,useEffect,useRef } from 'react'
import *  as FAIcons from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
// import { loadColleges } from '../../helpers/loadColleges'; 
import { useHistory } from 'react-router-dom';
import {activeCollege,deleteCollege} from '../../actions/colleges/colleges';
import Skeleton from 'react-loading-skeleton';
import { finishLoading } from '../../actions/uiNotificactions/ui';
import swal from 'sweetalert';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import moment from 'moment';
import { Link } from "react-router-dom";


import {
    Card,
    CardHeader,
    CardBody,
    Table,
    Row,
    Col,
  } from "reactstrap";
  import NotificationAlert from "react-notification-alert";

  // Component SLotName
  export const SlotName = function SlotName(props) {
    const dispatch = useDispatch();
    const history = useHistory();

    const click = (obj) => {
      dispatch( activeCollege( obj.id,obj) );

  }
    const showName = (name="",fname="",mname="") => {
        let n = name ? name : " ";
        let f = fname ? fname: " ";
        let tag = '';
        n = n ? n.charAt(0) + f.charAt(0) : null;
        tag =  
        <>
        <Link  onClick={(e) => click(props.data)} to={"colleges/" + (props.data.id) + "/bio"}>
        <span class="mt-1 mr-1 sc-caSCKo fXbvQO styles__Company-sc-103gogw-0 jdbeFR">{n}</span>
        <span>{name} {fname} {mname}</span>
        </Link>
        </>;
        return tag;
    }
    return (
        <>
          <span>{showName(props.data.name,props.data.fname,props.data.mname)}</span>
        </>
    )
}
// -----------------------------End component SLotName

// Component SLotActions
export const SlotActions = function SlotActions(props) {
  function dropStaff (id){
    props.context.dropCollege(id);
  }
 
  return (
      <>
       <a ><FAIcons.FaTrashAlt style={{color:'#DC3545'}} size={18}onClick={(e) => dropStaff(props.data.id)} /> </a>
      </>
  )
}

// ----------------------------------------End component SlotACtions

// Component SlotCreated
export const SlotCreated = function SlotActions(props) {
  moment.locale('es-mx')

  const dateToMoment = (date) => {
    return moment(date).locale('es-mx').format("ddd D MMMM, YYYY HH:mm ");
  }
  return (
      <>
      <span>{dateToMoment(props.data.created_at)}</span>
      </>
  )
}

// ----------------------------------------End component SlotCreated

export const slotProspecciones = function slotProspecciones(props){
  return (
    <>
    <span>#</span>
    </>
  )
}

export const slotApplicaciones = function slotApplicaciones(props){
  return (
  <>
  <span>#</span>
  </>  
  )
}


function TableColleges() {
    const dispatch = useDispatch();
    const [frameworkComponents, setFramwrokw] = useState({ slotName: SlotName, slotActions: SlotActions,slotApplicaciones:slotApplicaciones,slotProspecciones:slotProspecciones});
    const [gridApi, setGridApi] = useState();
    const [columnApi, setColumnApi] = useState();
    useEffect(()=>{
        dispatch( finishLoading());
    },[dispatch])
    const notificationAlert = useRef();
    const {colleges} = useSelector( state => state.colleges);
    const { loading } = useSelector(state => state.ui);
    const history = useHistory();
    function handleGoto(obj){
        dispatch( activeCollege( obj.id,obj) );
        history.replace("colleges/"+ obj.id + "/bio");
    }
    const dropCollege =  (id) => {
      swal({
        title: "Estas seguro?",
        text: "Una vez eliminado,no podras recuperar este Colegio!",
        icon: "warning",
        dangerMode: true,
        buttons: ["No","Si"],
      })
      .then((willDelete) => {
        if (willDelete) {
          dispatch( deleteCollege(id));
          notification('success','Colegio eliminado Correctamente');
        } else {
          swal("Operacion cancelada!");
        }
      });
    }
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
     const onGridReady = (params) => {
      setGridApi(params);
      setColumnApi(params);
  }
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
        <> {loading ?
            <div class="row mt-2">
                       <NotificationAlert ref={notificationAlert} />
                <Skeleton width="60rem"  height={30} count={10} />
            </div>

        :
        <div className="content">
         <NotificationAlert ref={notificationAlert} />
         <div
                    className="ag-theme-alpine"
                    style={{ height: '100%', width: '100%' }}
                >
                    <AgGridReact
                         context={{
                          dropCollege
                            }}
                        defaultColDef={{ resizable: true }}
                        rowData={colleges}
                        rowHeight={40}
                        domLayout="autoHeight"
                        onGridReady={onGridReady}
                        onFirstDataRendered={onFirstDataRendered}
                        frameworkComponents={frameworkComponents}
                        pagination={true}
                        paginationPageSize={10}
                        paginationNumberFormatter={function (params) {
                            return params.value.toLocaleString() ;
                        }}
                        rowSelection="multiple"
                    >
                       <AgGridColumn
                            headerName="ID" field="id" width="100" />
                        <AgGridColumn
                            cellRenderer="slotName"
                            headerName="Colegio" field="name" width="100" />
                        <AgGridColumn headerName="Tipo" field="type" width="200"  />
                        <AgGridColumn headerName="Pais" field="country" width="200"  />
                        <AgGridColumn headerName="Prospecciones" width="200" cellRenderer="slotProspecciones" />
                        <AgGridColumn headerName="Aplicaciones" width="200" cellRenderer="slotApplicaciones" />
                        <AgGridColumn
                            headerName="Acciones"
                            width={250}
                            cellRenderer="slotActions"
                        />
                    </AgGridReact>
                </div>

           </div>
           
        }
        </>
    )
}

export default TableColleges

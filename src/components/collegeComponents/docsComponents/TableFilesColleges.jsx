import React,{useState,useEffect,useRef} from 'react'
import NotificationAlert from "react-notification-alert";
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import axios from 'axios';
import { constaApi , domain, secret_token } from "../../../constants/constants";
import { useParams,} from "react-router";
import moment from 'moment';
import *  as Ioicons from "react-icons/io";
import *  as AIIcons from "react-icons/ai";
import *  as FAIcons from "react-icons/fa";
import ModalImage from "react-modal-image";
import swal from 'sweetalert';

export default function TableFilesColleges(props) {
     // // variables
     const notificationAlert = useRef();
     const [rowCuotes,setRowCuotes] = useState([]);
     const [rowCalendars,setRowCalendars] = useState([]);
     const [frameworkComponents, setFramwrokw] = useState({slotType:SlotType,slotPreview:SlotPreview,slotDate:SlotDate,slotActions:SlotActions});
     const [gridApi, setGridApi] = useState();
     const [columnApi, setColumnApi] = useState();
     let { id:id_contact } = useParams();
     const [fullImg,setFullImg] = useState("");
     const [nameImg,setNameImg] = useState("");

 
     // Hook useEffect
     useEffect(() => {
         getFiles();
     }, [props])
     // functions
     const onGridReady = (params) => {
         setGridApi(params);
         setColumnApi(params);
     }
     const clickEvent = (direction) => {
        setFullImg(direction);
        setNameImg(nameImg);
        let a = document.querySelector('.imgs').click();
 
     }
     const dropFile = (id,path_doc,id_college) => {
         let array = [];
         array.push(path_doc);
         array.push(id);
         array.push(id_college);
         axios.post(constaApi + 'files/colleges/delete',array, {
             headers: {
                 "Accept": "application/json"
             }
         }).then(function (response) {
            if(response.data){
                if(response.data.cuote){
                    setRowCuotes(response.data.cuote);
                } 
                if(response.data.calendar){
                    setRowCalendars(response.data.calendar);
                }
            }
         });
     }
     const getFiles = ()=>{
          axios.get(constaApi + 'files/getCollege/'+id_contact, {
             headers: {
                 "Accept": "application/json"
             }
         }).then(function (response) {
             if(response.data){
                 if(response.data.cuote){
                     setRowCuotes(response.data.cuote);
                 } 
                 if(response.data.calendar){
                     setRowCalendars(response.data.calendar);
                 }
             }
         });
     }
     return (
         <div className="content">
             <div style={{width:'5px',height:'5px'}}>
             <ModalImage
             style={{width:'500px'}}
             hidde={true}
             className="imgs"
             small={fullImg}
             medium={fullImg }
             large={fullImg}
             alt={nameImg}
             />
             </div>
                 <NotificationAlert ref={notificationAlert} />
                 <h6>Calendario</h6>
                 <div
                     className="ag-theme-alpine"
                     style={{ height: '100%', width: '100%' }}
                 >
                     <AgGridReact
                         rowData={rowCalendars}
                         rowHeight={60}
                         context={{
                             clickEvent,
                             dropFile
                         }}
                         cellStyle={{ fontFamily:'Montserrat,sans-serif',fontSize:'13px',fontWeight:'500', color:'#3B3B3B'}}
                         domLayout="autoHeight"
                         onGridReady={onGridReady}
                         frameworkComponents={frameworkComponents}
                         pagination={true}
                         paginationPageSize={10}
                         paginationNumberFormatter={function (params) {
                             return params.value.toLocaleString();
                         }}
                         rowSelection="multiple"
                     >
                         <AgGridColumn
                             headerName="Tipo de Doc." field="type_doc"
                             cellRenderer="slotType"
                             />
                         <AgGridColumn
                         headerName="Nombre Doc." field="name_doc" />
                          <AgGridColumn headerName="Colaborador" field="name_colaborator" 
                          />
                         <AgGridColumn headerName="Preview" field="path_doc" 
                          cellRenderer="slotPreview"
                          />
                         <AgGridColumn 
                          headerName="Fecha" 
                          cellRenderer="slotDate"
                          width={220} />
                         <AgGridColumn
                             headerName="Acciones"
                             cellRenderer="slotActions"
                             width={220}
                         />
                     </AgGridReact>
                 </div>

                 <div class="mt-5" style={{width:'5px',height:'5px'}}>
             <ModalImage
             style={{width:'500px'}}
             hidde={true}
             className="imgs"
             small={fullImg}
             medium={fullImg }
             large={fullImg}
             alt={fullImg}
             />
             </div>
                 <NotificationAlert ref={notificationAlert} />
                 <h6>Cuotas</h6>
                 <div
                     className="ag-theme-alpine"
                     style={{ height: '100%', width: '100%' }}
                 >
                     <AgGridReact
                         rowData={rowCuotes}
                         rowHeight={60}
                         context={{
                             clickEvent,
                             dropFile
                         }}
                        //  cellStyle={{ fontFamily:'Montserrat,sans-serif',fontSize:'13px',fontWeight:'500', color:'#3B3B3B'}}
                         domLayout="autoHeight"
                         onGridReady={onGridReady}
                         frameworkComponents={frameworkComponents}
                         pagination={true}
                         paginationPageSize={10}
                         paginationNumberFormatter={function (params) {
                             return params.value.toLocaleString();
                         }}
                         rowSelection="multiple"
                     >
                         <AgGridColumn
                             headerName="Tipo de Doc." field="type_doc"
                             cellRenderer="slotType"
                             />
                         <AgGridColumn
                         headerName="Nombre Doc." field="name_doc" />
                         <AgGridColumn headerName="Preview" field="path_doc" 
                          cellRenderer="slotPreview"
                          />
                          <AgGridColumn headerName="Colaborador" field="name_colaborator" 
                          />
                         <AgGridColumn 
                          headerName="Fecha" 
                          cellRenderer="slotDate"
                          width={220} />
                         <AgGridColumn
                             headerName="Acciones"
                             cellRenderer="slotActions"
                             width={220}
                         />
                     </AgGridReact>
                 </div>
         </div>

         
     )
 }
 
 
 // SLOTS
 // Component SlotCreated
 export const SlotDate = function SlotDate(props) {
     moment.locale('es-mx')
     const showModal = (obj) => {
       props.context.showModal(obj);
   }
     const showDate = (dateBD,timeBio) => {
       let datef = moment(dateBD).locale('es-mx').format("ddd D MMMM, YYYY ");
       let timef = moment(dateBD).locale('es-mx').format("h:mm A");
       datef = datef[0].toUpperCase() + datef.slice(1);
       datef = datef.replace(".","");
       let tag = <span class="Inter">{datef} <Ioicons.IoMdTime  /> {timef}</span>
       return tag;
   }
     return (
         <>
         <span onClick={(e) => showModal(props.data)} >{showDate(props.data.created_at,props.data.timeBio)}</span>
         </>
     )
   }
 
 //   END SLOT DATE
 
 // SLOT Preview
 // Component SlotPreview
 export const SlotPreview = function SlotPreview(props) {
    const {value} = props;
    let obj = "Sin image.jpg";
    const maximImg = (e) => {
        // document.getElementById("btnSample").click();
        props.context.clickEvent(e.target.currentSrc,e.target.alt);
    }
    useEffect(()=>{
        const petition = (value) => {
            var myImage = document.getElementById('img'+value);
            const src = constaApi + 'colleges/'+value;
            const options = {
                headers: {
                             "Accept": "application/json",
                             "Authorization": "Basic " + secret_token
                         }
            };
            fetch(src, options)
            .then(res => res.blob())
            .then(blob => {
                var objectURL = URL.createObjectURL(blob);
                myImage.src = objectURL;
            });
        }
        petition(value);
    },[])
    return (
        <>
        <img id={'img'+value} onClick={(e) => maximImg(e)} style={{width:'50px',height:'50px'}} alt={props.data.name_doc} src={obj}></img>
        </>
    )
  }
 // END SLOT Slot Preveiw
 
 // SLOTPREVIEW
 // Component SlotCreated
 export const SlotActions = function SlotActions(props) {
     moment.locale('es-mx')
     const dropFile = (obj) => {
         swal({
             title: "Estas seguro?",
             text: "Una vez eliminado,no podras recuperar este Archivo!",
             icon: "warning",
             dangerMode: true,
             buttons: ["No","Si"],
           })
           .then((willDelete) => {
             if (willDelete) {
                 props.context.dropFile(obj.id,obj.path_doc,obj.id_college);
             } else {
               swal("Operacion cancelada!");
             }
           });
   }
     return (
         <>
         <a onClick={(e) => dropFile(props.data)}>
             <FAIcons.FaTrashAlt size={18} color={'red'}/>
         </a>
         {/* <AIIcons.AiOutlineCloudDownload class="ml-2" color={'#497cff'}size={18}/> */}
         </>
     )
   }
 // END SLOTPREVIEW
 
 // slot type
 // SLOTPREVIEW
 // Component SlotCreated
 export const SlotType = function SlotType(props) {
     const {value} = props;
     const showType = (val) => {
         let text = " ";
     switch (val) {
         case 'cuota':
             text = "Cuota";
             break;
         case 'calendario':
             text = "Calendario";
             break;
         default:
             text =" ";
             break;
     }
     return <span>{text}</span>
   }
     return (
         <>
         {showType(value)}
         </>
     )
   }
 // END slot type
import React,{useState,useEffect,useRef} from 'react'
import NotificationAlert from "react-notification-alert";
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import axios from 'axios';
import { Row, Col, Button, Modal, Form,InputGroup } from 'react-bootstrap';
import { constaApi,secret_token , domain } from "../../../constants/constants";
import { useParams,} from "react-router";
import moment from 'moment';
import *  as Ioicons from "react-icons/io";
import *  as AIIcons from "react-icons/ai";
import *  as FAIcons from "react-icons/fa";
import ModalImage from "react-modal-image";
import swal from 'sweetalert';
import { Document, Page } from 'react-pdf';
import GoogleDocsViewer from 'react-google-docs-viewer';
import Iframe from 'react-iframe-click';
import *  as GRicons from "react-icons/gr";


export default function TableFilesContact(props) {
    // // variables
    const notificationAlert = useRef();
    const [rowData,setRowData] = useState([]);
    const [frameworkComponents, setFramwrokw] = useState({slotType:SlotType,slotPreview:SlotPreview,slotDate:SlotDate,slotActions:SlotActions});
    const [gridApi, setGridApi] = useState();
    const [columnApi, setColumnApi] = useState();
    let { id:id_contact } = useParams();
    const [fullImg,setFullImg] = useState("");
    const [nameImg,setNameImg] = useState("");
    const [urlX,setUrlx] = useState("");
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [showModal,setSecondModal] = useState(false);
    console.log('urlX',urlX);
    // Hook useEffect
    useEffect(() => {
        getFiles();
    }, [props])
    // functions
    const onGridReady = (params) => {
        setGridApi(params);
        setColumnApi(params);
    }
    function handleClose() {
        setSecondModal(false);
      }
    const petitionPdf = (value,file) => {
        if(file){
            var fileURL = URL.createObjectURL(file);
            setUrlx(fileURL);
            setSecondModal(true);
        }

            // var win = window.open();
        //   win.document.write('<iframe src="' + fileURL + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>')
       }
    const clickEvent = (direction,nameImg,value,file) => {
        if(file){
            if(file.type == 'application/pdf'){
                petitionPdf(value,file);
            } else {
                setFullImg(direction);
                setNameImg(nameImg);
                 let a = document.querySelector('.imgs').click();
            }
        }

    }
    const dropFile = (id,path_doc,id_contact) => {
        let array = [];
        array.push(path_doc);
        array.push(id);
        array.push(id_contact);
        axios.post(constaApi + 'files/contacts/delete',array, {
            headers: {
                "Accept": "application/json"
            }
        }).then(function (response) {
            setRowData(response.data.files);
        });
    }
    const getFiles = ()=>{
         axios.get(constaApi + 'files/getcontact/'+id_contact, {
            headers: {
                "Accept": "application/json"
            }
        }).then(function (response) {
            setRowData(response.data.files);
        });
    }
    return (
        <div className="content">
                    <div>
                

 
                </div>
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
                <div
                    className="ag-theme-alpine"
                    style={{ height: '100%', width: '100%' }}
                >
                    <AgGridReact
                        rowData={rowData}
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
                        <AgGridColumn headerName="Preview" field="path_doc" 
                         cellRenderer="slotPreview"
                         />
                        <AgGridColumn 
                         headerName="Fecha" 
                         cellRenderer="slotDate" />
                        <AgGridColumn
                            headerName="Acciones"
                            cellRenderer="slotActions"
                            width={220}
                        />
                    </AgGridReact>
                </div>
                
                <Modal
                style={{marginTop:'-50px'}}
                show={showModal}
                dialogClassName="modal-100w"
                onHide={handleClose}
            >
            <Modal.Header style={{height:'10px'}} closeButton>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>
                <div class="embed-responsive embed-responsive-16by9">
                <iframe class="embed-responsive-item" src={urlX} allowfullscreen></iframe>
                </div>
                </Modal.Body>
            </Modal>

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
    const extension = value ? value.split(".").[1] : "";
    const [file,setFile] = useState();
    const [pdf,setPdf] = useState();
    let obj = "Sin image.jpg";
    const maximImg = (e) => {
        // document.getElementById("btnSample").click();
        props.context.clickEvent(e.target.currentSrc,e.target.alt,value,file);
    }
    useEffect(()=>{
        const petition = (value) => {
            var myImage = document.getElementById('img'+value);
            const src = constaApi + 'contacts/'+value;
            const options = {
                headers: {
                             "Accept": "application/json",
                             "Authorization": "Basic " + secret_token
                         }
            };
            fetch(src, options)
            .then(res => res.blob())
            .then(blob => {
                setFile(blob);
                let fileURL = URL.createObjectURL(blob);
                setPdf(fileURL);
                var objectURL = URL.createObjectURL(blob);
                if(myImage){
                    myImage.src = objectURL;
                }
            });
        }
        petition(value);
    },[])
    function convertPdf(){
        if(file){
            let fileURL = URL.createObjectURL(file);
            return fileURL;
        } else {
            return "img/src";
        }
    }
    return (
        <>
        {extension == "pdf"
        ?
        <a> <GRicons.GrDocumentPdf onClick={(e) => maximImg(e)} style={{ color: '#497cff' }} size={18} /></a>
        :
        <img id={'img'+value} onClick={(e) => maximImg(e)} style={{width:'50px',height:'50px'}} alt={props.data.name_doc} src={obj}></img>
        }
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
                props.context.dropFile(obj.id,obj.path_doc,obj.id_contact);
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
        case 'foto':
            text = "Fotografia";
            break;
        case 'ppE':
            text = "Pasaporte estudiante";
            break;
        case 'ppP':
            text = "Pasaporte Papá";
            break;
        case 'cal1':
            text = "Calificacion Año 1";
            break;
        case 'cal2':
            text= "Calificacion Año 2";
            break;
        case 'calA':
            text = "Calificaciones Actuales";
            break;
        case 'acta':
            text = "Acta de nacimiento";
        break;
        case 'ref':
            text = "Referencias";
        break;
        case 'ens':
            text = "Ensayo";
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
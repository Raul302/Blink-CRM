import React, { useState, useEffect } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import axios from 'axios';
import { constaApi } from '../../constants/constants';
import { CSVLink } from "react-csv";
import swal from 'sweetalert';
import StarRatings from '../../../node_modules/react-star-ratings';
// import '../../resources/images/icons/favicon.ico';
// import '../../resources/vendor/bootstrap/css/bootstrap.min.css';
// import '../../resources/vendor/animate/animate.css';
// import '../../resources/vendor/select2/select2.min.css';
// import '../../resources/vendor/perfect-scrollbar/perfect-scrollbar.css';
// import '../../resources/css/util.css';
// import '../../resources/css/main.css';
var _ = require('lodash');

export default function TableProspection(props) {
  // Execute when the props change
  useEffect(() => {
    if (props.param) {
      quickSearch(props.param);
    }
  },[props])

  // Execute when you open this section
  useEffect(() => {
    loadProspections();
  }, [])
  const loadProspections = () => {
    axios.post(constaApi + 'prospectionSection')
      .then(function (response) {
        checkValues(response.data);
        const result = _.groupBy(response.data,"name")
        setAuxRow(result);
      }).catch(error => {
      });
  }
  const [frameworkComponents, setFramwrokw] = useState({slotRating: SlotRating ,slotName: SlotName,slotNumber:SlotNumber});
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rows, setRows] = useState(null);
  const [auxRow,setAuxRow] = useState([]);
  const [newObj,setNewObj] = useState([]);
  const [colors] = useState([
    'red', 'blue', 'green', 'gray', 'white'
  ]);
  const headers = [
    { label: "Nombre", key: "name" },
    { label: "Prospeccion", key: "prospection" },
    { label: "Colegio", key: "college" },
    { label: "Grado", key: "grade" },
    { label: "Ciudad", key: "city" },
    { label: "Estado", key: "state" },
    { label: "Status", key: "status" },
  ];
  const csvReport =  {
    data: newObj,
    headers: headers,
    filename: 'ProspectionReport.csv'
  };
  const checkValues = (obj) => {
    let color = 0;
    let newObj = obj.map((o,index) => {
      if(index > 0){
        if(obj[index - 1 ].name == o.name){
          return {...o,repeat:true,color:color}
        } else {
          color = color == 0 ? -1 : 0;
          return {...o,origin:true,color:color}
        }
      } else {
        return {...o,origin:true,color:color};
      } 
    })
    if(newObj){
      setRows(newObj);
    }

  }
  const quickSearch = (value) => {
    let objx = gridApi;
    value === 'keyWordSeccret302' ? objx.api.setQuickFilter("") : objx.api.setQuickFilter(value);
    setGridApi(objx);
  }
  const onGridReady = (params) => {
    setGridApi(params);
    setGridColumnApi(params);
  };
  const exporta = () => {
    let name = Array.prototype.slice.call(document.querySelectorAll("div[col-id=name"));
    let prospection = Array.prototype.slice.call(document.querySelectorAll("div[col-id=name_prospection"));
    let college = Array.prototype.slice.call(document.querySelectorAll("div[col-id=schoool"));
    let grade = Array.prototype.slice.call(document.querySelectorAll("div[col-id=grade"));
    let city = Array.prototype.slice.call(document.querySelectorAll("div[col-id=city"));
    let state = Array.prototype.slice.call(document.querySelectorAll("div[col-id=state"));
    let status = Array.prototype.slice.call(document.querySelectorAll("div[col-id=status"));
    let newObj = name.map((n,index)=>{
      if(index > 0){
        return {
          name:n.innerText,
          prospection : prospection[index] ? prospection[index].innerText : "",
          college: college[index] ? college[index].innerText : "",
          grade: grade[index] ? grade[index].innerText : "",
          city: city[index] ? city[index].innerText : "",
          state: state[index] ? state[index].innerText : "",
          status: status[index] ? status[index].innerText : "",
        }
      }
    });
    let otherArray = [];
    newObj.map(n => {
      if (n){
        otherArray.push(n);
      }
    })
    setNewObj(otherArray);
  }
  return (
    <div className="content">
      <div>
      <button
      style={{float:'right',textDecoration:'white'}}
      class="mt-n5 btn btn-sm btn-primary" onClick={(e) => exporta(e)}
      >
        <CSVLink {...csvReport}><span>Exportar</span>
        </CSVLink>
        </button>
      </div>
      <div
        className="ag-theme-alpine"
        style={{ height: '100%', width: '100%' }}
      >
         <AgGridReact
           rowData={rows}
           context={{
             exporta,
             loadProspections
           }}
           rowHeight={40}
           cellStyle={{ fontFamily:'Montserrat,sans-serif',fontSize:'13px',fontWeight:'500', color:'#3B3B3B'}}
           domLayout="autoHeight"
           rowClassRules={{
            'colorGrayAG': function (params) {
              var backColor = params.data.color;
              return params.data.color === 0 ;
            },
            'colorWhiteAG': 'data.color === -1',
          }}
           onGridReady={onGridReady}
           suppressRowTransform={true}
           pagination={true}
           paginationPageSize={10}
           frameworkComponents={frameworkComponents}
           paginationNumberFormatter={function (params) {
               return params.value.toLocaleString();
           }}
           rowSelection="multiple"
        >
           <AgGridColumn
            headerName="#"
            cellRenderer="slotNumber"
            wrapText={true}
            filter="agTextColumnFilter"
            width={50}
          />
          <AgGridColumn
            field="name"
            headerName="Nombre"
            cellRenderer="slotName"
            wrapText={true}
            filter="agTextColumnFilter"
            width={200}
          />
           <AgGridColumn 
          headerName="Rating"
          field="rating" width={250}
          wrapText={true}
          cellRenderer="slotRating"
          />
          <AgGridColumn 
          headerName="Prospeccion"
          field="name_prospection" width={250}
          filter="agTextColumnFilter"
          />
           <AgGridColumn 
          headerName="Colegio"
          field="schoool" width={150}
          filter="agTextColumnFilter"
          />
           <AgGridColumn 
          headerName="Grado"
          field="grade" width={150}
          filter="agTextColumnFilter"
          />
           <AgGridColumn 
          headerName="Ciudad"
          filter="agTextColumnFilter"
          field="city" width={150} />
            <AgGridColumn 
          headerName="Estado"
          field="state" width={150}
          filter="agTextColumnFilter"
          />
            <AgGridColumn 
          headerName="Status"
          filter="agTextColumnFilter"
          field="status" width={150} />
        </AgGridReact>
      </div>
    </div>
  )
}


export const SlotName = function SlotName(props) {
 const {rowIndex,value} = props
 const array = props.agGridReact.props.rowData;
  const showName = (obj) => {
    let text = " ";
    const {data} = obj;
    // if(data.origin === true){
    //   text = value;
    // } else {
    //   text = " ";
    // }
    text = value;
    return text;
  }
  return (
      <>
          <span>{showName(props)}</span>
      </>
  )
}


export const SlotNumber = function SlotNumber(props) {
  const {rowIndex,value} = props
  const array = props.agGridReact.props.rowData;
  const getRow = () => {
    return rowIndex + 1;
  }
   return (
       <>
           <span>{getRow(rowIndex)}</span>
       </>
   )
 }

 export const SlotRating = function SlotRating(props) {
  const [rating,setRating] = useState(props.value ? parseInt(props.value) : 0);
  const changeRating = (e) => {
      let contact = props.data;
      contact.rating = e;
      contact.name = contact.last_contact;
      console.log('contact',contact);
      swal({
          title: "Estas seguro?",
          text: "Usted modificara la calificacion de este contacto",
          icon: "info",
          dangerMode: true,
          buttons: ["No","Si"],
        })
        .then((willDelete) => {
          if (willDelete) {
               axios.post(constaApi+'contact/update',contact, {
                  headers: {
                      "Accept": "application/json"
                  }
              }).then(function (response) {
                props.context.loadProspections();
              //    loadRating();
              }).catch(error =>{
              });
          } else {
            swal("Operacion cancelada!");
          }
        });
  }
  return (
  <>
   <StarRatings
    rating={rating}
    starDimension={'20px'}
    starEmptyColor={'gray'}
    starRatedColor={'#ffd200'}
    changeRating={(e) => changeRating(e)}
   numberOfStars={5}
    name='rating'
                  />
  </>
  )
}
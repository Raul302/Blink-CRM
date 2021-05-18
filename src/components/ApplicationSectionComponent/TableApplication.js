import React, { useState, useEffect } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import axios from 'axios';
import { constaApi } from '../../constants/constants';
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

export default function TableApplication(props) {
  // Execute when the props change
  useEffect(() => {
    if (props.param) {
      quickSearch(props.param);
    }
  },[props])

  // Execute when you open this section
  useEffect(() => {
   loadApplications();
  }, [])

  const loadApplications = () => {
    axios.post(constaApi + 'applicationSection')
    .then(function (response) {
      checkValues(response.data);
      const result = _.groupBy(response.data,"name")
      setAuxRow(result);
    }).catch(error => {
    });
  }
  const [frameworkComponents, setFramwrokw] = useState({slotRating: SlotRating ,slotName: SlotName, slotProspection: SlotProspection});
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [rows, setRows] = useState(null);
  const [auxRow,setAuxRow] = useState([]);
  const [colors] = useState([
    'red', 'blue', 'green', 'gray', 'white'
  ]);
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
    // ----------------
     newObj = newObj.map((o,index) => {
        if(index > 0){
          if(newObj[index - 1 ].name == o.name && newObj[index - 1 ].name_prospection == o.name_prospection){
            return {...o,prospectionRepeat:true}
          } else {
            color = color == 2 ? 3 : 2;
            return {...o,prospectionOrigin:true}
          }
        } else {
          return {...o,prospectionOrigin:true};
        } 
      })
    //   --------------------
    console.log('newObj',newObj);
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
  return (
    <div className="content">
      <div
        className="ag-theme-alpine"
        style={{ height: '100%', width: '100%' }}
      >
         <AgGridReact
           rowData={rows}
           rowHeight={40}
           cellStyle={{ fontFamily:'Montserrat,sans-serif',fontSize:'13px',fontWeight:'500', color:'#3B3B3B'}}
           domLayout="autoHeight"
           context={{
            loadApplications
           }}
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
            field="name"
            headerName="Nombre"
            cellRenderer="slotName"
            wrapText={true}
            filter="agTextColumnFilter"
            width={200}
          />
          <AgGridColumn
            field="rating"
            headerName="Rating"
            cellRenderer="slotRating"
            wrapText={true}
            width={200}
          />
          <AgGridColumn 
          headerName="Prospeccion"
          field="name_prospection" width={250}
          wrapText={true}
          filter="agTextColumnFilter"
          cellRenderer="slotProspection"
          />
           <AgGridColumn 
          headerName="Colegio"
          filter="agTextColumnFilter"
          field="colName" width={250} />
           <AgGridColumn 
          headerName="Pais"
          filter="agTextColumnFilter"
          field="colCountry" width={250} />
           <AgGridColumn 
          headerName="Status"
          filter="agTextColumnFilter"
          field="status" width={250} />
            {/* <span style={{textTransform:'none'}}>Nombre</span>
                        <span style={{textTransform:'none', paddingLeft:'18%'}}>Prospeccion</span>
                        <span style={{textTransform:'none',paddingLeft:'8%'}}>Colegio</span>
                        <span style={{textTransform:'none',paddingLeft:'8%'}}>Pais</span>
                        <span style={{textTransform:'none',paddingLeft:'12%'}}>Status</span>
                         </th>   
        */}
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
    //     text = value;
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
export const SlotProspection = function SlotProspection(props) {
    const {rowIndex,value} = props
    const array = props.agGridReact.props.rowData;
     const showName = (obj) => {
       let text = " ";
       const {data} = obj;
       if(data.prospectionOrigin === true){
        text = value;
       } else {
         text = " ";
       }
       return text;
     }
     return (
         <>
             <span>{showName(props)}</span>
         </>
     )  
}

export const SlotRating = function SlotRating(props) {
  const [rating,setRating] = useState(props.value ? parseInt(props.value) : 0);
  const changeRating = (e) => {
      let contact = props.data;
      contact.id = contact.id_last_contact;
      contact.rating = e;
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
                  props.context.loadApplications();
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
    starRatedColor={'rgb(230, 67, 47)'}
    changeRating={(e) => changeRating(e)}
   numberOfStars={5}
    name='rating'
                  />
  </>
  )
}
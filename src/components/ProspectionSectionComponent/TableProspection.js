import React, { useState, useEffect } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import axios from 'axios';
import { constaApi } from '../../constants/constants';

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
    axios.post(constaApi + 'prospectionSection')
      .then(function (response) {
        checkValues(response.data);
        const result = _.groupBy(response.data,"name")
        setAuxRow(result);
        console.log('result',result);
      }).catch(error => {
      });
  }, [])
  const [frameworkComponents, setFramwrokw] = useState({ slotName: SlotName});
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
    if(newObj){
      console.log('NEWOBJ',newObj);
      setRows(newObj);
    }
    // console.log('new',newObj);

  }
  const quickSearch = (value) => {
    console.log('GRIDAPI',gridApi)
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
            width={200}
          />
          <AgGridColumn 
          headerName="Prospeccion"
          field="name_prospection" width={250} />
           <AgGridColumn 
          headerName="Status"
          field="status" width={250} />
         {/* <AgGridColumn 
          headerName="Color"
          field="color" width={250} />
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
    if(data.origin === true){
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
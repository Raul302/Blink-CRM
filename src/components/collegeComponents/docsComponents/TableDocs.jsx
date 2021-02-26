import React,{useState} from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';


export default function TableDocs() {

    // Vars
    const [frameworkComponents, setFramwrokw] = useState(
        // { slotType: slotType, slotDate: SlotDate,slotParticipants: SlotParticipants,slotDetalle: SlotDetalle}
        );
    const [gridApi, setGridApi] = useState();
    const [columnApi, setColumnApi] = useState();
    const [bioRecords,setBioRecords] = useState();
    // end vars
    // Methods
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
    // end Methods
    return (
        <div  className="ag-theme-alpine"
        style={{ height: "100%", width: "100%" }}>
          <AgGridReact
                // context={{
                //   showModal,
                // }}
                defaultColDef={{ resizable: true }}
                rowData={bioRecords}
                rowHeight={40}
                domLayout="autoHeight"
                onGridReady={onGridReady}
                // onFirstDataRendered={onFirstDataRendered}
                frameworkComponents={frameworkComponents}
                pagination={true}
                paginationPageSize={10}
                paginationNumberFormatter={function (params) {
                  return params.value.toLocaleString() ;
                }}
                rowSelection="multiple"
              >
                <AgGridColumn
                  cellRenderer="slotType"
                  headerName="Ciclo"
                  field="name"
                  width="350"
                />
                <AgGridColumn
                  headerName="Archivo"
                  field="type"
                  width="300"
                  cellRenderer="slotDate"
                />
                <AgGridColumn
                  headerName="Colaborador"
                  field="text"
                  width="200"
                  cellRenderer="slotDetalle"
                />
                <AgGridColumn
                  headerName="Acciones"
                  width="230"
                  cellRenderer="slotParticipants"
                />
              </AgGridReact>
        </div>
    )
}

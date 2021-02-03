import React, { useEffect, useState, useRef } from 'react'
import NotificationAlert from "react-notification-alert";
import { useDispatch, useSelector } from 'react-redux';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import {
    Card,
    CardHeader,
    CardBody,
    Table,
    Row,
    Col,
} from "reactstrap";
import { Popover, OverlayTrigger, } from 'react-bootstrap';
import * as FIIcons from "react-icons/fi";
import * as FAIcons from "react-icons/fa";
import * as Imicons from "react-icons/im";
import * as AIcons from "react-icons/ai";
import Skeleton from 'react-loading-skeleton';
import {GeneralFormat,SlotActions,SlotName} from './SlotsStaff';

export default function TableStaff(props) {
    // variables
    const notificationAlert = useRef();
    const [frameworkComponents,setFramwrokw] = useState({slotName:SlotName,slotActions: SlotActions,generalFormat:GeneralFormat });
    const [gridApi, setGridApi] = useState();
    const [columnApi, setColumnApi] = useState();
    const { loading } = useSelector(state => state.ui);
    const { staffs:rowData } = useSelector(state => state.staff);
    const [columnDefs, setColumns] = useState([
        { headerName: "Nombre", field: "name",
        cellRenderer:"slotName",
        cellRendererParams: {
            clicked: function(data) {
              alert(`${data} was clicked`);
            },
        }
    },
        { headerName: "Puesto", field: "position",
        cellRenderer:'generalFormat' },
        { headerName: "Email", field: "email" },
        { headerName: "Telefono", field: "phone" },
        { headerName: "Ext.", field: "ext" },
        { headerName: "Acciones",
        cellRenderer:"slotActions",
        cellRendererParams: {
            clickx: function(data) {
              props.click(data);
            },
        }}
    ]);
    
    // Methods
    const showDate = () => { }
    const showEmailsTO = () => { }
    const completeReminder = () => { }
    const editReminder = () => { }
    const deleteReminder = () => { }
    const clickHandler = (e) => {console.log('click',e);}
    const onGridReady = (params) => {
        setGridApi(params.api);
        setColumnApi(params.columnApi);
       
        
    }
    // Components
    const PopoverComponent = (text) => {
        return (<Popover id="popover-basic">
            <Popover.Content>
                <strong>{text}</strong>
            </Popover.Content>
        </Popover>)
    }
    return (
        <>
            <div className="content">
                <NotificationAlert ref={notificationAlert} />
                {!loading ?
                      <div
                        className="ag-theme-balham"
                        style={{ height: '100%', width: '100%' }}
                        >
                             <AgGridReact
                            columnDefs={columnDefs}
                            rowData={rowData}
                            pagination={true}
                            rowSelection="multiple"
                            defaultColDef={{
                                width: 150,
                                sortable: true,
                                resizable: true,
                                filter: true,
                              }}
                              rowHeight={40}
                            domLayout="autoHeight"
                            frameworkComponents={frameworkComponents}
                            onGridReady={onGridReady}
                            />
                    </div>
                    :
                    <div class="row mt-2">
                        <NotificationAlert ref={notificationAlert} />
                        <Skeleton width="60rem" height={30} count={10} />
                    </div>
                }

            </div>
        </>
    )
}

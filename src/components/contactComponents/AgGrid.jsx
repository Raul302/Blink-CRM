
import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {render} from 'react-dom';
import {AgGridColumn, AgGridReact} from '@ag-grid-community/react';

import {AllCommunityModules} from "@ag-grid-community/all-modules";
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';



function GridExample(props) {
    const SquareRenderer = props => {
        const valueSquared = (value) => {
            return value * value;
        };
    
        return <span>{valueSquared(props.value)}</span>;
    };
    
    const CubeRenderer = props => {
        const valueCubed = (value) => {
            return value * value * value;
        };
    
        return <span>{valueCubed(props.value)}</span>;
    };
    
    const ParamsRenderer = props => {
        return <span>Field: {props.colDef.field}, Value: {props.value}</span>
    };
    
    const CurrencyRenderer = forwardRef((props, ref) => {
        const [value, setValue] = useState(props.value);
    
        const formatValueToCurrency = (currency, value) => {
            return `${currency}${value.toFixed(2)}`
        };
    
        useImperativeHandle(ref, () => {
            return {
                refresh: (params) => {
                    if (params.value !== value) {
                        setValue(params.value)
                    }
                    return true;
                }
            };
        });
    
        return <span>{formatValueToCurrency('EUR', value)}</span>
    });
    
    const ChildMessageRenderer = props => {
        const invokeParentMethod = () => {
            props.context.methodFromParent(`Row: ${props.node.rowIndex}, Col: ${props.colDef.field}`)
        };
    
        return <span><button style={{height: 20, lineHeight: 0.5}} onClick={invokeParentMethod} className="btn btn-info">Invoke Parent</button></span>;
    };
    
    const createRowData = () => {
        const rowData = [];
        for (let i = 0; i < 15; i++) {
            rowData.push({
                row: "Row " + i,
                value: i,
                currency: i + Number(Math.random().toFixed(2))
            });
        }
        return rowData;
    };
    useEffect(() => {
        console.log('TableContacts');
        console.log()
    },[props]);
    const [rowData, setRowData] = useState(props.rowData);
    

    return (
        <div style={{width: '500px', height: '1000px'}}>
            <div className="test-container">
                <div className="test-header">
                    <div
                        style={{
                            height: '600px',
                            width: '700px'
                        }}
                        className="ag-theme-alpine test-grid">
                        <AgGridReact
                            modules={AllCommunityModules}
                            rowData={rowData}
                            // we use immutableData here to ensure that we only re-render what has changed in the grid
                            // see https://www.ag-grid.com/javascript-grid-immutable-data/ for more information
                            immutableData={true}
                            getRowNodeId={data => data.row}
                            frameworkComponents={{
                                squareRenderer: SquareRenderer,
                                cubeRenderer: CubeRenderer,
                                paramsRenderer: ParamsRenderer,
                                currencyRenderer: CurrencyRenderer,
                                childMessageRenderer: ChildMessageRenderer
                            }}
                            defaultColDef={{
                                editable: true,
                                sortable: true,
                                flex: 1,
                                minWidth: 100,
                                filter: true,
                                resizable: true
                            }}>
                            <AgGridColumn field="row" width={150}/>
                            <AgGridColumn field="value" cellRenderer='squareRenderer' editable={true} colId="square"/>
                            <AgGridColumn field="value" cellRenderer='cubeRenderer' colId="cube"/>
                            <AgGridColumn field="row" cellRenderer='paramsRenderer' colId="params"/>
                            <AgGridColumn field="row" cellRenderer='paramsRenderer' colId="params"/>
                            <AgGridColumn field="currency" cellRenderer='currencyRenderer' colId="currency"/>
                            <AgGridColumn field="value" cellRenderer='childMessageRenderer' colId="params"/>
                        </AgGridReact>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default GridExample;

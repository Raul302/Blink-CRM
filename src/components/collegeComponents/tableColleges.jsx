import React,{ useEffect } from 'react'
import *  as FAIcons from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { loadColleges } from '../../helpers/loadColleges'; 
import { useHistory } from 'react-router-dom';
import {activeCollege} from '../../actions/colleges';
import Skeleton from 'react-loading-skeleton';

function TableColleges() {
    const {colleges} = useSelector( state => state.colleges);
    const { loading } = useSelector(state => state.ui);
    const history = useHistory();
    const dispatch = useDispatch();
    function handleGoto(obj){
        dispatch( activeCollege( obj.id,obj) );
         history.replace("colleges/"+ 13 + "/detail");
    }
    return (
        <> {loading ?
            <div class="row mt-2">
                <Skeleton width="60rem"  height={30} count={10} />
            </div>

        :
            <div className="ag-theme-alpine twml mt-3" style={{ width: '100%', height: '300px' }}>
                    <table class="table">
                        <thead style={{ backgroundColor: '#F8F8F8' }} >
                            <tr>
                                <th >Colegios</th>
                                <th >Tipo</th>
                                <th >País</th>
                                <th ># Prospecciones</th>
                                <th ># Aplicaciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {colleges.map((row,index) => (
                                <tr key={index}>
                                <td><a  onClick={(e)=>handleGoto(row)}>
                                    {row.name}
                                    </a>
                                    </td>
                                    <td>{row.type}</td>
                                    <td>{row.country}</td>
                                    <td> #</td>
                                    <td> # </td>
                                    </tr>
                                ))} 
                        </tbody>
                    </table>      
                    </div> 
        }
        </>
    )
}

export default TableColleges

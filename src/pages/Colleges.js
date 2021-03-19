import React,{useEffect} from 'react'
import AddOrEditCollege from '../components/collegeComponents/AddOrEditCollege';
import TableColleges from '../components/collegeComponents/TableColleges';
import { useDispatch, useSelector } from 'react-redux';
import { starLoadingColleges } from 'actions/colleges/colleges';
import { setColleges } from 'actions/colleges/colleges';
function Colleges() {
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch ( setColleges([]) );   
        dispatch ( starLoadingColleges() );
    },[])
    return (
        <div className="content">
        <div class="row">
            <div class="col-12">
            <div class="col d-flex justify-content-end">
            <AddOrEditCollege />
            </div>
            <TableColleges />
                </div>
        </div>
        </div>
    )
}

export default Colleges

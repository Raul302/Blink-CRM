import React,{useEffect,useState} from 'react'
import AddOrEditCollege from '../components/collegeComponents/AddOrEditCollege';
import TableColleges from '../components/collegeComponents/TableColleges';
import { useDispatch, useSelector } from 'react-redux';
import { starLoadingColleges } from 'actions/colleges/colleges';
import { setColleges } from 'actions/colleges/colleges';
import SearchBar from 'components/GeneralComponents/SearchBar';
function Colleges() {
    const dispatch = useDispatch();
    const [param,setParam] = useState(null);

    const consult = (e) => {
        e.target.value === "" ?  setParam('keyWordSeccret302') :  setParam(e.target.value);
    }
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
            <SearchBar consult={(e) => consult(e)}/>
            <TableColleges  param={param}/>
                </div>
        </div>
        </div>
    )
}

export default Colleges

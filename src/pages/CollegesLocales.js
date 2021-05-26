import React,{useEffect,useState} from 'react'
import AddOrEditCollege from '../components/collegeComponents/AddOrEditCollege';
import TableColleges from '../components/collegeComponents/TableColleges';
import { useDispatch, useSelector } from 'react-redux';
import { setColleges } from 'actions/colleges/colleges';
import SearchBar from 'components/GeneralComponents/SearchBar';
import { starLoadingLocalColleges } from 'actions/colleges/colleges';
export default function CollegesLocales() {
    const dispatch = useDispatch();
    const [param,setParam] = useState(null);

    const consult = (e) => {
        e.target.value === "" ?  setParam('keyWordSeccret302') :  setParam(e.target.value);
    }
    useEffect(()=> {
        dispatch ( setColleges([]) );   
        dispatch ( starLoadingLocalColleges() );
    },[])
    return (
        <div className="content">
        <div class="row">
            <div class="col-12">
            <div class="col d-flex justify-content-end">
            <AddOrEditCollege type={'Locale'} />
            </div>
            <SearchBar consult={(e) => consult(e)}/>
            <TableColleges collegesLocales={true} param={param}/>
                </div>
        </div>
        </div>
    )
}
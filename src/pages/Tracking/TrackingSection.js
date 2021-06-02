import SearchBar from 'components/GeneralComponents/SearchBar';
import React,{useState} from 'react'
import TableTracking from './TableTracking';

export default function TrackingSection() {
    const [param,setParam] = useState(null);

    const consult = (e) => {
        e.target.value === "" ?  setParam('keyWordSeccret302') :  setParam(e.target.value);
    }
    return (
        <div class="content">
        <div class="row">
        <div class="col-12">
        <SearchBar consult={(e) => consult(e)}/>
            <TableTracking  param={param} />
        </div>
        </div>
        </div>
    )
}

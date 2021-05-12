import TableApplication from 'components/ApplicationSectionComponent/TableApplication'
import SearchBar from 'components/GeneralComponents/SearchBar';
import React,{useState} from 'react'

export default function ApplicationSection() {
    const [param,setParam] = useState(null);

    const consult = (e) => {
        e.target.value === "" ?  setParam('keyWordSeccret302') :  setParam(e.target.value);
    }
    return (
        <div class="content">
        <div class="row">
        <div class="col-12">
        <SearchBar consult={(e) => consult(e)}/>
            <TableApplication  param={param} />
        </div>
        </div>
        </div>
    )
}

import SearchBar from 'components/GeneralComponents/SearchBar';
import React,{useState} from 'react'
import TableProspection from '../components/ProspectionSectionComponent/TableProspection';
export default function ProspectionSection() {
    const [param,setParam] = useState(null);

    const consult = (e) => {
        e.target.value === "" ?  setParam('keyWordSeccret302') :  setParam(e.target.value);
    }
    return (
        <div class="content">
        <div class="row">


        <div class="col-12">
        <SearchBar consult={(e) => consult(e)}/>
            <TableProspection  param={param} />
        </div>
        </div>
        </div>

    )
}

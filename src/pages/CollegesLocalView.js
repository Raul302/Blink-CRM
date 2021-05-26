import React, {useState} from 'react'
import { useParams,} from "react-router";
import { BrowserRouter as Router, Link, useLocation  } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CollegesLocalView() {
    let { id } = useParams();
    const { pathname } = useLocation();
    let {active} = useSelector( state => state.colleges);
    if(!active){
       active =  JSON.parse(localStorage.getItem('collegeActive'));
    }
    return (
        <div style={{minHeight:'0px'}} className="pb-0 content">
        <h1 style={{marginTop:'-10px'}} className="Inter400">{active.name}</h1>
            <div style={{marginTop:'-20px'}} className=" mt-3sc-bdVaJa styles__Nav-sc-19n49a3-0 gOZeoI">
               <Link className={[ '/localColleges/'+id +'/bio'].includes(pathname) ? 
               'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active Inter600' : 'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl Inter600'} 
               to={"/localColleges/"+id+"/bio"}>Bitacora</Link>

               <Link className={[ '/localColleges/'+id +'/detail'].includes(pathname) ? 
               'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active Inter600' : 'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl Inter600'} 
               to={"/localColleges/"+id+"/detail"}>Detalles</Link>

             <Link  className={[ '/localColleges/'+id +'/staff'].includes(pathname) ? 
               'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active Inter600' : 'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl Inter600'} 
               to={"/localColleges/"+id+"/staff"}>Staff</Link>

                <Link  className={[ '/localColleges/'+id +'/docs'].includes(pathname) ? 
               'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active Inter600' : 'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl Inter600'} 
               to={"/localColleges/"+id+"/docs"}>Doc</Link>

                <Link  className={[ '/localColleges/'+id +'/reminds'].includes(pathname) ? 
               'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active Inter600' : 'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl Inter600'} 
               to={"/localColleges/"+id+"/reminds"}>Recordatorios</Link>
        </div>
        </div>
    )
}

import React, {useState} from 'react'
import { useParams,} from "react-router";
import { BrowserRouter as Router, Switch, 
    Route, Link, useLocation  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


export default function ContactsView(props) {
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
               <Link className={[ '/colleges/'+id +'/bio'].includes(pathname) ? 
               'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active Inter600' : 'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl Inter600'} 
               to={"/colleges/"+id+"/bio"}>Bitacora</Link>

               <Link className={[ '/colleges/'+id +'/detail'].includes(pathname) ? 
               'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active Inter600' : 'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl Inter600'} 
               to={"/colleges/"+id+"/detail"}>Detalles</Link>

             <Link  className={[ '/colleges/'+id +'/contact'].includes(pathname) ? 
               'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active Inter600' : 'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl Inter600'} 
               to={"/colleges/"+id+"/staff"}>Staff</Link>

                <Link  className={[ '/colleges/'+id +'/docs'].includes(pathname) ? 
               'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active Inter600' : 'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl Inter600'} 
               to={"/colleges/"+id+"/docs"}>Doc</Link>

                <Link  className={[ '/colleges/'+id +'/reminds'].includes(pathname) ? 
               'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active Inter600' : 'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl Inter600'} 
               to={"/colleges/"+id+"/reminds"}>Recordatorios</Link>
        </div>
        </div>
    )
}

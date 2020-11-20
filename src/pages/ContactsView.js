import React from 'react'
import { useParams,} from "react-router";
import { BrowserRouter as Router, Switch, 
    Route, Link, useLocation  } from 'react-router-dom';


export default function ContactsView() {
    let { id } = useParams();
    const { pathname } = useLocation();

    return (
        <>
         <div className="mt-3 container cwml">
            <h1 className="Inter400">{id}</h1>
            <div class=" mt-3sc-bdVaJa styles__Nav-sc-19n49a3-0 gOZeoI">
               <Link className={[ '/contacts/'+id +'/bio'].includes(pathname) ? 
               'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active Inter600' : 'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl Inter600'} 
               to={"/contacts/"+id+"/bio"}>Bitacora</Link>

               <Link className={[ '/contacts/'+id +'/profile'].includes(pathname) ? 
               'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active Inter600' : 'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl Inter600'} 
               to={"/contacts/"+id+"/profile"}>Perfil</Link>

             <Link  className={[ '/contacts/'+id +'/references'].includes(pathname) ? 
               'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active Inter600' : 'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl Inter600'} 
               to={"/contacts/"+id+"/references"}>Referencias</Link>
        </div>
        </div>
        </>
    )
}

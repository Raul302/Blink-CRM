import React, {useState} from 'react'
import { useParams,} from "react-router";
import { BrowserRouter as Router, Switch, 
    Route, Link, useLocation  } from 'react-router-dom';


export default function ContactsView(props) {
    let { id } = useParams();
    const { pathname } = useLocation();
    const [fullName,setFullName] = useState(`${props.contact.name} ${props.contact.father_lastname}`);
    return (
        <>
         <div style={{minHeight:'0px'}} className="pb-0 content">
            <h1  style={{marginTop:'-10px'}} className="Inter400">{fullName}</h1>
            <div style={{marginTop:'-20px'}} className=" mt-3sc-bdVaJa styles__Nav-sc-19n49a3-0 gOZeoI">
               <Link className={[ '/contacts/'+id +'/bio'].includes(pathname) ? 
               'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active Inter600' : 'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl Inter600'} 
               to={"/contacts/"+id+"/bio"}>Bitacora</Link>

               <Link className={[ '/contacts/'+id +'/profile'].includes(pathname) ? 
               'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active Inter600' : 'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl Inter600'} 
               to={"/contacts/"+id+"/profile"}>Perfil</Link>

             <Link  className={[ '/contacts/'+id +'/references'].includes(pathname) ? 
               'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active Inter600' : 'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl Inter600'} 
               to={"/contacts/"+id+"/references"}>Referencias</Link>

                <Link  className={[ '/contacts/'+id +'/docs'].includes(pathname) ? 
               'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active Inter600' : 'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl Inter600'} 
               to={"/contacts/"+id+"/docs"}>Doc</Link>

                <Link  className={[ '/contacts/'+id +'/reminders'].includes(pathname) ? 
               'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active Inter600' : 'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl Inter600'} 
               to={"/contacts/"+id+"/reminders"}>Recordatorios</Link>

                <Link  className={[ '/contacts/'+id +'/prospection'].includes(pathname) ? 
               'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active Inter600' : 'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl Inter600'} 
               to={"/contacts/"+id+"/prospection"}>Prospecciones</Link>
        </div>
        </div>
        </>
    )
}

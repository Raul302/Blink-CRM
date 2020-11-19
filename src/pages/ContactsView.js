import React from 'react'
import { useParams} from "react-router";
import { BrowserRouter as Router, Switch, 
    Route, Link } from 'react-router-dom';

export default function ContactsView() {
    let { id } = useParams();
    return (
        <>
         <div className="mt-3 container cwml">
            <h1 className="Inter400">{id}</h1>
            <div class=" mt-3sc-bdVaJa styles__Nav-sc-19n49a3-0 gOZeoI">
               <Link class="mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active" 
               to={"/contacts/"+id+"/tabOne"}>Tab One</Link>
               <Link class="mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active" 
               to={"/contacts/"+id+"/tabTwo"}>Tab Two</Link>
             <Link class="mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active" 
               to={"/contacts/"+id+"/tabThree"}>Tab Three</Link>
        </div>
        </div>
        </>
    )
}

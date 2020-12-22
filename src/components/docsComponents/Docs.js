import React, {useState} from 'react'
import { useParams,} from "react-router";
import '../../styles/GlobalStyles.css';
import { BrowserRouter as Router, Switch, 
    Route, Link, useLocation  } from 'react-router-dom';

function Docs() {
    return (
    <>
        <div className="content">
        <div class=" mt-3sc-bdVaJa styles__Nav-sc-19n49a3-0 ">
        <span class="Inter">Fotografia</span>
        <span class="Inter">Pasaportes</span>
        <span class="Inter">Calificaciones</span>
        <span class="Inter">Doc.Adicionales</span>
        <span class="Inter">Doc.Admisión</span>
        </div>


        </div>
    </>
    )
}

export default Docs

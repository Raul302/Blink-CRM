import React, { useEffect, useState } from 'react';
import * as FIIcons from "react-icons/fi";
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useAlert } from 'react-alert';
import ReferencesData from '../referencesComponent/ReferencesData';
import WithouReferences from '../referencesComponent/WithoutReferences';

function References(props) {
    const [type_ref,setTypeRef] =useState();
    const [references,setReferences] = useState();
    const [loading,setLoading] = useState(true);
    useEffect(() => {
        consultReferences();
        // typeRef(props.reference);
    }, [props])
    console.log('references',references);
    async function consultReferences() {
         setLoading(true);
        await axios.post('http://api.boardingschools.mx/api/references/show/refcontact',{
            id:props.contact.id,
            headers: {
                "Accept": "application/json"
            }
        }).then(function (response) {
        setReferences(response.data);
         setLoading(false);
        });
    }
    function update(){
        props.updateRoute();
    }
    
    return (
        <>
            <div className="mt-3 container cwml">
            { loading === true ?
            <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
            </div>
            :
            [ ( references.length > 0 ? 
             references.map((ref,index) => 
                 <ReferencesData handlerUpdate={update} id={ref.id} reference={ref} />
             )
                :
                <WithouReferences handlerUpdate={update} id={props.contact.id} />
                )]
            }
            </div>
        </>
    )
}

export default References

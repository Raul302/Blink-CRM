import React, { useEffect, useState } from 'react';
import * as FIIcons from "react-icons/fi";
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useAlert } from 'react-alert';
import ReferencesData from '../referencesComponent/ReferencesData';
import WithouReferences from '../referencesComponent/WithoutReferences';
import { constaApi } from '../../constants/constants';

function References(props) {
    const [type_ref,setTypeRef] =useState();
    const [references,setReferences] = useState();
    const [loading,setLoading] = useState(true);
    const[token,setToken] = useState();
    useEffect(() => {
        getToken();
        consultReferences();
    }, [props])
    async function consultReferences() {
         setLoading(true);
        await axios.get( constaApi+'referencesbyId/'+props.contact.id,{
            headers: {
                "Accept": "application/json"
            }
        }).then(function (response) {
        setReferences(response.data);
         setLoading(false);
        });
    }
    function update(){
        props.noReload === true ? props.update() : consultReferences();
        props.noReload === true ? consultReferences() : props.updateRoute();
    }
    async function getToken(){
        //    info : L6HkSxDySdCLf8NsKYB64pLX5rE4XJVQvG0ROvYXBwYXZ7e0kRlU7gwVgo49xcFX6FI
        await axios.get('https://www.universal-tutorial.com/api/getaccesstoken', {
            headers: {
                "Accept": "application/json",
                "user-email": "18090130@gmail.com",
                "api-token": "L6HkSxDySdCLf8NsKYB64pLX5rE4XJVQvG0ROvYXBwYXZ7e0kRlU7gwVgo49xcFX6FI"
            }
        }).then(function (response) {
            setToken(response.data.auth_token);
            localStorage.setItem('tokenStates', JSON.stringify(response.data.auth_token));
        });
    }
    
    return (
        <>
            <div className=" mt-n2 content">
            <WithouReferences handlerUpdate={update} id={props.contact.id} />
            { loading === true ?
            <div class="spinner-border text-primary" role="status">
            <span class="sr-only">Loading...</span>
            </div>
            :
            [ ( references.length > 0 ? 
             references.map((ref,index) => 
                 <ReferencesData handlerUpdate={update} token={token} id={ref.id} reference={ref} />
             )
                :
                ''
                // <WithouReferences handlerUpdate={update} id={props.contact.id} />
                )]
            }
            </div>
        </>
    )
}

export default References

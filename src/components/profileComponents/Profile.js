import React,{useEffect,useState} from 'react';
import '../../styles/GlobalStyles.css';
import PersonalData from '../profileComponents/PersonalData';
import axios from 'axios';

function Profile(props) {
    const[token,setToken] = useState();
    useEffect(() => {
        getToken();
    }, [props]);

    function updateProfile(){
        props.updateRoute();
    }
    async function getToken(){
        //    info : L6HkSxDySdCLf8NsKYB64pLX5rE4XJVQvG0ROvYXBwYXZ7e0kRlU7gwVgo49xcFX6FI
        // await axios.get('https://www.universal-tutorial.com/api/getaccesstoken', {
        //     headers: {
        //         "Accept": "application/json",
        //         "user-email": "18090130@gmail.com",
        //         "api-token": "L6HkSxDySdCLf8NsKYB64pLX5rE4XJVQvG0ROvYXBwYXZ7e0kRlU7gwVgo49xcFX6FI"
        //     }
        // }).then(function (response) {
        //     setToken(response.data.auth_token);
        // });
    }
    return (
        <>
            <div className=" mt-n2 content">
            <PersonalData handleUpdate={updateProfile} token={token} contact={props.contact}/>
            </div>
        </>
    )
}

export default Profile

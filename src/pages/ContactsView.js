import React, {useState,useRef,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams,} from "react-router";
import StarRatings from '../../node_modules/react-star-ratings';
import { BrowserRouter as Router, Switch, 
    Route, Link, useLocation  } from 'react-router-dom';
    import swal from 'sweetalert';
    import axios from 'axios';
import { constaApi } from 'constants/constants';
import NotificationAlert from "react-notification-alert";
import {removeMessage} from 'actions/uiNotificactions/ui';



export default function ContactsView(props) {
    const dispatch = useDispatch();
    const notificationAlert = useRef();
    const {msgError } = useSelector(state => state.ui);
    let { id } = useParams();
    const { pathname } = useLocation();
    const [fullName,setFullName] = useState(`${props.contact.name} ${props.contact.father_lastname} ${props.contact.mother_lastname ?? " "}`);
    const [rating,setRating] = useState(props.contact.rating ? parseInt(props.contact.rating) : 0);

    useEffect(() => {
        if(msgError != null){
            notification('success',msgError);
            dispatch(removeMessage());
        }

    },[msgError])
    const loadRating = async () => {
        await axios.get(constaApi+'contacts/'+props.contact.id,{
            headers: {
                "Accept": "application/json"
            }
        }).then(function (response) {
            setRating(parseInt(response.data[0].rating));
        }).catch(error =>{
        });
    }
    const changeRating = (e) => {
        let {contact} = props;
        contact.rating = e;
        swal({
            title: "Estas seguro?",
            text: "Usted modificara la calificacion de este contacto",
            icon: "info",
            dangerMode: true,
            buttons: ["No","Si"],
          })
          .then((willDelete) => {
            if (willDelete) {
                 axios.post(constaApi+'contact/update',contact, {
                    headers: {
                        "Accept": "application/json"
                    }
                }).then(function (response) {
                   loadRating();
                }).catch(error =>{
                });
            } else {
              swal("Operacion cancelada!");
            }
          });
    }
    const notification =  (type,message) => {
        let place = "tc";
        var options = {};
        options = {
          place: place,
          message: (
            <div>
              <div>
                {message}
              </div>
            </div>
          ),
          type: type,
          icon: "nc-icon nc-bell-55",
          autoDismiss: 7,
          }
        notificationAlert.current.notificationAlert(options);
     }
  
    return (
        <>
         <div style={{minHeight:'0px'}} className="pb-0 content">
             <p>
                 <span class="Inter400"style={{}}>{fullName}</span> 
                 <span style={{marginTop:'-50px'}}> <StarRatings
                    rating={rating}
                    starDimension={'20px'}
                    starEmptyColor={'gray'}
                    starRatedColor={'#ffd200'}
                    changeRating={(e) => changeRating(e)}
                    numberOfStars={5}
                    name='rating'
                    /></span>
                 </p>
                
                 <NotificationAlert ref={notificationAlert} />

            <div style={{marginTop:'-20px'}} className=" mt-3sc-bdVaJa styles__Nav-sc-19n49a3-0 gOZeoI">
               <Link className={[ '/contacts/'+id +'/bio'].includes(pathname) ? 
               'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active montse' : 'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl montse'} 
               to={"/contacts/"+id+"/bio"}>Bitácora</Link>

               <Link className={[ '/contacts/'+id +'/profile'].includes(pathname) ? 
               'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active montse' : 'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl montse'} 
               to={"/contacts/"+id+"/profile"}>Perfil</Link>

             <Link  className={[ '/contacts/'+id +'/references'].includes(pathname) ? 
               'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active montse' : 'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl montse'} 
               to={"/contacts/"+id+"/references"}>Referencias</Link>

                <Link  className={[ '/contacts/'+id +'/docs'].includes(pathname) ? 
               'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active montse' : 'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl montse'} 
               to={"/contacts/"+id+"/docs"}>Doc</Link>

                <Link  className={[ '/contacts/'+id +'/reminders'].includes(pathname) ? 
               'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active montse' : 'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl montse'} 
               to={"/contacts/"+id+"/reminders"}>Recordatorios</Link>

                <Link  className={[ '/contacts/'+id +'/prospection'].includes(pathname) ? 
               'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active montse' : 'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl montse'} 
               to={"/contacts/"+id+"/prospection"}>Prospecciones</Link>

<Link  className={[ '/contacts/'+id +'/applications'].includes(pathname) ? 
               'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl active montse' : 'mr-4 styles__NavLink-sc-19n49a3-1 iGbtBl montse'} 
               to={"/contacts/"+id+"/applications"}>Aplicaciones</Link>
        </div>
        </div>
        </>
    )
}

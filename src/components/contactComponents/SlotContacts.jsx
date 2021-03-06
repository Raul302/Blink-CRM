import { Link } from "react-router-dom";
import *  as RIcons from "react-icons/ri";
import { activeContact } from "actions/contacts/contacts/contacts";
import { useDispatch, useSelector } from 'react-redux';
import * as FAIcons from "react-icons/fa";
import swal from 'sweetalert';
import StarRatings from '../../../node_modules/react-star-ratings';
import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import { constaApi } from "constants/constants";


export const SlotRef1 = function SlotRef1(props) {
    const {value} = props;
    return (
        <>
        {value[0] &&
        <span>{value[0].name + " " + value[0].father_lastname + " " + value[0].mother_lastname}</span>
        }
        </>
    )
}

export const SlotRef2 = function SlotRef2(props) {
    const {value} = props;
    return (
        <>
        {value[1] &&
        <span>{value[1].name + " " + value[1].father_lastname + " " + value[1].mother_lastname}</span>
        }
        </>
    )
}

export const SlotRef3 = function SlotRef3(props) {
    const {value} = props;
    return (
        <>
        {value[2] &&
        <span>{value[2].name + " " + value[2].father_lastname + " " + value[2].mother_lastname}</span>
        }
        </>
    )
}


export const SlotRating = function SlotRating(props) {
    const [rating,setRating] = useState(props.value ? parseInt(props.value) : 0);
    const changeRating = (e) => {
        let contact = props.data;
        contact.rating = e;
        swal({
            title: "Estas seguro?",
            text: "Usted modificara la calificacion de este contacto",
            icon: "info",
            buttons: ["No","Si"],
          })
          .then((willDelete) => {
            if (willDelete) {
                 axios.post(constaApi+'contact/update',contact, {
                    headers: {
                        "Accept": "application/json"
                    }
                }).then(function (response) {
                    setRating(response.data.rating);
                //    loadRating();
                }).catch(error =>{
                });
            } else {
              swal("Operacion cancelada!");
            }
          });
    }
    return (
    <>
     <StarRatings
      rating={rating}
      starDimension={'16px'}
      starEmptyColor={'gray'}
      starRatedColor={'#ffd200'}
      starHoverColor={'#ffd200'}
      starSpacing="2px"
      changeRating={(e) => changeRating(e)}
     numberOfStars={5}
      name='rating'
                    />
    </>
    )
}

export const SlotName = function SlotName(props) {
    const dispatch = useDispatch();

    const showName = (id = null, fullname = "") => {
        const click = () => {
        dispatch( activeContact(props.data) );
        }
        let n = fullname ? fullname.split(" ") : " ";
        let tag = '';
        n = n ? n[0].charAt(0) + n[1].charAt(0) : null;
        tag = <>
            <Link  onClick={(e) => click(props.data)} to={"contacts/" + (id) + "/bio"}>
                <span class="mt-1 mr-2 sc-caSCKo fXbvQO styles__Company-sc-103gogw-0 jdbeFR">{n}</span>
                <span>{fullname} </span>
            </Link>
        </>;
        return tag;
    }
    return (
        <>
            <span>{showName(props.data.id, props.data.fullname ? props.data.fullname : (props.data.name + " " + props.data.father_lastname + " " + props.data.mother_lastname))}</span>
        </>
    )
}

export const SlotOrigin = function SlotOrigin(props) {
    const { city, state } = props.data;
    return (
        <>
            <span>{city ? city + ',' : ''}{state ? state : ''}</span>
        </>
    )
}

export const SlotProgram = function SlotProgram(props) {
    const {value} = props;
    const showModalS = (value) => {
        props.context.modalProspections(value);
    }
    return (
        <>
          <a> <RIcons.RiEyeFill onClick={(e) => showModalS(value)} style={{ color: '#497cff' }} size={18} /></a>
        </>
    )
}

export const SlotActions = function (props) {
   const user = JSON.parse(localStorage.getItem('user'));
    const deleteContact = (id = null) => {
        swal({
            title: "Estas seguro?",
            text: "Una vez eliminado,no podras recuperar este Contacto!",
            icon: "warning",
            dangerMode: true,
            buttons: ["No","Si"],
          })
          .then((willDelete) => {
            if (willDelete) {
            props.context.dropContact(id);
            } else {
              swal("Operacion cancelada!");
            }
          });
        }
    return (
        <>
        {user.type == "Administrador"
        &&
        <a>
            <FAIcons.FaTrashAlt title="Eliminar" style={{ color: '#DC3545' }} size={18} onClick={(e) => { deleteContact(props.data.id) }} />
        </a>
        }
        </>
    )
}
{/* <tr key={row.id}>
                                                <td><RIcons.RiUser3Fill size={32} />
                                                    <Link to={"contacts/" + (row.id) + "/bio"} > {row.name} {row.father_lastname} {row.mother_lastname} </Link></td>
                                                <td>
                                                {(row.city ? row.city : ' ') + (row.state ? ', ' + row.state : '')}
                                                </td>
                                                <td>{row.id_program} {row.year}</td>
                                                <td>
                                                    <a> <RIcons.RiEyeFill onClick={(e) => showModal(row.id)} style={{ color: '#79B9E1' }} size={18} /></a>
                                                </td>
                                            </tr> */}
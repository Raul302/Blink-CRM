import { activeStaff,deleteStaff } from 'actions/colleges/staff/staff';
import React from 'react'
import *  as FAIcons from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';

export const SlotName = function SlotName(props) {
    const showName = (name="",fname="",mname="") => {
        let n = name ? name : " ";
        let f = fname ? fname: " ";
        let tag = '';
        n = n ? n.charAt(0) + f.charAt(0) : null;
        tag =  <>
        <span class="mt-1 mr-1 sc-caSCKo fXbvQO styles__Company-sc-103gogw-0 jdbeFR">{n}</span>
        <span>{name} {fname} {mname}</span>
        </>;
        return tag;
    }
    return (
        <>
          <span>{showName(props.data.name,props.data.fname,props.data.mname)}</span>
        </>
    )
}
export const GeneralFormat = function GeneralFormat(props) {
    const {value} = props;
    return (
        <>
        <span>{value}</span>
        </>
    )
}

export const SlotActions = function SlotActions(props) {
    const dispatch = useDispatch();
    function dropStaff (id){
        swal({
            title: "Estas seguro?",
            text: "Una vez eliminado,no podras recuperar este registro!",
            icon: "warning",
            dangerMode: true,
            buttons: ["No", "Si"],
        })
        .then(async (willDelete) => {
            if (willDelete) {
                dispatch( deleteStaff(id) );
            } else {
                swal("Operacion cancelada!");

            }
        })
    }
    function editStaff(id,obj){
        dispatch( activeStaff(id,obj) );
        props.clickx(true);
    }
    return (
        <>
         <a ><FAIcons.FaTrashAlt style={{color:'#DC3545'}} size={18}onClick={(e) => dropStaff(props.data.id)} /> </a>
         <a><FAIcons.FaRegEdit size={18} style={{color:'#34B5B8'}} onClick={e => editStaff(props.data.id,props.data)}/> </a>    
        </>
    )
}

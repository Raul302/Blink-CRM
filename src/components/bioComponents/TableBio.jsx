import React,{ useState,useEffect,useRef } from 'react';
import {Table,Row,Col} from "reactstrap";
import *  as FIcons from "react-icons/fi";
import *  as FAIcons from "react-icons/fa";
import *  as HIcons from "react-icons/hi";
import *  as Ioicons from "react-icons/io";
import * as MDIcons from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Popover,OverlayTrigger } from "react-bootstrap";
import Skeleton from 'react-loading-skeleton';
import { starLoadingBioC } from 'actions/contacts/bioContact/bioContact';
import { useParams, } from "react-router";
import NotificationAlert from "react-notification-alert";
import moment from 'moment';
export default function TableBio(props) {
    const dispatch = useDispatch();
    const {biosC:bioRecords} = useSelector( state => state.bioContact);
    const { loading } = useSelector(state => state.ui);
    let { id } = useParams();
    const notificationAlert = useRef();

    useEffect(() => {
     dispatch( starLoadingBioC(id) );
    }, [])
    // Methods
    const showParticipant = (type = 'use',name,fullname = "") => {
        let n = name ? name : " ";
        let tag = '';
        n = n ? n.charAt(0) + n.charAt(1) : null;
        switch (type) {
            case 'user':
            tag = <span class=" sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnV">{n}</span>;
            break;
            case 'contactos':
            tag = <span class=" sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnP">{n}</span>;
            break;
            case 'referencias':
            tag = <span class=" sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnP">{n}</span>;
            break;
            default:
            tag = <span class=" sc-caSCKo ZomcK styles__User-sc-103gogw-2 gBkpnZ">{n}</span>;
            break;
        }

        return tag;
    }
    const PopoverComponent = (text) => {
        return (<Popover id="popover-basic">
            <Popover.Content>
                <strong>{text}</strong>
            </Popover.Content>
        </Popover>)
    }
    const showModal = (obj) => {

    }
    const showSubject = (type, subject) => {
        let tag = '';
        if (type.includes('Llamada')) {
            tag = <span class="Inter600B">
                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" fillRule="nonzero" d="M21 16.92v-.025a.998.998 0 0 0-.85-1.014 13.845 13.845 0 0 1-3.032-.755.998.998 0 0 0-1.05.221l-1.27 1.27a1 1 0 0 1-1.202.162 17 17 0 0 1-6.375-6.375 1 1 0 0 1 .162-1.201l1.266-1.266a1 1 0 0 0 .224-1.057 13.817 13.817 0 0 1-.753-3.02A1.003 1.003 0 0 0 7.11 3h-3a1 1 0 0 0-.996 1.074 18.8 18.8 0 0 0 2.92 8.24 18.511 18.511 0 0 0 5.7 5.697 18.774 18.774 0 0 0 8.176 2.913A1 1 0 0 0 21 19.92v-3zm2 2.996a3 3 0 0 1-3.288 2.998 20.78 20.78 0 0 1-9.058-3.22 20.49 20.49 0 0 1-6.303-6.3A20.805 20.805 0 0 1 1.124 4.27 3 3 0 0 1 4.11 1H7.1a3.002 3.002 0 0 1 3.001 2.59c.117.885.334 1.754.645 2.588a3.002 3.002 0 0 1-.679 3.17l-.717.716a15 15 0 0 0 4.586 4.586l.72-.721a3 3 0 0 1 3.164-.676c.836.312 1.705.529 2.6.647A3 3 0 0 1 23 16.93v2.985z"></path></svg>
&nbsp;{subject}</span>;
        }
        if (type.includes('Whatssap')) {
            tag = <span class="Inter600B"><FAIcons.FaWhatsapp />&nbsp; {subject}</span>
        }
        if (type.includes('Cita')) {
            tag = <span class="Inter600B">
                <FIcons.FiCalendar />&nbsp;
            {subject}</span>
        }
        if (type.includes('Email')) {
            tag = <span class=" Inter600B">
                <HIcons.HiOutlineMail size={16} />&nbsp;
    {subject}</span>
        }
        return tag
    }
    const showDate = (dateBD,timeBio) => {
        let datef = moment(dateBD).locale('es-mx').format("ddd D MMMM, YYYY ");
        let timef = moment(dateBD).locale('es-mx').format("h:mm A");
        datef = datef[0].toUpperCase() + datef.slice(1);
        datef = datef.replace(".","");
        let tag = <span class="Inter">{datef} <Ioicons.IoMdTime /> {timef}</span>
        return tag;
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
        <> {loading ?
            <div class="row mt-2">
                       <NotificationAlert ref={notificationAlert} />
                <Skeleton width="60rem"  height={30} count={10} />
            </div>

        :
        <div className="content" style={{ width: '100%', height: '300px' }}>
                       <Table responsive>
                    <thead className="text-primary" tyle={{ backgroundColor: '#F8F8F8' }} >
                                <tr>
                                <th class="w-25">Tipo</th>
                                    <th class="w-25">Fecha</th>
                                    <th class="w-25 text-center">Detalle</th>
                                    <th class="w-25">Participantes</th>
                                </tr>
                            </thead>
                            <tbody>
                            {bioRecords.map(row => (
                                    <tr onClick={(e) => showModal(row)} key={row.id}>
                                        <td>{showSubject(row.type, row.subject)}</td>
                                        <td>{showDate(row.date,row.timeBio)}</td>
                                        <td  class="text-center">
                                            <OverlayTrigger trigger={["hover", "hover"]} placement="top"
                                                overlay={PopoverComponent(row.text)}>
                                                <a>
                                                    <svg width="16" height="16" viewBox="0 0 16 16" style={{ color: 'rgb(192, 203, 227)' }}>
                                                        <path fill="currentColor"
                                                            d="M9.944 0a.72.72 0 0 1 .511.213l4.333 4.364A.73.73 0 0 1 15 5.09v8.727C15 15.023 14.03 16 12.833 16H4.167A2.174 2.174 0 0 1 2 13.818V2.182C2 .977 2.97 0 4.167 0h5.777zm-.299 1.455H4.167a.725.725 0 0 0-.723.727v11.636c0 .402.324.727.723.727h8.666a.725.725 0 0 0 .723-.727V5.392l-3.91-3.937z"></path><path fill="currentColor" d="M10.667 4.364h3.61c.4 0 .723.325.723.727a.725.725 0 0 1-.722.727H9.944a.725.725 0 0 1-.722-.727V.727c0-.401.324-.727.722-.727.4 0 .723.326.723.727v3.637zM11.389 8c.399 0 .722.326.722.727a.725.725 0 0 1-.722.728H5.61a.725.725 0 0 1-.722-.728c0-.401.323-.727.722-.727h5.778zM11.389 10.91c.399 0 .722.325.722.726a.725.725 0 0 1-.722.728H5.61a.725.725 0 0 1-.722-.728c0-.401.323-.727.722-.727h5.778zM7.056 5.09c.398 0 .722.327.722.728a.725.725 0 0 1-.722.727H5.61a.725.725 0 0 1-.722-.727c0-.401.323-.727.722-.727h1.445z">
                                                        </path>
                                                    </svg>
                                                </a>
                                            </OverlayTrigger>
                                        </td>
                                        <td>{row.participants.map(part => (
                                        showParticipant(part.type,part.name,part.fullname)
                                        ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            </Table>
                    </div>
        }
        </>
    )
}

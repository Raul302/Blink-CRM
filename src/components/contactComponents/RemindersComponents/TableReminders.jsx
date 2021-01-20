import React, { useEffect, useState, useRef } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Table,
    Row,
    Col,
} from "reactstrap";
import { Popover, OverlayTrigger, } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import NotificationAlert from "react-notification-alert";
import axios from 'axios';
import * as FIIcons from "react-icons/fi";
import * as FAIcons from "react-icons/fa";
import * as Imicons from "react-icons/im";
import * as AIcons from "react-icons/ai";
import { constaApi } from 'constants/constants';
import moment from 'moment';
import { activeReminderC } from 'actions/remindersContact';
import swal from 'sweetalert';
import { deleteReminderC } from 'actions/remindersContact';





export default function TableReminders(props) {
    // vars
    const dispatch = useDispatch();
    const notificationAlert = useRef();
    const { remindersC: reminders } = useSelector(state => state.remindersC);
    const { loading } = useSelector(state => state.ui);
    const { contact } = props;
    console.log('reminder', reminders);
    useEffect(() => {

    }, []);
    // methods
    const completeReminder = (obj) => {
        swal({
            title: "¿Desea marcar como completado este recordatorio?",
            icon: "info",
            dangerMode: false,
            buttons: ["No", "Si"],
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    // other swal
                    swal({
                        title: "¿Que deseas hacer?",
                        icon: "info",
                        dangerMode: true,
                        buttons: ["Crear entrada en la bitacora","Borrarlo"],
                    })
                        .then(async (willDelete) => {
                            if (willDelete) {
                                await dispatch(deleteReminderC(obj.id, contact.id));
                            } else {
                                // Aqui creara la otra entrada
                                swal("Operacion cancelada!");
                            }
                        });


                } else {
                    swal("Operacion cancelada!");
                }
            });
    }
    const PopoverComponent = (text) => {
        return (<Popover id="popover-basic">
            <Popover.Content>
                <strong>{text}</strong>
            </Popover.Content>
        </Popover>)
    }
    function showEmailsTO(obj) {
        let n = obj.name_user ? obj.name_user : " ";
        let tag = '';
        if (n) {
            n = n.charAt(0) + n.charAt(1);
        }
        switch (obj.type_user) {
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
    function editReminder(obj) {
        dispatch(activeReminderC(obj.id, obj));
    }
    function deleteReminder(id) {
        swal({
            title: "Estas seguro?",
            text: "Una vez eliminado,no podras recuperar este registro!",
            icon: "warning",
            dangerMode: true,
            buttons: ["No", "Si"],
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    await dispatch(deleteReminderC(id, contact.id));
                } else {
                    swal("Operacion cancelada!");
                }
            });
    }
    function showDate(dateBD, time) {
        let datef = moment(dateBD).locale('es-mx').format("ddd D MMMM, YYYY ");
        let timef = moment(dateBD).locale('es-mx').format("h:mm A");
        datef = datef[0].toUpperCase() + datef.slice(1);
        datef = datef.replace(".", "");
        let tag = <span class="Inter">{datef}{timef}</span>
        return dateBD ? tag : '';
    }
    return (
        <>
            <div className="content">
                <NotificationAlert ref={notificationAlert} />
                {!loading ?
                    <Row>
                        <Col className="mt-3" md="12">
                            <Card>
                                <CardHeader>
                                    {/* <CardTitle tag="h4">Usuarios</CardTitle> */}
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead className="text-primary">
                                            <tr>
                                                <th></th>
                                                <th>Asunto</th>
                                                <th>Fecha</th>
                                                <th>descripción</th>
                                                <th>Usuarios</th>
                                                <th>departamento</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {reminders.map(row => (
                                                <tr key={row.id}>
                                                    <td>
                                                        {row.urgent == true &&
                                                            <Imicons.ImNotification style={{ color: 'red' }} />
                                                        }
                                                    </td>
                                                    <td>{row.subject ?? ''}</td>
                                                    <td>{showDate(row.dateReminder) ?? ''}</td>
                                                    <td class="text-center">
                                                        <OverlayTrigger trigger={["hover", "hover"]} placement="top"
                                                            overlay={PopoverComponent(row.notes)}>
                                                            <a>
                                                                <svg width="16" height="16" viewBox="0 0 16 16" style={{ color: 'rgb(192, 203, 227)' }}>
                                                                    <path fill="currentColor"
                                                                        d="M9.944 0a.72.72 0 0 1 .511.213l4.333 4.364A.73.73 0 0 1 15 5.09v8.727C15 15.023 14.03 16 12.833 16H4.167A2.174 2.174 0 0 1 2 13.818V2.182C2 .977 2.97 0 4.167 0h5.777zm-.299 1.455H4.167a.725.725 0 0 0-.723.727v11.636c0 .402.324.727.723.727h8.666a.725.725 0 0 0 .723-.727V5.392l-3.91-3.937z"></path><path fill="currentColor" d="M10.667 4.364h3.61c.4 0 .723.325.723.727a.725.725 0 0 1-.722.727H9.944a.725.725 0 0 1-.722-.727V.727c0-.401.324-.727.722-.727.4 0 .723.326.723.727v3.637zM11.389 8c.399 0 .722.326.722.727a.725.725 0 0 1-.722.728H5.61a.725.725 0 0 1-.722-.728c0-.401.323-.727.722-.727h5.778zM11.389 10.91c.399 0 .722.325.722.726a.725.725 0 0 1-.722.728H5.61a.725.725 0 0 1-.722-.728c0-.401.323-.727.722-.727h5.778zM7.056 5.09c.398 0 .722.327.722.728a.725.725 0 0 1-.722.727H5.61a.725.725 0 0 1-.722-.727c0-.401.323-.727.722-.727h1.445z">
                                                                    </path>
                                                                </svg>
                                                            </a>
                                                        </OverlayTrigger>
                                                    </td>
                                                    <td>{row.emails_to.map(email => (
                                                        showEmailsTO(email)
                                                    ))}</td>
                                                    <td>{row.departament ?? ''}</td>
                                                    <td>
                                                    <a>
                                                        <AIcons.AiFillCheckCircle
                                                        onClick={(e) => completeReminder(row)}
                                                        title="Completar" style={{ color: 'green' }} size={20} />
                                                    </a>
                                                    <a>
                                                        <FIIcons.FiEdit title="Editar" onClick={(e) => editReminder(row)} size={18} style={{ color: '#386CEF' }} />
                                                    </a>
                                                    <a className="ml-1">
                                                        <FAIcons.FaTrashAlt title="Eliminar" style={{ color: '#DC3545' }} size={18} onClick={(e) => { deleteReminder(row.id) }} />
                                                    </a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    :
                    <div class="row mt-2">
                        <NotificationAlert ref={notificationAlert} />
                        <Skeleton width="60rem" height={30} count={10} />
                    </div>
                }

            </div>

        </>
    )
}


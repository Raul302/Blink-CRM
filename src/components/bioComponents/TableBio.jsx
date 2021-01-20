import React,{ useState } from 'react';
import {
    Table,
    Row,
    Col,
  } from "reactstrap";

import { Popover,OverlayTrigger } from "react-bootstrap";
export default function TableBio(props) {
    console.log('props',props);
    // Variables
    const [bioRecords,setBio] = useState([{
        id:1,
        type:'equis',
        subject:'equis',

    }]);
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
    const showSubject = () => {
        
    }
    const showDate = () => {
        
    }
    return (
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
    )
}

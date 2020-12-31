import React, { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/GlobalStyles.css';
import {
    Card,
    CardHeader,
    CardBody,
    Table,
    Row,
    Col,
} from "reactstrap";
import *  as RIcons from "react-icons/ri";
import { Link } from 'react-router-dom';
import axios from 'axios';
import NotificationAlert from "react-notification-alert";
import LateralReference from './LateralReference';

function TableContacts(props) {
    const [rowData, setRowData] = useState(props.rowData);
    const notificationAlert = useRef();
    const [dinamicwidth,setDinamicWidth] = useState('0px');
    const [lateralReference,setLateralReference] = useState(null);

    useEffect(() => {
        consultRow();

    }, [props]);
    async function consultRow() {
        await axios.get('http://api.boardingschools.mx/api/contacts', {
            headers: {
                "Accept": "application/json"
            }
        }).then(function (response) {
            setRowData(response.data);
        });
    }
    const openLateral =  (obj) => {
        if(obj != null){
            setLateralReference(obj[0]);
            setDinamicWidth('50%');
        }
    }
    const closeLateral = () =>{
        setDinamicWidth('0px');
        setLateralReference(null);
    }
    const notification = (type, message) => {
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
            <div className="content">
                <LateralReference reference={lateralReference} close={closeLateral} width={dinamicwidth} />
                <NotificationAlert ref={notificationAlert} />
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
                                            <th >Nombre</th>
                                            <th >Origen</th>
                                            <th >Programa</th>
                                            <th >Referencia</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rowData.map(row => (
                                            <tr>
                                                <td><RIcons.RiUser3Fill size={32} />
                                                    <Link to={"contacts/" + (row.id) + "/bio"} > {row.name} {row.father_lastname} {row.mother_lastname} </Link></td>
                                                <td>{row.contacts_direction.map((r,i) => (
                                                    [i === 0 &&
                                                    r.city+(r.state ? ','+ r.state : '')
                                                    ]
                                                ))}
                                                </td>
                                                <td>{row.id_program},{row.year}</td>
                                                <td class="hover" onClick={(e) => 
                                                openLateral(row.contacts_references.length > 0 ? row.contacts_references : null)}
                                                >{row.contacts_references.length > 0 ?
                                                    [(row.contacts_references.map((contacts, i) => (
                                                        (i === 0 ?
                                                            (contacts.name + ' ' + contacts.father_lastname)
                                                            :
                                                            ''
                                                        )
                                                    )))
                                                    ]
                                                    : <h8>Sin referencias</h8>
                                                }</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default TableContacts

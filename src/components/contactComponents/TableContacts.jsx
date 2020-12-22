import React, { useState, useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/GlobalStyles.css';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
} from "reactstrap";
import *  as RIcons from "react-icons/ri";
import {
    BrowserRouter as Router, Switch,
    Route, Link
} from 'react-router-dom';
import axios from 'axios';
import NotificationAlert from "react-notification-alert";

function TableContacts(props) {
    const [rowData, setRowData] = useState(props.rowData);
    const notificationAlert = useRef();

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
                <NotificationAlert ref={notificationAlert} />
                <Row>
                    <Col md="12">
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
                                                <td>{row.city},{row.state}</td>
                                                <td>{row.id_program}</td>
                                                <td>{row.contacts_references.length > 0 ?
                                                    [(row.contacts_references.map((contacts, i) => (
                                                        (i == 0 ?
                                                            (contacts.name + ' ' + contacts.father_lastname)
                                                            :
                                                            ''
                                                        )
                                                        //   (contacts.father_lastname)
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

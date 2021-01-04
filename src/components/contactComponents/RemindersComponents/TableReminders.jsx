import React, { useEffect, useRef } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Table,
    Row,
    Col,
} from "reactstrap";
import Skeleton from 'react-loading-skeleton';
import NotificationAlert from "react-notification-alert";

export default function TableReminders() {
    const notificationAlert = useRef();

    return (
        <>
            <div className="content">
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
                                            <th>Asunto</th>
                                            <th>Fecha</th>
                                            <th>Hora</th>
                                            <th>descripción</th>
                                            <th>departamento</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <td>Asunto</td>
                                        <td>Fecha</td>
                                        <td>Hora</td>
                                        <td>descripción</td>
                                        <td>departamento</td>
                                        <td>Acciones</td>
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


import React from 'react'
import '../../styles/GlobalStyles.css';
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
} from "reactstrap";
import Skeleton from 'react-loading-skeleton';


function LateralReference(props) {
    function closeNav() {
        props.close()
    }
    return (
        <div style={{ width: props.width }} id="mySidenav" class="sidenav">
            {props.reference ?
            <Card className="no-marginTop">
                <CardHeader>
                    <CardTitle tag="h5">
                        <a class="mb-2 closebtn" onClick={(e) => closeNav()}>&times;</a>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <Form>
                        <Row>
                            <Col className="pr-1" md="5">
                                <FormGroup>
                                    <label>Nombre</label>
                                    <Input
                                        defaultValue='Sin nombre'
                                        disabled
                                        value={props.reference.name}
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="px-1" md="3">
                                <FormGroup>
                                    <label>Apellido paterno</label>
                                    <Input
                                        type="text"
                                        disabled
                                        defaultValue='Sin apellido'
                                        value={props.reference.father_lastname}
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="pl-1" md="4">
                            <FormGroup>
                                    <label>Apellido materno</label>
                                    <Input
                                        defaultValue='Sin apellido'
                                        value={props.reference.mother_lastname}
                                        type="text"
                                        disabled
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pr-1" md="6">
                                <FormGroup>
                                    <label>Email</label>
                                    <Input
                                        defaultValue="Sin email"
                                        value={props.reference.email}
                                        type="text"
                                        disabled
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="pl-1" md="6">
                                <FormGroup>
                                    <label>Telefono</label>
                                    <Input
                                        defaultValue="Sin telefono"
                                        value={props.reference.phone}
                                        disabled
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4">
                                <FormGroup>
                                    <label>Ciudad</label>
                                    <Input
                                        defaultValue="Sin Ciudad"
                                        value={props.reference.city}
                                        disabled
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                            <Col className="pr-1" md="4">
                                <FormGroup>
                                    <label>Estado</label>
                                    <Input
                                        defaultValue="Sin Estado"
                                        value={props.reference.state}
                                        disabled
                                        type="text"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                           
                        </Row>
                    </Form>
                </CardBody>
            </Card>
            :
            <>
            <a class="closebtn" onClick={(e) => closeNav()}>&times;</a>
            <Skeleton width="95%" className="ml-2" height={30} count={10} />
            </>
        }
        </div>
    )
}

export default LateralReference

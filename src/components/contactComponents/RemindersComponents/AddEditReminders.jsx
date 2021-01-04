import React,{useState} from 'react';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";

export default function AddEditReminders(props) {
    // variables
    const { register, handleSubmit, errors, reset,watch } = useForm({ mode: "onChange" });
    const [modal,setModal] = useState(false);
    const [nameContact,setNameContact] = useState("");
    const [subject,setSubject] = useState("");
    const [users,setUsers] = useState([{}]);
    const [timeReminder,setTimeReminder] = useState("");
    const [dateReminder,setDateReminder] = useState("");
    const [notificationReminder,setNotificationReminder] = useState("");
    const [notes,setNotes] = useState("");
    const [departament,setDepartament] = useState("");
    
    // Methods
    function showModal() {
        console.log(modal);
        setModal(!modal);
    }
    async function onSubmit(data) {}
    function handleClose(){

    }
    const styles = {
        container: {
            width: "80%",
            margin: "0 auto",
        },
        input: {
            width: "100%",
        },
    };

    return (
        <div className="mt-n5">
             <button  className="btn btn-primary">
                 <span onClick={(e) => showModal()} className="Inter" 
                 style={{fontSize:"18px"}}>+</span> {process.env.API_URL}
                 </button>

                 <Modal
                style={{marginTop:"50px"}}
                dialogClassName="modal-90w"
                show={modal}
                onHide={e => props.handlerClose()}
            >
                <Modal.Header style={{height:"60px"}} closeButton>
                    <Modal.Title style={{ fontFamily: "Inter", marginTop:"5px", fontWeight: "600", fontSize: "18px" }}>Agregar Usuario </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: "#F4F5F6", border: "0px" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="container-fluid">
                            <Row className="mt-1">
                             
                            </Row>
                            <Row>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Nombre</Form.Label>
                                    <Form.Control name="name" ref={register({
                                        required: true,
                                        maxLength: 50
                                    })}
                                        autoComplete="off" className="formGray" type="text" placeholder="Ingrese su nombre"
                                        style={{ ...styles.input, borderColor: errors.name && "red" }}
                                    />
                                    <p className="errores">{errors.name && "Nombre requerido"}</p>
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                <Form.Label className="formGray">Apellido paterno</Form.Label>
                                    <Form.Control name="father_lastname" ref={register({
                                        required: true,
                                        maxLength: 50
                                    })}
                                        autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Apellido "
                                        style={{ ...styles.input, borderColor: errors.father_lastname && "red" }}
                                    />
                                    <p className="errores">{errors.father_lastname && "Apellido paterno requerido"}</p>
                                </Col>
                                <Col className="col-6">
                                <Form.Label className="formGray">Apellido Materno</Form.Label>
                                    <Form.Control name="mother_lastname" ref={register({
                                        required: true,
                                        maxLength: 50
                                    })}
                                        autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Apellido"
                                        style={{ ...styles.input, borderColor: errors.mother_lastname && "red" }}
                                    />
                                    <p className="errores">{errors.mother_lastname && "Apellido materno requerido"}</p>
                                </Col>
                            </Row>
                            
                                <Row>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Email</Form.Label>
                                    <Form.Control autoComplete="off" name="email"
                                        ref={register({
                                            required: false,
                                            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                                        })}
                                        className="formGray" type="email" placeholder="Ingrese su email" />
                                    <p className="errores">{errors.email && "Formato invalido"}</p>

                                </Col>
                            </Row>


                        </div>
                        <Row>

                            <Col>
                                <Button
                                    className="float-right mb-3 mr-2" type="submit"
                                    onSubmit={handleSubmit(onSubmit)}
                                    variant="primary">Guardar</Button>
                                <Button onClick={handleClose} style={{  fontFamily: "Inter", fontWeight: "500" }} className="float-right mb-3 mr-2" variant="danger" >
                                    Cancelar
                </Button>

                            </Col>
                        </Row>
                    </form>
                </Modal.Body>
            </Modal>
        </div>

        
    )
}

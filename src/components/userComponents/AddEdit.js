import React, { useState, useEffect,useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/GlobalStyles.css';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useAlert } from 'react-alert'
import axios from 'axios';
import NotificationAlert from "react-notification-alert";


function AddEdit(props) {
    const [init] = useState(JSON.parse(localStorage.getItem('user')) || { logged: false });
    const [modalEdit,setModalEdit] = useState(false);
    const [idE,setIdE] = useState(null);
    const [typeE,setTypeE] = useState(null);
    const [nameE,setnameE] = useState(null);
    const [emailE,setEmailE] = useState(null);
    const [passwordE,setpasswordE] = useState(null);
    const [fatherE,setFatherE] = useState(null);
    const [motherE,setMotherE] = useState(null);
    const [modal, setModal] = useState(false);
    const { register, handleSubmit, errors, reset } = useForm({});
    const alert = useAlert();
    const notificationAlert = useRef();

    useEffect(() => {
        setModal(props.newUser);
        setModalEdit(props.editUser);
        seteos(props.userToEdit);
    }, [props]);

    function seteos(row){
        setnameE(row.name);
        setIdE(row.id);
        setFatherE(row.father_lastname);
        setMotherE(row.mother_lastname);
        setpasswordE(row.password);
        setEmailE(row.email);
        setTypeE(row.type);
    }
    async function onSubmit(data) {
        if(modalEdit === true){
            let datax = {id: idE, type:typeE,name:nameE,email:emailE,password:passwordE,father_lastname:fatherE,
                mother_lastname:motherE
            }
            await axios.post('http://api.boardingschools.mx/api/users/update',datax)
            .then(function (response) {
                if(response.status === 200){
                    props.handleupdateTable();
                    alert.show('Contacto Actualizado correctamente', {
                        timeout: 2000, // custom timeout just for this one alert
                        type: 'success'
                    })
                } else {
                    alert.show('Ocurrio un error por favor intentar mas tarde');
                }
            });
        } else {
            await axios.post('http://api.boardingschools.mx/api/register',data)
            .then(function (response) {
              if(response.status === 200){
                props.handleupdateTable();
                notification('success','Usuario guardado');
            } else {
                notification('danger','Ocurrio un error,por favor intenta más tarde ó contacta a soporte');
            }
            });
            reset();
        }
    }
    const handleClose = function close() {
        props.handlerClose();
        reset();
    }
    function changeName(e){
        setnameE(e.target.value);
    }
    function changeType(e){
        setTypeE(e.target.value);
    }
    function changeF(e){
        setFatherE(e.target.value);
    }
    function changeM(e){
        setMotherE(e.target.value);
    }
    function changePass(e){
        setpasswordE(e.target.value);    
    }
    function changeE(e){
        setEmailE(e.target.value);    
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
        <>
        <NotificationAlert ref={notificationAlert} />
              {/* FirstModal */}
               <Modal
                style={{marginTop:'50px'}}
                dialogClassName="modal-90w"
                show={modal}
                onHide={e => props.handlerClose()}
            >
                <Modal.Header style={{height:'60px'}} closeButton>
                    <Modal.Title style={{ fontFamily: 'Inter', marginTop:'5px', fontWeight: '600', fontSize: '18px' }}>Agregar Usuario </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="container-fluid">
                            <Row className="mt-1">
                                <Col className="col-4">
                                    <Form.Label className="formGray">Tipo usuario</Form.Label>
                                    <Form.Control autoComplete="off" name="type" ref={register({
                                        required: true,
                                        maxLength: 50
                                    })} as="select" size="sm" custom>
                                        {init.type === 'Administrador' ? 
                                        <>
                                       <option disabled value="" selected></option>
                                       <option value="Administrador">Administrador</option>
                                       <option value="Supervisor">Supervisor</option>
                                       <option value="Colaborador">Colaborador</option>
                                       <option value="Representante">Representante</option>
                                       </>
                                    :
                                    <>
                                    <option disabled value="" selected></option>
                                    <option value="Supervisor">Supervisor</option>
                                    <option value="Colaborador">Colaborador</option>
                                    <option value="Representante">Representante</option>
                                    </>
                                    }
                                     
                                    </Form.Control>
                                </Col>
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
                                    <p className='errores'>{errors.name && "Nombre requerido"}</p>
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
                                    <p className='errores'>{errors.father_lastname && "Apellido paterno requerido"}</p>
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
                                    <p className='errores'>{errors.mother_lastname && "Apellido materno requerido"}</p>
                                </Col>
                            </Row>
                            <Row className="mt-1">
                            <Col className="col-6">
                                    <Form.Label className="formGray">Contraseña</Form.Label>
                                    <Form.Control name="password" ref={register({
                                        required: true,
                                        maxLength: 50
                                    })}
                                        autoComplete="off" className="formGray" type="password" placeholder="Ingrese su Contraseña"
                                        style={{ ...styles.input, borderColor: errors.name && "red" }}
                                    />
                                    <p className='errores'>{errors.password && "Contraseña requerido"}</p>
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Email</Form.Label>
                                    <Form.Control autoComplete="off" name="email"
                                        ref={register({
                                            required: false,
                                            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                                        })}
                                        className="formGray" type="email" placeholder="Ingrese su email" />
                                    <p className='errores'>{errors.email && "Formato invalido"}</p>

                                </Col>
                            </Row>


                        </div>
                        <Row>

                            <Col>
                                <Button
                                    className="float-right mb-3 mr-2" type="submit"
                                    onSubmit={handleSubmit(onSubmit)}
                                    variant="primary">Guardar</Button>
                                <Button onClick={handleClose} style={{  fontFamily: 'Inter', fontWeight: '500' }} className="float-right mb-3 mr-2" variant="danger" >
                                    Cancelar
                </Button>

                            </Col>
                        </Row>
                    </form>
                </Modal.Body>
            </Modal>



             {/* editModal */}
             <Modal
                show={modalEdit}
                dialogClassName="modalMax"
                onHide={handleClose}
                dialogClassName="modal-90w"

            >
                <Modal.Header style={{height:'60px'}} closeButton>
                    <Modal.Title style={{ fontFamily: 'Inter', marginTop:'5px', fontWeight: '600', fontSize: '18px' }}>Editar Usuario </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="container-fluid">
                            <Row className="mt-1">
                                <Col className="col-4">
                                    <Form.Label className="formGray">Tipo usuario</Form.Label>
                                    <Form.Control  onChange={(e) => changeType(e)} autoComplete="off" value={typeE} name="type"  as="select" size="sm" custom>
                                    {init.type === 'Administrador' ? 
                                        <>
                                       <option disabled value="" selected></option>
                                       <option value="Administrador">Administrador</option>
                                       <option value="Supervisor">Supervisor</option>
                                       <option value="Colaborador">Colaborador</option>
                                       <option value="Representante">Representante</option>
                                       </>
                                    :
                                    <>
                                    <option disabled value="" selected></option>
                                    <option value="Supervisor">Supervisor</option>
                                    <option value="Colaborador">Colaborador</option>
                                    <option value="Representante">Representante</option>
                                    </>
                                    }
                                    </Form.Control>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Nombre</Form.Label>
                                    <Form.Control name="name" 
                                        autoComplete="off" onChange={(e) => changeName(e)} value={nameE} className="formGray" type="text" placeholder="Ingrese su nombre"
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                <Form.Label className="formGray">Apellido paterno</Form.Label>
                                    <Form.Control  onChange={(e) => changeF(e)} name="father_lastname"  value={fatherE}
                                        autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Apellido "
                                    />
                                </Col>
                                <Col className="col-6">
                                <Form.Label className="formGray">Apellido Materno</Form.Label>
                                    <Form.Control  onChange={(e) => changeM(e)} name="mother_lastname" 
                                        autoComplete="off" className="formGray" value={motherE} type="text" placeholder="Ingrese su Apellido"
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                            <Col className="col-6">
                                    <Form.Label className="formGray">Contraseña</Form.Label>
                                    <Form.Control  onChange={(e) => changePass(e)} name="password" 
                                        autoComplete="off" className="formGray" value={passwordE} type="password" placeholder="Ingrese su Contraseña"
                                    />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Email</Form.Label>
                                    <Form.Control  onChange={(e) => changeE(e)} autoComplete="off" value={emailE} name="email"
                                        className="formGray" type="email" placeholder="Ingrese su email" />

                                </Col>
                            </Row>


                        </div>
                        <Row>

                            <Col>
                                <Button
                                    className="float-right mb-3 mr-2" type="submit"
                                    onSubmit={handleSubmit(onSubmit)}
                                    variant="primary">Guardar</Button>
                                <Button onClick={handleClose} style={{ fontFamily: 'Inter', fontWeight: '500' }} className="float-right mb-3 mr-2" variant="danger" >
                                    Cancelar
                </Button>

                            </Col>
                        </Row>
                    </form>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default AddEdit

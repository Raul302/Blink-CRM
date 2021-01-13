import React, { useState, useEffect,useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/GlobalStyles.css';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useAlert } from 'react-alert'
import axios from 'axios';
import NotificationAlert from "react-notification-alert";
import { constaApi } from 'constants/constants';


function AddEdit(props) {
    const [flag,setFlags] = useState(false);
    const [errorsPassword,setErrorsPasswords] = useState(null);
    const [init] = useState(JSON.parse(localStorage.getItem('user')) || { logged: false });
    const [modalEdit,setModalEdit] = useState(false);
    const [idE,setIdE] = useState(null);
    const [typeE,setTypeE] = useState(null);
    const [nameE,setnameE] = useState(null);
    const [emailE,setEmailE] = useState(null);
    const [passwordE,setpasswordE] = useState(null);
    const [password_confirm,setpassworConfirm] = useState(null);
    const [fatherE,setFatherE] = useState(null);
    const [motherE,setMotherE] = useState(null);
    const [modal, setModal] = useState(false);
    const { register, handleSubmit, errors,formState, reset,watch } = useForm({ mode: 'onChange' });
    const password = useRef({});
    password.current = watch("password", "");
    const alert = useAlert();
    const notificationAlert = useRef();

    useEffect(() => {
        setModal(props.newUser);
        setModalEdit(props.editUser);
        seteos(props.userToEdit);
    }, [props]);
    
    // methods
    const emailRepeat = async (email,id = null) => {
        let resp = false;
        let datax = {
            id: id,
            email: email
        };
          resp = await priomise(datax);
          console.log('resp',resp);
          return resp;
    }
    const priomise = async (datax) => {
        let resp = null;
        await axios.post(constaApi+'users/validate',datax)
        .then( async function (response) {
           if(response.data[0]){
               resp = await false;
            } else {
             resp = await true;
            }
        });
        return resp;
    }
    //  function validateNoRepeatEmail(id = null, email){
    //     let resp = false;
    //  let datax = {
    //      id: id,
    //      email: email
    //  };
    //    axios.post(constaApi+'users/validate',datax)
    //         .then( function (response) {
    //            if(response.data[0]){
    //                resp = true;
    //             notification('warning','Correo ya ligado a otro usuario');
    //             } else {
    //              resp = false;
    //             }
    //         });
    //   return resp;
    // }
    function seteos(row){
        setnameE(row.name);
        setIdE(row.id);
        setFatherE(row.father_lastname);
        setMotherE(row.mother_lastname);
        setpasswordE(row.password);
        setpassworConfirm(row.password_confirm);
        setEmailE(row.email);
        setTypeE(row.type);
    }
     function onSubmit(data) {
        setErrorsPasswords(null);
        if(modalEdit === true){
            let datax = {id: idE, type:typeE,name:nameE,email:emailE,password:passwordE,father_lastname:fatherE,
                mother_lastname:motherE,password_confirm:password_confirm
            }
            
             axios.post(constaApi+'users/update',datax)
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
            }).catch(error => {
                notification('warning','Correo ya ligado a otro usuario');

            });
        } else {
             axios.post(constaApi+'register',data)
            .then(function (response) {
              if(response.status === 200){
                props.handleupdateTable();
                notification('success','Usuario guardado');
            } else {
                notification('danger','Ocurrio un error,por favor intenta más tarde ó contacta a soporte');
            }
            reset();
            }).catch(error => {
                notification('warning','Correo ya ligado a otro usuario');

            });   
        }
    }
    const handleClose = function close() {
        props.handlerClose();
        setErrorsPasswords(null);
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
    function changePassConfirm(e){
        setpassworConfirm(e.target.value);  
        if(passwordE != e.target.value){
            setErrorsPasswords('Las contraseñan no coinciden');
        } else {
            setErrorsPasswords(null);
        }
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
                                    <Form.Label className="formGray">Confirmar contraseña</Form.Label>
                                    <Form.Control 
                                     name="password_confirm"
                                     ref={register({
                                        required: true,
                                        maxLength: 50,
                                         validate: value =>
                                        value === password.current || "The passwords do not match"
                                    })}
                                        autoComplete="off" className="formGray" type="password" placeholder="Ingrese su Contraseña"
                                        style={{ ...styles.input, borderColor: errors.name && "red" }}
                                    />
                                    {errors.password_confirm && <p className='errores'>{errors.password_confirm.message}</p>}
                                </Col>
                                </Row>
                                <Row>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Email</Form.Label>
                                    <Form.Control autoComplete="off" name="email"
                                        ref={register({
                                            required: true,
                                            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                            validate: emailRepeat
                                        })}
                                        className="formGray" type="email" placeholder="Ingrese su email" />
                                    {/* <p className='errores'>{errors.email && "Formato invalido"}</p> */}
                                    <p className='errores'>{errors.email && errors.email.type === "validate" &&
                                    "Email repetido"}</p>
                                    <p className='errores'>{errors.email && errors.email.type === "required" &&
                                    "Email Requerido"}</p>
                                    <p className='errores'>{errors.email && errors.email.type === "pattern" &&
                                    "Formato invalido"}</p>
                                </Col>
                            </Row>


                        </div>
                        <Row>

                            <Col>
                                <Button
                                    disabled={!formState.isValid}
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
                    <Modal.Title style={{ fontFamily: 'Inter', marginTop:'5px', fontWeight: '600', fontSize: '18px' }}>Editar Usuario
                     </Modal.Title>
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
                                    <Form.Label className="formGray">Confirmar Contraseña</Form.Label>
                                    <Form.Control  onChange={(e) => changePassConfirm(e)} name="password_confirm" 
                                        autoComplete="off" className="formGray" value={password_confirm} type="password" placeholder="Repita su contraseña"
                                    />
                                    {errorsPassword &&
                                    (
                                        <p class="text-danger">
                                            {errorsPassword}
                                        </p>
                                   
                                    )
                                }
                            </Col>
                            </Row>
                            <Row>
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
                                    disabled={errorsPassword}
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

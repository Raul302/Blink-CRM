import React, { useState, useEffect,useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/GlobalStyles.css';
import { Row, Col, Button, Modal, Form,InputGroup } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import axios from 'axios';
import NotificationAlert from "react-notification-alert";
import { constaApi } from '../constants/constants';
import moment from 'moment'
import swal from 'sweetalert';
import { states as jsonState } from 'MyJson\'s/statesJson';
import { municipios } from 'MyJson\'s/municipiosJson';
import { loadLocalColleges } from 'helpers/collegesHelpers/loadColleges';



function MultipleModals(props) {
    // Refs
    const notificationAlert = useRef();
    moment.locale("es-mx");
    // states
    const [flagOther,setFlagOther] = useState("");
    const [localColleges, setLocalColleges] = useState([]);
    const [notificationReminder, setNotificationReminder] = useState();
    const [blocked,setBlocked] = useState(false);
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);
    const [modal4, setModal4] = useState(false);
    const [modal5, setModal5] = useState(false);
    const [aux,setAux] = useState();
    const [extra, setExtra] = useState(false);
    const [validField, setvalidField] = useState(true);
    const [validFieldTwo, setvalidFieldTwo] = useState(true);
    const [validFieldThree, setvalidFieldThree] = useState(true);
    const [validFieldFour, setvalidFieldFour] = useState(true);
    const [validFieldFive, setvalidFieldFive] = useState(true);
    const [validFieldSix, setvalidFieldSix] = useState(true);
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [auth, setAth] = useState([]);
    const [idContact,setIDContact] = useState(null);
    const [notes, setNotes] = useState("");
    const [timeReminder, setTimeReminder] = useState("");
    const [dateReminder, setDateReminder] = useState("");
    const [now, setNow] = useState();
    const [nowTime, setNowTime] = useState();
    let userActive = JSON.parse(localStorage.getItem("user"));
    const [program, setProgram] = useState(["Boarding School",
    "School District",
    "Summer Camp",
    "Language School",
    "University/College",
    "Work & Travel"]);
    const years = [
        2019,
        2020,
        2021,
        2022,
        2023,
        2024,
        2025,
        2026,
        2027,
        2028,
        2029,
        2030
    ];
    const [country, setCountry] = useState();
    const [countries, setCountries] = useState([]);
    useEffect(() =>{
        Promise.all([loadLocalColleges()])
        .then(function (result){
            if(result){
                setLocalColleges(result[0]);
            }
        })
    },[props])
    useEffect(() => {
        thisDay();
        present();
        consultStates();
        setExtra(false);
        consultCountries();
    }, []);

    function changeFlag(e){
        setFlagOther(e.target.value);
    }
    function confirmClose(){
        swal({
            title: "¿Desea cancelar el registro?",
            text:"Esto evitara que el contacto sea guardado",
            icon: "info",
            dangerMode: false,
            buttons: ["No", "Si"],
          }).then(async (willDelete) => {
            if (willDelete) {
                setModal5(false);
                setNotes();
            } else {
              swal("Operacion cancelada!");
            }
          });
    }
    function thisDay(){
        let date2 = new Date();
        date2.setDate(date2.getDate() + 1);
        setTimeReminder("09:00:00");
        setNotificationReminder("-0 hour");
        setDateReminder(date2.toISOString().substr(0, 10).replace('T', ' '));
    }
    function present() {
        setNow(moment().format("YYYY-MM-DD"));
        setNowTime(moment().format("HH:mm"));
    }
    function changeTimeReminder(e) {
        let currendate = moment(dateReminder + " "+ timeReminder).format("YYYY-MM-DD HH:mm");
        let nowDatecomparison = moment(now + " "+ nowTime).format("YYYY-MM-DD HH:mm");
        let strings = e.target.value;
        strings = strings.charAt(1)  + strings.charAt(2);
        let nowDate = moment(currendate).subtract(parseInt(strings), 'hour').format("YYYY-MM-DD HH:mm");
        if(nowDate < nowDatecomparison){
            notification('warning','Cuidado,estas ingresando un rango de valor no permitido');
            setNotificationReminder("");
        } else {
            setNotificationReminder(e.target.value);
        }

    }
    // function changeDate(e) {
    //     console.log('e',e.target.value)
    //     if(e.target.value < now){
    //         notification('warning','Cuidado,estas ingresando una Fecha menor a la permitida');
    //     } else {
    //         setDateReminder(e.target.value)
    //     }
    // }

    function notification(type, message) {
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
    function changeNotes(e) {
        setNotes(e.target.value);
    }
    function changeDate(e) {
        setDateReminder(e.target.value)
    }
    function changeTime(e) {
        setTimeReminder(e.target.value);
    }
    async function consultCountries(auth) {
        await axios.get('https://restcountries.eu/rest/v2/all', {
            // headers: {
            //     Authorization: 'Bearer ' + auth,
            //     Accept: "application/json"
            // }
        }).then(function (response) {
            setCountries(response.data);
        });
    }
    function changeCountries(e, i) {
        setCountry(e.target.value);
    }
    function changeCities(e) {
        let val = e.target.value;
        let other  = municipios[0];
        let aux = [];
        Object.keys(other).map((name,i)=>{
            if(name === e.target.value){
                aux = other[name];
            }
        })
        setCities(aux);
    }
    // Api to states
    async function consultStates() {
        setStates(jsonState);
        // //    info : L6HkSxDySdCLf8NsKYB64pLX5rE4XJVQvG0ROvYXBwYXZ7e0kRlU7gwVgo49xcFX6FI
        // let x = null;
        // await axios.get('https://www.universal-tutorial.com/api/getaccesstoken', {
        //     headers: {
        //         "Accept": "application/json",
        //         "user-email": "blink.interlageducativo@gmail.com",
        //         "api-token": "RjWHZOlhuvyH-x1rkLxxrp0hlbNSSXnSoa7DcnV-OIvJoZigJDOXcg71IyMIQp5fynU"
        //     }
        // }).then(function (response) {
        //    x = response.data.auth_token;
        //    consultCountries(x);
        // });
        // axios.get('https://api-sepomex.hckdrk.mx/query/get_estados?token=pruebas', {
        //     // headers: {
        //     //     Authorization: 'Bearer ' + x,
        //     //     Accept: "application/json"
        //     // }
        // }).then(function (response) {
        //     // setStates(response.data.response.estado);
        // });
    }
    // Register to save data
    const { register: student,getValues, handleSubmit, errors, formState,reset: reset } = useForm({
        // defaultValues:{
        //     email: 'example@email.com'
        // }, 
        mode: 'onChange' }
        );
    const { register: reference, handleSubmit: handleSubmitReference, errors: errorsReference, formState: formStateReference, reset:resetReference
     } = useForm({ mode: 'onChange' });
    const styles = {
        container: {
            width: "80%",
            margin: "0 auto",
        },
        input: {
            width: "100%",
        },
    };
    const [addrtype, setAddrtype] = useState(["Papa", "Mama", "Hermano/Hermana", "Otro"])
    const Add = addrtype.map(Add => Add
    )
    // function showReference (e){
    // }
    const showOtherReference = (e) => {
        if (e.target.value) {
            setvalidFieldFour(false);
        } else {
            setvalidFieldFour(true);
        }
    }
    const showReference = (e) => {
        if ((addrtype[e.target.value]) == "Otro") {
            setExtra(true);
            setvalidFieldFour(true);
        } else {
            setExtra(false);
            setvalidFieldFour(false);
        }
        if (e.target.value) {
            setvalidFieldThree(false);
        } else {
            setvalidFieldThree(true);
        }
    }

    function handleValidEmail(e){
        let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    }
    function handlevalidPhone(e) {
        let regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
        // if (!regex.test(e.target.value)) {
        //     setvalidFieldTwo(true);
        // } else {
        //     setvalidFieldTwo(false);

        // }

    }
    function valid() {
        return validField;
    }
    function validTwo() {
        return validFieldTwo;
    }
    // function to view modals
    const showModal1 = function close() {
        setvalidField(true);
        setModal2(false);
        setModal3(false);
        setModal4(false);
        setModal1(true);
    };
    const showModal2 = function close() {
        setModal1(false);
        setModal2(true);
    };
    const showModal3 = function close() {
        setvalidFieldThree(true);
        setExtra(false);
        setModal1(false);
        setModal2(false);
        setModal4(false);
        setModal3(true);
    };
    const showModal4 = function close() {
        setModal1(false);
        setModal2(false);
        setModal3(false);
        setModal4(true);
    };
    const handleClose = function close() {
        reset();
        resetReference();
        setvalidField(true);
        setExtra(false);
        setModal1(false);
        setModal2(false);
        setModal3(false);
        setModal4(false);
        setModal5(false);
        props.consult();
        setFlagOther("");

    }
    const handleExtra = function ekis() {
        setExtra(state => !state);
    }
    function handlevalidTwo(e) {
        if (e.target.value) {
            setvalidFieldTwo(false);
        } else {
            setvalidFieldTwo(true);
        }
    }
    function handleValid(e) {
        if (e.target.value) {
            setvalidField(false);
        } else {
            setvalidField(true);
        }
    }
    function handlevalidFive(e){
        if(e.target.value) {
            setvalidFieldFive(false);
        } else {
            setvalidFieldFive(true);
        }
    }
    function handlevalidSix(e){
        if(e.target.value) {
            setvalidFieldSix(false);
        } else {
            setvalidFieldSix(true);
        }
    }
    function handlevalidFour(e) {
        if (e.target.value) {
            setvalidFieldFour(false);
        } else {
            setvalidFieldFour(true);
        }
    }
    async function onSubmit(data) {
        setBlocked(true);
        if(modal1 === true){
            setAux({...data});
            setModal1(false);
            setModal5(true);
            setBlocked(false);
        }
        if(modal5 === true){
            setModal5(false);
            const {email,id,name,token,type} = JSON.parse(localStorage.getItem('user'));
            let selectValue = [{
                id:id,
                type:type,
                fullname:name,
                email:email
            }];
            let datex = dateReminder + " " + timeReminder;
            let obj = {
                id:  null,
                id_college: null,
                college:  null,
                subject: 'Recordatorio Automático',
                emailTo: selectValue ?? null,
                dateReminder: datex ?? null,
                timenotification: notificationReminder ?? null,
                notes: notes ?? null,
                departament: null,
                urgent:  0,
            };
            let auxTwo = {...aux,id_advisor:id,name_advisor:name}
            let auxThree = {...auxTwo,reminder:{...obj}};
             axios.post(constaApi+'contacts/save',auxThree)
            .then(function (response) {
              setIDContact(response.data.id);
              props.consult();
            });
          showModal2();
        }
        if(modal3 === true){
            data.idContact = idContact;
            await axios.post(constaApi+'references',data)
            .then(function (response) {
            })
            showModal4();
            setBlocked(false);
        }
        reset();
        resetReference()
        props.consult();
    }


    return (
        <>
            <Button style={{ color: '#182739', marginRight: '10px', backgroundColor: '#FFFFFF', boxShadow: 'rgb(209, 221, 235) 0px 0px 0px 1px inset' }} className=" Inter600" variant="light">Import</Button>
            <button type="button" className="btn btn-sm btn-info" onClick={showModal1}>Crear contacto </button>

            {/* FirstModal */}
            <Modal
                style={{marginTop:'50px'}}
                show={modal1}
                dialogClassName="modal-90w"
                onHide={handleClose}
            >
                <Modal.Header style={{height:'60px'}} closeButton>
                    <Modal.Title style={{ fontFamily: 'Inter', marginTop:'5px', fontWeight: '600', fontSize: '18px' }}>Agregar contacto </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="container-fluid">
                            <Row>
                            <Col className="col-4">
                                    <Form.Label className="formGray">Programa</Form.Label>
                                    <Form.Control onChange={e => handlevalidFive(e)} autoComplete="off" name="program" ref={student({
                                        required: true
                                    })} as="select" size="sm" custom>
                                    <option disabled value="" selected></option>
                                        {program.map(pro => (
                                            <option key={pro} value={pro}>
                                                {pro}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <p className='errores'>{errors.name && "Programa requerido"}</p>
                                </Col>
                                <Col className="col-2">
                                    <Form.Label className="formGray">Año</Form.Label>
                                    <Form.Control onChange={e => handlevalidSix(e)} autoComplete="off" name="year" ref={student({
                                        required: true
                                    })} as="select" size="sm" custom>
                                    <option disabled value="" selected></option>
                                        {years.map(y => (
                                            <option key={y} value={y}>
                                                {y}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <p className='errores'>{errors.year && "Año requerido"}</p>
                                </Col>
                                <Col>
                               
                                </Col>
                            </Row>
                            <Row className="mt-1">
                            <Col className="col-6">
                                    <Form.Label className="formGray">Nombre</Form.Label>
                                    <Form.Control onChange={e => handleValid(e)} name="name" ref={student({
                                        required: true,
                                        minLenth: 6,
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
                                    <Form.Label className="formGray">Apellido Paterno</Form.Label>
                                    <Form.Control onChange={e => handlevalidTwo(e)} name="father_lastname" ref={student({
                                        required: true,
                                        minLenth: 6,
                                        maxLength: 50
                                    })}
                                        autoComplete="off" className="formGray" type="text" placeholder="Ingrese su primer apellido" />
                                    <p className='errores'
                                    >{errors.father_lastname && "Apellido requerido"}</p>
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Apellido Materno</Form.Label>
                                    <Form.Control autoComplete="off" name="mother_lastname" ref={student}
                                        className="formGray" type="text" placeholder="Ingrese su segundo apellido" />
                                    <p className='errores'
                                    >{errors.mother_lastname && "Apellido requerido"}</p>
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Fecha de nacimiento</Form.Label>
                                    <Form.Control autoComplete="off" name="birthday" ref={student}
                                        className="formGray" type="date" placeholder="Ingrese su Fecha" />
                                    <p className='errores'>{errors.date && "Fecha requerida"}</p>
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-3">
                                    <Form.Label className="formGray">Grado</Form.Label>
                                    <Form.Control autoComplete="off" name="grade" ref={student} as="select" size="sm" custom>
                                    <option disabled value="" selected></option>
                                        <option value="Grado 1">Grado 1</option>
                                        <option>Grado 2</option>
                                        <option>Grado 3</option>
                                        <option>Grado 4</option>
                                        <option>Grado 5</option>
                                        <option>Grado 6</option>
                                        <option>Grado 7</option>
                                        <option>Grado 8</option>
                                        <option>Grado 9</option>
                                        <option>Grado 10</option>
                                        <option>Grado 11</option>
                                        <option>Grado 12</option>
                                    </Form.Control>
                                </Col>
                                <Col className="col-3">
                                    <Form.Label className="formGray">Ciclo escolar</Form.Label>
                                    <Form.Control autoComplete="off" name="cicly" ref={student} as="select" size="sm" custom>
                                    <option disabled value="" selected></option>
                                        <option value="2015-2016">2015 - 2016</option>
                                        <option>2016 - 2017</option>
                                        <option>2017 - 2018</option>
                                        <option>2018 - 2019</option>
                                        <option>2019 - 2020</option>
                                        <option>2020 - 2021</option>
                                        <option>2021 - 2022</option>
                                        <option>2022 - 2023</option>
                                        <option>2023 - 2024</option>
                                        <option>2024 - 2025</option>
                                        <option>2025 - 2026</option>
                                        <option>2026 - 2027</option>
                                        <option>2027 - 2028</option>
                                        <option>2028 - 2029</option>
                                        <option>2029 - 2030</option>
                                        <option>2030 - 2031</option>
                                    </Form.Control>
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Colegio</Form.Label>
                                    <Form.Control autoComplete="off" name="schoool" ref={student}
                                        onChange={(e) => changeFlag(e)}
                                        className="formGray" type="text" placeholder="Ingrese su Colegio"  as="select" size="sm" custom>
                                        {localColleges &&
                                            [localColleges.map(colL => {
                                                return(
                                                    <option key={colL.id} value={colL.name}>
                                                    {colL.name}
                                                      </option>
                                                 )
                                                })]  
                                            }
                                            <option key="Otro" value="Otro">Otro</option>  
                                        </Form.Control>
                                    <p className='errores'>{errors.school && "Colegio requerido"}</p>
                                    <div class="mt-3 row">
                                   {flagOther == 'Otro' &&
                                  <div class="col">
                                  <Form.Control autoComplete="off"
                                      name="other_School"
                                      ref={student}
                                      className="formGray" type="text" placeholder="Ingrese el nombre de su colegio" />
                                    </div>
                                    }
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Email</Form.Label>
                                    <Form.Control  autoComplete="off" name="email"
                                        ref={student({
                                            required:false,
                                            pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                                        })}
                                        className="formGray" type="email" placeholder="Ingrese su email" />
                                    <p className='errores'>{errors.email && "Formato invalido"}</p>

                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Telefono</Form.Label>
                                    <Form.Control onChange={e => handlevalidPhone(e)} autoComplete="off" name="phone" ref={student({
                                        pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                                        maxLength: 10
                                    })}
                                        className="formGray" type="tel" placeholder="Ingrese su telefono" />
                                    <p className='errores'>{errors.phone && "Formato invalido,solo 10 digitos"}</p>
                                </Col>
                            </Row>
                            <Row className="mt-1">
                            <Col className="col-4">
                                    <Form.Label className="formGray">Pais</Form.Label>
                                    <Form.Control  autoComplete="off" name="country" ref={student} as="select" size="sm" custom>
                                    <option value="Mexico">Mexico</option>
                                        {countries.map(countri => (
                                                        <option key={countri.name} value={countri.name}>
                                                            {countri.name}
                                                        </option>
                                                    ))}
                                    </Form.Control>
                                    <p className='errores'>{errors.country && "Pais requerido"}</p>
                                </Col>
                                <Col className="col-4">
                                    <Form.Label className="formGray">Estado</Form.Label>
                                    <Form.Control onChange={e => changeCities(e)} autoComplete="off" name="state" ref={student} as="select" size="sm" custom>
                                        <option disabled value="" selected></option>
                                        {states.map(state => (
                                            <option key={state.clave} value={state.nombre}>
                                                {state.nombre}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <p className='errores'>{errors.state && "Estado requerido"}</p>
                                </Col>
                                <Col className="col-4">
                                    <Form.Label className="formGray">Ciudad</Form.Label>
                                    <Form.Control autoComplete="off" name="city" ref={student} as="select" size="sm" custom>
                                    <option disabled value="" selected></option>
                                        {cities.map(city => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <p className='errores'>{errors.state && "Estado requerido"}</p>
                                </Col>
                            </Row>
                            <Row>
                                <hr></hr>
                            <Col className="col-12">
                                    <Form.Label className="formGray">Recomendado por :</Form.Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                            <Form.Label className="formGray">Nombre</Form.Label>
                               <Form.Control autoComplete="off" name="name_recom" ref={student}
                                        className="formGray" type="text" placeholder="Ingrese el nombre del Rec." />
                                </Col>
                                <Col>
                                <Form.Label className="formGray">Apellido P.</Form.Label>
                               <Form.Control autoComplete="off" name="father_recom" ref={student}
                                        className="formGray" type="text" placeholder="Ingrese su apellido p" />
                                </Col>
                                <Col>
                                <Form.Label className="formGray">Apellido M.</Form.Label>
                               <Form.Control autoComplete="off" name="mother_recom" ref={student}
                                        className="formGray" type="text" placeholder="Ingrese su apellido m" />
                                </Col>
                            </Row>

                        </div>
                        <Row>

                            <Col>
                                <Button
                                    disabled={valid() || validTwo() || validFieldFive || validFieldSix || blocked}
                                    className="float-right mb-3 mr-2" type="submit"
                                    onSubmit={handleSubmit(onSubmit)}
                                    variant="info">Guardar</Button>
                                <Button onClick={handleClose} style={{ fontFamily: 'Inter', fontWeight: '500' }} className="float-right mb-3 mr-2" variant="danger" >
                                    Cancel
                </Button>

                            </Col>
                        </Row>
                    </form>
                </Modal.Body>
            </Modal>


            {/* Second Modal */}
            <Modal
                style={{marginTop:'50px', height: '500px', maxHeight: '604px' }}
                show={modal2}
                dialogClassName="modal-90w"
                onHide={handleClose}
            >
            <Modal.Header style={{height:'60px'}} closeButton>
                    <Modal.Title style={{ fontFamily: 'Inter', marginTop:'5px', fontWeight: '600', fontSize: '18px' }}>Agregar contacto</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>
                    <div className="row mt-5"></div>
                    <div className="row mt-5"></div>
                    <div className="container">
                        <div className="row">
                            <div className="mx-auto">
                                <h1 className="Inter600B">Contacto Guardado!</h1>
                            </div>
                        </div>
                        <div style={{marginTop:'-15px'}} className="row">
                            <div className="mx-auto">
                                <span className="Inter500" > ¿Qué mas te gustaría hacer?</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mx-auto">
                            <button className="btn btn-info Inter600" onClick={showModal3}>Agregar una referencia</button>

                        </div>
                    </div>
                    <div className="row ">
                        <div className="mx-auto">
                            <button  onClick={showModal1} className="btn btn-info Inter600">Agregar un contacto</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mx-auto">
                            <a className="Inter500B" onClick={handleClose}>Listo!</a>
                        </div>
                    </div>
                    <div className="row mb-5"></div>
                    <div className="row mb-5"></div>
                    <div className="row mb-5"></div>
                </Modal.Body>
            </Modal>



            {/* Three Modal */}
            <Modal
                show={modal3}
                onHide={handleClose}
                dialogClassName="modal-90w"
                style={{marginTop:'50px', height: '500px', maxHeight: '604px' }}
                >
                <Modal.Header style={{height:'60px'}} closeButton>
                <Modal.Title style={{ fontFamily: 'Inter', marginTop:'5px', fontWeight: '600', fontSize: '18px' }}>Agregar referencia</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>
                <form onSubmit={handleSubmitReference(onSubmit)}>
                        <div className="container-fluid">
                            <Row>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Tipo de referencia</Form.Label>
                                    < select
                                    ref={reference({
                                        required: true
                                    })} 
                                    name="type_ref"
                                        onChange={e => showReference(e)}
                                        className="browser-default custom-select" >
                                        {
                                            Add.map((address, key) => <option key={key} value={key}>{address}</option>)
                                        }
                                    <option disabled value= "" selected ></option>
                                    </select >

                                </Col>
                                {extra &&
                                    <Col className="col-6">
                                        <Form.Label className="formGray">Referencia</Form.Label>
                                        <Form.Control autoComplete="off"  onChange={e => showOtherReference(e)} ref={reference({
                                    })} 
                                    name="name_ref"
                                     className="formGray" type="text" placeholder="Ingrese la referencia" />
                                    </Col>

                                }
                            </Row>

                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Nombre</Form.Label>
                                    <Form.Control  ref={reference({})} name="name" onChange={e => handlevalidFour(e)} autoComplete="off" className="formGray" type="text" placeholder="Ingrese su nombre" />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Apellido Paterno</Form.Label>
                                    <Form.Control autoComplete="off" ref={reference({})} name="father_lastname" className="formGray" type="text" placeholder="Ingrese su primer apellido" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Apellido Materno</Form.Label>
                                    <Form.Control autoComplete="off" ref={reference({})} name="mother_lastname" className="formGray" type="text" placeholder="Ingrese su segundo apellido" />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Email</Form.Label>
                                    <Form.Control autoComplete="off" ref={reference({})} name="email" className="formGray" type="email" placeholder="Ingrese su email" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Telefono</Form.Label>
                                    <Form.Control autoComplete="off" ref={reference({})} name="phone" className="formGray" type="tel" placeholder="Ingrese su telefono" />
                                </Col>
                            </Row>
                        </div>
                        <Row className="mt-1">

                            <Col>
                                <Button 
                                disabled={validFieldThree || validFieldFour}
                                className="float-right mb-3 mr-2" type="submit" variant="info">Guardar</Button>
                                <Button onClick={handleClose} style={{ fontFamily: 'Inter', fontWeight: '500' }} className="float-right mb-3 mr-2" variant="danger" >
                                    Cancel
</Button>

                            </Col>
                        </Row>
                    </form>
                </Modal.Body>

            </Modal>



            {/* Four Modal */}
            <Modal
                show={modal4}
                onHide={handleClose}
                dialogClassName="modal-90w"
                style={{marginTop:'50px', height: '500px', maxHeight: '604px' }}
                >
                <Modal.Header style={{height:'60px'}} closeButton>
                <Modal.Title style={{ fontFamily: 'Inter', marginTop:'5px', fontWeight: '600', fontSize: '18px' }}>Agregar Referencia</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>
                    <div className="row mt-5"></div>
                    <div className="container">
                        <div className="row">
                            <div className="mx-auto">
                                <h1 className="Inter600B">Referencia Guardada!</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mx-auto">
                                <span className="Inter500" > ¿Te gustaria agregar otra referencia?</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mx-auto">
                            <button className="btn btn-info Inter600" onClick={showModal3}>Agregar una referencia</button>

                        </div>
                    </div>
                    <div className="row">
                        <div className="mx-auto">
                            <button onClick={showModal1} className="btn btn-info Inter600">Agregar un contacto</button>

                        </div>
                    </div>
                    <div className="row ">
                        <div className="mx-auto">
                            <a className="Inter500B" onClick={handleClose}>Terminar</a>
                        </div>
                    </div>
                    <div className="row mb-5"></div>
                    <div className="row mb-5"></div>
                    <div className="row mb-5"></div>
                </Modal.Body>

            </Modal>


            {/* Modal Five */}
              {/* Four Modal */}
              <Modal
                show={modal5}
                onHide={(e) => confirmClose()}
                dialogClassName="modal-90w"
                style={{marginTop:'50px', height: '500px', maxHeight: '604px' }}
                >
                <Modal.Header style={{height:'60px'}} closeButton>
                <Modal.Title style={{ fontFamily: 'Inter', marginTop:'5px', fontWeight: '600', fontSize: '18px' }}>Agregar Recordatorio</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>
                <NotificationAlert ref={notificationAlert} />
                <form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mt-3">
                                <Col>
                                    <Form.Label className="formGray">Notas</Form.Label>
                                    <InputGroup style={{ borderTop: '0', width: '100%', marginTop: '0px' }}>
                                        <Form.Control
                                            onChange={(e) => changeNotes(e)}
                                            value={notes} as="textarea" placeholder="Escriba su mensaje..." rows={8} />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col >
                                    <Form.Control style={{ height: '100px', width: '180px' }}
                                        onChange={(e) => changeDate(e)}
                                         disabled
                                        value={dateReminder} autoComplete="off" name="date"
                                        className="formGray" type="date" placeholder="Ingrese su Fecha" />
                                </Col>
                                <Col className="mt-4">
                                    <Form.Control style={{ height: '30px', width: '150px' }}
                                        onChange={(e) => changeTime(e)}
                                         disabled
                                        value={timeReminder} autoComplete="off" name="date"
                                        className="formGray" type="time" placeholder="Ingrese su Fecha" />
                                </Col>
                                <Col className="col-5">
                                    <Form.Label className="formGray">Notificación</Form.Label>
                                    <Form.Control onChange={(e) => changeTimeReminder(e)}
                                        autoComplete="off"
                                         disabled
                                        value={notificationReminder} name="type" as="select" size="sm" custom>
                                        <option disabled selected value=""></option>
                                        <option value="-0 hour">Misma hora</option>
                                        <option value="-1 hour">1 Hora Antes</option>
                                        <option value="-24 hour">1 Dia Antes</option>
                                        <option value="-48 hour">2 Dias Antes</option>
                                        <option value="-168 hour">1 Semana Antes</option>
                                    </Form.Control>
                                </Col>
                            </Row>
                            <Button 
                             disabled ={!notes}
                             onSubmit={handleSubmit(onSubmit)}
                             className="float-right mb-3 mr-2" type="submit" variant="info">Guardar</Button>
                             </form>
                </Modal.Body>

            </Modal>
        </>
    )
}

/* <div className="container-fluid">
                            <Row>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Nombre</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su nombre" />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Apellido Paterno</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su primer apellido" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Apellido Materno</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su segundo apellido" />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Email</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="email" placeholder="Ingrese su email" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Telefono</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="tel" placeholder="Ingrese su telefono" />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Fecha de nacimiento</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="date" placeholder="Ingrese su fecha" />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Estado</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Estado" />
                                </Col>
                                <Col className="col-6">
                                    <Form.Label className="formGray">Ciudad</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Ciudad" />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Calle</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Calle" />
                                </Col>
                                <Col className="col-3">
                                    <Form.Label className="formGray">No.</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Numero" />
                                </Col>
                                <Col className="col-3">
                                    <Form.Label className="formGray">Codigo postal</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Codigo" />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <Form.Label className="formGray">Estado Civil</Form.Label>
                                    <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Estado civil" />
                                </Col>
                            </Row>
                            <Row className="mt-1">
                                <Col className="col-6">
                                    <a onClick={handleExtra}>
                                        <GrIcons.GrAdd /> Agregar mama
                                </a>
                                </Col>
                                {extra && (
                                    <div className="container-fluid">
                                        <Row className="mt-1">
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Nombre</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su nombre" />
                                            </Col>
                                        </Row>
                                        <Row className="mt-1">
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Apellido Paterno</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su primer apellido" />
                                            </Col>
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Apellido Materno</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su segundo apellido" />
                                            </Col>
                                        </Row>
                                        <Row className="mt-1">
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Email</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="email" placeholder="Ingrese su email" />
                                            </Col>
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Telefono</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="tel" placeholder="Ingrese su telefono" />
                                            </Col>
                                        </Row>
                                        <Row className="mt-1">
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Estado</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su email" />
                                            </Col>
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Ciudad</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su telefono" />
                                            </Col>
                                        </Row>
                                        <Row className="mt-1">
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Fecha de nacimiento</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="date" placeholder="Ingrese su email" />
                                            </Col>
                                        </Row>
                                        <Row className="mt-1">
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Estado</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Estado" />
                                            </Col>
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Ciudad</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Ciudad" />
                                            </Col>
                                        </Row>
                                        <Row className="mt-1">
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Calle</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Calle" />
                                            </Col>
                                            <Col className="col-3">
                                                <Form.Label className="formGray">No.</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Numero" />
                                            </Col>
                                            <Col className="col-3">
                                                <Form.Label className="formGray">Codigo postal</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Codigo" />
                                            </Col>
                                        </Row>
                                        <Row className="mt-1">
                                            <Col className="col-6">
                                                <Form.Label className="formGray">Estado Civil</Form.Label>
                                                <Form.Control autoComplete="off" className="formGray" type="text" placeholder="Ingrese su Estado civil" />
                                            </Col>
                                        </Row>
                                    </div>
                                )}
                            </Row>
                        </div>
*/

export default MultipleModals



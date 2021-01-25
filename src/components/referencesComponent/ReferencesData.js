import React, { useEffect, useState } from 'react';
import * as FIIcons from "react-icons/fi";
import * as FAIcons from "react-icons/fa";
import * as TIicons from "react-icons/ti";
import { Row, Col, Button, Modal, Form,InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useAlert } from 'react-alert'
import { constaApi,constzipCodeApi } from '../../constants/constants';
import swal from 'sweetalert';
import { Checkbox } from '../collegeComponents/AddOrEditCollege';

// papa = 0 
// mama = 1
// ermano = 2
// otro = 3

function ReferencesData(props) {
    const [countries, setCountries] = useState([]);
    const [optionscols,setCols] = useState([{colonia:""}]);
    const [directions, setDirections] = useState(props.reference.reference_address);
    const [phones, setPhones] = useState(props.reference.reference_phones);
    const [emails, setEmails] = useState(props.reference.reference_emails);
    const [inputList, setInputList] = useState([{ street: "", number: "", cp: "", city: "", state: "",country: "Mexico", typeAddress: "" }]);
    const [inputPhone, setInputPhone] = useState([{ phone: "", typePhone: "" }]);
    const [inputEmail, setInputEmail] = useState([{ email: "", typeEmail: "" }]);
    const alert = useAlert()
    const { handleSubmit } = useForm({});
    const [type_ref, setTypeRef] = useState();
    const [falseTypeR, setFalseTypeR] = useState();
    const [edit, setEdit] = useState(false);
    const [otherNameR, seOthernameR] = useState(false);
    const [nameR, setNameR] = useState();
    const [fName, setFnameR] = useState();
    const [mName, setMnameR] = useState();
    const [emailR, setEmailR] = useState();
    const [phoneR, setPhoneR] = useState();
    const [nameRef, setNameRefO] = useState();
    const [state, setState] = useState();
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [addrtype, setAddrtype] = useState(["Papa", "Mama", "Hermano/Hermana", "Otro"])
    const Add = addrtype.map(Add => Add)
    const [token, setToken] = useState(props.token ?? JSON.parse(localStorage.getItem('tokenStates')));

    useEffect(() => {
        console.log('props',props);
        typeRef(props.reference);
        consultStates();
        consultCountries();
        setFilterValues(props.reference);
    }, [props])
    const [flagCountry,setFlagCoutnry] = useState({
        value:'Pais',
        isChecked:false,
        label:'Pais'
    });

    async function consultCountries() {
        await axios.get('https://www.universal-tutorial.com/api/countries/', {
            headers: {
                Authorization: 'Bearer ' + props.token,
                Accept: "application/json"
            }
        }).then(function (response) {
            setCountries(response.data);
        });
    }
    async function changeCities(e, i = 0) {
        let val = e.target.value;
        if (val === undefined) {
            val = props.reference.state;
        } else {
            val = e.target.value;
        }
        if (e.target) {
            if (e.target.value != undefined) {
                const list = [...inputList];
                // list[i][name] = value;
                handleInputChange(e, i);
                setState(e.target.value);
            }
        }
        await axios.get('https://www.universal-tutorial.com/api/cities/' + val, {
            headers: {
                Authorization: 'Bearer ' + props.token,
                Accept: "application/json"
            }
        }).then(function (response) {
            setCities(response.data);
        });
    }
    // Methods

    function changeChecked(){
        let check = flagCountry.isChecked;
        check = check ? false : true ;
        setFlagCoutnry({...flagCountry,isChecked:check});
    }
    const tagMun = (mun) => {
        let tag = '';
        return tag = <span><strong class="Inter">Municipio: </strong>{mun}</span>;
    }
    const tagCOL = (col) => {
    let tag = '';
        return tag = <span><strong class="Inter">Colonia: </strong>{col}     </span>;
    }
    const tagSpan = (num) => {
        let tag = '';
        return tag = <span><strong class="Inter">Interior: </strong>{num}</span>;
    }
    // Api to states
    async function consultStates() {
        await axios.get('https://www.universal-tutorial.com/api/states/Mexico', {
            headers: {
                Authorization: 'Bearer ' + props.token,
                Accept: "application/json"
            }
        }).then(function (response) {
            setStates(response.data);
            let obj = {
                target: {
                    value: state
                }
            };
            changeCities(obj);
        });

    }

    function setFilterValues(reference) {
        setNameR(reference.name);
        setEmailR(reference.email);
        setFnameR(reference.father_lastname);
        setMnameR(reference.mother_lastname);
        setPhoneR(reference.phone);
        setNameRefO(reference.name_ref);
        setFalseTypeR(reference.type_ref)
        if (directions.length > 0) {
            setInputList(directions);

        }
        if (phones.length > 0) {
            setInputPhone(phones);
        }
        if (emails.length > 0) {
            setInputEmail(emails);
        }
    }
    function changeNameRef(e) {
        setNameRefO(e.target.value);
    }
    const handleInputChangeEmail = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputEmail];
        list[index][name] = value;
        setInputEmail(list);
    };

    // handle click event of the Remove button
    const handleRemoveClickEmail = index => {
        const list = [...inputEmail];
        list.splice(index, 1);
        setInputEmail(list);
    };

    // handle click event of the Add button
    const handleAddClickEmail = () => {
        setInputEmail([...inputEmail, { email: "" }]);
    };

    // ----------------------------------------------------------    
    const handleInputChangePhone = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputPhone];
        list[index][name] = value;
        setInputPhone(list);
    };

    // handle click event of the Remove button
    const handleRemoveClickPhone = index => {
        const list = [...inputPhone];
        list.splice(index, 1);
        setInputPhone(list);
    };

    // handle click event of the Add button
    const handleAddClickPhone = () => {
        setInputPhone([...inputPhone, { phone: "" }]);
    };
    // ---------------------------------------------------------
    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        if(name === "cp" && value.length === 5){
            callCP(index,value);
        }
        const list = [...inputList];
        if(name ==="country"){
            list[index]['col'] = "";
            list[index]['mun'] = "";
        }
        list[index][name] = value;
        setInputList(list);
    };
    const callCP = async (index,val) => {
        await await axios.get(constzipCodeApi+ val, {
        }).then(function (response) {
            let {data} = response;
            if(data){
                let colx = [];
                let resp = data.map(d => {
                    return d.response;
                })
                const list = [...inputList];
                list[index]['state'] = resp[0].estado === "Coahuila de Zaragoza" ? "Coahuila" : resp[0].estado;
                list[index]['city'] = resp[0].municipio;
                list[index]['col'] = resp[0].asentamiento;
                list[index]['mun'] = resp[0].municipio;
                setInputList(list);
                 colx = resp.map(re => {
                    return {colonia:re.asentamiento};
                });
                setCols(colx);
            }
        });
    }
    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { street: "", number: "", cp: "" }]);
    };
    function typeRef(reference) {
        switch (reference.type_ref) {
            case "0":
                setTypeRef("Papa");
                break;
            case "1":
                setTypeRef("Mama");
                break;
            case "2":
                setTypeRef("Hermano/Hermana");
                break;
            case "3":
                setTypeRef(reference.name_ref);
                seOthernameR(true);
                break;
            default:
                break;
        }
    }

    function editing() {
        setFilterValues(props.reference);
        setEdit(!edit);
    }

    async function deleteReference(id) {
        swal({
            title: "Estas seguro?",
            text: "Una vez eliminado,no podras recuperar este registro!",
            icon: "warning",
            dangerMode: true,
            buttons: ["No", "Si"],
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    await axios.post(constaApi + 'references/' + id)
                        .then(function (response) {
                            if (response.status === 201) {
                                props.handlerUpdate();
                                alert.show('Referencia Eliminada correctamente', {
                                    timeout: 2000, // custom timeout just for this one alert
                                    type: 'success'
                                })
                            } else {
                                alert.show('Ocurrio un error por favor intentar mas tarde');
                            }
                        });
                }
                else {
                    swal("Operacion cancelada!");
                }
            });

    }
    function changeName(e) {
        setNameR(e.target.value);
    }
    function changeType(e) {
        setTypeRef(e.target.value);
    }
    function changeFname(e) {
        setFnameR(e.target.value);
    }
    function changeMName(e) {
        setMnameR(e.target.value);
    }
    function changeEmail(e) {
        setEmailR(e.target.value);
    }
    function changePhone(e) {
        setPhoneR(e.target.value);
    }
    function showReference(e) {
        setFalseTypeR(e.target.value);
        if (e.target.value == 3) {
            seOthernameR(true);
        } else {
            seOthernameR(false);
        }
    }
    async function onSubmit(data) {
        let datax = {
            id: props.id,
            type_ref: falseTypeR,
            name: nameR,
            email: emailR,
            name_ref: nameRef,
            father_lastname: fName,
            mother_lastname: mName,
            phone: phoneR,
            direction: inputList,
            email: inputEmail,
            phone: inputPhone
        }
        await axios.post(constaApi + 'reference/update', datax)
            .then(function (response) {
                if (response.status === 200) {
                    props.handlerUpdate();
                    alert.show('Datos actualizados correctamente', {
                        timeout: 2000, // custom timeout just for this one alert
                        type: 'success'
                    })
                } else {
                    alert.show('Ocurrio un error por favor intentar mas tarde');
                }
            });

    }
    return (
        <>
            {!edit ?
                <div class="mt-2 card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-11">
                                <h5 style={{ fontWeight: '600' }} class="Inter card-title">{type_ref}</h5>
                            </div>
                            <div style={{ marginRight: '-200px' }} class="col-1 d-flex justify-content-end">
                                <a>
                                    <FIIcons.FiEdit
                                        onClick={(e) => editing()}
                                        size={18} style={{ color: '#386CEF' }} />
                                </a>
                                <a class="ml-1">
                                    <FAIcons.FaTrashAlt
                                        onClick={(e) => deleteReference(props.reference.id)}
                                        size={18} style={{ color: '#FF0101' }} />
                                </a>
                            </div>
                        </div>
                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Nombre</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {props.reference.name}
                                </h6>
                            </div>
                        </div>

                        {/* <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Tipo</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {type_ref}
                                </h6>
                            </div>
                        </div> */}

                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Apellido Paterno</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {props.reference.father_lastname}
                                </h6>
                            </div>
                        </div>

                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Apellido Materno</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {props.reference.mother_lastname}
                                </h6>
                            </div>
                        </div>

                        {inputEmail.map((x, i) => {
                            return (
                                <div class="row mt-2 ">
                                    <div class="col-3">
                                        <h6 class="Inter card-subtitle mb-2 text-muted">Email {x.typeEmail}</h6>
                                    </div>
                                    <div class="col">
                                        <h6 style={{ color: '#243243', fontWeight: '600' }}
                                            class="Inter card-subtitle mb-2 ">
                                            {x.email}
                                        </h6>
                                    </div>
                                </div>
                            );
                        })}
                        {inputPhone.map((x, i) => {
                            return (
                                <div class="row mt-3 ">
                                    <div class="col-3">
                                        <h6 class="Inter card-subtitle mb-2 text-muted">Telefono {x.typePhone}</h6>
                                    </div>
                                    <div class="col">
                                        <h6 style={{ color: '#243243', fontWeight: '600' }}
                                            class="Inter card-subtitle mb-2 ">
                                            {x.phone}
                                        </h6>
                                    </div>
                                </div>
                            );
                        })}
                        {inputList.map((x, i) => {
                            return (
                                <>
                                <div class="row mt-3 ">
                                    <div class="col-3">
                                        <h6 class="Inter card-subtitle mb-2 text-muted">Direcciòn {x.typeAddress}</h6>
                                    </div>
                                    <h6 style={{ color: '#243243', fontWeight: '600' }}
                                            class="Inter card-subtitle mb-2 ">
                                            {x.street} &nbsp;&nbsp;
                                            {x.intNum &&
                                            tagSpan(x.intNum)
                                            }
                                    </h6>
                                </div>
                                <div class="row mr-5">
                                    <div class="col-3">

                                    </div>
                                    <div class="col">
                                    <h6 class="mt-2"style={{ color: '#243243', fontWeight: '600' }}
                                            class="Inter card-subtitle mb-2 ">
                                            {x.col &&
                                            tagCOL(x.col)
                                            }
                                            {x.mun &&
                                            tagMun(x.mun)
                                            }
                                        </h6>
                                    </div>
                                </div>
                                <div class="row mr-5">
                                    <div class="col-3">

                                    </div>
                                    <div class="col">
                                    <h6 class="mt-2"style={{ color: '#243243', fontWeight: '600' }}
                                            class="Inter card-subtitle mb-2 ">
                                                {x.city}, {x.state}, {x.country}
                                        </h6>
                                    </div>
                                </div>
                                <div class="row mr-5">
                                    <div class="col-3">

                                    </div>
                                    <div class="col">
                                    <h6 class="mt-2"style={{ color: '#243243', fontWeight: '600' }}
                                            class="Inter card-subtitle mb-2 ">
                                                {x.cp}
                                        </h6>
                                    </div>
                                </div>
                                </>
                            );
                        })}


                    </div>
                </div>
                :
                <div class="card mt-2">
                    <div class="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="row">
                                <div class="col-11">
                                    <h5 style={{ fontWeight: '600' }} class="Inter card-title">{type_ref}</h5>
                                </div>

                                <div style={{ marginRight: '-200px' }} class="col-1 d-flex justify-content-end">
                                    <button onClick={(e) => editing()}
                                        type="button"
                                        class="Inter btn btn-danger">Cancelar</button>
                                    <button onSubmit={handleSubmit(onSubmit)}
                                        type="submit" class="Inter ml-1 btn btn-success">Guardar</button>
                                </div>
                            </div><Row>
                                <Col>
                                    <hr></hr>
                                    <h6 >
                                        Datos personales
                            </h6>
                                </Col>
                            </Row>
                            <div class="row mt-2">
                                <div class="col-3">
                                    <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Nombre</Form.Label>
                                </div>
                                <div class="col">
                                    <Form.Control autoComplete="off"
                                        onChange={(e) => changeName(e)} value={nameR}
                                        name="name"
                                        className="formGray" type="text" placeholder="Ingrese su nombre" />
                                </div>
                            </div>
                            <div class="row mt-3 ">
                                <div class="col-3">
                                    <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Tipo</Form.Label>
                                </div>
                                <div class="col">
                                    <Form.Label className="formGray">Tipo de referencia</Form.Label>
                                    < select
                                        value={falseTypeR}
                                        onChange={e => showReference(e)}
                                        className="browser-default custom-select" >
                                        {
                                            Add.map((address, key) => <option value={key}>{address}</option>)
                                        }
                                        <option disabled value="" selected ></option>
                                    </select >
                                </div>
                            </div>
                            {otherNameR
                                ?
                                <div class="row">
                                    <div class="col-3">
                                    </div>
                                    <div class="col mt-2">
                                        <Form.Control autoComplete="off"
                                            onChange={(e) => changeNameRef(e)} value={nameRef}
                                            name="name"
                                            className="formGray" type="text" placeholder="Especifique" />
                                    </div>
                                </div>
                                :
                                ''
                            }
                            <div class="row mt-3 ">
                                <div class="col-3">
                                    <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Apellido Paterno</Form.Label>
                                </div>
                                <div class="col">
                                    <Form.Control autoComplete="off"
                                        onChange={(e) => changeFname(e)} value={fName}
                                        name="mother_lastname"
                                        className="formGray" type="text" placeholder="Ingrese su Apellido paterno" />
                                </div>
                            </div>
                            <div class="row mt-3 ">
                                <div class="col-3">
                                    <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Apellido Materno</Form.Label>
                                </div>
                                <div class="col">
                                    <Form.Control autoComplete="off"
                                        onChange={(e) => changeMName(e)} value={mName}
                                        name="mother_lastname"
                                        className="formGray" type="text" placeholder="Ingrese su Apellido materno" />
                                </div>
                            </div>
                            <Row>
                                <Col>
                                    <hr></hr>
                                    <h6 >
                                        Email
                            </h6>
                                </Col>
                            </Row>
                            {inputEmail.map((x, i) => {
                                return (
                                    <div className="box">
                                        <div class="row mt-3 ">
                                            <div class="col-3">
                                                <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Tipo</Form.Label>
                                            </div>
                                            <div class="col">
                                                <Form.Control autoComplete="off"
                                                    onChange={e => handleInputChangeEmail(e, i)}
                                                    value={x.typeEmail}
                                                    name="typeEmail"
                                                    className="formGray" type="text" placeholder="Ejemplo : Personal,Trabajo,Estudiantil" />
                                            </div>
                                        </div>
                                        <div class="row mt-3 ">
                                            <div class="col-3">
                                                <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Email</Form.Label>
                                            </div>
                                            <div class="col">
                                                <Form.Control autoComplete="off"
                                                    onChange={e => handleInputChangeEmail(e, i)}
                                                    value={x.email}
                                                    name="email"
                                                    className="formGray" type="text" placeholder="Ingrese su Email" />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4 ">
                                                {inputEmail.length !== 1 &&
                                                    <button onClick={() => handleRemoveClickEmail(i)} type="button" class="Inter btn btn-outline-dark btn-sm">Remove</button>
                                                }
                                                {inputEmail.length - 1 === i && <button onClick={handleAddClickEmail}
                                                    type="submit" style={{ fontSize: '16px' }} class="Inter ml-1 btn btn-success btn-sm">+</button>

                                                }
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <Row>
                                <Col>
                                    <hr></hr>
                                    <h6 >
                                        Telefono
                            </h6>
                                </Col>
                            </Row>
                            {inputPhone.map((x, i) => {
                                return (
                                    <div className="box mt-1">
                                        <div class="row mt-3">
                                            <div class="col-3">
                                                <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Tipo</Form.Label>
                                            </div>
                                            <div class="col">
                                                <Form.Control autoComplete="off"
                                                    onChange={e => handleInputChangePhone(e, i)}
                                                    value={x.typePhone}
                                                    name="typePhone"
                                                    className="formGray" type="text" placeholder="Ejemplo : Movil,Personal,Trabajo" />
                                            </div>
                                        </div>

                                        <div class="row mt-3 ">
                                            <div class="col-3">
                                                <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Telefono</Form.Label>
                                            </div>
                                            <div class="col">
                                                <Form.Control autoComplete="off"
                                                    onChange={e => handleInputChangePhone(e, i)}
                                                    value={x.phone}
                                                    name="phone"
                                                    className="formGray" type="text" placeholder="Ingrese su numero" />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4 ">
                                                {inputPhone.length !== 1 &&
                                                    <button onClick={() => handleRemoveClickPhone(i)} type="button" class="Inter btn btn-outline-dark btn-sm">Remove</button>
                                                }
                                                {inputPhone.length - 1 === i && <button onClick={handleAddClickPhone}
                                                    type="submit" style={{ fontSize: '16px' }} class="Inter ml-1 btn btn-success btn-sm">+</button>

                                                }
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            <Row>
                                <Col>
                                    <hr></hr>
                                    <h6 >
                                        Dirección
                            </h6>
                                </Col>
                            </Row>
                            {inputList.map((x, i) => {
                                return (
                                    <div className="box">
                                        <div class="row mt-3">
                                            <div class="col-3">
                                                <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Tipo</Form.Label>
                                            </div>
                                            <div class="col">
                                                <Form.Control autoComplete="off"
                                                    onChange={e => handleInputChange(e, i)}
                                                    value={x.typeAddress}
                                                    name="typeAddress"
                                                    className="formGray" type="text" placeholder="Ejemplo : Trabajo,Casa,Negocio" />
                                            </div>
                                        </div>
                                        <div class="row mt-3 ">
                                            <div class="col-8">
                                                <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Calle</Form.Label>
                                                <InputGroup>
                                                <Form.Control autoComplete="off"
                                                    onChange={e => handleInputChange(e, i)}
                                                    value={x.street}
                                                    name="street"
                                                    className="informGray" type="text" placeholder="Ingrese su Calle" />
                                                <InputGroup.Append>
                                                <InputGroup.Text className="informGray" ><TIicons.TiHome /></InputGroup.Text>
                                                </InputGroup.Append>
                                                </InputGroup>
                                            </div>
                                            <div class="col-2">
                                            <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Numero exterior</Form.Label>
                                            <InputGroup>
                                                <Form.Control autoComplete="off"
                                                    onChange={e => handleInputChange(e, i)}
                                                    value={x.extNum}
                                                    name="extNum"
                                                    className="informGray" type="text" placeholder="#" />
                                                     <InputGroup.Append>
                                                <InputGroup.Text className="informGray" ><TIicons.TiHome /></InputGroup.Text>
                                                </InputGroup.Append>
                                                </InputGroup>
                                            </div>
                                            <div class="col-2">
                                            <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Numero Interior</Form.Label>
                                                <InputGroup>
                                                <Form.Control autoComplete="off"
                                                    onChange={e => handleInputChange(e, i)}
                                                    value={x.intNum}
                                                    name="intNum"
                                                    className="informGray" type="text" placeholder="#" />
                                             <InputGroup.Append>
                                                <InputGroup.Text className="informGray"><TIicons.TiHome /></InputGroup.Text>
                                                </InputGroup.Append>
                                                </InputGroup>
                                            </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col">
                                        <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Codigo postal</Form.Label>
                                                <InputGroup>
                                                <Form.Control autoComplete="off"
                                                    onChange={e => handleInputChange(e, i)}
                                                    value={x.cp}
                                                    title="respeta el formato,solo numeros"
                                                    pattern="[0-9]{5}"
                                                    name="cp"
                                                    className="informGray" type="text" placeholder="Ingrese su codigo postal" />
                                                    <InputGroup.Append>
                                                <InputGroup.Text className="informGray"><TIicons.TiHome /></InputGroup.Text>
                                                </InputGroup.Append>
                                                </InputGroup>
                                        </div>
                                        {x.country === "Mexico" &&
                                        <>
                                        <div class="col">
                                        <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Colonia</Form.Label>
                                        <InputGroup>
                                        <Form.Control onChange={e => handleInputChange(e, i)} autoComplete="off"
                                                    name="col"
                                                    value={x.col} as="select" size="sm" custom>
                                                    {optionscols.map(opcol => (
                                                        <option key={opcol.opcolonia} value={opcol.colonia}>
                                                            {opcol.colonia}
                                                        </option>
                                                    ))}
                                        </Form.Control>
                                                     <InputGroup.Append>
                                                </InputGroup.Append>
                                                </InputGroup>
                                        </div>
                                        <div class="col">
                                        <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Delegacion o Municipio</Form.Label>
                                        <InputGroup>
                                                <Form.Control autoComplete="off"
                                                    onChange={e => handleInputChange(e, i)}
                                                    value={x.mun}
                                                    name="mun"
                                                    disabled
                                                    className="informGray" type="text" placeholder="Ingrese su Municipio" />
                                                      <InputGroup.Append>
                                                <InputGroup.Text className="informGray"><TIicons.TiHome /></InputGroup.Text>
                                                </InputGroup.Append>
                                                </InputGroup>
                                        </div>
                                        </>
                                    }
                                     {x.country === 'Mexico' ?
                                    <>
                                                <div class="row ">
                                                    <div class="col">
                                                        <Form.Label style={{ fontSize: '16px' }} className="formGray">Estado</Form.Label>
                                                        <Form.Control
                                                        className="informGray"
                                                            onChange={e => handleInputChange(e, i)}
                                                            autoComplete="off" name="city"
                                                            value={x.state} size="sm"
                                                            autoComplete="off"
                                                        />                                                      
                                                    </div>
                                                    <div class="col">
                                                        <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Ciudad</Form.Label>
                                                        <Form.Control
                                                        className="informGray"
                                                            onChange={e => handleInputChange(e, i)}
                                                            autoComplete="off" name="city"
                                                            value={x.city} size="sm"
                                                            autoComplete="off"
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            // Manual 
                                            <>
                                                <div class="row ">
                                                    <div class="col">
                                                    <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Ciudad</Form.Label>
                                                    <InputGroup>
                                                        <Form.Control
                                                        className="informGray"
                                                            onChange={e => handleInputChange(e, i)}
                                                            autoComplete="off" name="city"
                                                            value={x.city} size="sm"
                                                            autoComplete="off"
                                                        />
                                                              <InputGroup.Append>
                                                <InputGroup.Text className="informGray"><TIicons.TiHome /></InputGroup.Text>
                                                </InputGroup.Append>
                                                </InputGroup>
                                                    </div>
                                                    <div class="col">
                                                        <Form.Label style={{ fontSize: '16px' }} className="formGray">Estado</Form.Label>
                                                        <InputGroup>
                                                        <Form.Control autoComplete="off"
                                                            onChange={e => handleInputChange(e, i)}
                                                            value={x.state}
                                                            name="state"
                                                            className="informGray" type="text" placeholder="Ingrese su Estado" />
                                                    <InputGroup.Append>
                                                <InputGroup.Text className="informGray"><TIicons.TiHome /></InputGroup.Text>
                                                </InputGroup.Append>
                                                 </InputGroup>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    </div>
                                    <Row className="mt-3">
                                <Col>
                                <Checkbox  {...flagCountry} changeCheck={changeChecked} index={i} />
                                </Col>
                                </Row>
                                {flagCountry.isChecked &&
                                        <div class="row mt-3 ">
                                            <div class="col-3">
                                                <Form.Label style={{ fontSize: '16px' }} className="formGray">Pais</Form.Label>
                                            </div>
                                            <div class="col">
                                                <Form.Control onChange={e => handleInputChange(e, i)} autoComplete="off"
                                                    name="country"
                                                    value={x.country} as="select" size="sm" custom>
                                                    <option disabled value="" selected></option>
                                                    {countries.map(countri => (
                                                        <option key={countri.country_name} value={countri.country_name}>
                                                            {countri.country_name}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </div>
                                        </div>
                                }
                                        <div class="row">
                                            <div class="col-4 ">
                                                {inputList.length !== 1 &&
                                                    <button onClick={() => handleRemoveClick(i)} type="button" class="Inter btn btn-outline-dark btn-sm">Remove</button>
                                                }
                                                {inputList.length - 1 === i && <button onClick={handleAddClick}
                                                    type="submit" style={{ fontSize: '16px' }} class="Inter ml-1 btn btn-success btn-sm">+</button>

                                                }
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </form>
                    </div>
                </div>
            }

        </>
    )
}

export default ReferencesData

import React, { useEffect, useState } from 'react';
import * as FIIcons from "react-icons/fi";
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useAlert } from 'react-alert'



// papa = 0 
// mama = 1
// ermano = 2
// otro = 3

function ReferencesData(props) {
     const [directions,setDirections] = useState(props.reference.reference_address);
    const [phones,setPhones] = useState(props.reference.reference_phones);
    const [emails,setEmails] = useState(props.reference.reference_emails);
    const [inputList, setInputList] = useState([{ street: "", number: "", cp: "" }]);
    const [inputPhone, setInputPhone] = useState([{phone:"" }]);
    const [inputEmail, setInputEmail] = useState([{ email:"" }]);
    const alert = useAlert()
    const { handleSubmit } = useForm({});
    const [type_ref,setTypeRef] =useState();
    const [falseTypeR,setFalseTypeR] =useState();
    const [edit,setEdit] =useState(false);
    const [otherNameR,seOthernameR] =useState(false);
    const [nameR,setNameR] = useState();
    const [fName,setFnameR] = useState();
    const [mName,setMnameR] = useState();
    const [emailR,setEmailR] = useState();
    const [phoneR,setPhoneR] = useState();
    const [nameRef,setNameRefO] = useState();
    const [addrtype, setAddrtype] = useState(["Papa", "Mama", "Hermano/Hermana", "Otro"])
    const Add = addrtype.map(Add => Add
    )

    useEffect(() => {
      console.log('Props',props);
      typeRef(props.reference);
      setFilterValues(props.reference);
    }, [props])

    function setFilterValues(reference){
    setNameR(reference.name);
    setEmailR(reference.email);
    setFnameR(reference.father_lastname);
    setMnameR(reference.mother_lastname);
    setPhoneR(reference.phone);
    setNameRefO(reference.name_ref);
    setFalseTypeR(reference.type_ref)
    if(directions.length > 0){
        setInputList(directions);
    }
    if(phones.length > 0){
        setInputPhone(phones);
    }
    if(emails.length > 0){
        setInputEmail(emails);
    }
    }
    function changeNameRef(e){
        setNameRefO(e.target.value);
    }
    const handleInputChangeEmail = (e, index) => {
        console.log(inputEmail);
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
        setInputEmail([...inputEmail, { email:"" }]);
    };

    // ----------------------------------------------------------    
    const handleInputChangePhone = (e, index) => {
        console.log(inputPhone);
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
        setInputPhone([...inputPhone, { phone:"" }]);
    };
    // ---------------------------------------------------------
    // handle input change
    const handleInputChange = (e, index) => {
        console.log(inputList);
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, {  street: "", number: "", cp: "" }]);
    };
    function typeRef(reference){
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

    function editing(){
        setFilterValues(props.reference);
        setEdit(!edit);
    }
    
    function changeName(e){
        setNameR(e.target.value);
    }
    function changeType(e){
        setTypeRef(e.target.value);
    }
    function changeFname(e){
        setFnameR(e.target.value);
    }
    function changeMName(e){
        setMnameR(e.target.value);
    }
    function changeEmail(e){
        setEmailR(e.target.value);
    }
    function changePhone(e){
        setPhoneR(e.target.value);
    }
    function showReference (e){
        setFalseTypeR(e.target.value);
        if(e.target.value == 3 ){
            seOthernameR(true);
        } else {
            seOthernameR(false);
        }
    }
    async function onSubmit(data){
        let datax = {
            id: props.id,
            type_ref:falseTypeR,
            name:nameR,
            email:emailR,
            name_ref:nameRef,
            father_lastname:fName,
            mother_lastname:mName,
            phone:phoneR,
            direction : inputList,
            email: inputEmail,
            phone: inputPhone
        }
        await axios.post('http://api.boardingschools.mx/api/reference/update',datax)
        .then(function (response) {
            if(response.status === 200){
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
        {!edit  ? 
         <div class="mt-3 card">
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

                        <div class="row mt-2 ">
                            <div class="col-3">
                                <h6 class="Inter card-subtitle mb-2 text-muted">Tipo</h6>
                            </div>
                            <div class="col">
                                <h6 style={{ color: '#243243', fontWeight: '600' }}
                                    class="Inter card-subtitle mb-2 ">
                                    {type_ref}
                                </h6>
                            </div>
                        </div>

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
                                        <h6 class="Inter card-subtitle mb-2 text-muted">Email {i+1}</h6>
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
                                        <h6 class="Inter card-subtitle mb-2 text-muted">Telefono {i+1}</h6>
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
                                    <div class="row mt-3 ">
                                    <div class="col-3">
                                        <h6 class="Inter card-subtitle mb-2 text-muted">Direccion {i+1}</h6>
                                    </div>
                                    <div class="col">
                                        <h6 style={{ color: '#243243', fontWeight: '600' }}
                                            class="Inter card-subtitle mb-2 ">
                                            {props.reference.state},{props.reference.city},{x.street},{x.number},{x.cp}
                                        </h6>
                                    </div>
                                </div>
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
                        <button  onClick={(e) => editing()}
                        type="button"
                         class="Inter btn btn-outline-dark">Cancelar</button>
                        <button onSubmit={handleSubmit(onSubmit)}
                            type="submit" class="Inter ml-1 btn btn-success">Guardar</button>
                    </div>
                </div>
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
                                    <option disabled value= "" selected ></option>
                                    </select >
                    </div>
                </div>
                { otherNameR 
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

                {inputEmail.map((x, i) => {
                                return (
                                    <div className="box">
                                        Email {i + 1}
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
                                                    type="submit" class="Inter ml-1 btn btn-success btn-sm">ADD</button>

                                                }
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            {inputPhone.map((x, i) => {
                                return (
                                    <div className="box mt-1">
                                        Telefono {i + 1}
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
                                                    type="submit" class="Inter ml-1 btn btn-success btn-sm">ADD</button>

                                                }
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                             {inputList.map((x, i) => {
                                return (
                                    <div className="box">
                                        Direccion {i + 1}
                                        <div class="row mt-3 ">
                                            <div class="col-3">
                                                <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Calle</Form.Label>
                                            </div>
                                            <div class="col">
                                                <Form.Control autoComplete="off"
                                                    onChange={e => handleInputChange(e, i)}
                                                    value={x.street}
                                                    name="street"
                                                    className="formGray" type="text" placeholder="Ingrese su Calle" />
                                            </div>
                                        </div>
                                        <div class="row mt-3 ">
                                            <div class="col-3">
                                                <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Numero</Form.Label>
                                            </div>
                                            <div class="col">
                                                <Form.Control autoComplete="off"
                                                    onChange={e => handleInputChange(e, i)}
                                                    value={x.number}
                                                    name="number"
                                                    className="formGray" type="text" placeholder="Ingrese su Numero" />
                                            </div>
                                        </div>
                                        <div class="row mt-3 ">
                                            <div class="col-3">
                                                <Form.Label style={{ fontSize: '16px' }} className="Inter formGray">Codigo postal</Form.Label>
                                            </div>
                                            <div class="col">
                                                <Form.Control autoComplete="off"
                                                    onChange={e => handleInputChange(e, i)}
                                                    value={x.cp}
                                                    name="cp"
                                                    className="formGray" type="text" placeholder="Ingrese su Codigo postal" />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-4 ">
                                                {inputList.length !== 1 &&
                                                    <button onClick={() => handleRemoveClick(i)} type="button" class="Inter btn btn-outline-dark btn-sm">Remove</button>
                                                }
                                                {inputList.length - 1 === i && <button onClick={handleAddClick}
                                                    type="submit" class="Inter ml-1 btn btn-success btn-sm">ADD</button>

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

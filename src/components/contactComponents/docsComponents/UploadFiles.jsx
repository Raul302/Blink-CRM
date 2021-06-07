import React, { useState } from 'react'
import * as AIicons from "react-icons/ai";
import * as BIicons from "react-icons/bi";
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { constaApi } from "../../../constants/constants";
import { useParams,} from "react-router";

export default function UploadFiles(props) {
    const [modalFiles,setModalFiles] = useState(false);
    const { register, handleSubmit, errors,formState, reset,watch } = useForm({ mode: 'onChange' });
    const [preview,setPreview] = useState(null);
    const [doc,setDoc] = useState(null);
    const [typeDoc,setTypeDoc] = useState(null);
    // Functions
    let { id:id_contact } = useParams();
    function onSubmit(data) {
        let datax = new FormData();
        datax.append('id_contact',id_contact);
        datax.append('type_doc',typeDoc);
        datax.append('doc',doc);
        axios({
            method:'post',
            url: constaApi + 'files/contacts/upload',
            data:datax,
            headers: {'Content-Type':'multipart/form-data'}
            }
            ).then(res => {
                props.update();
                CloseModal();
            });
    }
    function changeImg(e){
        setPreview(URL.createObjectURL(e.target.files[0]));
        setDoc(e.target.files[0]);
    }
    function CloseModal(){
        setPreview(null);
        setDoc(null);
        setTypeDoc(null);
        setModalFiles(!modalFiles)
    }
    function selectTypeDoc(e){
        setTypeDoc(e.target.value);
    }
    return (
        <>
        <button onClick={(e) => setModalFiles(!modalFiles)} className=" ml-3 btn btn-info"><AIicons.AiOutlineCloudUpload size={18}/> Archivo</button>

        {/* Modal */}
          {/* Second Modal */}
          <Modal
                show={modalFiles}
                style={{ marginTop: '50px' }}
                dialogClassName="modal-90w"
                onHide={e => CloseModal()}
            >
                <Modal.Header style={{ height: '60px' }} closeButton>
                    <Modal.Title style={{ marginTop: '5px'}}>Subir Documento</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ background: '#F4F5F6', border: '0px' }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="container-fluid">
                        <Row className="">
                        <Col className="col-6">
                            <label>Tipo de Documento</label>
                            <Form.Control onChange={(e) => selectTypeDoc(e)} autoComplete="off" name="type"  as="select" size="sm" custom>
                                       <option disabled value="" selected></option>
                                       <option value="foto">Fotografía</option>
                                       <option value="ppE">Pasaporte Estudiante</option>
                                       <option value="ppP">Pasaporte Papá</option>
                                       <option value="cal1">Calificación Año 1</option>
                                       <option value="cal2">Calificación Año 2</option>
                                       <option value="calA">Calificaciones Actuales</option>
                                       <option value="acta">Acta de Nacimiento</option>
                                       <option value="ref">Referencias</option>
                                       <option value="ens">Ensayo</option>
                            </Form.Control>
                        </Col>
                  </Row>
                  <Row>
                      <Col>
                      <label>Documento:</label>
                      <label class="form-label" for="customFile">Default file input example</label>
                      <input onChange={(e) => changeImg(e)} type="file" class="form-control" id="customFile" />
                      <img style={{width:'150px',height:'150px'}} alt="Documento pdf / docx" src={preview}/>
                      </Col>
                  </Row>
                        </div>
                        <Row className="mt-3">
                            <Col>
                                <Button
                                    className="float-right mb-3 mr-2" type="submit"
                                    disabled={!typeDoc || !doc}
                                    variant="info">Guardar</Button>
                                <Button onClick={(e) => CloseModal()} className="float-right mb-3 mr-2" variant="danger" >
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

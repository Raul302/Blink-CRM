import React, { useState } from 'react'
import * as AIicons from "react-icons/ai";
import * as BIicons from "react-icons/bi";
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { constaApi } from "../../../constants/constants";
import { useParams,} from "react-router";

export default function UploadFiles(props) {
    const user = JSON.parse(localStorage.getItem('user'));
    const [modalFiles,setModalFiles] = useState(false);
    const { register, handleSubmit, errors,formState, reset,watch } = useForm({ mode: 'onChange' });
    const [preview,setPreview] = useState(null);
    const [doc,setDoc] = useState(null);
    const [typeDoc,setTypeDoc] = useState(null);
    const [cycle,setCycle] = useState(null);
    // Functions
    let { id:id_college } = useParams();
    function onSubmit(data) {
        let datax = new FormData();
        datax.append('id_college',id_college);
        datax.append('type_doc',typeDoc);
        datax.append('cicle',cycle);
        datax.append('doc',doc);
        datax.append('name_colaborator',user.name);
        datax.append('id_colaborator',user.id);
        axios({
            method:'post',
            url: constaApi + 'files/colleges/upload',
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
        setCycle(null);
        setModalFiles(!modalFiles)
    }
    function selectTypeDoc(e){
        setTypeDoc(e.target.value);
    }
    function selectCicle(e){
        setCycle(e.target.value);
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
                                       <option value="cuota">Cuota</option>
                                       <option value="calendario">Calendario</option>
                            </Form.Control>
                        </Col>
                  </Row>
                  <Row>
                      <Col className="col-4">
                      <Form.Label className="formGray">Ciclo</Form.Label>
                                    <Form.Control autoComplete="off" 
                                    onChange={(e) => selectCicle(e)}
                                    name="cicly"  as="select" size="sm" custom>
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
                  </Row>
                  <Row className="mt-2">
                      <Col>
                      <label>Documento:</label>
                      <label class="form-label" for="customFile"></label>
                      <input onChange={(e) => changeImg(e)} type="file" class="form-control" id="customFile" />
                      <img style={{width:'150px',height:'150px'}} alt="Documento pdf / docx" src={preview}/>
                      </Col>
                  </Row>
                        </div>
                        <Row className="mt-3">
                            <Col>
                                <Button
                                    className="float-right mb-3 mr-2" type="submit"
                                    disabled={!typeDoc || !doc || !cycle}
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

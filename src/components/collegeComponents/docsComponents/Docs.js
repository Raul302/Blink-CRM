import { update } from '@react-spring/core';
import React, { useState } from 'react'
import * as AIicons from "react-icons/ai";
import * as BIicons from "react-icons/bi";
import TableFilesColleges from './TableFilesColleges';
import UploadFiles from './UploadFiles';

function Docs() {
    const [reload,setReload] = useState(false);
    function update(){
        setReload(!reload);
    }
    // const { loading } = useSelector(state => state.ui);
    // useEffect(() => {
    //     // getFiles();
    // }, [])
    // const alert = useAlert()

    // const dispatch = useDispatch();
    // const pathFiles = constPathFiles;
    // const { active } = useSelector(state => state.colleges);
    // const [picture, setPicture] = useState('');
    // const [displays, setDisplays] = useState('');
    // const [pictureTwo, setPictureTwo] = useState('');
    // const [modal, setModal] = useState(false);
    // const [fileOne, setFileOne] = useState(true);
    // const [fileTwo, setFileTwo] = useState(true);
    // const { register, handleSubmit, errors, reset } = useForm({});

    // const getFiles = () => {
    //     dispatch(startLoading());
    //     axios.post(constaApi+'files/index', { id: active.id })
    //         .then(function (response) {
    //             const { data } = response;
    //             if (data[0]) {
    //                 setDisplays(data[0]);
    //                 dispatch(finishLoading());
    //             }
    //         }).catch(error => {
    //             dispatch(finishLoading());
    //         });
    // }
    // const onChangePicture = (e) => {
    //     setPicture(URL.createObjectURL(e.target.files[0]))
    // };
    // const onChangePictureTwo = (e) => {
    //     setPictureTwo(URL.createObjectURL(e.target.files[0]))
    // };
    // const handleShow = (e) => {
    //     setModal(!modal);
    // }
    // const handleClose = (e) => {
    //     setModal(!modal);
    // }
    // const handlefileOne = (e) => {
    //     setFileOne(false);
    // }
    // const handlefileTwo = (e) => {
    //     setFileTwo(false);
    // }
    // function onSubmit(data) {
    //     let formData = new FormData();
    //     formData.append("calendar", data.fileCalendar[0] ? data.fileCalendar[0] : null);
    //     formData.append("calendar_date", data.calendar ? data.calendar : null);
    //     formData.append("cuote", data.fileCuota[0] ? data.fileCuota[0] : null);
    //     formData.append("cuote_cicly", data.cicly ? data.cicly : null);
    //     formData.append("idCollege", active.id);
    //     if (displays.id) {
    //         formData.append('id', displays.id);
    //     }
    //     axios({
    //         method: 'post',
    //         url: constaApi+'files/upload',
    //         data: formData,
    //         headers: { 'Content-Type': 'multipart/form-data' }
    //     })
    //         .then(function (response) {
    //             alert.show(response.data, {
    //                 timeout: 2000, // custom timeout just for this one alert
    //                 type: 'success'
    //             })
    //             handleClose();
    //             getFiles();
    //         })
    // }
    return (
        <>
        <div class="mt-n2 content">
        <div class="row">
            <UploadFiles  update={update}/>
        </div>
        <div class="row">
            <div class="col-12">
            <TableFilesColleges update={reload}/>
            </div>
        </div>
    </div>
    </>
        // <div className="content mt-n1">
        // <div class="row">
        //     <div class="col-12">
        //     <div class="col d-flex justify-content-end">
        //     <AddEditDocsCuote />
        //     </div>
        //     <h6>Cuotas</h6>
        //     <TableDocs />
        //     </div>
        // </div>
        // </div>
        // // <div className="content">
        // //     <Row className="mt-3">
        // //        <Row>
        // //        <Col>
        // //        <TableDocs />
        // //        </Col>
        // //        </Row>
        // //         <Col>
        // //         {/* <CollegeCuote/> */}
        // //         </Col>
        // //     </Row>
        // // </div>  
    )
}

export default Docs

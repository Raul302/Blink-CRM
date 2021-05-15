import { update } from '@react-spring/core';
import React, { useState } from 'react'
import * as AIicons from "react-icons/ai";
import * as BIicons from "react-icons/bi";
import TableFilesContact from './TableFilesContact';
import UploadFiles from './UploadFiles';


function Docs() {
    const [reload,setReload] = useState(false);
    function update(){
        setReload(!reload);
    }
     return (
        <>
        <div class="mt-n2 content">
            <div class="row">
                <UploadFiles  update={update}/>
            </div>
            <div class="row">
                <div class="col-12">
                <TableFilesContact update={reload}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default Docs

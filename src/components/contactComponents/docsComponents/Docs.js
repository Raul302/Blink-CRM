import React, { useState } from 'react'
import * as AIicons from "react-icons/ai";
import * as BIicons from "react-icons/bi";
import UploadFiles from './UploadFiles';


function Docs() {
    return (
        <>
        <div class="mt-n2 content">
            <div class="row">
                <UploadFiles />
            </div>
        </div>
        </>
    )
}

export default Docs

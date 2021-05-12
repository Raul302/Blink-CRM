import React, { useState } from 'react'
import * as AIicons from "react-icons/ai";
import * as BIicons from "react-icons/bi";

export default function UploadFiles() {
    return (
        <>
        <button className=" ml-3 btn btn-info"><AIicons.AiOutlineCloudUpload size={18}/> Archivo</button>
        </>
    )
}

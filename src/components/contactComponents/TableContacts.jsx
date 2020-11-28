import React,{ useState,useEffect } from 'react'

function TableContacts(props) {
    const [rowData,SetRowData] = useState();

    useEffect(() => {
        console.log('TableContacts');
        console.log()
    },[props]);
    return (
        <>
        <h1>ola</h1>H
        </>
    )
}

export default TableContacts

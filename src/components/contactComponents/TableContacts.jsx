import React,{ useEffect } from 'react'

function TableContacts(props) {

    useEffect(() => {
        console.log('TableContacts');
        console.log('props',props);
    },[props]);
    return (
        <>
        </>
    )
}

export default TableContacts

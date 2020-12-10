import React from 'react'
import { Spinner } from 'react-bootstrap';

function Loader() {
    return (
        <div>
            <Spinner animation="border" variant="primary" />
            <h1>Espere...</h1>
        </div>
    )
}

export default Loader

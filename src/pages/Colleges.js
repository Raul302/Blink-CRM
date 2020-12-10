import React from 'react'
import AddOrEditCollege from '../components/collegeComponents/AddOrEditCollege';
function Colleges() {
    return (
        <>
         <div className="mt-5 container cwml animate__animated animate__fadeIn">
            <h1 className="Inter400">Colegios</h1>
            <div class="col d-flex justify-content-end">
              <AddOrEditCollege />
            </div>
            {/* Tabla */}
           
            </div>
        </>
    )
}

export default Colleges

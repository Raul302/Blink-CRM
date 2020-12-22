import React from 'react'
import AddOrEditCollege from '../components/collegeComponents/AddOrEditCollege';
import TableColleges from '../components/collegeComponents/TableColleges';
function Colleges() {
    return (
        <div className="content">
        <div class="row">
            <div class="col-12">
            <div class="col d-flex justify-content-end">
            <AddOrEditCollege />
            </div>
            <TableColleges />
                </div>
        </div>
        </div>
    )
}

export default Colleges

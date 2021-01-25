import React from 'react'
import AddEditStaff from './AddEditStaff'
import TableStaff from './TableStaff'

function Staff() {
    return (
        <div className="content">
        <div class="mt-n5 row">
            <div class="col-12">
            <div class="col d-flex justify-content-end">
            <AddEditStaff/>
            </div>
            <TableStaff/>
            </div>
        </div>
        </div>
    )
}

export default Staff

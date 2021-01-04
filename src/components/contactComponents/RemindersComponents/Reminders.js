import React from 'react'
import AddEditReminders from './AddEditReminders'
import TableReminders from './TableReminders'

function Reminders() {
    return (
        <div className="content">
        <div class="mt-n5 row">
            <div class="col-12">
            <div class="col d-flex justify-content-end">
            <AddEditReminders />
            </div>
            <TableReminders />
            </div>
        </div>
        </div>
    )
}

export default Reminders

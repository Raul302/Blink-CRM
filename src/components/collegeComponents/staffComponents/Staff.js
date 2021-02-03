import React, {useState} from 'react'
import AddEditStaff from './AddEditStaff'
import TableStaff from './TableStaff'


function Staff(props) {
    const [flag,setFlag] = useState(false);
    function click(e){
        setFlag(true);
    }
    function clickFlag(){
        setFlag(false);
    }
    return (
        <div className="content">
        <div class="mt-n5 row">
            <div class="col-12">
            <div class="col d-flex justify-content-end">
            <AddEditStaff  clickFlag={clickFlag} flag={flag} {...props}/>
            </div>
            <TableStaff click={(e) => click(e)}/>
            </div>
        </div>
        </div>
    )
}

export default Staff

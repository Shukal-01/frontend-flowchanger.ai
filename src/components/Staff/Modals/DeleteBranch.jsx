import React from 'react'
import Modal from 'react-responsive-modal'


const DeleteBranch = ({ id, setId, deleteBranch }) => {

    return (
        <Modal open={id} onClose={() => setId(null)} center>
            <div className="flex items-center justify-center h-[120px]">
                <h2 className="text-[18px] font-medium text-center text-[#27004a]">Are you sure want to delete this</h2>

            </div>
            <div className="flex items-center justify-around ">
                <button onClick={() => deleteBranch(id)} className="allcrm-btn">Yes , Confirm</button>
                <button className="allcrm-btn" onClick={() => setId(null)}>No , Cancel</button>
            </div>
        </Modal>
    )
}

export default DeleteBranch
import React from 'react';
import { CModal, CSpinner } from '@coreui/react';
import checkmark from '../../assets/images/blue_checkmark.png';
import failure from '../../assets/images/red_failure.png';

const ComDialog = ({ visible, onClose, isProcessing, success, message }) => {
    return(
        <CModal visible={visible} onClose={onClose}>
            <div className="dialog-content">
                <div className="dialog-icon">
                    {isProcessing ? <CSpinner color="info" /> :
                        <img className="checkmark" src={success ? checkmark : failure} />}
                </div>
                <div className="dialog-message">
                    <span>{isProcessing ? "Vui Lòng Chờ..." : message || "No Actions"}</span>
                </div>
            </div>
        </CModal>
    )
}

export default ComDialog;
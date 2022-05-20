import React from 'react';
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from '@coreui/react';

const AlertDialog = ({ visible, onClose, onConfirm, title, content }) => {
    return (
        <CModal visible={visible} onClose={onClose}>
            <CModalHeader>
                <CModalTitle>{title}</CModalTitle>
            </CModalHeader>
            <CModalBody>{content}</CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={onClose}>
                    Đóng
                </CButton>
                <CButton color="primary" onClick={onConfirm}>
                    Thực Hiện
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default AlertDialog;
import React, { useState } from 'react';
import { CModal, CInputGroup, CInputGroupText, CFormInput, CModalHeader, CModalBody, CModalFooter, CButton, CModalTitle } from '@coreui/react';
import { useDispatch } from 'react-redux';
import { actions } from 'src/redux/constants';
import { useSelector } from 'react-redux';

const SessionForm = ({ visible, onClose = () => {}, subordinateCode, onConfirm = () => {} }) => {
    const user = useSelector(state => state.loginUser.data?.profile);
    const [session, setSession] = useState({ start: null, end: null });
    const dispatch = useDispatch();

    const validateSession = () => {
        if(session && user){
            if(!session.start || !session.end){
                alert("Hãy nhập đầy đủ thông tin");
                return false;
            }
            if(new Date(session.start).getTime() > new Date(session.end).getTime()){
                alert("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
                return false;
            }
            return true;
        }
        return false;
    }

    const updateWorkSession = () => {
        if(validateSession()){
            dispatch({
                type: actions.UPDATE_WORK_SESSION,
                body: {
                    sessionStart: session.start,
                    sessionEnd: session.end,
                    isLockedOut: false,
                    code: subordinateCode,
                    requester: user.username
                }
            });
            onConfirm();
            onClose();
        }
    }
    return (
        <CModal visible={visible} onClose={onClose} size="lg">
            <CModalHeader>
                <CModalTitle>Hãy chọn ngày bắt đầu và ngày kết thúc</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CInputGroup>
                    <CInputGroupText>Bắt đầu</CInputGroupText>
                    <CFormInput
                        type="date"
                        onChange={(e) => setSession({...session, start: e.target.value || "" })}
                    />
                    <CInputGroupText>Kết thúc</CInputGroupText>
                    <CFormInput
                        type="date"
                        onChange={(e) => setSession({...session, end: e.target.value || "" })}
                    />
                </CInputGroup>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={onClose}>
                    Đóng
                </CButton>
                <CButton color="primary" onClick={updateWorkSession}>
                    Thực Hiện
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default SessionForm;
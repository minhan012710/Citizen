import React, { useState, useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CInputGroup,
    CRow,
    CFormInput,
} from '@coreui/react'
import Select from 'react-select'
import API from '../../../utils/api'
import { useSelector, useDispatch } from 'react-redux'
import { actions } from 'src/redux/constants'
import ComDialog from '../../../components/dialog/ComDialog';

const Inform = () => {
    const user = useSelector(state => state.loginUser.data?.profile)
    const [civilian, setCivilian] = useState({ gender: "Nam" })
    const [visible, setVisible] = useState(false)
    const province = useSelector(state => state.getResidential.data?.residentials);
    const informOps = useSelector(state => state.informCivilian);
    const dispatch = useDispatch()

    useEffect(() => {
        if(user){
            dispatch({
                type: actions.GET_RESIDENTIAL,
                params: { code: user.username.substring(0, 6) }
            })
        }
    }, [user])

    const validateCivilian = () => {
        if(civilian && user){
            if (!civilian.citizenId || !civilian.fullname || !civilian.birthday
                || !civilian.gender || !civilian.origin || !civilian.temporaryAddress
                || !civilian.permanentAddress || !civilian.religion || !civilian.educationLevel
                || !civilian.career){
                    alert("Hãy điền đầy đủ thông tin");
                    return false;
                }
            let idRegex = "[0-9]{12}"
            if(!civilian.citizenId.match(idRegex)){
                alert("Số CMND phải có 12 kí tự số");
                return false;
            }
            return true;
        }
        return false;
    }

    const onAddingCivilian = async () => {
        if (validateCivilian()){
            dispatch({
                type: actions.INFORM_CIVILIAN,
                body: { 
                    civilianInfo: { 
                        ...civilian, 
                        reporter: user.username 
                    }, 
                    requester: user.username 
                }
            });
            setVisible(true);
        }
    }

    const getDescription = () => {
        if(province){
            return `${province.districts.wards.name}, ${province.districts.name}, ${province.name}`
        }
        return null
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Khai báo công dân</strong> <small>{getDescription()}</small>
                    </CCardHeader>
                    <CCardBody>
                        <CInputGroup className="mb-3">
                            <CFormInput
                                placeholder="Số CMND"
                                onChange={(e) => setCivilian({...civilian, citizenId: e.target.value})}
                            />
                            <CFormInput
                                placeholder="Họ và tên"
                                onChange={(e) => setCivilian({ ...civilian, fullname: e.target.value })}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CFormInput
                                type="date"
                                onChange={(e) => setCivilian({ ...civilian, birthday: e.target.value })}
                            />
                            <Select
                                options={[
                                    {
                                        label: "Nam",
                                        value: "Nam",
                                    }, {
                                        label: "Nữ",
                                        value: "Nữ"
                                    }
                                ]}
                                defaultValue={{ label: "Nam", value: "Nam" }}
                                isClearable={false}
                                onChange={(value) => setCivilian({ ...civilian, gender: value.value })}
                            />
                            <CFormInput
                                placeholder="Quê quán"
                                onChange={(e) => setCivilian({ ...civilian, origin: e.target.value })}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CFormInput
                                placeholder="Địa chỉ thường trú"
                                onChange={(e) => setCivilian({ ...civilian, permanentAddress: e.target.value })}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CFormInput
                                placeholder="Địa chỉ tạm trú"
                                onChange={(e) => setCivilian({ ...civilian, temporaryAddress: e.target.value })}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CFormInput
                                placeholder="Tôn giáo"
                                onChange={(e) => setCivilian({ ...civilian, religion: e.target.value })}
                            />
                            <CFormInput
                                placeholder="Trình độ văn hóa"
                                onChange={(e) => setCivilian({ ...civilian, educationLevel: e.target.value })}
                            />
                            <CFormInput
                                placeholder="Nghề nghiệp"
                                onChange={(e) => setCivilian({ ...civilian, career: e.target.value })}
                            />
                        </CInputGroup>
                        <CRow>
                            <CCol>
                                <button className="btn btn-primary" onClick={onAddingCivilian}>
                                    Thêm khai báo
                                </button>
                                <button className="btn" >
                                <a href="http://www.tongdieutradanso.vn/uploads/data/6/files/files/PHIEU%20TDT%202019_Phieu%20mau.pdf">  Phiếu điều tra mẫu</a>
                                </button>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
            <ComDialog
                visible={visible}
                onClose={() => setVisible(false)}
                message={informOps?.data?.message}
                success={informOps?.data?.success}
                isProcessing={informOps?.isLoading}
            />
        </CRow>
    )
}

export default Inform

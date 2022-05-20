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
import { useParams } from 'react-router-dom'

const Reinform = () => {
    const user = useSelector(state => state.loginUser.data?.profile)
    const { citizenId } = useParams();
    const [civilian, setCivilian] = useState(null)
    const [visible, setVisible] = useState(false)
    const province = useSelector(state => state.getResidential.data?.residentials);
    const informOps = useSelector(state => state.reinformCivilian);
    const response = useSelector(state => state.getCivilianById.data?.civilian);
    const dispatch = useDispatch()

    useEffect(() => {
        if(response) setCivilian(response)
    }, [response])

    useEffect(() => {
        if(citizenId){
            dispatch({
                type: actions.GET_CIVILIAN_BY_ID,
                body: {
                    citizenId: citizenId
                }
            })
        }
    }, []);

    useEffect(() => {
        if (user) {
            dispatch({
                type: actions.GET_RESIDENTIAL,
                params: { code: user.username.substring(0, 6) }
            })
        }
    }, [user])

    const validateCivilian = () => {
        if (civilian && user) {
            if (!civilian.citizenId || !civilian.fullname || !civilian.birthday
                || !civilian.gender || !civilian.origin || !civilian.temporaryAddress
                || !civilian.permanentAddress || !civilian.religion || !civilian.educationLevel
                || !civilian.career) {
                alert("Hãy điền đầy đủ thông tin");
                return false;
            }
            let idRegex = "[0-9]{12}"
            if (!civilian.citizenId.match(idRegex)) {
                alert("Số CMND phải có 12 kí tự số");
                return false;
            }
            return true;
        }
        return false;
    }

    const onEditingCivilian = async () => {
        if (validateCivilian()) {
            dispatch({
                type: actions.REINFORM_CIVILIAN,
                body: {
                    civilian: civilian,
                    requester: user.username,
                }
            });
            setVisible(true);
        }
    }

    const getDescription = () => {
        if (province) {
            return `${province.districts.wards.name}, ${province.districts.name}, ${province.name}`
        }
        return null
    }

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Sửa khai báo công dân</strong> <small>{getDescription()}</small>
                    </CCardHeader>
                    <CCardBody>
                        <CInputGroup className="mb-3">
                            <CFormInput
                                placeholder="Số CMND"
                                defaultValue={civilian?.citizenId}
                                disabled={true}
                            />
                            <CFormInput
                                placeholder="Họ và tên"
                                defaultValue={civilian?.fullname}
                                onChange={(e) => setCivilian({ ...civilian, fullname: e.target.value })}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CFormInput
                                type="date"
                                defaultValue={civilian?.birthday.substring(0, 10)}
                                onChange={(e) => setCivilian({ ...civilian, birthday: e.target.value })}
                            />
                            { civilian ? 
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
                                    defaultValue={{ label: civilian.gender, value: civilian.gender }}
                                    isClearable={false}
                                    onChange={(value) => setCivilian({ ...civilian, gender: value.value })}
                                /> : null }
                            <CFormInput
                                placeholder="Quê quán"
                                defaultValue={civilian?.origin}
                                onChange={(e) => setCivilian({ ...civilian, origin: e.target.value })}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CFormInput
                                placeholder="Địa chỉ thường trú"
                                defaultValue={civilian?.permanentAddress}
                                onChange={(e) => setCivilian({ ...civilian, permanentAddress: e.target.value })}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CFormInput
                                placeholder="Địa chỉ tạm trú"
                                defaultValue={civilian?.temporaryAddress}
                                onChange={(e) => setCivilian({ ...civilian, temporaryAddress: e.target.value })}
                            />
                        </CInputGroup>
                        <CInputGroup className="mb-3">
                            <CFormInput
                                placeholder="Tôn giáo"
                                defaultValue={civilian?.religion}
                                onChange={(e) => setCivilian({ ...civilian, religion: e.target.value })}
                            />
                            <CFormInput
                                placeholder="Trình độ văn hóa"
                                defaultValue={civilian?.educationLevel}
                                onChange={(e) => setCivilian({ ...civilian, educationLevel: e.target.value })}
                            />
                            <CFormInput
                                placeholder="Nghề nghiệp"
                                defaultValue={civilian?.career}
                                onChange={(e) => setCivilian({ ...civilian, career: e.target.value })}
                            />
                        </CInputGroup>
                        <CRow>
                            <CCol>
                                <button className="btn btn-primary" onClick={onEditingCivilian}>
                                    Sửa khai báo
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

export default Reinform

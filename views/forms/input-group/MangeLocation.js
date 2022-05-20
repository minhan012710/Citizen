import React, { useState, useEffect } from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CInputGroup,
    CRow,
    CFormText,
    CInputGroupText,
    CTable,
    CTableHead,
    CTableDataCell,
    CTableBody,
    CTableRow
} from '@coreui/react'
import Select from 'react-select'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { actions } from 'src/redux/constants'
import ComDialog from 'src/components/dialog/ComDialog'

const options = [
    {
        label: "A2",
        value: "Tỉnh/Thành Phố"
    }, {
        label: "A3",
        value: "Quận/Huyện"
    }, {
        label: "B1",
        value: "Xã/Phường"
    }, {
        label: "B2",
        value: "Thôn, bàn, tổ dân phố"
    }
]

const ManageLocation = () => {
    const user = useSelector((state) => state.loginUser.data?.profile);
    const [location, setLocation] = useState(null);
    const [visible, setVisible] = useState(false);
    const addOps = useSelector(state => {
        if (user.role === "A1") {
            return state.addProvince
        }
        if (user.role === "A2") {
            return state.addDistrict
        }
        if (user.role === "A3") {
            return state.addWard
        }
        if (state.addResidential.data && user.role === "B1") {
            return state.addResidential
        }
        return null
    })
    const provinces = useSelector(state => {
        if (state.getProvince.data && user.role === "A1") {
            return state.getProvince.data.provinces
        }
        if (state.getDistrict.data && user.role === "A2") {
            return state.getDistrict.data.districts
        }
        if (state.getWard.data && user.role === "A3") {
            return state.getWard.data.wards
        }
        if (state.getResidential.data && user.role === "B1") {
            return state.getResidential.data.residentials
        }
        return null
    })
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            if (user.role === "A1") {
                dispatch({ type: actions.GET_PROVINCE });
            }
            if (user.role === "A2") {
                dispatch({ type: actions.GET_DISTRICT, params: { code: user.username } });
            }
            if (user.role === "A3") {
                dispatch({ type: actions.GET_WARD, params: { code: user.username } });
            }
            if (user.role === "B1") {
                dispatch({ type: actions.GET_RESIDENTIAL, params: { code: user.username } });
            }
        }
    }, [user])

    const validateLocation = () => {
        if (location && user) {
            if (!location.code || !location.name || !getAddType()) {
                alert("Hãy điền đầy đủ thông tin")
                return false;
            }
            if (location.code.length !== 2) {
                alert("Mã địa điểm phải là 2 kí tự!")
                return false;
            }
            return true;
        }
        return false;
    }

    const onAddingLocation = () => {
        if (validateLocation()) {
            if (user.role === "A1") {
                dispatch({
                    type: actions.ADD_PROVINCE,
                    body: {
                        ...location,
                        requester: user.username,
                    }
                });
            };
            if (user.role === "A2") {
                dispatch({
                    type: actions.ADD_DISTRICT,
                    body: {
                        ...location,
                        searchId: user.username,
                        requester: user.username
                    }
                });
            };
            if (user.role === "A3") {
                dispatch({
                    type: actions.ADD_WARD,
                    body: {
                        ...location,
                        searchId: user.username,
                        requester: user.username
                    }
                })
            };
            if (user.role === "B1") {
                dispatch({
                    type: actions.ADD_RESIDENTIAL,
                    body: {
                        ...location,
                        searchId: user.username,
                        requester: user.username,
                    }
                })
            };
            setVisible(true);
        }
    }

    const getAddType = () => {
        if (user) {
            if (user.role === "A1") return options[0].label;
            if (user.role === "A2") return options[1].label;
            if (user.role === "A3") return options[2].label;
            if (user.role === "B1") return options[3].label;
        }
        return null
    }

    const getDescription = () => {
        if (user && provinces) {
            let outerLocation = provinces
            if (user.role === "A1") {
                return `${options[0].value} (${options[0].label})`
            };
            if (user.role === "A2") {
                outerLocation = provinces.name
                return `${options[1].value} thuộc ${outerLocation} (${options[1].label})`
            };
            if (user.role === "A3") {
                outerLocation = provinces.districts.name
                return `${options[2].value} thuộc ${outerLocation} (${options[2].label})`
            };
            if (user.role === "B1") {
                outerLocation = provinces.districts.wards.name
                return `${options[3].value} thuộc ${outerLocation} (${options[3].label})`
            };
        }
        return ""
    }

    const outerLocation = () => {
        if(user && user.role !== "A1" && provinces){
            let code = ""
            let locations = ""
            if(user.role === "A2"){
                code = provinces.code
                locations = provinces.name
            }
            if (user.role === "A3") {
                code = provinces.districts.code
                locations = `${provinces.districts.name}, ${provinces.name}`                
            }
            if(user.role === "B1"){
                code = provinces.districts.wards.code
                locations = `${provinces.districts.wards.name}, ${provinces.districts.name}, ${provinces.name}`
            }
            return (
                <CInputGroup className="mb-3">
                    <CInputGroupText>{code}</CInputGroupText>
                    <CFormInput
                        defaultValue={locations}
                        disabled={true}
                    />
                </CInputGroup>
            )
        }
        return null
    }

    const getLowerLocations = () => {
        if(user && provinces){
            if(user.role === "A1"){
                return provinces;
            }
            if(user.role === "A2"){
                return provinces.districts;
            }
            if(user.role === "A3"){
                return provinces.districts.wards;
            }
            if(user.role === "B1"){
                return provinces.districts.wards.residentials;
            }
        }
        return [];
    }

    return (
        <div style={{flex: 1}}>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <CRow>
                                <CCol>
                                    <strong>Thêm địa điểm</strong> <small>{getDescription()}</small>
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            {outerLocation()}
                            <CInputGroup className="mb-3">
                                <CFormInput
                                    placeholder={`Tên ${getDescription()}`}
                                    onChange={(e) => setLocation({ ...location, name: e.target.value })}
                                />
                                <CFormInput
                                    placeholder={`Mã ${getDescription()}`}
                                    onChange={(e) => setLocation({ ...location, code: e.target.value })}
                                />
                            </CInputGroup>
                            <CRow>
                                <CCol>
                                    <button className="btn btn-primary" onClick={onAddingLocation}>
                                        Thêm
                                </button>
                                </CCol>
                            </CRow>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CRow>
                <CCol xs={12}>
                    <CCard>
                        <CCardHeader>
                            <CRow>
                                <CCol xs={12}>
                                    <strong>Danh Sách Địa Điểm</strong>
                                </CCol>
                            </CRow>
                        </CCardHeader>
                        <CCardBody>
                            <CTable>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableDataCell>
                                            Mã
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            Tên Địa Điểm
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            Số Cấp Dưới
                                        </CTableDataCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {getLowerLocations().map((location, index) => {
                                        return (
                                            <CTableRow key={index}>
                                                <CTableDataCell align="middle">
                                                    {location?.code}
                                                </CTableDataCell>
                                                <CTableDataCell align="middle">
                                                    {location?.name}
                                                </CTableDataCell>
                                                <CTableDataCell align="middle">
                                                    {(location.districts || location.wards || location.residentials).length}
                                                </CTableDataCell>
                                            </CTableRow>
                                        )
                                    })}
                                </CTableBody>
                            </CTable>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <ComDialog
                visible={visible}
                onClose={() => setVisible(false)}
                isProcessing={addOps?.isLoading}
                message={addOps?.data?.message}
                success={addOps?.data?.success}
            />
        </div>
    )
}

export default ManageLocation

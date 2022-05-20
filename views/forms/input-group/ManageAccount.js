import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CInputGroup,
  CRow,
} from '@coreui/react'
import Select from 'react-select'
import API from '../../../utils/api'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { actions } from 'src/redux/constants'

import ComDialog from 'src/components/dialog/ComDialog'

import TableStaff  from 'src/views/base/tables/TableStaff'


const options = [
  {
    label: "A2",
    value: "Chi cục dân số Sở Y tế các tỉnh/tp"
  }, {
    label: "A3",
    value: "Công chức công tác tại Phòng Y tế các huyện/quận"
  }, {
    label: "B1",
    value: "Viên chức dân số Trạm Y tế xã/phường"
  }, {
    label: "B2",
    value: "Cộng tác viên dân số tại các thôn, bàn, tổ dân phố"
  }
]

const ManageAccount = () => {
  const user = useSelector((state) => state.loginUser.data?.profile);
  const [account, setAccount] = useState({ gender: "Nam" })
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const createOps = useSelector(state => state.createUser);
  const provinces = useSelector(state => {
    if (state.getProvince.data && user.role === "A1"){
      return state.getProvince.data.provinces
    }
    if(state.getDistrict.data && user.role === "A2"){
      return state.getDistrict.data.districts
    }
    if(state.getWard.data && user.role === "A3"){
      return state.getWard.data.wards
    }
    if(state.getResidential.data && user.role === "B1"){
      return state.getResidential.data.residentials
    }
    return null
  })
  const dispatch = useDispatch();

  useEffect(() => {
    if(user){
      if(user.role === "A1"){
        dispatch({ type: actions.GET_PROVINCE });
      }
      if(user.role === "A2"){
        dispatch({ type: actions.GET_DISTRICT, params: { code: user.username } });
      }
      if(user.role === "A3"){
        dispatch({ type: actions.GET_WARD, params: { code: user.username } });
      }
      if(user.role === "B1"){
        dispatch({ type: actions.GET_RESIDENTIAL, params: { code: user.username } });
      }
    }
  }, [user])

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: 'black',
      padding: 5,
      width: 200,
      left: 5,
    }),
    control: () => ({
      width: 250,
      backgroundColor: "white",
      display: "flex",
      borderColor: "#80808085",
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 3,
      marginLeft: 5,
      marginRight: 5,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    }
  }
  
  const validateAccount = () => {
    if (account && user){
      if (!account.username || !account.password || 
        !account.fullname || !account.birthday || 
        !account.gender || !getAddType()){
        alert("Hãy điền đầy đủ thông tin")
        return false;
      }
      return true;
    }
    return false;
  }

  const onAddingAccount = () => {
    if (validateAccount()){
      dispatch({ 
        type: actions.CREATE_USER, 
        body: { 
          ...account, 
          role: getAddType(),
          superior: user._id,
          requester: user.username,
        } 
      })
      setVisible(true);
    }
  }

  const getAddType = () => {
    if(user){
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
      if (user.role === "A1"){
        return `${options[0].value} (${options[0].label})`
      };
      if (user.role === "A2"){
        outerLocation = provinces.name
        return `${options[1].value} thuộc ${outerLocation} (${options[1].label})`
      };
      if (user.role === "A3"){
        outerLocation = provinces.districts.name
        return `${options[2].value} thuộc ${outerLocation} (${options[2].label})`
      };
      if (user.role === "B1"){
        outerLocation = provinces.districts.wards.name
        return `${options[3].value} thuộc ${outerLocation} (${options[3].label})`
      };
    }
    return ""
  }

  const getOptions = () => {
    if(user && provinces){
      let placeholder = "Tỉnh/Thành Phố"
      let options = provinces
      if(user.role === "A1"){
        options = provinces.map((p) => ({ label: p.name, value: p.code }))
      }
      if(user.role === "A2"){
        placeholder = "Quận/Huyện"
        options = provinces.districts.map((d) => ({ label: d.name, value: d.code }))
      }
      if(user.role === "A3"){
        placeholder = "Xã/Phường"
        options = provinces.districts.wards.map((w) => ({ label: w.name, value: w.code }))
      }
      if(user.role === "B1"){
        placeholder = "Thôn, bàn, tổ dân phố"
        options = provinces.districts.wards.residentials.map((r) => ({ label: r.name, value: r.code }))
      }
      return (
        <Select
          styles={customStyles}
          placeholder={placeholder}
          className="float-end"
          options={options}
          onChange={(value) => setAccount({ ...account, username: value?.value || "" })}
        />
      )
    }
  }

  return (
    <div style={{flex: 1}}>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow>
                <CCol>
                  <strong>Thêm tài khoản cán bộ</strong> <small>{getDescription()}</small>
                </CCol>
                <CCol>
                  {getOptions()}
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CInputGroup className="mb-3">
                <CFormInput
                  placeholder="Tên cán bộ"
                  onChange={(e) => setAccount({...account, fullname: e.target.value})}
                />
                <CFormInput
                  placeholder="Ngày Sinh"
                  type="date"
                  onChange={(e) => setAccount({...account, birthday: e.target.value})}
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
                  onChange={(value) => setAccount({...account, gender: value.value})}
                />
              </CInputGroup>
              <CInputGroup className="mb-3">
                <CFormInput
                  placeholder="Mật khẩu"
                  onChange={(e) => setAccount({ ...account, password: e.target.value })}
                />
              </CInputGroup>
              <CRow>
                <CCol>
                  <button className="btn btn-primary" onClick={onAddingAccount}>
                    Thêm TK
                </button>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow>
                <CCol xs={8}>
                  <strong>Cấp/khóa quyền tài khoản</strong> <small>{getDescription()}</small>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <TableStaff />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <ComDialog
        visible={visible}
        onClose={() => setVisible(false)}
        success={createOps?.data?.success}
        message={createOps?.data?.message}
        isProcessing={createOps?.isLoading}
      />
    </div>
  )
}

export default ManageAccount

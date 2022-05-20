import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
  CInputGroup,
  CButton,
  CPagination,
} from '@coreui/react'
import Select from 'react-select'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { actions } from 'src/redux/constants'
import CivilianViewer from '../../../components/dialog/CivilianViewer'
import { useHistory } from 'react-router-dom'
import AlertDialog from 'src/components/dialog/AlertDialog'
import ComDialog from 'src/components/dialog/ComDialog'

const CivilianList = () => {
  const user = useSelector(state => state.loginUser.data?.profile);
  const [searchQuery, setSearchQuery] = useState({ any: "", code: user?.role === "A1" ? "" : user.username });
  const [civilian, setCivilian] = useState(null);
  const [viewer, setViewer] = useState(false);
  const [comDialog, setComDialog] = useState(false);
  const [alert, setAlert] = useState(false);
  const [filter, setFilter] = useState({ province: null, district: null, ward: null, residential: null });
  const provinces = useSelector(state => state.getProvince.data?.provinces);
  const civilians = useSelector(state => state.searchCivilians.data);
  const totalPage = useSelector(state => state.searchCivilians.totalPage);
  const deleteOps = useSelector(state => state.deleteCivilian);
  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(() => {
    if(user){
      dispatch({ type: actions.GET_PROVINCE });
    }
  }, [user])

  useEffect(() => {
    if(user && deleteOps?.data?.success){
      dispatch({
        type: actions.SEARCH_CIVILIANS,
        body: {
          searchQuery: {
            any: searchQuery.any,
            code: user.username === searchQuery.code ? searchQuery.code : { $regex: `^${searchQuery.code}`, $options: "m" }
          }
        }
      })
    }
  }, [deleteOps]);

  useEffect(() => {
    if(user){
      dispatch({
        type: actions.SEARCH_CIVILIANS,
        body: {
          searchQuery: {
            any: searchQuery.any,
            code: user.username === searchQuery.code ? searchQuery.code : { $regex: `^${searchQuery.code}`, $options: "m" }
          }
        }
      })
    }
  }, [searchQuery])

  const searchCivilians = () => {
    dispatch({
      type: actions.SEARCH_CIVILIANS,
      body: { searchQuery: searchQuery }
    })
  }

  const onDeletingCivilian = () => {
    if(civilian){
      dispatch({
        type: actions.DELETE_CIVILIAN,
        body: {
          citizenId: civilian.citizenId,
          requester: user.username,
        }
      });
      setAlert(false);
      setComDialog(true);
    }
  }

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue',
      padding: 20,
      width: 210,
      left: 5,
      zIndex: 10
    }),
    control: () => ({
      width: 210,
      backgroundColor: "white",
      display: "flex",
      borderColor: "#80808085",
      borderWidth: 1,
      borderStyle: "solid",
      borderRadius: 3,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 2,
      marginBottom: 2,
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    }
  }

  const getDescription = () => {
    if(civilians){
      return `(Tổng hiện ${civilians.length.toLocaleString()})`;
    }
  }

  const getOptions = (index) => {
    if(provinces && user){
      if (index === 0) {
        let options = provinces.map(p => ({ label: p.name, value: p.code }));
        return options;
      }
      if(index === 1){
        let filterProvince = filter.province || user.username;
        let districts = provinces.filter(p => p.code === filterProvince)[0]?.districts;
        let options = districts?.map(d => ({ label: d.name, value: d.code }));
        return options;
      }
      if(index === 2){
        let filterDistrict = filter.district || user.username;
        let districts = provinces.filter(p => filterDistrict.match(`^${p.code}`))[0]?.districts;
        let wards = districts?.filter(d => d.code === filterDistrict)[0]?.wards;
        let options = wards?.map((w) => ({ label: w.name, value: w.code }));
        return options;
      }
      if(index === 3){
        let filterWard = filter.ward || user.username;
        let districts = provinces.filter(p => filterWard.match(`^${p.code}`))[0]?.districts;
        let wards = districts?.filter(d => filterWard.match(`^${d.code}`))[0]?.wards;
        let residentials = wards?.filter(w => w.code === filterWard)[0]?.residentials;
        let options = [];
        if (user.role === "B1") options.push({ label: "Khai báo của xã/phường", value: filterWard });
        options.push(...(residentials?.map(r => ({ label: r.name, value: r.code })) || []));
        return options;
      }
    }
    return null
  }

  const onSeletingOption = (value, key) => {
    setSearchQuery({ ...searchQuery, code: value });
    setFilter({ ...filter, [key]: value });
  }

  const makeSelects = () => {
    if(user){
      let selects = [];
      selects.push(
        <Select
          styles={customStyles}
          placeholder="Tỉnh/Thành Phố"
          className="d-inline-block"
          options={getOptions(0)}
          onChange={value => onSeletingOption(value?.value || "", "province")}
        />,
        <Select
          styles={customStyles}
          placeholder="Quận/Huyện"
          className="d-inline-block"
          options={getOptions(1)}
          onChange={value => onSeletingOption(value?.value || "", "district")}
        />,
        <Select
          styles={customStyles}
          placeholder="Xã/Phường"
          className="d-inline-block"
          options={getOptions(2)}
          onChange={value => onSeletingOption(value?.value || "", "ward")}
        />,
        <Select
          styles={customStyles}
          placeholder="Thôn, bàn, tổ dân phố"
          className="d-inline-block"
          options={getOptions(3)}
          onChange={value => onSeletingOption(value?.value || "", "residential")}
          isClearable={true}
        />,
      );
      if(user.role === "A1"){
        return selects;
      }
      if(user.role === "A2"){
        return [selects[0], selects[2], selects[3]];
      }
      if(user.role === "A3"){
        return [selects[2], selects[3]];
      }
      if(user.role === "B1"){
        return [selects[2]];
      }
      return [];
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <CRow>
              <CCol xs={6}>
                <strong>Danh sách người dân</strong> <small>{getDescription()}</small>
              </CCol>
              <CCol className="d-flex justify-content-end" xs={6}>
                  <div style={{width: 440}}>
                    {makeSelects().map((select) => select)}
                  </div>
              </CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CRow xs={{ cols: 1 }} md={{ cols: 5 }}>
              <CInputGroup className="mb-3">
                <CFormInput
                  placeholder="Số CMND, tên, địa chỉ,..."
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  onChange={e => setSearchQuery({ ...searchQuery, any: e.target.value || "" })}
                />
                <button className="btn btn-primary" onClick={searchCivilians}>
                  Tìm
                </button>
              </CInputGroup>
            </CRow>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell  
                      style={{textAlign: "center"}}
                      style={{textAlign: "center"}} align="middle" 
                      scope="col">
                      Số CMND
                    </CTableHeaderCell>
                    <CTableHeaderCell  
                      style={{textAlign: "center"}}
                      style={{textAlign: "center"}} align="middle" 
                      scope="col">
                      Họ & Tên
                    </CTableHeaderCell>
                    <CTableHeaderCell  
                      style={{textAlign: "center"}}
                      style={{textAlign: "center"}} align="middle" 
                      scope="col">
                      Ngày Sinh
                    </CTableHeaderCell>
                    <CTableHeaderCell  
                      style={{textAlign: "center"}}
                      style={{textAlign: "center"}} align="middle" 
                      scope="col">
                      Giới Tính
                    </CTableHeaderCell>
                    <CTableHeaderCell  
                      style={{textAlign: "center"}}
                      style={{textAlign: "center"}} align="middle" 
                      scope="col">
                      ĐC Thường Trú
                    </CTableHeaderCell>
                    <CTableHeaderCell  
                      style={{textAlign: "center"}}
                      style={{textAlign: "center"}} align="middle" 
                      scope="col">
                      Thông Tin Thêm
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      style={{ textAlign: "center" }}
                      align="center"
                      scope="col">
                      Hành Động
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {civilians?.map((civilian, index) => {
                    return(
                      <CTableRow key={index} scope="row">
                        <CTableDataCell style={{textAlign: "center"}} align="middle">
                          {civilian.citizenId}
                        </CTableDataCell>
                        <CTableDataCell style={{textAlign: "center"}} align="middle">
                          {civilian.fullname}
                        </CTableDataCell>
                        <CTableDataCell style={{textAlign: "center"}} align="middle">
                          {civilian.birthday}
                        </CTableDataCell>
                        <CTableDataCell style={{textAlign: "center"}} align="middle">
                          {civilian.gender}
                        </CTableDataCell>
                        <CTableDataCell style={{textAlign: "center"}} align="middle">
                          {civilian.permanentAddress}
                        </CTableDataCell>
                        <CTableDataCell style={{textAlign: "center"}} align="middle">
                          <small 
                            style={{fontWeight: "bold", cursor: "pointer"}}
                            onClick={() => {
                              setCivilian(civilian);
                              setViewer(true);
                            }}>
                            Xem
                          </small>
                        </CTableDataCell>
                        <CTableDataCell style={{display: "flex", justifyContent: "center"}} align="center">
                            <CButton  
                            style={{ marginLeft: 2, marginRight: 2, color:"white"}} 
                              color="success"
                              onClick={() => history.push(`/reinform-civilian/${civilian.citizenId}`)}>
                              Sửa
                            </CButton>
                            <CButton 
                              style={{marginLeft: 2, marginRight: 2,marginLeft: 2, marginRight: 2, color: "white"}} 
                              color="danger"
                              onClick={() => {
                                setCivilian(civilian);
                                setAlert(true);
                              }}>
                              Xóa
                            </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
                </CTableBody>
              </CTable>
          </CCardBody>
        </CCard>
      </CCol>
      <CivilianViewer
        visible={viewer}
        onClose={() => setViewer(false)}
        civilian={civilian}
      />
      <ComDialog
        visible={comDialog}
        onClose={() => setComDialog(false)}
        message={deleteOps?.data?.message}
        success={deleteOps?.data?.success}
        isProcessing={deleteOps?.isLoading}
      />
      <AlertDialog
        visible={alert}
        onClose={() => setAlert(false)}
        title="Xóa khai báo"
        content="Bạn có chắc muốn xóa khai báo này?"
        onConfirm={onDeletingCivilian}
      />
    </CRow>
  )
}

export default CivilianList

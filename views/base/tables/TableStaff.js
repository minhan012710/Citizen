import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CInputGroupText,
  CFormInput,
  CInputGroup,
  CButton,
} from '@coreui/react'
import { DocsCallout, DocsExample } from 'src/components'
import Select from 'react-select'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from 'src/redux/constants'
import SessionForm from 'src/components/dialog/SessionForm'
import { useState } from 'react'
import ComDialog from 'src/components/dialog/ComDialog'
import AlertDialog from 'src/components/dialog/AlertDialog'

const TableStaff = () => {
  const user = useSelector(state => state.loginUser.data?.profile);
  const [formDialog, setFormDialog] = useState(false);
  const [comDialog, setComDialog] = useState(false);
  const [alertDialog, setAlertDialog] = useState(false);
  const [code, setCode] = useState(null);
  const subordinates = useSelector(state => state.searchSubordinates.data);
  const updateOps = useSelector(state => state.updateWorkSession);

  const dispatch = useDispatch();

  useEffect(() => {
    if(user){
      dispatch({
        type: actions.SEARCH_SUBORDINATES,
        body: {
          code: user.role === "A1" ? "" : user.username,
          role: getSearchRole()
        }
      });
    }
  }, [user])

  useEffect(() => {
    if (updateOps?.data?.success){
      dispatch({
        type: actions.SEARCH_SUBORDINATES,
        body: {
          code: user.role === "A1" ? "" : user.username,
          role: getSearchRole()
        }
      });
    }
  }, [updateOps])

  const getSearchRole = () => {
    if(user.role === "A1") return "A2";
    if(user.role === "A2") return "A3";
    if(user.role === "A3") return "B1";
    if(user.role === "B1") return "B2";
  }

  const onRecallPermission = () => {
    if(code){
      dispatch({
        type: actions.UPDATE_WORK_SESSION,
        body: {
          sessionStart: null,
          sessionEnd: null,
          code: code,
          isLockedOut: true,
          requester: user.username
        }
      });
      setComDialog(true);
      setAlertDialog(false);
    }
  }

  return (
    <CTable hover>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell style={{textAlign: "center"}}>M??</CTableHeaderCell>
          <CTableHeaderCell style={{textAlign: "center"}}>T??n C??n B???</CTableHeaderCell>
          <CTableHeaderCell style={{textAlign: "center"}}>Ng??y Sinh</CTableHeaderCell>
          <CTableHeaderCell style={{textAlign: "center"}}>Gi???i T??nh</CTableHeaderCell>
          <CTableHeaderCell style={{ textAlign: "center" }}>C??ng T??c T???</CTableHeaderCell>
          <CTableHeaderCell style={{ textAlign: "center" }}>C??ng T??c ?????n</CTableHeaderCell>
          <CTableHeaderCell style={{textAlign: "center"}}>Tr???ng th??i</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {subordinates?.map((subordinate, index) => {
          return(
            <CTableRow key={index}>
              <CTableDataCell style={{textAlign: "center"}}>
                {subordinate.username}
              </CTableDataCell>
              <CTableDataCell style={{ textAlign: "center" }}>
                {subordinate.fullname}
              </CTableDataCell>
              <CTableDataCell style={{ textAlign: "center" }}>
                {subordinate.birthday}
              </CTableDataCell>
              <CTableDataCell style={{ textAlign: "center" }}>
                {subordinate.gender}
              </CTableDataCell>
              <CTableDataCell style={{ textAlign: "center" }}>
                {subordinate.sessionStart || "Ch??? c???p quy???n..."}
              </CTableDataCell>
              <CTableDataCell style={{ textAlign: "center" }}>
                {subordinate.sessionEnd || "Ch??? c???p quy???n..."}
              </CTableDataCell>
              <CTableDataCell style={{ textAlign: "center" }}>
                { subordinate.isLockedOut ? 
                <CButton 
                  style={{color: "white"}}
                  color="success"
                  onClick={() => {
                    setCode(subordinate.username);
                    setFormDialog(true);
                  }}>
                  C???p quy???n
                </CButton> :
                <CButton
                  style={{color: "white"}}
                  color="danger"
                  onClick={() => {
                    setCode(subordinate.username);
                    setAlertDialog(true);
                  }}>
                  Thu h???i quy???n
                </CButton> }
              </CTableDataCell>
            </CTableRow>
          )
        })}
      </CTableBody>
      <SessionForm
        visible={formDialog}
        onClose={() => setFormDialog(false)}
        onConfirm={() => setComDialog(true)}
        subordinateCode={code}
      />
      <AlertDialog
        visible={alertDialog}
        onClose={() => setAlertDialog(false)}
        onConfirm={onRecallPermission}
        title="Thu h???i quy???n"
        content="B???n c?? mu???n thu h???i quy???n khai b??o c???a t??i kho???n n??y?"
      />
      <ComDialog
        visible={comDialog}
        onClose={() => setComDialog(false)}
        message={updateOps?.data?.message}
        success={updateOps?.data?.success}
        isProcessing={updateOps?.isLoading}
      />
    </CTable>
  )
}

export default TableStaff

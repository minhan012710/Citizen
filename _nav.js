import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import store from "src/redux/store/store";

const user = store.getState().loginUser.data?.profile;

let _nav = [
  {
    component: CNavItem,
    name: 'Thống Kê',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavItem,
    name: 'Danh Sách Người Dân',
    to: '/civilians',
  },
]

if (user && user.role !== "B2") {
  _nav.push(
    {
      component: CNavItem,
      name: 'Quản Lý Tài Khoản',
      to: '/manage-account',
    },
    {
      component: CNavItem,
      name: 'Khai Báo Địa Điểm',
      to: '/manage-location',
    })
}

if(user && (user.role === "B2" || user.role === "B1")){
  _nav.push({
    component: CNavItem,
    name: 'Khai Báo Công Dân',
    to: '/inform-civilian',
  })
}

export default _nav

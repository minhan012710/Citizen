import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const CivilianList = React.lazy(() => import('./views/base/tables/CivilianList'))
const ManageAccount = React.lazy(() => import('./views/forms/input-group/ManageAccount'))
const Inform = React.lazy(() => import('./views/forms/input-group/Inform'))
const Reinform = React.lazy(() => import('./views/forms/input-group/Reinform'))
const ManageLocation = React.lazy(() => import('./views/forms/input-group/MangeLocation'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/civilians', name: 'Civilians', component: CivilianList },
  { path: '/manage-account', name: 'ManageAccount', component: ManageAccount },
  { path: '/manage-location', name: 'Manage Location', component: ManageLocation },
  { path: '/inform-civilian', name: 'Inform', component: Inform },
  { path: '/reinform-civilian/:citizenId', name: "Reinform", component: Reinform },
]

export default routes

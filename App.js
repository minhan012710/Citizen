import React, { Component, useEffect } from 'react'
import { HashRouter, Route, Switch, Redirect, useHistory } from 'react-router-dom'
import './scss/style.scss'
import { useSelector } from 'react-redux';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse">Loading...</div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const user = useSelector((state) => state.loginUser.data?.profile)

  return (
    <HashRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          { 
            !user ? 
            <Route exact path="/login" name="Login Page" component={Login}/> :
            <Route path="/" name="Home" render={(props) => <DefaultLayout {...props} />} />
          }
          <Route path="/*" render={() => {
            return user ? null : <Redirect to="/login" />;
          }} />
          <Route path="/" render={() => {
            return user ? null : <Redirect to="/login" />;
          }} />
        </Switch>
      </React.Suspense>
    </HashRouter>
  )
}

export default App

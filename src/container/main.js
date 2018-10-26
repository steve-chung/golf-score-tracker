import React from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import Home from './home'
import Invite from './invite'

const Main = props => {
  return (
    <div className="container">
      <Switch>
        <Route
          exact path="/"
          render={props =>
            <Home/>}
        />
        <Route
          exact path="/invite/:courseName" component={Invite}/>
        <Redirect to="/"/>
      </Switch>
    </div>
  ) // when the route is in "/", it will route to Homepage with state of currentUser as props
} // pulling state from the redux store and use it as props at each rendering.

export default withRouter(Main) // exporting with Route and connect to redux store

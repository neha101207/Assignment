import React from "react";
import { Route } from "react-router";
import Loadable from 'react-loadable';
import Loading from '../ui-molecules/Loading';

const Login = Loadable({
  loader: () => import('../ui-pages/Login'),
  loading: Loading,
});
const UserHome = Loadable({
  loader: () => import('../ui-pages/UserHome'),
  loading: Loading,
});



const MainRoutes=()=>{
  return(
    <div>
      {/* <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} /> */}
      <Route path="/" component={UserHome} />
      <Route path="/user_home" component={UserHome} />
    </div>
  )
}

export default MainRoutes;

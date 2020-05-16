import React from "react";
import { Route } from "react-router";
import Loadable from 'react-loadable';
import Loading from '../ui-molecules/Loading';



const Dashboard=Loadable({
  loader: () => import('../ui-pages/UserHome/components/Content/Dashboard'),
  loading: Loading,
});
const Container=Loadable({
  loader: () => import('../ui-pages/UserHome/components/Content/components/Container'),
  loading: Loading,
});

const UserRoutes=()=>{
  return(
    <div>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/user-home" component={Dashboard} />
      <Route exact path="/user-home/user-details/:id" component={Container} />
    </div>
  )
}

export default UserRoutes;

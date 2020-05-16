import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Menu from "./components/Menu";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import UserRoutes from "../../../../ui-routes/UserHomeRoutes";

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: "white"
  },
  webHeader:{
    display:"flex",
    alignItems:"center",
    justifyContent:"left",
    flexGrow: 1
  },
  avatar:{
    marginRight:"16px"
  },
  content:{
    display: "flex",
    // width:"100vw",
    margin:"88px 8px 8px 8px"
  },
  userDetails:{
    color:"black",
    display:"flex",
    margin:"0 1%",
    alignItems:"center",
    paddingTop:"2px"
  }
});

class MiniDrawer extends React.Component {
  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes,history, login} = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classes.appBar}
        >
          <Toolbar>
            <div classes={{root:classes.webHeader}}>
              <div style={{display:"flex", alignItems:"center"}}>
                {/* <span style={{color:"#5ea9ff", paddingRight:"6px", fontWeight:"500"}}>Version (1.0 Beta)</span> */}
                {/*<img src="/assets/images/svg_components/logo-white.png" alt="logo" style={{padding:"15px 0"}}/>*/}
              </div>
            </div>
            <Menu history={history}/>
            {/* <div className={classes.userDetails}>
              <span style={{color:"green", padding:"2px 1px 0 0"}}><FiberManualRecordIcon fontSize="small" /></span>
              <span>{login.username?(login.username).toUpperCase():"Guest"}</span>
            </div> */}
            {/* <span style={{color:"#328cf5", padding:"4px 0px 0 0"}}><PowerSettingsNewIcon fontSize="small"/></span> */}
            {/* <Button onClick={(e)=>{
              window.localStorage.clear();
              history.push("/")
              window.location.reload()
            }}>Logout
            </Button> */}
          </Toolbar>
        </AppBar>
        <div className={classes.content}>
          <UserRoutes/>
        </div>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

const mapStateToProps = ({ screenConfiguration }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const {
    userInfo = {},
    login = {}
  } = preparedFinalObject;
  const { user = {} } = userInfo;
  return {user , login };
};



export default withRouter(withStyles(styles, { withTheme: true })(connect(mapStateToProps,null)(MiniDrawer)));

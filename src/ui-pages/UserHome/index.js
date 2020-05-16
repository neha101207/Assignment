import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Content from "./components/Content";
import { mapDispatchToProps } from "../../ui-utils/commons";
import { connect } from "react-redux";
// import {httpRequest} from "../../ui-utils/api";

const styles = {
  root: {
    display:"flex",
    // width:"100vw"
  }
};

class UserHome extends Component {

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
          <Content />
      </div>
    );
  }
}

const mapStateToProps=({screenConfiguration={}})=>{
  const {preparedFinalObject={}}=screenConfiguration
  const {userInfo={}}=preparedFinalObject;
  return {userInfo}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UserHome));

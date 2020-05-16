import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { mapDispatchToProps } from "../../ui-utils/commons";
import { connect } from "react-redux";

const styles = {
  root: {
    height: "100vh",
    background: "#F8F8F8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    // padding:"10%",
    // width:"25%",
    display: "flex",
    alignItems: "center",
    justify: "center",
    flexDirection: "column"
  }
};

class Login extends React.Component {

  login = async () => {
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
            Login screen
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ screenConfiguration = {} }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { login = {}, userInfo = {} } = preparedFinalObject;
  return { login, userInfo };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login));

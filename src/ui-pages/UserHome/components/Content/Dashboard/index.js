import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import "react-table/react-table.css";
import Table from './table'
import { mapDispatchToProps } from "../../../../../ui-utils/commons";

const styles = theme => ({
  root: {
    width: "100vw"
    //height:"100vh",
  }
});

class Dashboard extends React.Component {


  render() {
    const { classes} = this.props;

    return (
      <div className={classes.root}>
       <Table {...this.props}/>
      </div>
    );
  }
}
const mapStateToProps = ({ screenConfiguration = {} }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { dashboard } = preparedFinalObject;
  return { dashboard };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Dashboard));

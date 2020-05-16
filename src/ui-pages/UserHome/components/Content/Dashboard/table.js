import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import { mapDispatchToProps } from '../../../../../ui-utils/commons'
import Button from '@material-ui/core/Button';
var rp = require('request-promise');


const style = theme => ({
  root: {

  },
  container: {
    maxHeight: 440,
  },
  clickevent: {
    cursor: 'pointer'
  }
})
var options = {
  uri: ' https://jsonplaceholder.typicode.com/users',

  headers: {
    'User-Agent': 'Request-Promise'
  },
  json: true // Automatically parses the JSON string in the response
};



class TableData extends Component {

  componentDidMount = async () => {

    const { setAppData } = this.props
    await setAppData("userid", null)
    await rp(options)
      .then(function (repos) {
        setAppData("users", repos)

      })
      .catch(function (err) {
        // API call failed...
      });

  }


  render() {


    const showUserDetails = (e) => {

      const { setAppData } = this.props
      setAppData("userid", e)

    }


    const { classes, users } = this.props
    // const {showUserDetails}=this

    return (
      <Paper className={classes.root}>

        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell >Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((field, index) => {
                return (
                  <TableRow>
                    <TableCell>{field.id}</TableCell>
                    <TableCell className={classes.clickevent}>{field.name}</TableCell>
                    <TableCell className={classes.clickevent}>{field.username}</TableCell>


                    <TableCell className={classes.clickevent}>{field.email}</TableCell>
                    <TableCell className={classes.clickevent}>{field.phone}</TableCell>
                    <TableCell className={classes.clickevent}>
                      <Button onClick={(e) => { showUserDetails(index + 1); this.props.history.push("/user-details") }} className={classes.clickevent} variant="contained" color="primary" >
                        View
      </Button></TableCell>


                  </TableRow>
                )

              })}

            </TableBody>
          </Table>
        </TableContainer>

      </Paper>
    );
  }
}
const mapStateToProps = ({ screenConfiguration = {} }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { users = [], } = preparedFinalObject;

  return { users, }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(TableData));

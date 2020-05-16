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
import { mapDispatchToProps } from '../../../../../../ui-utils/commons'
import Button from '@material-ui/core/Button';
import { httpRequest } from '../../../../../../ui-utils/api';

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




class TableData extends Component {


    componentDidMount = async () => {

        const { setAppData } = this.props
        await setAppData("userid", null)
        // await getUser();
        const response = await httpRequest({
            endPoint: "https://jsonplaceholder.typicode.com/users",
            method: "get",

        });
        if (response) {
            console.log("res", response);

            setAppData("users", response)
            const { users } = this.props;
            console.log("users", users);
        }

    }

    //  getUser=async()=>{
    //      debugger
    //     const { setAppData } = this.props
    //       const response = await httpRequest({
    //         endPoint: " https://jsonplaceholder.typicode.com/users",
    //         method: "get",

    //       });
    //       if(response){
    //         setAppData("users", response)
    //         const {users}=this.props;
    //         console.log("users", users);
    //       }


    //  }

    render() {


    


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
                            {users && users.map((field, index) => {
                                return (
                                    <TableRow>
                                        <TableCell>{field.id}</TableCell>
                                        <TableCell className={classes.clickevent}>{field.name}</TableCell>
                                        <TableCell className={classes.clickevent}>{field.username}</TableCell>
                                        <TableCell className={classes.clickevent}>{field.email}</TableCell>
                                        <TableCell className={classes.clickevent}>{field.phone}</TableCell>
                                        <TableCell className={classes.clickevent}>
                                            <Button onClick={(e) => { this.props.history.push(`/user-home/user-details/${index + 1}`) }} className={classes.clickevent} variant="contained" color="primary" >
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

    return { users }
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(TableData));

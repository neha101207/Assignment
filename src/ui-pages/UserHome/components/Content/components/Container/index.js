
import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { mapDispatchToProps } from '../../../../../../ui-utils/commons'
import { connect } from "react-redux";
import { Button, Grid, Card } from '@material-ui/core';
import Dialog from '../Dialog'
var rp = require('request-promise');



class UserDetails extends Component {



  componentDidMount = async () => {


    const { setAppData, userid } = this.props
    await setAppData("showpost", false);
    await setAppData("postcreated", false)
    await setAppData("title", null)
    await setAppData("description", null)
    var options = {
      uri: `https://jsonplaceholder.typicode.com/users/${userid}`,

      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true // Automatically parses the JSON string in the response
    };
    await rp(options)
      .then(function (repos) {
        setAppData("user_details_byid", repos)

      })
      .catch(function (err) {
        // API call failed...
      });
    var userpost = {
      uri: `https://jsonplaceholder.typicode.com/posts?userId=${userid}`,

      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true // Automatically parses the JSON string in the response
    };
    await rp(userpost)
      .then(function (repos) {
        setAppData("user_post_byid", repos)

      })
      .catch(function (err) {
        // API call failed...
      });


  }

  handlePostId = async (e) => {

    const { setAppData } = this.props;



    var options = {
      uri: `https://jsonplaceholder.typicode.com/posts/${e}`,


      headers: {
        'User-Agent': 'Request-Promise'
      },
      json: true // Automatically parses the JSON string in the response
    };
    await rp(options)
      .then(function (repos) {
        setAppData("postItem", repos)
        setAppData("addpost", false)



      })
      .catch(function (err) {
        // API call failed...
      });
    await setAppData("showpost", true)

  }

  handleClose = () => {
    const { setAppData } = this.props;
    setAppData("showpost", false)
  }


  render() {

    let { user_details_byid, user_post_byid, showpost } = this.props;
    return (
      <Grid container justify="center" alignItems="center" style={{ background: '#cfe8fc', width: "100vw" }} height="100vh">
        <Grid item md={12}>

          <List><Grid container spacing={2} >
            <Grid item md={4}>  <Card>
              <ListItem><label>ID:</label>{user_details_byid && user_details_byid.id}</ListItem>
              <ListItem><label>Name:</label>{user_details_byid && user_details_byid.name}</ListItem>
              <ListItem><label>Username:</label>{user_details_byid && user_details_byid.username}</ListItem>
              <ListItem><label>Phone:</label>{user_details_byid && user_details_byid.phone}</ListItem>
              <ListItem><label>Email:</label>{user_details_byid && user_details_byid.email}</ListItem>
              <ListItem><label>Website:</label>{user_details_byid && user_details_byid.website}</ListItem>
            </Card></Grid>

            <Grid item md={4}  >
              <Card> <Grid style={{ padding: "5px 5px 5px 5px", fontSize: "16px" }}><label><b>Address</b></label></Grid> <ListItem><label>Street:</label>{user_details_byid && user_details_byid.address && user_details_byid.address.street}</ListItem>
                <ListItem><label>City:</label>{user_details_byid && user_details_byid.address && user_details_byid.address.city}</ListItem>
                <ListItem><label>Zipcode:</label>{user_details_byid && user_details_byid.address && user_details_byid.address.zipcode}</ListItem>
                <ListItem><label>Suite:</label>{user_details_byid && user_details_byid.address && user_details_byid.address.suite}</ListItem>
                <ListItem><label>Latitude:</label>{user_details_byid && user_details_byid.address && user_details_byid.address.geo && user_details_byid.address.geo.lat}</ListItem>
                <ListItem><label>Longitude:</label>{user_details_byid && user_details_byid.address && user_details_byid.address.geo && user_details_byid.address.geo.lng}</ListItem></Card></Grid>
            <Grid item md={4}>
              <Card><Grid style={{ padding: "5px 5px 5px 5px", fontSize: "16px" }}><label><b>Company Details</b></label> </Grid><ListItem><label>Name:</label>{user_details_byid && user_details_byid.company && user_details_byid.company.name}</ListItem>
                <ListItem><label>CatchPhrase:</label>{user_details_byid && user_details_byid.company && user_details_byid.company.catchPhrase}</ListItem>
                <ListItem><label>Bs:</label>{user_details_byid && user_details_byid.company && user_details_byid.company.bs}</ListItem>
              </Card></Grid></Grid> </List>
          <Grid align="center" style={{ padding: "5px 5px 5px 5px", fontSize: "20px" }}><label><b>{user_details_byid && user_details_byid.name} Post</b></label></Grid>
          {user_post_byid.map((ele, index) => {
            return (<Card>
              <Grid container style={{ display: 'flex', marginBottom: "1%", padding: "30px 10px 10px 30px" }}>
                <Grid item md={2}>  <b>Id:</b>{ele && ele.id}</Grid>
                <Grid item md={7}> <b> Title:</b>{ele && ele.title}</Grid>
                <Grid item md={3}>  <Button onClick={(e) => { this.handlePostId(ele.id) }} variant="contained" color="primary">View</Button>
                </Grid>
              </Grid>
            </Card>
            )
          })}



          <Dialog showpost={showpost} handleClose={this.handleClose} />
        </Grid>
      </Grid>
    );
  }

}

const mapStateToProps = ({ screenConfiguration = {} }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { user_details_byid = {}, userid, user_post_byid = {}, showpost } = preparedFinalObject;

  return { user_details_byid, userid, user_post_byid, showpost }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);

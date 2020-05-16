
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { mapDispatchToProps } from '../../../../../../ui-utils/commons'
import { connect } from "react-redux";
import { Button, Grid, Card } from '@material-ui/core';
import Showpost from '../Dialog'
import { httpRequest } from '../../../../../../ui-utils/api';
import CancelIcon from '@material-ui/icons/Cancel';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {

  TextField,
  Dialog,
  Typography,

} from "@material-ui/core";

class UserDetails extends Component {

  componentDidMount = async () => {

    const { match = {} } = this.props;
    const { params = {} } = match;

    const { setAppData } = this.props

    setAppData("spinner", true)
    setAppData("showpost", false);
    setAppData("postcreated", false)
    setAppData("title", null)
    setAppData("description", null)
    setAppData("dialog", false)
    setAppData("show",false)
    const response = await httpRequest({
      endPoint: `https://jsonplaceholder.typicode.com/users/${params.id}`,
      method: "get",
    });
    setAppData("user_details_byid", response)
    const userpost = await httpRequest({
      endPoint: `https://jsonplaceholder.typicode.com/posts?userId=${params.id}`,
      method: "get",
    });
    setAppData("user_post_byid", userpost)
    setAppData("spinner", false);

  }

  handlePostId = async (e) => {

    const { setAppData } = this.props;
    const postresponse = await httpRequest({
      endPoint: `https://jsonplaceholder.typicode.com/posts/${e}`,
      method: "get",
    });
    setAppData("postItem", postresponse)
    setAppData("addpost", false)

    await setAppData("showpost", true)

  }

  handleClose = () => {
    const { setAppData } = this.props;
    setAppData("showpost", false)
  }


  handlecreatePost = () => {
    const { setAppData } = this.props;
    setAppData("addpost", true)
    setAppData("dialog", true)
    setAppData("postcreated", false)
  }

  handleTitle = (key, e) => {

    const { setAppData } = this.props;
    
    setAppData(key, e.target.value)

  }

  handledialog = () => {
    const { setAppData } = this.props;
    setAppData("dialog", false)
  }


  handleAddPost = async () => {


    const { title, description, match = {}, setAppData } = this.props;

    const { params = {} } = match
    let requestBody = {


      title: title,
      body: description,
      userId: params.id


    };
    
    if (title && description) {

      const response = await httpRequest({
        endPoint: "https://jsonplaceholder.typicode.com/posts",
        method: "post",
        requestBody
      });


      setAppData("createdPost", response)

      setAppData("addpost", false)
      setAppData("postcreated", true)
      setAppData("title", null)
      setAppData("description", null)
    }else{
      alert("Please input some value")
    }
    setAppData("spinner", true)
  }

  render() {

    let { user_details_byid, dialog, user_post_byid, title, createdPost, description, addpost, postcreated, showpost } = this.props;
    return (
      user_details_byid && user_post_byid &&
      <Grid container  alignItems="center" style={{ background: '#cfe8fc', width: "100vw" }} height="100vh">
       <ArrowBackIcon onClick={(e) => { this.props.history.push("/user-home") }}  variant="contained" style={{fontSize:"30px"}} />
                                              
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

            <Grid item md={4} >
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


          <Button onClick={this.handlecreatePost} variant="contained" color="primary">Create Post</Button>
          <Dialog
            fullWidth
            open={dialog}
            onClose={this.handledialog}
          >
            <Grid container><Grid item md={11}></Grid>
              <Grid item md={1}>
                <CancelIcon align='right' style={{ fontSize: "40px" }} onClick={this.handledialog} />
              </Grid>
            </Grid>
            {addpost ? <Card >
              <Grid container display='flex'>
                <Grid item md={5} style={{ padding: "10px 10px 10px 10px" }} >
                  <TextField required id="standard-required" label="Title" value={title} onChange={(e) => { this.handleTitle("title", e) }} variant="filled" />
                </Grid><Grid item md={5} style={{ padding: "10px 10px 10px 10px" }}>
                  <TextField
                    style={{ marginLeft: "8px" }}
                    required id="standard-required"
                    label="Description"
                    value={description}
                    onChange={(e) => { this.handleTitle("description", e) }}
                    variant="filled"
                  /></Grid>
                <Grid item md={2}>
               <Button style={{ marginTop: "25%" }} onClick={this.handleAddPost}  variant="contained" color="primary">Add</Button>

                </Grid>
              </Grid>
            </Card> : null}

            {postcreated ? <Card width='auto'>
              <Grid align='center'><b>Post Created</b></Grid>
              <Grid container style={{ display: 'flex' }} align='center'>
                <Grid item md={4} sm={4} style={{ flexDirection: 'column' }}>
                  <label><b>User Id:</b></label><br></br>
                  <label><b>Post Id:</b></label><br></br>
                  <label><b>Title:</b></label><br></br>
                  <label><b>Description:</b></label></Grid>
                <Grid item md={8} sm={8} style={{ flexDirection: 'column' }}>
                  <Typography >{createdPost.userId}</Typography>
                  <Typography>{createdPost.id}</Typography>
                  <Typography>{createdPost.title}</Typography>
                  <Typography>{createdPost.body}</Typography></Grid>
              </Grid>
            </Card> : null}

          </Dialog>

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



          <Showpost showpost={showpost} handleClose={this.handleClose} />
        </Grid>
      </Grid>
    );
  }

}

const mapStateToProps = ({ screenConfiguration = {} }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { user_details_byid = {},show=false, dialog, userid, user_post_byid = [], showpost, title, createdPost, description, addpost, postcreated, } = preparedFinalObject;

  return { user_details_byid,show, userid, dialog, user_post_byid, title, createdPost, description, addpost, postcreated, showpost }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);

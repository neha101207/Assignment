import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { mapDispatchToProps } from '../../../../../../ui-utils/commons'
import { connect } from "react-redux";
import CancelIcon from '@material-ui/icons/Cancel';
import {
  Grid,
  TextField,
  Card,
  Typography,
  Dialog,
  Button,
  DialogTitle,
  DialogContent
} from "@material-ui/core";

var rp = require('request-promise');
class Dialogbox extends React.Component {



  handlecreatePost = () => {
    const { setAppData } = this.props;
    setAppData("addpost", true)
    setAppData("postcreated", false)
  }
  handleTitle = (key, e) => {
    const { setAppData } = this.props;
    setAppData(key, e.target.value)
  }

  handleAddPost = async () => {

    const { title, description, userid, setAppData } = this.props;
    var options = {
      method: 'POST',
      uri: ' https://jsonplaceholder.typicode.com/posts',
      body: {
        title: title,
        body: description,
        userId: userid
      },
      json: true // Automatically stringifies the body to JSON
    };

    await rp(options)
      .then(function (parsedBody) {

        setAppData("createdPost", parsedBody)

      })
      .catch(function (err) {
        // POST failed...
      });
    setAppData("addpost", false)
    setAppData("postcreated", true)
    await setAppData("title", null)
    await setAppData("description", null)
  }

  render() {

    const { showpost, addpost, handleClose, postItem, postcreated, title, description, createdPost } = this.props;
    return (
      <div>
        <Dialog
          fullWidth
          open={showpost}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <Grid container>
            <Grid item md={11} sm={11}>
              <DialogTitle>
                Post Details
             </DialogTitle></Grid>
            <Grid item md={1} sm={1}> <CancelIcon align='right' style={{ fontSize: "40px" }} onClick={handleClose} color="primary" />
            </Grid></Grid>
          <DialogContent dividers >

            <List>
              <ListItem><label><b>Id:</b></label>{"  "}  &nbsp;&nbsp;{postItem && postItem.id}</ListItem>
              <ListItem><label><b>Title:</b></label>{"  "}  &nbsp;&nbsp;{postItem && postItem.title}</ListItem>
              <ListItem>
                <Grid style={{ display: 'flex' }}>
                  <Typography><b>Description:</b></Typography>
                  <Typography>{"  "}  &nbsp;&nbsp;{postItem && postItem.body}</Typography> </Grid></ListItem>
              <Button onClick={this.handlecreatePost} variant="contained" color="primary">Create Post</Button>
            </List>
            {addpost ? <Card >
              <Grid container display='flex'>
                <Grid item md={10} style={{ padding: "10px 10px 10px 10px" }} >
                  <TextField required id="standard-required" label="Title" value={title} onChange={(e) => { this.handleTitle("title", e) }} variant="filled" />

                  <TextField
                    style={{ marginLeft: "8px" }}
                    required id="standard-required"
                    label="Description"
                    value={description}
                    onChange={(e) => { this.handleTitle("description", e) }}
                    variant="filled"
                  /></Grid>
                <Grid item md={2}>
                  <Button onClick={this.handleAddPost} variant="contained" color="primary">Add</Button>
                </Grid></Grid>
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

          </DialogContent>


        </Dialog>
      </div>
    );
  }
}
const mapStateToProps = ({ screenConfiguration = {} }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { postItem = {}, postId, userid, addpost, title, createdPost = {}, postcreated, description } = preparedFinalObject;

  return { postItem, postId, userid, addpost, title, createdPost, postcreated, description }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dialogbox);

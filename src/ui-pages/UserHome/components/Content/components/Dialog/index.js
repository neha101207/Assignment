import React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { mapDispatchToProps } from '../../../../../../ui-utils/commons'
import { connect } from "react-redux";
import CancelIcon from '@material-ui/icons/Cancel';
import {
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent
} from "@material-ui/core";

class Dialogbox extends React.Component {

  render() {

    const { showpost, handleClose, postItem } = this.props;
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
            </List>

          </DialogContent>


        </Dialog>

      </div>
    );
  }
}
const mapStateToProps = ({ screenConfiguration = {} }) => {
  const { preparedFinalObject = {} } = screenConfiguration;
  const { postItem = {}, postId, userid } = preparedFinalObject;

  return { postItem, postId, userid }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dialogbox);

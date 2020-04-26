import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import inspirational from '../../images/logo_inspire.png';

import CircularProgress from '@material-ui/core/CircularProgress';
// MUI stuff
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';

//Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

const styles = (theme) => ({
  ...theme.spreadThis,
});

class ProfileRoot extends Component {
  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };
  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    const {
      classes,
      user: { loading, authenticated },
    } = this.props;

    let profileMarkup = !loading ? (
      !authenticated ? (
        <Paper className={classes.paper}>
          <img
            className={classes.imageCenter}
            src={inspirational}
            alt='inspirational'
            width={300}
          ></img>
          <Typography align='center'>
            Wecome to HelpMatch - this is a website where you can help others or
            ask for help.
          </Typography>

          <Typography align='center'> Please login or sign up</Typography>
          <div className={classes.buttons}>
            <Button
              variant='contained'
              color='primary'
              component={Link}
              to='/login'
            >
              Login
            </Button>
            <Button
              variant='contained'
              color='secondary'
              component={Link}
              to='/signup'
            >
              Signup
            </Button>
          </div>
        </Paper>
      ) : (
        <Typography>
          These are all posts, check out specific groups and join the discussion
          by making posts there
          <EmojiEmotionsIcon />
          <Button
            variant='contained'
            color='secondary'
            component={Link}
            to='/groups'
          >
            See Groups
          </Button>
        </Typography>
      )
    ) : (
      <div>
        <Button>
          <CircularProgress />
        </Button>
        <br></br>
      </div>
    );

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { logoutUser, uploadImage };

ProfileRoot.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ProfileRoot));

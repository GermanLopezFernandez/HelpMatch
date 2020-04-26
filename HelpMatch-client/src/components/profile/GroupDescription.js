import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI stuff

import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';
// Icons

//Redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';

const styles = (theme) => ({
  ...theme.spreadThis,
});

class GroupDescription extends Component {
  render() {
    const {
      classes,
      user: {
        credentials: { imageUrl },
      },
    } = this.props;

    return (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className='image-wrapper'>
            {this.props.shortGroupName ? (
              <img
                alt='group'
                src={`https://www.countryflags.io/${this.props.shortGroupName.toLowerCase()}/shiny/64.png`}
              />
            ) : (
              <img src={imageUrl} alt='profile' className='profile-image' />
            )}
          </div>
          <hr />
          <div className='profile-details'>
            <Typography color='primary' variant='h5'>
              {this.props.groupName}
            </Typography>
            <hr />
            <Typography variant='body2'>{`Welcome to the ${this.props.groupName} group! This is where everyone living in ${this.props.groupName} can share information on what help they need or how they can help others!`}</Typography>
            <hr />
          </div>
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  shortGroupName: state.data.shortGroupName,
  groupName: state.data.groupName,
});

const mapActionsToProps = { logoutUser, uploadImage };

GroupDescription.propTypes = {
  classes: PropTypes.object.isRequired,
  shortGroupName: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(GroupDescription));

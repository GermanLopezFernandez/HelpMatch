import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

// REdux
import { connect } from 'react-redux';
import {
  dislikeScream,
  undislikeScream,
} from '../../redux/actions/dataActions';

export class DownvoteButton extends Component {
  dislikedScream = () => {
    if (
      this.props.user.dislikes &&
      this.props.user.dislikes.find(
        (dislike) => dislike.screamId === this.props.screamId
      )
    )
      return true;
    else return false;
  };
  dislikeScream = () => {
    this.props.dislikeScream(this.props.screamId);
  };
  undislikeScream = () => {
    this.props.undislikeScream(this.props.screamId);
  };
  render() {
    const { authenticated } = this.props.user;
    const dislikeButton = !authenticated ? (
      <Link to='/login'>
        <MyButton tip='Dislike'>
          <ArrowDownwardIcon color='secondary' />
        </MyButton>
      </Link>
    ) : this.dislikedScream() ? (
      <MyButton tip='Undo dislike' onClick={this.undislikeScream}>
        <ArrowDownwardIcon color='primary' />
      </MyButton>
    ) : (
      <MyButton tip='Dislike' onClick={this.dislikeScream}>
        <ArrowDownwardIcon color='secondary' />
      </MyButton>
    );
    return dislikeButton;
  }
}

DownvoteButton.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  dislikeScream: PropTypes.func.isRequired,
  undislikeScream: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  dislikeScream,
  undislikeScream,
};

export default connect(mapStateToProps, mapActionsToProps)(DownvoteButton);

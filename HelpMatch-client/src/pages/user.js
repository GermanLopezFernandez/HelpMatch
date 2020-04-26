import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ScreamMobile from '../components/scream/ScreamMobile';
import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

import ScreamSkeleton from '../util/ScreamSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

class user extends Component {
  state = {
    profile: null,
    screamIdParam: null,
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const screamId = this.props.match.params.screamId;

    if (screamId) this.setState({ screamIdParam: screamId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { screams, loading } = this.props.data;
    const { screamIdParam } = this.state;
    let screamsMarkup;

    if (isWidthDown('sm', this.props.width)) {
      screamsMarkup = loading ? (
        <ScreamSkeleton />
      ) : screams === null ? (
        <p>This user has not posted any posts yet</p>
      ) : !screamIdParam ? (
        screams.map((scream) => (
          <ScreamMobile key={scream.screamId} scream={scream} />
        ))
      ) : (
        screams.map((scream) => {
          if (scream.screamId !== screamIdParam)
            return <ScreamMobile key={scream.screamId} scream={scream} />;
          else
            return (
              <ScreamMobile key={scream.screamId} scream={scream} openDialog />
            );
        })
      );
    } else {
      screamsMarkup = loading ? (
        <ScreamSkeleton />
      ) : screams === null ? (
        <p>This user has not posted any posts yet</p>
      ) : !screamIdParam ? (
        screams.map((scream) => (
          <Scream key={scream.screamId} scream={scream} />
        ))
      ) : (
        screams.map((scream) => {
          if (scream.screamId !== screamIdParam)
            return <Scream key={scream.screamId} scream={scream} />;
          else
            return <Scream key={scream.screamId} scream={scream} openDialog />;
        })
      );
    }

    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getUserData })(withWidth()(user));

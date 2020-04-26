import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import Profile from '../components/profile/Profile';

class userProfile extends Component {
  render() {
    return (
      <div>
        <Grid>
          <Profile />
        </Grid>
      </div>
    );
  }
}

export default userProfile;

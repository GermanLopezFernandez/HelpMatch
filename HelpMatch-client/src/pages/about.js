import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import inspirational from '../images/inspirational.png';
import logo from '../images/logo_inspire.png';
import team from '../images/team.png';
import withStyles from '@material-ui/core/styles/withStyles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

const styles = (theme) => ({
  ...theme.spreadThis,
});

class userProfile extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <img className={classes.imageCenter} src={logo} alt='logo'></img>
        <br></br>
        <br></br>
        <Typography align='center'>
          Wecome to HelpMatch - this is a website where you can help others or
          ask for help.
        </Typography>
        <br></br>
        <br></br>
        <img className={classes.imageCenter} src={team} alt='team'></img>
        <br></br>
        <br></br>
        <Typography align='center'>
          We are team of four from the four courners of the world China,
          Philiphines, Lithuania and Mexico. And we want to empower communities
          to efficiently help their members
        </Typography>
        <br></br>
        <br></br>
        <img
          className={classes.imageCenter}
          src={inspirational}
          alt='inspirational'
        ></img>
        <br></br>
        <br></br>
        <br></br>
        <Typography align='center'>Contact: helpmatch1@gmail.com</Typography>
      </div>
    );
  }
}

export default withStyles(styles)(userProfile);

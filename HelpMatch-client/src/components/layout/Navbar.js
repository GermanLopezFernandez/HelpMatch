import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logoWhite from '../../images/logo_white.png';
//import MyButton from '../../util/MyButton';
import PostScream from '../scream/PostScream';
import Notifications from './Notifications';
// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

//Redux
import { logoutUser } from '../../redux/actions/userActions';

class Navbar extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar className='nav-container'>
          {authenticated ? (
            <Fragment>
              <Button color='inherit' component={Link} to='/'>
                <img src={logoWhite} width={150} alt='heartLogo'></img>
              </Button>

              {this.props.groupName && <PostScream />}
              <Notifications />
              <Button color='inherit' component={Link} to='/groups'>
                Groups
              </Button>
              <Button color='inherit' component={Link} to='/userProfile'>
                Your profile
              </Button>
              <Button color='inherit' onClick={this.handleLogout}>
                Logout
              </Button>
              <Button color='inherit' component={Link} to='/about'>
                About
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Button color='inherit' component={Link} to='/'>
                <img src={logoWhite} width={150} alt='heartLogo'></img>
              </Button>
              <Button color='inherit' component={Link} to='/login'>
                Login
              </Button>

              <Button color='inherit' component={Link} to='/signup'>
                Signup
              </Button>
              <Button color='inherit' component={Link} to='/about'>
                About
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapActionsToProps = { logoutUser };

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  groupName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  groupName: state.data.groupName,
});

export default connect(mapStateToProps, mapActionsToProps)(Navbar);

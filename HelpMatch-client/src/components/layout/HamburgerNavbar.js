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

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import MenuIcon from '@material-ui/icons/Menu';
//Redux
import { logoutUser } from '../../redux/actions/userActions';

class HamburgerNavbar extends Component {
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
              <PopupState variant='popover' popupId='demo-popup-menu'>
                {(popupState) => (
                  <Fragment>
                    <Button
                      variant='contained'
                      color='primary'
                      {...bindTrigger(popupState)}
                    >
                      <MenuIcon />
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem onClick={popupState.isopen}>
                        {this.props.groupName && <PostScream />}
                      </MenuItem>
                      <MenuItem onClick={popupState.close}>
                        <Button color='inherit'>
                          Notifications <Notifications />
                        </Button>
                      </MenuItem>
                      <MenuItem onClick={popupState.close}>
                        <Button color='inherit' component={Link} to='/groups'>
                          Groups
                        </Button>
                      </MenuItem>
                      <MenuItem onClick={popupState.close}>
                        <Button
                          color='inherit'
                          component={Link}
                          to='/userProfile'
                        >
                          Your profile
                        </Button>
                      </MenuItem>
                      <MenuItem onClick={popupState.close}>
                        <Button color='inherit' onClick={this.handleLogout}>
                          Logout
                        </Button>
                      </MenuItem>
                      <MenuItem onClick={popupState.close}>
                        <Button color='inherit' component={Link} to='/about'>
                          About
                        </Button>
                      </MenuItem>
                    </Menu>
                  </Fragment>
                )}
              </PopupState>
            </Fragment>
          ) : (
            <Fragment>
              <Button color='inherit' component={Link} to='/'>
                <img src={logoWhite} width={150} alt='heartLogo'></img>
              </Button>
              <PopupState variant='popover' popupId='demo-popup-menu'>
                {(popupState) => (
                  <Fragment>
                    <Button
                      variant='contained'
                      color='primary'
                      {...bindTrigger(popupState)}
                    >
                      <MenuIcon />
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem onClick={popupState.close}>
                        <Button color='inherit' component={Link} to='/login'>
                          Login
                        </Button>
                      </MenuItem>
                      <MenuItem onClick={popupState.close}>
                        <Button color='inherit' component={Link} to='/signup'>
                          Signup
                        </Button>
                      </MenuItem>
                      <MenuItem onClick={popupState.close}>
                        <Button color='inherit' component={Link} to='/about'>
                          About
                        </Button>
                      </MenuItem>
                    </Menu>
                  </Fragment>
                )}
              </PopupState>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapActionsToProps = { logoutUser };

HamburgerNavbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  groupName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  groupName: state.data.groupName,
});

export default connect(mapStateToProps, mapActionsToProps)(HamburgerNavbar);

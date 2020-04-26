import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Redux
import { setSearch } from '../../redux/actions/dataActions';
import { connect } from 'react-redux';

//MUI styff
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 392,
  },
  input: {
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
};

class SearchBar extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper component='form' className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder='Search groups'
          inputProps={{ 'aria-label': 'search google maps' }}
          onChange={(event) => this.props.setSearch(event.target.value)}
        />
        <IconButton
          className={classes.iconButton}
          aria-label='search'
          onClick={() => {
            console.log(this.props.search);
          }}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    );
  }
}

const mapActionsToProps = { setSearch };

const mapStateToProps = (state) => ({
  search: state.data.search,
});

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
  setSearch: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(SearchBar));

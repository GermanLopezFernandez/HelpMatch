import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { countries } from '../util/countries';
import { Link } from 'react-router-dom';
import SearchBar from '../components/layout/SearchBar';

//Redux
import { setGroup } from '../redux/actions/dataActions';
import { connect } from 'react-redux';
//import { connect } from 'react-redux';
//import { getScreams } from '../redux/actions/dataActions';

//MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//to do
// add classess, search bar

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 80,
    margin: 25,
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
};

class groups extends Component {
  constructor() {
    super();
    this.state = {
      groups: countries,
    };
  }
  componentDidMount() {
    this.props.setGroup('');
  }

  render() {
    const { classes } = this.props;

    let filteredGroups = this.state.groups.filter((group) =>
      group.name.toLowerCase().includes(this.props.search.toLowerCase())
    );

    let GroupsMarkup = filteredGroups.map((group) => {
      return (
        <Card className={classes.card} key={group.name}>
          <CardMedia
            title='Profile image'
            className={classes.image}
            image={`https://www.countryflags.io/${group.code.toLowerCase()}/shiny/64.png`}
          />
          <CardContent>
            <Typography variant='h6'>{group.name}</Typography>

            <Button
              variant='contained'
              color='secondary'
              onClick={() => {
                this.props.setGroup(group);
              }}
              component={Link}
              to='/group'
            >
              See group
            </Button>
          </CardContent>
        </Card>
      );
    });

    return (
      <div>
        <Grid container>
          <Grid item sm={4} xs={12}></Grid>
          <Grid item sm={4} xs={12}>
            <SearchBar />
            <br></br>

            {GroupsMarkup}
          </Grid>
          <Grid item sm={4} xs={12}></Grid>
        </Grid>
      </div>
    );
  }
}

const mapActionsToProps = { setGroup };

const mapStateToProps = (state) => ({
  groupName: state.data.groupName,
  search: state.data.search,
});

groups.propTypes = {
  classes: PropTypes.object.isRequired,
  setGroup: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(groups));

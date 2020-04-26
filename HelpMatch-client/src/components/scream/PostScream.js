import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import CloseIcon from '@material-ui/icons/Close';
// Redux stuff
import { connect } from 'react-redux';
import { postScream, clearErrors } from '../../redux/actions/dataActions';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

const styles = (theme) => ({
  ...theme.spreadThis,
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10,
  },
  progressSpinner: {
    position: 'absolute',
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
});

let error = false;

class PostScream extends Component {
  state = {
    open: false,
    body: '',
    location: '',
    tag: 'other',
    errors: {},
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '', open: false, errors: {} });
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    if (this.state.location.trim() === '') {
      error = 'City must not be empty';
    } else {
      event.preventDefault();
      this.props.postScream({
        body: this.state.body,
        location: this.state.location,
        tag: this.state.tag,
        groupName: this.props.groupName,
      });
    }
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;
    return (
      <Fragment>
        <Button
          variant='contained'
          color='secondary'
          onClick={this.handleOpen}
          tip='Post a Scream!'
        >
          Make a post
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <MyButton
            tip='Close'
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Make a new post</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleChange}>
              <TextField
                name='body'
                type='text'
                label='Share your problems or help the world'
                rows='3'
                placeholder='Your text goes here'
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
                multiline
              />
              <br />
              <br />
              <TextField
                name='location'
                type='text'
                label='Type your city.'
                rows='3'
                placeholder='City'
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <br />
              <br />
              <FormControl variant='filled' className={classes.formControl}>
                <InputLabel>Tag</InputLabel>
                <Select
                  labelId='Tag'
                  id='Tag'
                  name='tag'
                  value={this.state.tag}
                  onChange={this.handleChange}
                >
                  <MenuItem value={'helping'}>Helping</MenuItem>
                  <MenuItem value={'asking'}>Asking</MenuItem>
                  <MenuItem value={'other'}>Other</MenuItem>
                </Select>
              </FormControl>

              <br />
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={classes.submitButton}
                disabled={loading}
                onClick={this.handleSubmit}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  groupName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  groupName: state.data.groupName,
});

export default connect(mapStateToProps, { postScream, clearErrors })(
  withStyles(styles)(PostScream)
);

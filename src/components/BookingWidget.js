//.../src/components/BookingWidget.js
//This is where all components will be combined

import React, { PureComponent } from 'react';
import LocationForm from './LocationForm';
import EmployeeForm from './EmployeeForm';
import ServiceForm from './ServiceForm';
import DateForm from './DateForm';
import CustomerForm from './CustomerForm';
import ResetForm from './ResetForm';
import Summary from './Summary';
import TimeForm from './TimeForm';
import BookingButton from './BookingButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import PropTypes from 'prop-types';
import { Grid } from '../../node_modules/@material-ui/core';
import { resetForm } from '../actions/selections';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { getConfig } from '../actions/conf';

class BookingWidget extends PureComponent {
  state = {
    open: false,
  };

  componentWillMount() {
    console.log(this.conf);
    this.props.getConfig();
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.resetForm();
  };

  render() {
    const { fullScreen, selections } = this.props;

    return (
      <div>
        <Button
          style={{ marginTop: 300 }}
          variant="contained"
          color="primary"
          className={fullScreen.button}
          onClick={this.handleClickOpen}
        >
          Make a booking!
        </Button>

        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <Grid container justify="center" style={{ minHeight: 700 }}>
              <div>
                <Grid container wrap="nowrap">
                  <Grid item>
                    <ServiceForm />
                  </Grid>
                </Grid>
                <Grid container wrap="nowrap">
                  <Grid item>
                    <LocationForm />
                  </Grid>
                </Grid>
                <Grid container wrap="nowrap">
                  <Grid item>
                    <EmployeeForm />
                  </Grid>
                </Grid>
                <Grid container wrap="nowrap" spacing={16}>
                  <Grid item>
                    <DateForm />
                  </Grid>
                </Grid>
                <Grid container wrap="nowrap" spacing={16}>
                  <Grid item>
                    <TimeForm />
                  </Grid>
                </Grid>
                <Grid container wrap="nowrap" spacing={16}>
                  <Grid item>
                    <Summary />
                  </Grid>
                </Grid>
                <Grid container wrap="nowrap" spacing={16}>
                  <Grid item>
                    <CustomerForm />
                  </Grid>
                </Grid>
                {/* <Grid container spacing={16}>
                  <Grid item>
                    
                  </Grid>
                </Grid> */}
                {/* <Grid container spacing={16}>
                  <Grid item>
                    <ResetForm />
                    </Grid>
                  </Grid> */}
              </div>
            </Grid>
          </DialogContent>
          <DialogActions>
            <BookingButton
              className={fullScreen.button}
              // style={{marginRight:190}}
            />
            <IconButton
              className={fullScreen.button}
              aria-label="Delete"
              // style={{ marginTop: -70, marginLeft: 320 }}
            >
              <DeleteIcon onClick={this.handleClose} color="primary" />
            </IconButton>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    selections: state.selections,
    config: state.getConfig,
  };
};

BookingWidget.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default compose(
  withMobileDialog(),
  connect(
    null,
    { resetForm, getConfig },
  ),
)(BookingWidget);

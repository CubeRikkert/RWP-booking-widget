//.../src/components/BookingWidget.js
//This is where all components will be combined

import React, { PureComponent } from 'react';
import LocationForm from './LocationForm';
import EmployeeForm from './EmployeeForm';
import ServiceForm from './ServiceForm';
import DateForm from './DateForm';
import CustomerForm from './CustomerForm';
import Summary from './Summary';
import TimeForm from './TimeForm';
import BookingButton from './BookingButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import PropTypes from 'prop-types';
import { Grid } from '../../node_modules/@material-ui/core';
import { resetForm } from '../actions/selections';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
// import { getConfig } from '../actions/conf';
import Logo from '../salonized_logo.js';
import SimpleAppBar from './AppBar';

class BookingWidget extends PureComponent {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.resetForm();
  };

  showScreenGrid = field => {
    // const { field_order } = this.props.config;
    // console.log(field);
    if (field === 'service') return;
  };

  render() {
    const { fullScreen } = this.props;
    if (!this.props.config) return null;
    // console.log(this.props.config.field_order[1]);

    return (
      <div>
        <Button
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
          <SimpleAppBar />
          <DialogContent style={{ padding: 0 }}>
            <Grid container justify="center" style={{ minHeight: 700 }}>
              <div>
                {this.props.config.field_order.map(field => {
                  if (field === 'service')
                    return (
                      <Grid key={field} container wrap="nowrap">
                        <Grid item>
                          <ServiceForm />
                        </Grid>
                      </Grid>
                    );
                  if (field === 'location')
                    return (
                      <Grid key={field} container wrap="nowrap">
                        <Grid item>
                          <LocationForm />
                        </Grid>
                      </Grid>
                    );
                  if (field === 'resource')
                    return (
                      <Grid key={field} container wrap="nowrap">
                        <Grid item>
                          <EmployeeForm />
                        </Grid>
                      </Grid>
                    );
                })}

                <Grid container wrap="nowrap">
                  <Grid item>
                    <DateForm />
                  </Grid>
                </Grid>
                <Grid container wrap="nowrap">
                  <Grid item>
                    <TimeForm />
                  </Grid>
                </Grid>
                <Grid container wrap="nowrap">
                  <Grid item>
                    <Summary />
                  </Grid>
                </Grid>
                <Grid container wrap="nowrap">
                  <Grid item>
                    <CustomerForm />
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </DialogContent>
          <BookingButton
            className={fullScreen.button}
            style={{ position: 'absolute' }}
          />
          <DialogActions>
            <p
              style={{
                position: 'sticky',
                right: 220,
                bottom: 10,
                marginBottom: 1,
                fontSize: 12,
                height: 10,
                opacity: 0.5,
              }}
            >
              <span style={{ opacity: 0.5 }}>Powered by</span>
              <Logo />
            </p>
            <IconButton className={fullScreen.button} aria-label="Delete">
              <DeleteIcon
                onClick={this.handleClose}
                color="inherit"
                style={{ position: 'absolute' }}
              />
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
    config: state.allConfig,
  };
};

BookingWidget.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default compose(
  withMobileDialog(),
  connect(
    mapStateToProps,
    { resetForm },
  ),
)(BookingWidget);

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { addBooking } from '../actions/get';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class BookingButton extends PureComponent {
  handleClick = () => {
    const { date, time, location, employee, service } = this.props.selections;
    const {
      firstName,
      lastName,
      address,
      postalcode,
      city,
      phone,
      email,
      notes,
    } = this.props.customer;
    const serviceIds = service.map(service => {
      return service.id;
    });
    const booking = {
      location_id: location.id,
      resource_id: employee.id,
      service_ids: serviceIds,
      appointment_at: `${date} ${time}`,
      first_name: firstName,
      last_name: lastName,
      address,
      postalcode,
      city,
      phone,
      email,
      notes,
    };
    this.props.addBooking(booking);
  };
  render() {
    const { classes, customer, navigation } = this.props;
    if (navigation !== 3) return null;
    const handle = () => this.handleClick();
    return (
      <Button
        disabled={
          !customer.firstName ||
          !customer.lastName ||
          !customer.email ||
          !customer.phone
            ? true
            : false
        }
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handle}
      >
        BOOK NOW
      </Button>
    );
  }
}

BookingButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = function(state) {
  return {
    selections: state.selections,
    customer: state.customer,
    navigation: state.navigation,
  };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { addBooking },
  ),
)(BookingButton);

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {addBooking} from '../actions/get'
import { connect } from 'react-redux'
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
    const { firstName, lastName, address, postalcode, city, phone, email, notes } = this.props.customer;
    const booking = {
      location_id: location.id,
      resource_id: employee.id,
      service_ids: [
        service.id
      ],
      appointment_at: `${date} ${time}`,
      first_name: firstName,
      last_name: lastName,
      address,
      postalcode,
      city,
      phone,
      email,
      notes,
    }
    this.props.addBooking(booking)
  }
  render() {
    const { classes } = this.props;
    const handle = () => this.handleClick();
    return (
      <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handle}>
        BOOK APPOINTMENT
      </Button>
    );
  }

}

BookingButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = function (state) {
  return {
    selections: state.selections,
    customer: state.customer
  }
}

export default compose(withStyles(styles), connect(mapStateToProps, {addBooking}))(BookingButton)

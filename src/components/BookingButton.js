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
    // const serviceId = this.props.selections.service.id
    // const date = this.props.selections.date
    const dateTime = this.props.selections.date.concat(' ', this.props.selections.time)
    const booking = {}
    booking.locationId = this.props.selections.location.id
    booking.resourceId = this.props.selections.employee.id
    booking.serviceIds = [this.props.selections.service.id]
    booking.appointmentAt = dateTime
    booking.firstName = this.props.customer.firstName
    booking.lastName = this.props.customer.lastName
    booking.address = this.props.customer.address
    booking.postalcode = this.props.customer.postalcode
    booking.city = this.props.customer.city
    booking.phone = this.props.customer.phone
    booking.email = this.props.customer.email
    booking.notes = this.props.customer.notes

    this.props.addBooking(booking)

    console.log(booking)
}
  render() {
    const { classes } = this.props;
    return (
        <div>
          <Button variant="contained" color="primary" className={classes.button} onClick={()=>this.handleClick()}>
            BOOK APPOINTMENT
          </Button>
        </div>
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

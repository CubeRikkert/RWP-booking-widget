import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {
  firstName,
  lastName,
  address,
  postalCode,
  city,
  phone,
  email,
  notes,
} from '../actions/customer';
import { connect } from 'react-redux';
import compose from 'recompose/compose';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 350,
    maxWidth: 350,
  },
});

class CustomerForm extends React.Component {
  firstName = event => {
    this.props.firstName(event.target.value);
  };

  lastName = event => {
    this.props.lastName(event.target.value);
  };

  address = event => {
    this.props.address(event.target.value);
  };

  postalCode = event => {
    this.props.postalCode(event.target.value);
  };

  city = event => {
    this.props.city(event.target.value);
  };

  phone = event => {
    this.props.phone(event.target.value);
  };

  email = event => {
    this.props.email(event.target.value);
  };

  notes = event => {
    this.props.notes(event.target.value);
  };

  render() {
    const { classes, selections, navigation } = this.props;
    if (
      !selections.location ||
      !selections.service ||
      !selections.employee ||
      !selections.date ||
      !selections.time
    )
      return null; //customer form appears only after location, service and employee is selected
    if (navigation !== 3) return null;
    return (
      <div className={classes.root}>
        <div className={classes.formControl}>
          <form className={classes.container} noValidate autoComplete="off">
            <div>
              <TextField
                id="firstName"
                label="First name"
                placeholder="First name"
                className={classes.textField}
                margin="normal"
                onChange={this.firstName}
                value={
                  this.props.customer.firstName !== ''
                    ? this.props.customer.firstName
                    : ''
                }
                style={{ width: 165, marginLeft: 5, marginTop: 0 }}
              />

              <TextField
                id="lastName"
                label="Last name"
                placeholder="Last name"
                className={classes.textField}
                margin="normal"
                onChange={this.lastName}
                value={
                  this.props.customer.lastName !== ''
                    ? this.props.customer.lastName
                    : ''
                }
                style={{ width: 165, marginLeft: 10, marginTop: 0 }}
              />
            </div>
            <TextField
              id="email"
              label="E-mail"
              placeholder="E-mail"
              className={classes.textField}
              margin="normal"
              type="email"
              onChange={this.email}
              value={
                this.props.customer.email !== ''
                  ? this.props.customer.email
                  : ''
              }
              style={{ minWidth: 340, marginLeft: 5, marginTop: 0 }}
            />
            <TextField
              id="phone"
              label="Phone"
              placeholder="Mobile"
              className={classes.textField}
              margin="normal"
              onChange={this.phone}
              type="tel"
              value={
                this.props.customer.phone !== ''
                  ? this.props.customer.phone
                  : ''
              }
              style={{ minWidth: 340, marginLeft: 5, marginTop: 0 }}
            />
            {this.props.config.address_fields !== 'hidden' && (
              <TextField
                id="address"
                label="Address"
                placeholder="Address"
                className={classes.textField}
                margin="normal"
                onChange={this.address}
                value={
                  this.props.customer.address !== ''
                    ? this.props.customer.address
                    : ''
                }
                style={{ minWidth: 340, marginLeft: 5, marginTop: 0 }}
              />
            )}
            <TextField
              id="postalcode"
              label="Postal code"
              placeholder="Postal code"
              className={classes.textField}
              margin="normal"
              onChange={this.postalCode}
              value={
                this.props.customer.postalcode !== ''
                  ? this.props.customer.postalcode
                  : ''
              }
              style={{ width: 135, marginLeft: 5, marginTop: 0 }}
            />
            <TextField
              id="city"
              label="City"
              placeholder="City"
              className={classes.textField}
              margin="normal"
              onChange={this.city}
              value={
                this.props.customer.city !== '' ? this.props.customer.city : ''
              }
              style={{ width: 195, marginLeft: 10, marginTop: 0 }}
            />
            <TextField
              id="notes"
              label="Notes"
              placeholder="Notes"
              className={classes.textField}
              margin="normal"
              onChange={this.notes}
              value={
                this.props.customer.notes !== ''
                  ? this.props.customer.notes
                  : ''
              }
              style={{ minWidth: 340, marginLeft: 5, marginTop: 0 }}
            />
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    customer: state.customer,
    selections: state.selections,
    config: state.allConfig,
    navigation: state.navigation,
  };
};

CustomerForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { firstName, lastName, address, postalCode, city, phone, email, notes },
  ),
)(CustomerForm);

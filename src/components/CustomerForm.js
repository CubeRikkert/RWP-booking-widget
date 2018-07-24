import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: 350,
  },
  menu: {
    minWidth: 350,
  },
});

class CustomerForm extends React.Component {

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="firstName"
          label="First name"
          placeholder="First name"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="lastName"
          label="Last name"
          placeholder="Last name"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="address"
          label="Address"
          placeholder="Address"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="postalcode"
          label="Postal code"
          placeholder="Postal code"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="city"
          label="City"
          placeholder="City"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="phone"
          label="Phone"
          placeholder="Phone"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="email"
          label="E-mail"
          placeholder="E-mail"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="notes"
          label="Notes"
          placeholder="Notes"
          className={classes.textField}
          margin="normal"
        />
      </form>
    );
  }
}

CustomerForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomerForm);
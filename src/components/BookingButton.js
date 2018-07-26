import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
    console.log('clicking xD')
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

export default withStyles(styles)(BookingButton);
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { resetForm } from '../actions/selections';
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

class ResetForm extends PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <IconButton
          className={classes.button}
          aria-label="Delete"
          style={{ marginTop: -70, marginLeft: 320 }}
        >
          <DeleteIcon onClick={() => this.props.resetForm()} />
        </IconButton>
      </div>
    );
  }
}

ResetForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(
    null,
    { resetForm },
  ),
)(ResetForm);

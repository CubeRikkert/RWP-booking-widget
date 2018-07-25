
import { connect } from 'react-redux'
import compose from 'recompose/compose';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {selectDate} from '../actions/selections'
import {getTimes} from '../actions/get'
import {getDates} from '../actions/get'


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
});

class DateForm extends React.Component {

  componentWillMount() {
    this.props.getTimes()
    this.props.getDates ()
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.selectDate(event.target.value)
  };

  render() {

    const { classes, selections } = this.props;
    if (!selections.location || !selections.service || !selections.employee) return null //customer form appears only after location, service and employee is selected
    return (
      <form className={classes.container} noValidate>
      <TextField
        id="datetime-local"
        label="Pick an appointment date!"
        type="datetime-local" 
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={this.handleChange}
        placeholder=''
      />
    </form>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    // date: state.selections.selection.date,
    getTimes : state.getTimes,
    getDates : state.getDates,
    selections: state.selections
  }
}

DateForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles), connect(mapStateToProps, {selectDate, getTimes, getDates}))(DateForm);

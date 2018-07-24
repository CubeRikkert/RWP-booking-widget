import { connect } from 'react-redux'
import compose from 'recompose/compose';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {selectEmployees} from '../actions/selections'
import {getEmployees} from '../actions/get'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 350,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class EmployeeForm extends React.Component {

  componentWillMount() {
    this.props.getEmployees()
  }

  handleChange = event => {
    this.props.selectEmployees(event.target.value)
  };

  render() {

    const { classes, employees, employee } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="employee-form">Pick an employee!</InputLabel>
          <Select
            value={employee}
            onChange={this.handleChange}
            input={<Input name="employee" id="employee" />}
          >
            {employees.map(emp=>
              (<MenuItem key={emp} value={emp}>{emp}</MenuItem>)
            )}
          </Select>
        </FormControl>
      </form>
    );
  }
}

const mapStateToProps = function (state) {
  return {

    // employees: state.selections.employees,
    employees: state.employees,
    getEmployees: state.getEmployees

  }
}

EmployeeForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles), connect(mapStateToProps, {selectEmployees, getEmployees}))(EmployeeForm);

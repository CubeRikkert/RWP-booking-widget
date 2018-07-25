import { connect } from 'react-redux'
import compose from 'recompose/compose';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {selectEmployees} from '../actions/selections'
import {getEmployees} from '../actions/get'
import Select from 'react-select';

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
    this.props.selectEmployees(this.props.employees.find(emp=>emp.name===event.value))
  };

  filterEmployees = () => {
    if (!this.props.selections.service.id && !this.props.selections.location.id) return this.props.employees
    if (this.props.selections.service.id && !this.props.selections.location.id) return this.props.employees
    if (!this.props.selections.service.id && this.props.selections.location.id) return this.props.employees
    return this.props.employees
  }

  render() {

    const { classes, employees, employee } = this.props;
    if (!employees) return null
    const employeeOptions = this.filterEmployees().map(emp=>({"value":emp.name,"label":emp.name}))
    
    return (
      <div className={classes.root}>
        <div className={classes.formControl}>
          <Fragment>
            <Select
              placeholder = "Pick an employee..."
              isDisabled={false}
              isLoading={false}
              isClearable={true}
              isSearchable={true}
              name="employee"
              options={employeeOptions}
              onChange={this.handleChange}
              value={
                employee !== '' ? {value:employee.name,label: employee.name} : ''
              }
            />
          </Fragment>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    employees: state.allEmployees,
    selections: state.selections,
    employee: state.selections.employee
  }
}

EmployeeForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles), connect(mapStateToProps, {selectEmployees, getEmployees}))(EmployeeForm);

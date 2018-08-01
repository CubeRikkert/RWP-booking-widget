import { connect } from 'react-redux';
import compose from 'recompose/compose';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { selectEmployees, resetTime } from '../actions/selections';
import { getEmployees } from '../actions/get';
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
    this.props.getEmployees();
  }

  handleChange = event => {
    if (event.value === 'No Preference') {
      const empOptions = this.filterEmployees().slice(1);
      const randomEmp =
        empOptions[Math.floor(empOptions.length * Math.random())];
      console.log(randomEmp);
      this.props.selectEmployees(randomEmp);
    }
    if (event.value !== 'No Preference')
      this.props.selectEmployees(
        this.props.employees.find(emp => emp.name === event.value),
      );
    this.props.resetTime();
  };

  filterEmployees = () => {
    let employees;
    if (!this.props.selections.location) {
      employees = this.props.employees;
    } else {
      employees = this.props.employees.filter(
        emp => emp.location_id === this.props.selections.location.id,
      );
    }
    if (this.props.selections.service.length !== 0) {
      employees = this.props.employees.filter(emp => {
        let employeeHasAllServices = true;
        for (let i = 0; i < this.props.selections.service.length; i++) {
          if (!emp.service_ids.includes(this.props.selections.service[i].id))
            employeeHasAllServices = false;
        }
        if (employeeHasAllServices === true) return emp;
      });
    }
    if (employees.length > 1)
      return [{ name: 'No Preference' }].concat(employees);
    return employees;
  };

  render() {
    const {
      classes,
      employees,
      employee,
      availableDates,
      selections,
    } = this.props;
    if (!employees) return null;
    const employeeOptions = this.filterEmployees().map(emp => ({
      value: emp.name,
      label: emp.name,
    }));
    // if (availableDates && selections.location) return null;
    console.log(employeeOptions);
    if (
      (employeeOptions.length === 1 && selections.employee === '') ||
      (employeeOptions.length === 1 && !selections.employee)
    ) {
      this.props.selectEmployees(
        this.props.employees.find(emp => emp.name === employeeOptions[0].value),
      );
    }
    return (
      <div className={classes.root}>
        <div className={classes.formControl}>
          <p
            style={{
              marginTop: 2,
              marginBottom: 2,
              fontSize: 14,
              textAlign: 'center',
              padding: 5,
            }}
          >
            Employee
          </p>
          <Fragment>
            <Select
              placeholder="Pick an employee..."
              isDisabled={false}
              isLoading={false}
              // backspaceRemoves={false}
              // deleteRemoves={false}
              // isClearable={true}
              isSearchable={true}
              name="employee"
              options={employeeOptions}
              onChange={this.handleChange}
              value={
                employee && employee !== ''
                  ? { value: employee.name, label: employee.name }
                  : ''
              }
            />
          </Fragment>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    employees: state.allEmployees,
    selections: state.selections,
    employee: state.selections.employee,
    availableDates: state.availableDates,
  };
};

EmployeeForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { selectEmployees, getEmployees, resetTime },
  ),
)(EmployeeForm);

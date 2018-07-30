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
    if (event)
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
    return employees;
    // if (this.props.selections.service.length<1 && !this.props.selections.location)
    //   return this.props.employees;
    // if (this.props.selections.service.length>0 && !this.props.selections.location)
    //   return this.props.employees.filter(emp =>
    //     emp.service_ids.includes(this.props.selections.service.id),
    //   );
    // if (this.props.selections.service.length<1 && this.props.selections.location)
    //   return this.props.employees.filter(
    //     emp => emp.location_id === this.props.selections.location.id,
    //   );
    // if (this.props.selections.service.length>0 && this.props.selections.location)
    //   return this.props.employees
    //     .filter(emp =>
    //       emp.service_ids.includes(this.props.selections.service.id),
    //     )
    //     .filter(emp => emp.location_id === this.props.selections.location.id);
  };

  render() {
    const { classes, employees, employee, availableDates } = this.props;
    if (!employees) return null;
    const employeeOptions = this.filterEmployees().map(emp => ({
      value: emp.name,
      label: emp.name,
    }));
    if (availableDates) return null;
    return (
      <div className={classes.root}>
        <div className={classes.formControl}>
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

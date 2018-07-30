import { connect } from 'react-redux';
import compose from 'recompose/compose';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { selectServices } from '../actions/selections';
import { getServices, getDates } from '../actions/get';
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

class ServiceForm extends React.Component {
  componentWillMount() {
    this.props.getServices();
  }

  handleChange = event => {
    this.props.selectServices(
      this.props.services.find(ser => ser.name === event.value),
    );
  };

  filterServices = () => {
    if (!this.props.selections.location && !this.props.selections.employee)
      return this.props.services;
    if (this.props.selections.location && !this.props.selections.employee) {
      const employeesofLocation = this.props.employees.filter(
        emp => emp.location_id === this.props.selections.location.id,
      );
      const servicesofLocation = employeesofLocation.map(
        emp => emp.service_ids,
      );
      const combinedservicesofLocation = [].concat.apply(
        [],
        servicesofLocation,
      );
      return this.props.services.filter(ser =>
        combinedservicesofLocation.includes(ser.id),
      );
    }
    if (!this.props.selections.location && this.props.selections.employee)
      return this.props.services.filter(ser =>
        ser.resource_ids.includes(this.props.selections.employee.id),
      );
    if (this.props.selections.location && this.props.selections.employee)
      return this.props.services.filter(ser =>
        ser.resource_ids.includes(this.props.selections.employee.id),
      );
    return this.props.services;
  };

  nowGetDates = () => {
    if (this.props.selections.service && this.props.selections.employee) {
      const date = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, '-');
      const serviceId = this.props.selections.service.id;
      const employeeId = this.props.selections.employee.id;
      this.props.getDates(serviceId, date, employeeId);
    }
  };

  render() {
    const { classes, services, service } = this.props;
    if (!services) return null;
    const serviceOptions = this.filterServices().map(ser => ({
      value: ser.name,
      label: ser.name,
    }));
    if (this.props.selections.service !== null) this.nowGetDates();
    return (
      <div className={classes.root}>
        <div className={classes.formControl}>
          <Fragment>
            <Select
              placeholder="Pick a service..."
              isDisabled={false}
              isLoading={false}
              isMulti={true}
              // isClearable={true}
              isSearchable={true}
              name="service"
              className="basic-multi-select"
              options={serviceOptions}
              onChange={this.handleChange}
              // value={
              //   service && service !== ''
              //     ? { value: service.name, label: service.name }
              //     : ''
              // }
            />
          </Fragment>
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    services: state.allServices,
    selections: state.selections,
    service: state.selections.service,
    resource: state.selections.employee,
    employees: state.allEmployees,
  };
};

ServiceForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { selectServices, getServices, getDates },
  ),
)(ServiceForm);

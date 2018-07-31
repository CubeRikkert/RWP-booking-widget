import { connect } from 'react-redux';
import compose from 'recompose/compose';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { selectServices } from '../actions/selections';
import { getServices, getDates } from '../actions/get';
import Select from 'react-select';
import './ServiceForm.css';

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
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class ServiceForm extends React.Component {
  componentWillMount() {
    this.props.getServices();
  }

  // handleChange = event => {
  //   const serviceNames = event.map(ev => ev.value);
  //   this.props.selectServices(
  //     this.props.services.filter(ser => serviceNames.includes(ser.name)),
  //   );
  // };

  handleChange = event => {
    if (this.props.config.allow_multiple_services === true) {
      const serviceNames = event.map(ev => ev.value);
      this.props.selectServices(
        this.props.services.filter(ser => serviceNames.includes(ser.name)),
      );
    } else {
      const serviceNames = [event].map(ev => ev.value);
      this.props.selectServices(
        this.props.services.filter(ser => serviceNames.includes(ser.name)),
      );
    }
  };

  filterServices = () => {
    let employees;
    if (!this.props.selections.location) {
      employees = this.props.employees;
    } else {
      employees = this.props.employees.filter(
        emp => emp.location_id === this.props.selections.location.id,
      );
    }
    if (this.props.selections.employee) {
      return this.props.services.filter(ser =>
        ser.resource_ids.includes(this.props.selections.employee.id),
      );
    }
    let employeesofService = employees.filter(emp => {
      let employeeHasAllServices = true;
      for (let i = 0; i < this.props.selections.service.length; i++) {
        if (!emp.service_ids.includes(this.props.selections.service[i].id))
          employeeHasAllServices = false;
      }
      if (employeeHasAllServices === true) return emp;
    });
    const services = employeesofService.map(emp => emp.service_ids);
    const combinedserviceIds = [].concat.apply([], services);
    let combinedServices = this.props.services.filter(serv =>
      combinedserviceIds.includes(serv.id),
    );
    return combinedServices;
  };

  nowGetDates = () => {
    if (this.props.selections.service && this.props.selections.employee) {
      const date = new Date()
        .toJSON()
        .slice(0, 10)
        .replace(/-/g, '-');
      let serviceIds;
      if (this.props.selections.service.length > 0) {
        this.props.selections.service.forEach((service, ix) => {
          if (ix === 0) serviceIds = service.id;
          else serviceIds = serviceIds + ',' + service.id;
        });
      }
      const employeeId = this.props.selections.employee.id;
      this.props.getDates(serviceIds, date, employeeId);
    }
  };

  render() {
    const {
      classes,
      services,
      service,
      employees,
      availableTimes,
      availableDates,
      selections,
    } = this.props;
    if (!services || !employees) return null;
    const serviceOptions = this.filterServices().map(ser => ({
      value: ser.name,
      label:
        ser.name +
        ' |  Duration ' +
        ser.duration +
        ' min' +
        ' | Price ' +
        Number(ser.price) / 100 +
        ' €',
    }));
    if (this.props.selections.service.length > 0 && !availableDates)
      this.nowGetDates();
    if (availableDates && selections.location) return null;

    if (this.props.config.allow_multiple_services === false)
      return (
        <div className={classes.root}>
          <div className={classes.formControl}>
            <Fragment>
              <Select
                className={classes.css - 10}
                placeholder="Pick a service..."
                isDisabled={false}
                isLoading={false}
                isMulti={false}
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

                style={{ width: 30 }}
              />
            </Fragment>
          </div>
        </div>
      );

    return (
      <div className={classes.root}>
        <div className={classes.formControl}>
          <p style={{ marginTop: 2, marginBottom: 2, fontSize: 14 }}>
            Service(s)
          </p>
          <Fragment>
            <Select
              // className={classes.css - 10}
              placeholder="Which service(s) are you looking for?"
              isDisabled={false}
              isLoading={false}
              isMulti={true}
              // isClearable={true}
              isSearchable={true}
              name="service"
              className="basic-multi-select"
              options={serviceOptions}
              onChange={this.handleChange}
              value={
                service && service !== ''
                  ? service.map(ser => ({
                      value: ser.name,
                      label:
                        ser.name +
                        ' |  Duration ' +
                        ser.duration +
                        ' min' +
                        ' | Price ' +
                        Number(ser.price) / 100 +
                        ' €',
                    }))
                  : ''
              }
              style={{ width: 30 }}
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
    availableDates: state.availableDates,
    availableTimes: state.availableTimes,
    config: state.getConfig,
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

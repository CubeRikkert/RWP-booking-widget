import { connect } from 'react-redux';
import compose from 'recompose/compose';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { selectLocation } from '../actions/selections';
import { getLocations } from '../actions/get';
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

class LocationForm extends React.Component {
  componentWillMount() {
    this.props.getLocations();
  }

  handleChange = event => {
    this.props.selectLocation(
      this.props.locations.find(loc => loc.name === event.value),
    );
  };

  filterLocations = () => {
    if (!this.props.selections.service && !this.props.selections.employee)
      return this.props.locations;
    if (
      this.props.selections.service.length > 0 &&
      !this.props.selections.employee
    ) {
      const employeesforService = this.props.employees.filter(emp =>
        emp.service_ids.includes(this.props.selections.service[0].id),
      );
      const locationsforService = employeesforService.map(
        emp => emp.location_id,
      );
      return this.props.locations.filter(loc =>
        locationsforService.includes(loc.id),
      );
    }
    if (!this.props.selections.service && this.props.selections.employee)
      return this.props.locations.filter(
        loc => loc.id === this.props.selections.employee.location_id,
      );
    if (this.props.selections.service && this.props.selections.employee)
      return this.props.locations.filter(
        loc => loc.id === this.props.selections.employee.location_id,
      );
    return this.props.locations;
  };

  render() {
    const { classes, locations, location, navigation, selections } = this.props;
    if (!locations) return null;
    const locationOptions = this.filterLocations().map(loc => ({
      value: loc.name,
      label: loc.name,
    }));
    if (navigation !== 1) return null;
    if (
      (locationOptions.length === 1 && selections.location === '') ||
      (locationOptions.length === 1 && !selections.location)
    ) {
      const loc = this.props.locations.find(
        loc => loc.name === locationOptions[0].value,
      );
      loc.autoSelect = true;
      this.props.selectLocation(loc);
      return null;
    }
    return (
      <div className={classes.root}>
        <div className={classes.formControl}>
          <p
            style={{
              marginTop: 2,
              marginBottom: 2,
              fontSize: 14,
              padding: 5,
            }}
          >
            Location
          </p>
          <Fragment>
            <Select
              placeholder="Select a location / branch"
              isDisabled={false}
              isLoading={false}
              isSearchable={true}
              name="employee"
              options={locationOptions}
              onChange={this.handleChange}
              value={
                location && location !== ''
                  ? { value: location.name, label: location.name }
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
    locations: state.allLocations,
    selections: state.selections,
    location: state.selections.location,
    employees: state.allEmployees,
    availableDates: state.availableDates,
    navigation: state.navigation,
  };
};

LocationForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { selectLocation, getLocations },
  ),
)(LocationForm);

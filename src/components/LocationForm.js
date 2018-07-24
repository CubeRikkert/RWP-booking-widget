import { connect } from 'react-redux'
import compose from 'recompose/compose';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {selectLocation} from '../actions/selections'
import { getLocations} from '../actions/get';
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
    this.props.getLocations()
  }

  handleChange = event => {
    this.props.selectLocation(event.value)
  };

  render() {

    const { classes, locations, location } = this.props;
    if (!locations) return null
    const locationOptions = locations.map(loc=>({"value":loc.name,"label":loc.name}))

    return (
      <div className={classes.root}>
        <div className={classes.formControl}>
          <Fragment>
            <Select
              placeholder = "Pick a location..."
              isDisabled={false}
              isLoading={false}
              isClearable={true}
              isSearchable={true}
              name="employee"
              options={locationOptions}
              onChange={this.handleChange}
              value={
                location !== '' ? {value:location,label: location} : ''
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
    locations: state.allLocations,
    location: state.selections.location
  }
}

LocationForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles), connect(mapStateToProps, {selectLocation, getLocations}))(LocationForm);

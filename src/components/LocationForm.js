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
import {selectLocation} from '../actions/selections'

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

  handleChange = event => {
    this.props.selectLocation(event.target.value)
  };

  render() {

    const { classes, locations, location } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="location-form">Pick a location!</InputLabel>
          <Select
            value={location}
            onChange={this.handleChange}
            input={<Input name="location" id="location" />}
          >
            {locations.map(loc=>
              (<MenuItem key={loc} value={loc}>{loc}</MenuItem>)
            )}
          </Select>
        </FormControl>
      </form>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    locations: state.locations,
    location: state.selections.location
  }
}

LocationForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles), connect(mapStateToProps, {selectLocation}))(LocationForm);

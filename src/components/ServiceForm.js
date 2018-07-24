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
import {selectServices} from '../actions/selections';
import { getServices} from '../actions/get';


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
    this.props.getServices()
  
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    this.props.selectServices(event.target.value)
  };

  render() {

    const { classes, services, service } = this.props;
 
    return (
      
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="service-form">Pick a service!</InputLabel>
          <Select
            value={service}
            onChange={this.handleChange}
            input={<Input name="service" id="service" />}
          >
            {services.map(ser=>
              (<MenuItem key={ser} value={ser}>{ser.name}</MenuItem>)
            )}
          </Select>
        </FormControl>
      </form>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    services: state.selections.services,
    service: state.selections.selection.service,
    getServices : state.getServices,

  }
}

ServiceForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles), connect(mapStateToProps, {selectServices, getServices}))(ServiceForm);

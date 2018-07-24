import { connect } from 'react-redux'
import compose from 'recompose/compose';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {selectServices} from '../actions/selections';
import { getServices} from '../actions/get';
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
    this.props.getServices()
  
  }

  handleChange = event => {
    this.props.selectServices(event.value)
  };

  render() {

    const { classes, services, service } = this.props;
    if (!services) return null
    const serviceOptions = services.map(ser=>({"value":ser.name,"label":ser.name}))
    return (
      <div className={classes.root}>
        <div className={classes.formControl}>
          <Fragment>
            <Select
              placeholder = "Pick a service..."
              isDisabled={false}
              isLoading={false}
              isClearable={true}
              isSearchable={true}
              name="service"
              options={serviceOptions}
              onChange={this.handleChange}
              value={
                service !== '' ? {value:service,label: service} : ''
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
    services: state.allServices,
    service: state.selections.service
  }
}

ServiceForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles), connect(mapStateToProps, {selectServices, getServices}))(ServiceForm);

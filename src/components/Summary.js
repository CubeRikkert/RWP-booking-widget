import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
// import './Summary.css';

const styles = {
  card: {
    minWidth: 345,
  },
};

class Summary extends React.Component {
  checkServiceSelection = () => {
    const { service } = this.props.selections;
    // TODO: Explain the need to use .id
    if (!service || !service.id) {
      return 'select a service';
    }
    const { name, price, duration } = service;
    return (
      <React.Fragment>
        <p>Service: {name},</p>
        <p>Price: €{(price / 100).toFixed(2)}</p>
        <p>Duration {duration} minutes</p>
      </React.Fragment>
    );
  };

  checkLocationSelection = () => {
    if (!this.props.selections.location || !this.props.selections.location.id)
      return 'select a location';
    else return this.props.selections.location.name;
  };

  checkEmployeeSelection = () => {
    if (!this.props.selections.employee || !this.props.selections.employee.id)
      return 'select an employee';
    else return this.props.selections.employee.name;
  };

  render() {
    const { classes } = this.props;
    return (
      <Card
        className={classes.card}
        style={{ marginLeft: 10, marginRight: 120 }}
      >
        <CardHeader title="Summary:" subheader="based on your selection" />
        <CardContent>
          <Typography component="h2">{this.checkServiceSelection()}</Typography>
          <Typography component="p">{this.checkLocationSelection()}</Typography>
          <Typography component="p">{this.checkEmployeeSelection()}</Typography>
          <Typography component="p">{/* {date} */}</Typography>
        </CardContent>
      </Card>
    );
  }
}

Summary.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = function(state) {
  return {
    selections: state.selections,
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(Summary);

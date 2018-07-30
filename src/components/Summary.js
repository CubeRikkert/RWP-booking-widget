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
    if (this.props.selections.service.length < 1) {
      return 'select a service';
    }
    // const { name, price, duration } = service;
    return this.props.selections.service.map(serv => (
      <React.Fragment>
        <p>
          You are booking {this.props.selections.service.length} service(s){' '}
        </p>
        <p>Service: {serv.name},</p>
        <p>Price: €{(serv.price / 100).toFixed(2)}</p>
        <p>Duration {serv.duration} minutes</p>
      </React.Fragment>
    ));
  };

  checkLocationSelection = () => {
    if (!this.props.selections.location || !this.props.selections.location.id)
      return 'select a location';
    else return <p>Location: {this.props.selections.location.name}</p>;
  };

  checkEmployeeSelection = () => {
    if (!this.props.selections.employee || !this.props.selections.employee.id)
      return 'select an employee';
    else return <p>Employee: {this.props.selections.employee.name}</p>;
  };

  checkDateSelection = () => {
    if (!this.props.selections.date) return 'select a day';
    else return <p>Day: {this.props.selections.date}</p>;
  };

  checkTimeSelection = () => {
    if (!this.props.selections.time) return 'select an available time';
    else return <p>Time: {this.props.selections.time}</p>;
  };

  totalPrice = () => {
    if (this.props.selections.service.length < 1) return '';
    else
      return (
        <h2>
          Total Price:
          {' ' +
            (
              this.props.selections.service
                .map(sel => sel.price)
                .reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                ) / 100
            )
              .toFixed(2)
              .replace('.', ',')
              .replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, '$1.')}{' '}
          Euro
        </h2>
      );
  };

  render() {
    const { classes, selections } = this.props;
    // if (
    //   !selections ||
    //   !selections.location ||
    //   !selections.service ||
    //   !selections.employee
    // )
    //   return null;
    return (
      <Card className={classes.card} style={{ marginLeft: 10 }}>
        <CardHeader title="Summary:" subheader="based on your selection" />
        <CardContent>
          <Typography component="p">{this.checkServiceSelection()}</Typography>
          <Typography component="p">{this.totalPrice()} </Typography>

          <Typography component="p">{this.checkLocationSelection()}</Typography>
          <Typography component="p">{this.checkEmployeeSelection()}</Typography>
          <Typography component="p">{this.checkDateSelection()}</Typography>
          <Typography component="p">{this.checkTimeSelection()} </Typography>
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

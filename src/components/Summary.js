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
  checkNumberOfServices = () => {
    if (this.props.selections.service.length > 0)
      return (
        <p>
          You are booking {this.props.selections.service.length} service(s){' '}
        </p>
      );
  };

  checkServiceSelection = () => {
    const { service } = this.props.selections;
    // TODO: Explain the need to use .id
    if (this.props.selections.service.length < 1) {
      return 'select a service';
    }
    // const { name, price, duration } = service;
    return this.props.selections.service.map(serv => (
      <React.Fragment>
        <p>Service: {serv.name}</p>
        <hr />
      </React.Fragment>
    ));
  };

  checkLocationSelection = () => {
    if (!this.props.selections.location || !this.props.selections.location.id)
      return 'select a location';
    else
      return (
        <p>
          Location: {this.props.selections.location.name} <br /> Address:{' '}
          {this.props.selections.location.address}
        </p>
      );
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
    const { classes, selections, navigation } = this.props;
    // if (!this.props.selections.service.time)
    if (
      !selections.location ||
      !selections.service ||
      !selections.employee ||
      !selections.date ||
      !selections.time
    )
      return null; //customer form appears only after location, service and employee is selected
    if (navigation !== 3) return null;
    return (
      <Card
        className={classes.card}
        style={{
          marginTop: 10,
          marginLeft: 3,
          marginBottom: 10,
          padding: '0px 0px 0px 0px',
        }}
      >
        <CardContent
          style={{ padding: '0px 0px 0px 10px', marginTop: 0, marginBottom: 0 }}
        >
          <Typography component="p">{this.checkNumberOfServices()} </Typography>
          {/* <Typography component="p">{this.checkServiceSelection()}</Typography> */}
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
    navigation: state.navigation,
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(Summary);

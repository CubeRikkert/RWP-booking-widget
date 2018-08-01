import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import './Summary.css';

const styles = {
  card: {
    minWidth: 345,
  },
};

class Summary extends React.Component {
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
          marginLeft: 10,
          marginBottom: 10,
          padding: '0px 0px 0px 0px',
        }}
      >
        <CardContent
          style={{ padding: '0px 0px 0px 10px', marginTop: 0, marginBottom: 0 }}
        >
          <div>
            <Typography>
              <b>Summary:</b>
            </Typography>
            <Typography>
              You are booking {this.props.selections.service.length} service(s)
            </Typography>
            <Typography>
              Service(s):{' '}
              {this.props.selections.service.map(serv => serv.name).join()}
            </Typography>
            <Typography>
              Location: {this.props.selections.location.name}
            </Typography>
            <Typography>
              Address: {this.props.selections.location.address}
            </Typography>
            <Typography>
              Employee: {this.props.selections.employee.name}
            </Typography>
            <Typography>Day: {this.props.selections.date}</Typography>
            <Typography>Time: {this.props.selections.time}</Typography>
            <Typography>
              {' '}
              {
                <b>
                  Total Price:
                  {(
                    this.props.selections.service
                      .map(sel => sel.price)
                      .reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue,
                      ) / 100
                  )
                    .toFixed(2)
                    .replace('.', ',')
                    .replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, '$1.')}{' '}
                  Euro{' '}
                </b>
              }
            </Typography>
          </div>
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

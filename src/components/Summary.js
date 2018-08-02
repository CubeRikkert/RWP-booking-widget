import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import './Summary.css';

const styles = {
  // card: {
  //   minWidth: 300,
  // },
  root: {
    width: '100%',
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
      <div>
        <ExpansionPanel style={{ marginTop: 10, minWidth: 350, marginLeft: 3 }}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>
              <b>Booking Details:</b> (click here to see)
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ paddingBottom: 10, paddingTop: 0 }}>
            {/* <Card
        className={classes.card}
        style={{
          marginTop: 10,
          // marginLeft: 10,
          // marginBottom: 10,
          padding: '0px 0px 0px 0px',
        }}
      >
        <CardContent
          style={{ padding: '0px 0px 0px 10px', marginTop: 0, marginBottom: 0 }}
        > */}
            <div>
              <Typography style={{ marginBottom: 10 }}>
                You are booking {this.props.selections.service.length}{' '}
                service(s)
              </Typography>
              <Paper>
                <Table>
                  <TableBody>
                    <TableRow style={{ height: 10 }}>
                      <TableCell>Service(s):</TableCell>
                      <TableCell style={{ paddingLeft: 0 }}>
                        {this.props.selections.service
                          .map(serv => serv.name)
                          .join(', ')}
                      </TableCell>
                    </TableRow>
                    <TableRow style={{ height: 10 }}>
                      <TableCell>Location: </TableCell>
                      <TableCell style={{ paddingLeft: 0 }}>
                        {this.props.selections.location.name}
                      </TableCell>
                    </TableRow>
                    <TableRow style={{ height: 10 }}>
                      <TableCell>Address: </TableCell>
                      <TableCell style={{ paddingLeft: 0 }}>
                        {this.props.selections.location.address}
                      </TableCell>
                    </TableRow>
                    <TableRow style={{ height: 10 }}>
                      <TableCell>Employee: </TableCell>
                      <TableCell style={{ paddingLeft: 0 }}>
                        {this.props.selections.employee.name}
                      </TableCell>
                    </TableRow>
                    <TableRow style={{ height: 10 }}>
                      <TableCell>Day: </TableCell>
                      <TableCell style={{ paddingLeft: 0 }}>
                        {this.props.selections.date}
                      </TableCell>
                    </TableRow>
                    <TableRow style={{ height: 10 }}>
                      <TableCell>Time: </TableCell>
                      <TableCell style={{ paddingLeft: 0 }}>
                        {this.props.selections.time}
                      </TableCell>
                    </TableRow>
                    <TableRow style={{ height: 10, paddingRight: 0 }}>
                      <TableCell
                        style={{ fontWeight: 'bold', paddingRight: 0 }}
                      >
                        Total Price:
                      </TableCell>
                      <TableCell style={{ fontWeight: 'bold', paddingLeft: 0 }}>
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
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </div>
            {/* </CardContent>
      </Card> */}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
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

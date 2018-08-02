import Calendar from 'react-calendar';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { selectDate, resetTime } from '../actions/selections';
import { getTimes } from '../actions/get';
import { getDates } from '../actions/get';
import './DateForm.css';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 350,
    maxWidth: 350,
  },
  textField: {
    margin: theme.spacing.unit,
  },
});

class DateForm extends React.Component {
  state = {
    date: new Date(),
  };

  formatDate = date => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };

  onChange = date => {
    this.props.selectDate(this.formatDate(date));
    this.props.resetTime();
  };

  // Check whether a given date is a valid date
  // input in ISO format: yyyy-MM-dd
  DatePicker_IsValidDate = input => {
    var bits = input.split('-');
    var d = new Date(bits[0], bits[1] - 1, bits[2]);
    return (
      d.getFullYear() === Number(bits[0]) &&
      d.getMonth() + 1 === Number(bits[1]) &&
      d.getDate() === Number(bits[2])
    );
  };

  // Get the disabled dates array based on the dates
  // that were given by the available days request result
  getDisabledDates = dates => {
    const disabledDates = [];
    // Convert the dates to numbers
    const numberDates = dates.map(date => {
      return Number(date.substr(0, 4) + date.substr(5, 2) + date.substr(8, 2));
    });
    // For all the number dates ...
    for (
      let numberDateIx = 0;
      numberDateIx < numberDates.length - 1;
      numberDateIx++
    ) {
      // ... verify whether there is a date gap (more than 1 day)
      if (numberDates[numberDateIx] !== numberDates[numberDateIx + 1] - 1) {
        // For all the gap dates ...
        for (
          let startDate = numberDates[numberDateIx] + 1;
          startDate < numberDates[numberDateIx + 1];
          startDate++
        ) {
          const strDate = startDate.toString();
          const strDateYYYYMMDD =
            strDate.substr(0, 4) +
            '-' +
            strDate.substr(4, 2) +
            '-' +
            strDate.substr(6, 2);
          // ... check whether it is a valid date
          if (this.DatePicker_IsValidDate(strDateYYYYMMDD)) {
            // ... and if so add it to the disabledDates array
            disabledDates.push(
              new Date(
                strDateYYYYMMDD.substr(0, 4),
                strDateYYYYMMDD.substr(5, 2) - 1,
                strDateYYYYMMDD.substr(8, 2),
              ),
            );
          }
        }
      }
    }
    // Return the disableDates array
    return disabledDates;
  };

  checkDisabledDates = (date, firstValidDate, lastValidDate, disabledDates) => {
    // Check the calendar dates against the valid/disabled dates
    // Return true when the calendar date is a disabled date

    // Turn the calendar date into a numeric value so it can be compared
    const numberDate =
      date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
    // Case where calendar date is before the first valid date
    if (numberDate < firstValidDate) return true;
    // Case where calendar date is later than last valid date
    if (numberDate > lastValidDate) return true;
    // Cases checking the calendar dates against the disabled dates
    return disabledDates.some(disabledDate => {
      return (
        date.getFullYear() === disabledDate.getFullYear() &&
        date.getMonth() + 1 === disabledDate.getMonth() + 1 &&
        date.getDate() === disabledDate.getDate()
      );
    });
  };

  render() {
    const { selections, dates, navigation, classes } = this.props;

    if (!selections.location || !selections.service || !selections.employee)
      return null;
    if (!dates) return null;
    if (dates.length === 0)
      return (
        <div className="noAvailText" style={{ marginLeft: 10 }}>
          <p>There's no available date for this employee</p>
          <p>Please try another employee</p>
        </div>
      );

    const disabledDates = this.getDisabledDates(dates);
    const firstValidDate = Number(
      dates[0].substr(0, 4) + dates[0].substr(5, 2) + dates[0].substr(8, 2),
    );
    const lastValidDate = Number(
      dates[dates.length - 1].substr(0, 4) +
        dates[dates.length - 1].substr(5, 2) +
        dates[dates.length - 1].substr(8, 2),
    );
    if (navigation !== 2) return null;
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
            Date
          </p>
          <Calendar
            onChange={this.onChange}
            value={this.state.date}
            // Set the calendar dates that are not clickable
            // based on the available days request result
            tileDisabled={({ date, view }) =>
              view === 'month' && // Block day tiles only
              disabledDates.some(
                disabledDate =>
                  date.getFullYear() === disabledDate.getFullYear() &&
                  date.getMonth() === disabledDate.getMonth() &&
                  date.getDate() === disabledDate.getDate(),
              )
            }
            // Set the class name for the disable/valid dates
            tileClassName={({ date, view }) =>
              view === 'month' &&
              this.checkDisabledDates(
                date,
                firstValidDate,
                lastValidDate,
                disabledDates,
              ) === true
                ? 'disabledDates'
                : 'validDates'
            }
            // Set the minimum calendar date that is clickable
            // based on the first day of the available days request result
            minDate={
              new Date(
                dates[0].substr(0, 4),
                dates[0].substr(5, 2) - 1,
                dates[0].substr(8, 2),
              )
            }
            // Set the maximum calendar date that is clickable
            // based on the last day of the available days request result
            maxDate={
              new Date(
                dates[dates.length - 1].substr(0, 4),
                dates[dates.length - 1].substr(5, 2) - 1,
                dates[dates.length - 1].substr(8, 2),
              )
            }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    times: state.availableTimes,
    dates: state.availableDates,
    selections: state.selections,
    navigation: state.navigation,
  };
};

DateForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { selectDate, getTimes, getDates, resetTime },
  ),
)(DateForm);

import Calendar from 'react-calendar'
import { connect } from 'react-redux'
import compose from 'recompose/compose';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {selectDate} from '../actions/selections'
import {getTimes} from '../actions/get'
import {getDates} from '../actions/get'
import './DateForm.css'


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: 350,
  },
});

class DateForm extends React.Component {

  state = {
    date: new Date(),
  }

  formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  onChange = date => {
    this.props.selectDate(this.formatDate(date))
  };
 
  nowGetDates = () => {
    if (this.props.selections.service) {
      const date = new Date().toJSON().slice(0,10).replace(/-/g,'-')
      const serviceId = this.props.selections.service.id
      this.props.getDates(serviceId, date)
    }
  }


  render() {

    const disabledDates = [
      new Date(2018, 0, 1),
      new Date(2018, 1, 2),
    ];
    const { classes, selections, date } = this.props;
     
    if (!selections.location || !selections.service || !selections.employee) return null 
    return (
       <div className = "calendarFrame">
       
           <Calendar
             onChange={this.onChange}
             value={this.state.date}
             
             tileDisabled={({date, view}) =>
                    (view === 'month') && // Block day tiles only
                    disabledDates.some(disabledDate =>
                      date.getFullYear() === disabledDate.getFullYear() &&
                      date.getMonth() === disabledDate.getMonth() &&
                      date.getDate() === disabledDate.getDate()
                    )
                  }
           />

       </div>

    );
  }
}

const mapStateToProps = function (state) {
  return {
    times : state.availableTimes,
    dates : state.availableDates,
    selections: state.selections
    
  }
}

DateForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles), connect(mapStateToProps, {selectDate, getTimes, getDates}))(DateForm);

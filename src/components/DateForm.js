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


  // componentWillMount() {
  //   this.props.getDates (518955, new Date().toJSON().slice(0,10).replace(/-/g,'-'))
  // }

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
    // this.setState({date});
    // console.log(this.state.date)
    // console.log(date,'date')
    // const yyyymmdd = date.toJSON().slice(0,10).replace(/-/g,'-')
    // console.log(yyyymmdd,'yyyymmdd')
    //this.props.selectDate(date.toJSON().slice(0,10).replace(/-/g,'-'))
    this.props.selectDate(this.formatDate(date))
  };
 
  nowGetDates = () => {
    const date = new Date().toJSON().slice(0,10).replace(/-/g,'-')
    const serviceId = this.props.serviceSelection
    this.props.getDates(serviceId, date)
  }


  render() {

    const disabledDates = [
      new Date(2018, 0, 1),
      new Date(2018, 1, 2),
    ];
    const { classes, selections, date } = this.props;
     
    if (!selections.location || !selections.service || !selections.employee) return null 
    // if (this.props.dates===null) this.nowGetDates()
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
  
    serviceSelection: state.selections.service.id,
    times : state.availableTimes,
    dates : state.availableDates,
    selections: state.selections
    
  }
}

DateForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles), connect(mapStateToProps, {selectDate, getTimes, getDates}))(DateForm);

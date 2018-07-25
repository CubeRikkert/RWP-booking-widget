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


  componentWillMount() {
    this.props.getDates (518955, "2018-07-25")
  }

  onChange = date => {
    this.setState({date});
    console.log(this.state.date)
    this.props.selectDate(this.state.date)
  };



  render() {
    const disabledDates = [
      new Date(2018, 0, 1),
      new Date(2018, 1, 2),
    ];
    const { classes, selections, date } = this.props;
    // if (!selections.location || !selections.service || !selections.employee) return null 
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
  
    getTimes : state.getTimes,
    getDates : state.getDates,
    selections: state.selections
    
  }
}

DateForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(withStyles(styles), connect(mapStateToProps, {selectDate, getTimes, getDates}))(DateForm);

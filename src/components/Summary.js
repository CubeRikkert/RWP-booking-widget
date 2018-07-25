import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Paper } from '../../node_modules/@material-ui/core';
import './Summary.css'



class Summary extends React.Component {

    checkServiceSelection = () => {
  
        if ( !this.props.selections.service || !this.props.selections.service.id ) return 'select a service'
        const str = `Service: ${this.props.selections.service.name}, 
                     \nPrice: €${(this.props.selections.service.price/100).toFixed(2)}, 
                     \nDuration ${this.props.selections.service.duration} minutes`
        return str.split('\n').map(i => {
          return <p>{i}</p>
        })
      }

    checkLocationSelection = () => {

        if ( !this.props.selections.location || !this.props.selections.location.id) return 'select a location'
        else return this.props.selections.location.name
    }

    checkEmployeeSelection = () => {
      
        if (!this.props.selections.employee || !this.props.selections.employee.id ) return 'select an employee'
        else return this.props.selections.employee.name 
    }

    render() {

      return (
        <Card className="outer-paper">
          <CardHeader 
            title="Summary:"
            subheader="based on your selection"
          />
          <CardContent>
            <Typography component="h2">
              {
                this.checkServiceSelection()
              }
            </Typography>
            <Typography component="p">
              {
                this.checkLocationSelection()
              }
            </Typography>
            <Typography component="p">
              {
                this.checkEmployeeSelection()
              }
            </Typography>
            <Typography component="p">
              {/* {date} */}
            </Typography>
          </CardContent>
        </Card>
      )
    }
  }

const mapStateToProps = function (state) {
    return {
        selections: state.selections
    }
}

export default connect(mapStateToProps)(Summary);
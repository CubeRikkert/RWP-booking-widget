//.../src/components/BookingWidget.js
//This is where all components will be combined


import React, { PureComponent } from 'react';
import LocationForm from './LocationForm'
import EmployeeForm from './EmployeeForm';
import ServiceForm from './ServiceForm';
import DateForm from './DateForm';
import CustomerForm from './CustomerForm'
import ResetForm from './ResetForm';
import Summary from './Summary'

export default class BookingWidget extends PureComponent {

  render() {
    return (
      <div>
        <ServiceForm />
        <LocationForm />
        
        <EmployeeForm />
        <DateForm /> 
        <CustomerForm />
  
        <ResetForm />
        <Summary />
      </div>
    )
  }
}
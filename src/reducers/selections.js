import {SELECT_LOCATION,SELECT_SERVICES,SELECT_EMPLOYEES,SELECT_DATE} from '../actions/selections'

const initialState = {
    location: '',
    service: '',
    employee: '',
    date: ''
  }


export default function(state = initialState, action) {
  switch (action.type) {
      case SELECT_LOCATION:
        return {...state, location: action.payload}
      case SELECT_SERVICES:
        return {...state, service: action.payload}
      case SELECT_EMPLOYEES:
        return {...state, employee: action.payload}
      case SELECT_DATE:
        return {...state, date: action.payload}
      default:
        return state
  }
}
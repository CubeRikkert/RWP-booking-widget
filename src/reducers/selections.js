
import {SELECT_LOCATION,SELECT_SERVICES,SELECT_EMPLOYEES,SELECT_DATE, RESET_FORM} from '../actions/selections'


const initialState = {
    location: '',
    service: '',
    employee: '',
    date: '',
    time:''
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
      case RESET_FORM:
        return initialState

      default:
        return state
  }
}
import {SELECT_LOCATION,SELECT_SERVICES,SELECT_EMPLOYEES,SELECT_DATE} from '../actions/selections'

const initialState = {
  locations: ['cool hairdresser','very cool waxing','nice salon'],
  services: ['waxing','cutting hair','change hair color'],
  employees: ['jack','john'],
  selection: {
    location: '',
    service: '',
    employee: '',
    date: ''
  },
  customer: {
    firstName:'',
    lastName:'',
    address:'',
    postalcode:'',
    city:'',
    phone:'',
    email:'',
    notes:''
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
      case SELECT_LOCATION:
        return {...state, selection: {...state.selection, location: action.payload}}
      case SELECT_SERVICES:
        return {...state, selection: {...state.selection, service: action.payload}}
      case SELECT_EMPLOYEES:
        return {...state, selection: {...state.selection, employee: action.payload}}
      case SELECT_DATE:
        return {...state, selection: {...state.selection, date: action.payload}}
      default:
        return state
  }
}
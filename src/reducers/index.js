import { combineReducers } from 'redux'
import selections from './selections'
import allLocations from './locations'
import allEmployees from './employees'
import allServices from './services'
import customer from './customer'
import getTimes from './getTimes'

export default combineReducers({
  allLocations,
  allEmployees,
  allServices,
  customer,
  selections,
  getTimes
})
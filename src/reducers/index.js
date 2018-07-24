import { combineReducers } from 'redux'
import selections from './selections'
import locations from './locations'
import employees from './employees'
import services from './services'
import customer from './customer'
import getServices from './getServices'
import getLocations from './getLocations'
import getEmployees from './getEmployees'
import getTimes from './getTimes'

export default combineReducers({
  selections,
  getServices,
  getLocations,
  getEmployees,
  getTimes,
  locations,
  employees,
  services,
  customer


})
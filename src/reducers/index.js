import { combineReducers } from 'redux'
import selections from './selections'
import locations from './locations'
import employees from './employees'
import services from './services'
import customer from './customer'

export default combineReducers({
  selections,
  locations,
  employees,
  services,
  customer
})
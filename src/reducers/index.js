import { combineReducers } from 'redux';
import selections from './selections'
import getServices from './getServices'
import getLocations from './getLocations'
import getEmployees from './getEmployees'
import getTimes from './getTimes'

export default combineReducers({
  selections,
  getServices,
  getLocations,
  getEmployees,
  getTimes
})
import { combineReducers } from 'redux';
import selections from './selections';
import allLocations from './locations';
import allEmployees from './employees';
import allServices from './services';
import customer from './customer';
import availableTimes from './availableTimes';
import availableDates from './availableDates';
import addBooking from './booking';
import getConfig from './conf';
import navigation from './navigation';

export default combineReducers({
  allLocations,
  allEmployees,
  allServices,
  customer,
  selections,
  availableTimes,
  availableDates,
  addBooking,
  getConfig,
  navigation,
});

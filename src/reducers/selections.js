import {
  SELECT_LOCATION,
  SELECT_SERVICES,
  SELECT_EMPLOYEES,
  SELECT_DATE,
  SELECT_TIME,
  RESET_FORM,
  RESET_TIME,
  RESET_EMPLOYEE,
  RESET_LOCATION,
  RESET_DATE,
} from '../actions/selections';

const initialState = {
  location: '',
  service: [],
  employee: '',
  date: '',
  time: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_LOCATION:
      return { ...state, location: action.payload };
    case SELECT_SERVICES:
      return { ...state, service: action.payload };
    case SELECT_EMPLOYEES:
      return { ...state, employee: action.payload };
    case SELECT_DATE:
      return { ...state, date: action.payload };
    case SELECT_TIME:
      return { ...state, time: action.payload };
    case RESET_TIME:
      return { ...state, time: '' };
    case RESET_DATE:
      return { ...state, date: '' };
    case RESET_FORM:
      return initialState;
    case RESET_EMPLOYEE:
      return { ...state, employee: '' };
    case RESET_LOCATION:
      return { ...state, location: '' };

    default:
      return state;
  }
}

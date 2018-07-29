import {
  FIRST_NAME,
  LAST_NAME,
  ADDRESS,
  POSTAL_CODE,
  CITY,
  PHONE,
  EMAIL,
  NOTES,
} from '../actions/customer';
import { RESET_FORM } from '../actions/selections';

const initialState = {
  firstName: '',
  lastName: '',
  address: '',
  postalcode: '',
  city: '',
  phone: '',
  email: '',
  notes: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FIRST_NAME:
      return { ...state, firstName: action.payload };
    case LAST_NAME:
      return { ...state, lastName: action.payload };
    case ADDRESS:
      return { ...state, address: action.payload };
    case POSTAL_CODE:
      return { ...state, postalcode: action.payload };
    case CITY:
      return { ...state, city: action.payload };
    case PHONE:
      return { ...state, phone: action.payload };
    case EMAIL:
      return { ...state, email: action.payload };
    case NOTES:
      return { ...state, notes: action.payload };
    case RESET_FORM:
      return initialState;
    default:
      return state;
  }
}

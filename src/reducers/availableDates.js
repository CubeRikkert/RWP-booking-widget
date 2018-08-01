import { GET_DATES } from '../actions/get';
import { RESET_FORM, RESET_DATES } from '../actions/selections';

export default function(state = null, action) {
  switch (action.type) {
    case GET_DATES:
      return action.payload;
    case RESET_FORM:
      return null;
    case RESET_DATES:
      return null;
    default:
      return state;
  }
}

import { GET_DATES } from '../actions/get';
import { RESET_FORM } from '../actions/selections';

export default function(state = null, action) {
  switch (action.type) {
    case GET_DATES:
      return action.payload;
    case RESET_FORM:
      return null;
    default:
      return state;
  }
}

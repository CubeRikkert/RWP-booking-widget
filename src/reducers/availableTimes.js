import { GET_TIMES } from '../actions/get';
import { RESET_FORM, RESET_TIMES } from '../actions/selections';

export default function(state = null, action) {
  switch (action.type) {
    case GET_TIMES:
      return action.payload;
    case RESET_FORM:
      return null;
    case RESET_TIMES:
      return [];
    default:
      return state;
  }
}

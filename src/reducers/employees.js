import { GET_EMPLOYEES } from '../actions/get';

export default function(state = null, action) {
  switch (action.type) {
    case GET_EMPLOYEES:
      return action.payload;
    default:
      return state;
  }
}

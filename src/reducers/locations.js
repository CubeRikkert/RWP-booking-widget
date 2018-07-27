import { GET_LOCATIONS } from '../actions/get';

export default function(state = null, action) {
  switch (action.type) {
    case GET_LOCATIONS:
      return action.payload;
    default:
      return state;
  }
}

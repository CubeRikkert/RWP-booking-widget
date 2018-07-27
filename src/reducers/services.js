import { GET_SERVICES } from '../actions/get';

export default function(state = null, action) {
  switch (action.type) {
    case GET_SERVICES:
      return action.payload;
    default:
      return state;
  }
}

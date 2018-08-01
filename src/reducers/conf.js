import { GET_CONF } from '../actions/conf';

export default function(state = null, action) {
  switch (action.type) {
    case GET_CONF:
      return action.payload;
    default:
      return state;
  }
}

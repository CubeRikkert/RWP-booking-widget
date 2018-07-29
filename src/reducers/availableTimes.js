import { GET_TIMES } from '../actions/get';

export default function(state = null, action) {
  switch (action.type) {
    case GET_TIMES:
      return action.payload;
    default:
      return state;
  }
}

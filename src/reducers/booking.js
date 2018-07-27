import { ADD_BOOKING } from '../actions/get';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_BOOKING:
      return payload;
    default:
      return state;
  }
};

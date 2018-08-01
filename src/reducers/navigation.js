import { GO_BACK, GO_FORWARD } from '../actions/navigation';

export default function(state = 1, action) {
  switch (action.type) {
    case GO_BACK:
      return (state -= 1);
    case GO_FORWARD:
      return (state += 1);
    default:
      return state;
  }
}

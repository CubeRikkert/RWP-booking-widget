import { GET_DATES} from '../actions/get'

export default function(state = null, action) {
    switch (action.type) {
        case GET_DATES:
          return action.payload
          default:
          return state
    }
  }
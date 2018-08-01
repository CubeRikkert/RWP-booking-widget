import request from 'superagent';
import { baseUrl } from '../constants';
export const GET_CONF = 'GET_CONF';

export const getConfig = () => dispatch => {
  request.get(`${baseUrl}/bookings/booking_config.json`).then(response => {
    // console.log(response.body)
    dispatch({
      type: GET_CONF,
      payload: response.body.company,
    });
  });
};

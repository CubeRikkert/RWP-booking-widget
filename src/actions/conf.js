import request from 'superagent';
export const GET_CONF = 'GET_CONF';

export const getConfig = () => dispatch => {
  request
    .get(`https://salonized.salonized.com/bookings/booking_config.json`)
    .then(response => {
      // console.log(response.body)
      dispatch({
        type: GET_CONF,
        payload: response.body.company,
      });
    });
};
